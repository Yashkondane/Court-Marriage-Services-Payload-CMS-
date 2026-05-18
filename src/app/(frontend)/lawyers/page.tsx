import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload/getPayload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { LawyersList } from '@/components/blocks/LawyersList'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload()
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'lawyers' } },
      limit: 1,
    })

    const page = pages.docs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seo = (page as any)?.seo

    if (seo) {
      return {
        title: seo.metaTitle || 'Find a Lawyer | VakilFirst',
        description: seo.metaDescription || 'Browse our directory of verified, expert lawyers across India.',
        keywords: seo.keywords,
        openGraph: {
          title: seo.metaTitle,
          description: seo.metaDescription,
          images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        robots: seo.robotsMeta,
        alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
      }
    }
  } catch {
    // DB offline/not connected yet
  }

  return {
    title: 'Find a Lawyer | VakilFirst',
    description: 'Browse our directory of verified, expert lawyers across India. Filter by specialization, location, and more.',
  }
}

export default async function LawyersDirectoryPage() {
  let page = null

  try {
    const payload = await getPayload()
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'lawyers' } },
      limit: 1,
      depth: 3,
    })
    page = pages.docs[0]
  } catch {
    // DB not connected yet
  }

  if (!page) {
    // Fallback: Render the dynamic LawyersList directly with default configuration
    const defaultBlock = {
      blockType: 'lawyersList',
      heading: 'Consult with the Best Lawyers & Advocates in India',
      subheading: 'Navigating legal matters can be daunting, but with the best lawyers in India, you can secure the expert guidance you need. We connect individuals and businesses with top-rated advocates and legal experts.',
      onlineCountText: '104+ Lawyers Online',
      showFilters: true,
      whyChooseHeading: 'Why Choose Our Lawyers & Advocates?',
      whyChoosePoints: [
        {
          title: 'Bar Council Verified Advocates',
          description: 'Every lawyer registered with VakilFirst undergoes rigorous verification of their credentials, licensing, and enrollment details.',
        },
        {
          title: '4.8+ Client Ratings & Reviews',
          description: 'Read verified testimonials, reviews, and client satisfaction ratings before consulting with your advocate.',
        },
        {
          title: '100% Secure & Confidential',
          description: 'All consultations, case evaluations, and document transmissions are protected under strict attorney-client privilege.',
        },
        {
          title: 'Quick Response (under 5 Min)',
          description: 'Connect with a local legal expert instantly for urgent litigation, document filings, or general counsel.',
        }
      ],
      consultationWidget: {
        heading: 'Consult a Lawyer',
        subheading: 'No Minutes Limit',
        price: '1000',
        originalPrice: '2000',
      },
      helpContactWidget: {
        heading: 'Need Help?',
        phone: '+91-8800 788 535',
        timings: 'Timing: 9AM to 8PM',
        callbackText: 'Arrange a Callback',
      }
    }

    return <LawyersList block={defaultBlock} />
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RenderBlocks blocks={(page as any).layout} />
}
