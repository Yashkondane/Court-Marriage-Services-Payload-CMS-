import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getLawyerFromToken } from '@/lib/lawyer-auth'

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

    const media = await (payload.create as any)({
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
