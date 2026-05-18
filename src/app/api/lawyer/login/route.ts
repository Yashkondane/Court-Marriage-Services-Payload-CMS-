import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    // Sign in via Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      if (authError.message?.includes('Email not confirmed')) {
        return NextResponse.json(
          { error: 'Please verify your email before logging in. Check your inbox.' },
          { status: 403 }
        )
      }
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // Find the lawyer profile linked to this Supabase user
    const payload = await getPayload({ config: configPromise })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (payload.find as any)({
      collection: 'lawyers',
      where: { supabaseId: { equals: authData.user.id } },
      limit: 1,
      depth: 1,
    })

    if (result.docs.length === 0) {
      return NextResponse.json(
        { error: 'No lawyer profile found for this account.' },
        { status: 404 }
      )
    }

    const lawyer = result.docs[0] as any

    return NextResponse.json({
      success: true,
      session: {
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
        expires_at: authData.session.expires_at,
      },
      lawyer: {
        id: lawyer.id,
        name: lawyer.name,
        slug: lawyer.slug,
        email: lawyer.email,
        status: lawyer.status,
        photo: lawyer.photo,
        designation: lawyer.designation,
      },
    })
  } catch (error: unknown) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
