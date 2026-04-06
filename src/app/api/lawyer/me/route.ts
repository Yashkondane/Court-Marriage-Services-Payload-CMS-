import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Helper: verify Supabase JWT and get the lawyer profile
async function getLawyerFromToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid authorization header.', status: 401 }
  }

  const token = authHeader.split(' ')[1]
  const supabase = createAdminClient()

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    return { error: 'Invalid or expired session. Please login again.', status: 401 }
  }

  const payload = await getPayload({ config: configPromise })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (payload.find as any)({
    collection: 'lawyers',
    where: { supabaseId: { equals: user.id } },
    limit: 1,
    depth: 2,
  })

  if (result.docs.length === 0) {
    return { error: 'No lawyer profile found.', status: 404 }
  }

  return { lawyer: result.docs[0], supabaseUser: user }
}

// GET /api/lawyer/me — Fetch own profile
export async function GET(req: NextRequest) {
  try {
    const result = await getLawyerFromToken(req)
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json({
      success: true,
      lawyer: result.lawyer,
    })
  } catch (error) {
    console.error('GET /api/lawyer/me error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH /api/lawyer/me — Update own profile
export async function PATCH(req: NextRequest) {
  try {
    const result = await getLawyerFromToken(req)
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    const body = await req.json()
    const { lawyer } = result

    // Fields the lawyer is allowed to update themselves
    const allowedFields = [
      'name', 'designation', 'bio', 'phone', 'photo',
      'barCouncilId', 'experience', 'consultationFee', 'availableHours',
      'locationText', 'location', 'languages', 'education', 'specializations',
      'responseTime',
    ]

    // Filter to only allowed fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {}
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key]
      }
    }

    const payload = await getPayload({ config: configPromise })

    // If name changes, regenerate slug
    if (updateData.name && updateData.name !== lawyer.name) {
      let baseSlug = updateData.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
      let slug = baseSlug
      let attempt = 0
      while (true) {
        const existing = await payload.find({
          collection: 'lawyers',
          where: {
            slug: { equals: slug },
            id: { not_equals: lawyer.id },
          },
          limit: 1,
        })
        if (existing.docs.length === 0) break
        attempt++
        slug = `${baseSlug}-${attempt}`
      }
      updateData.slug = slug
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update.' },
        { status: 400 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated = await (payload.update as any)({
      collection: 'lawyers',
      id: lawyer.id,
      data: updateData,
      depth: 2,
    })

    return NextResponse.json({
      success: true,
      lawyer: updated,
    })
  } catch (error) {
    console.error('PATCH /api/lawyer/me error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
