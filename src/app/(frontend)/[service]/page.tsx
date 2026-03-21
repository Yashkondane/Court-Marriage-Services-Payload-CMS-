import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

type Params = Promise<{ service: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service: serviceSlug } = await params

  try {
    const payload = await getPayload()

    // Try finding a page for this service
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: serviceSlug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 2,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = pages.docs[0] as any
    const seo = page?.seo

    if (seo) {
      return {
        title: seo.metaTitle || page.title,
        description: seo.metaDescription,
        keywords: seo.keywords,
        openGraph: {
          title: seo.metaTitle || page.title,
          description: seo.metaDescription,
          images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
        },
        robots: seo.robotsMeta,
        alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
      }
    }

    // Fallback to service data
    const services = await payload.find({
      collection: 'services',
      where: { slug: { equals: serviceSlug } },
      limit: 1,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svc = services.docs[0] as any
    if (svc?.seo) {
      return {
        title: svc.seo.metaTitle || svc.title,
        description: svc.seo.metaDescription,
      }
    }

    return { title: svc?.title || serviceSlug }
  } catch {
    return { title: serviceSlug.replace(/-/g, ' ') }
  }
}

export default async function ServicePage({ params }: { params: Params }) {
  const { service: serviceSlug } = await params

  try {
    const payload = await getPayload()

    // First try to find a page with this slug
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: serviceSlug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 3,
    })

    if (pages.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const page = pages.docs[0] as any
      return <RenderBlocks blocks={page.layout} />
    }

    // Fall back to service collection
    const services = await payload.find({
      collection: 'services',
      where: { slug: { equals: serviceSlug } },
      limit: 1,
      depth: 3,
    })

    if (services.docs.length === 0) {
      notFound()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = services.docs[0] as any

    return (
      <div>
        <section
          className="relative min-h-[50vh] flex items-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}
        >
          <div className="container-page text-white py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          </div>
        </section>
        {service.content && (
          <section className="py-12">
            <div className="container-page max-w-4xl mx-auto rich-text">
              <p>Service content rendered here</p>
            </div>
          </section>
        )}
      </div>
    )
  } catch {
    notFound()
  }
}
