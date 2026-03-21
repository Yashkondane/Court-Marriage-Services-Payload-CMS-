import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Server-side validation
    if (!data.name || !data.phone || !data.service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        phone: data.phone,
        service: data.service,
        email: data.email || undefined,
        message: data.message || undefined,
        sourceUrl: data.sourceUrl || undefined,
      },
    })

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (err: any) {
    console.error('Lead submission error:', err)
    return NextResponse.json({ error: 'An error occurred during submission' }, { status: 500 })
  }
}
