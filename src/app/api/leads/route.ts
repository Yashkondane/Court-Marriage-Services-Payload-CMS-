import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Simple in-memory rate limiter
// For production, consider Redis/Upstash
const RATE_LIMIT_WINDOW = 5 * 60 * 1000 // 5 minutes
const MAX_REQUESTS = 2
const ipCache = new Map<string, { count: number; firstRequest: number }>()

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous'
    const now = Date.now()
    
    // Rate check
    const clientData = ipCache.get(ip)
    if (clientData) {
      if (now - clientData.firstRequest < RATE_LIMIT_WINDOW) {
        if (clientData.count >= MAX_REQUESTS) {
          return NextResponse.json({ 
            error: 'Too many requests. Please wait a few minutes before submitting again.' 
          }, { status: 429 })
        }
        clientData.count += 1
      } else {
        // Reset window
        ipCache.set(ip, { count: 1, firstRequest: now })
      }
    } else {
      ipCache.set(ip, { count: 1, firstRequest: now })
    }

    const body = await req.json()
    const { name, email, phone, subject, message, lawyerId, sourceUrl } = body

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Create the lead
    // Note: 'as any' is used if types are out of sync
    const lead = await (payload.create as any)({
      collection: 'leads',
      data: {
        name,
        email,
        phone,
        message: `Subject: ${subject}\n\n${message}`,
        sourceUrl: sourceUrl || 'Direct Profile Enquiry',
        lawyer: lawyerId, // Link to the lawyer
      },
    })

    return NextResponse.json({
      success: true,
      id: lead.id,
      message: 'Enquiry submitted successfully!',
    })
  } catch (error: any) {
    console.error('Lead API error:', error)
    return NextResponse.json({ error: 'Server error during submission.' }, { status: 500 })
  }
}
