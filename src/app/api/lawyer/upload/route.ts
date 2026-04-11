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
  })

  if (result.docs.length === 0) {
    return { error: 'No lawyer profile found.', status: 404 }
  }

  return { lawyer: result.docs[0], user }
}

export async function POST(req: NextRequest) {
  try {
    const result = await getLawyerFromToken(req)
    if ('error' in result) {
      return NextResponse.json({ error: (result as any).error }, { status: (result as any).status })
    }

    const { lawyer } = result as any
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // 1. Create Media entry in Payload
    // We use the admin context (default getPayload uses admin context)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const media = await payload.create({
      collection: 'lawyer-media',
      data: {
        alt: `Profile photo of ${lawyer.name}`,
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type,
        size: buffer.length,
      },
    })

    // 2. Update Lawyer profile with the photo ID
    await (payload.update as any)({
      collection: 'lawyers',
      id: lawyer.id,
      data: {
        photo: media.id,
      },
    })

    return NextResponse.json({
      success: true,
      mediaID: media.id,
      url: media.url,
      message: 'Photo uploaded and profile updated successfully!',
    })
  } catch (error: any) {
    console.error('Upload API error:', error)
    return NextResponse.json({ error: error.message || 'Server error during upload.' }, { status: 500 })
  }
}
