import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      )
    }

    // 1. Create Supabase Auth user via standard signUp (this triggers the confirmation email)
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

    // 2. Generate unique slug
    let baseSlug = slugify(name)
    let slug = baseSlug
    const payload = await getPayload({ config: configPromise })

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
  } catch (error: unknown) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
