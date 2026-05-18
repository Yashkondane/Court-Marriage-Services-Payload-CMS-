import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { LawyersListClient } from './LawyersListClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function LawyersList({ block }: { block: any }) {
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch all approved lawyers
  const lawyersRes = await payload.find({
    collection: 'lawyers',
    where: {
      status: { equals: 'approved' },
    },
    limit: 250,
    depth: 2,
  })

  // 2. Resolve FAQs (handle both array of objects and array of IDs)
  let resolvedFaqs: any[] = []
  if (block.faqs && block.faqs.length > 0) {
    if (typeof block.faqs[0] === 'object') {
      resolvedFaqs = block.faqs
    } else {
      const faqsRes = await payload.find({
        collection: 'faqs',
        where: {
          id: { in: block.faqs },
        },
        limit: 100,
      })
      resolvedFaqs = faqsRes.docs
    }
  } else {
    // Fallback: Fetch a few default FAQs
    const defaultFaqs = await payload.find({
      collection: 'faqs',
      limit: 5,
    })
    resolvedFaqs = defaultFaqs.docs
  }

  // 3. Resolve Reviews/Testimonials
  let resolvedReviews: any[] = []
  if (block.reviews && block.reviews.length > 0) {
    if (typeof block.reviews[0] === 'object') {
      resolvedReviews = block.reviews
    } else {
      const reviewsRes = await payload.find({
        collection: 'testimonials',
        where: {
          id: { in: block.reviews },
        },
        limit: 100,
      })
      resolvedReviews = reviewsRes.docs
    }
  } else {
    // Fallback: Fetch a few default reviews
    const defaultReviews = await payload.find({
      collection: 'testimonials',
      limit: 4,
    })
    resolvedReviews = defaultReviews.docs
  }

  return (
    <LawyersListClient
      block={block}
      lawyers={lawyersRes.docs}
      initialFaqs={resolvedFaqs}
      initialReviews={resolvedReviews}
    />
  )
}
