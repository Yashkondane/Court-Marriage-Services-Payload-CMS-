import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getLawyerFromToken } from '../me/route'

export async function GET(req: NextRequest) {
  try {
    const result = await getLawyerFromToken(req)
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    const { lawyer } = result
    const payload = await getPayload({ config: configPromise })

    // Find leads where lawyer field matches the current lawyer's ID
    const leads = await payload.find({
      collection: 'leads',
      where: {
        lawyer: {
          equals: lawyer.id,
        },
      },
      sort: '-createdAt',
      limit: 100, // Reasonable limit for dashboard
    })

    return NextResponse.json({
      success: true,
      leads: leads.docs,
    })
  } catch (error: any) {
    console.error('GET /api/lawyer/leads error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
