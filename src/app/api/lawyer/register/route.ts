import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, phone } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    // 1. Check for duplicate Email in Payload FIRST
    const existingLawyer = await payload.find({
      collection: 'lawyers',
      where: { email: { equals: email.toLowerCase() } },
      limit: 1,
    })

    if (existingLawyer.docs.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please login instead.' },
        { status: 409 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      )
    }

    // 2. Create Supabase Auth user via standard signUp
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'lawyer' },
      },
    })

    if (authError) {
      if (authError.message?.includes('already registered') || authError.status === 422) {
        return NextResponse.json(
          { error: 'An account with this email already exists. Please login instead.' },
          { status: 409 }
        )
      }
      console.error('Supabase auth error:', authError)
      return NextResponse.json(
        { error: 'Failed to create account. Please try again.' },
        { status: 500 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user.' },
        { status: 500 }
      )
    }

    const supabaseId = authData.user.id

    // 3. Generate unique slug
    let baseSlug = slugify(name)
    let slug = baseSlug

    // Check for duplicates
    let attempt = 0
    while (true) {
      const existing = await payload.find({
        collection: 'lawyers',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      if (existing.docs.length === 0) break
      attempt++
      slug = `${baseSlug}-${attempt}`
    }

    // 3. Create Lawyer profile in Payload (status: pending_review)
    console.log('Creating lawyer profile with data:', { name, email, slug, supabaseId });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lawyer = await (payload.create as any)({
      collection: 'lawyers',
      data: {
        name,
        email,
        phone: phone || '',
        slug,
        supabaseId,
        status: 'pending_review',
        rating: 0,
        ratingCount: 0,
        profileViews: 0,
      },
    })

    // 4. Supabase auto-sends a confirmation email when email_confirm is false
    // No need to call generateLink separately

    return NextResponse.json({
      success: true,
      message: 'Account created! Please check your email to verify your account.',
      lawyer: {
        id: lawyer.id,
        name: lawyer.name,
        slug: lawyer.slug,
        email: lawyer.email,
        status: lawyer.status,
      },
    })
  } catch (error: any) {
    console.error('Registration error details:');
    if (error.data) {
      console.dir(error.data, { depth: null });
    } else {
      console.error(error);
    }

    // Return a more descriptive error if it's a Payload validation error
    const message = error.data?.errors?.[0]?.message || error.message || 'Something went wrong. Please try again.';

    return NextResponse.json(
      { error: message },
      { status: error.status || 500 }
    )
  }
}
