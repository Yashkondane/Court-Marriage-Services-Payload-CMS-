import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { lawyerId, rating } = await req.json()
    
    if (!lawyerId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: 'Invalid rating' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    
    // Fetch current lawyer data
    const lawyer = await payload.findByID({
      collection: 'lawyers',
      id: lawyerId,
      depth: 0,
    }) as any

    if (!lawyer) {
      return NextResponse.json({ success: false, error: 'Lawyer not found' }, { status: 404 })
    }

    const currentRating = lawyer.rating || 0
    const currentCount = lawyer.ratingCount || 0
    
    // Calculate new weighted average
    const newCount = currentCount + 1
    const newRating = ((currentRating * currentCount) + rating) / newCount

    await (payload.update as any)({
      collection: 'lawyers',
      id: lawyerId,
      data: {
        rating: Number(newRating.toFixed(2)),
        ratingCount: newCount,
      },
    })

    return NextResponse.json({ 
      success: true, 
      newRating: newRating.toFixed(1),
      newCount 
    })
  } catch (error: any) {
    console.error('Rating Error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 })
  }
}
