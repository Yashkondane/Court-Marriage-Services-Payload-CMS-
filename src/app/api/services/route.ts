import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'services',
      limit: 200,
      depth: 0,
      sort: 'title',
    })

    return NextResponse.json({ docs: result.docs })
  } catch (error) {
    console.error('Services API error:', error)
    return NextResponse.json({ docs: [] }, { status: 500 })
  }
}
