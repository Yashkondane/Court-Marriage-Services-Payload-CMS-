import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

type Params = Promise<{ service: string; location: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service: serviceSlug, location: locationSlug } = await params
  const title = `${serviceSlug.replace(/-/g, ' ')} in ${locationSlug.replace(/-/g, ' ')}`

  try {
    const payload = await getPayload()
    const compositeSlug = `${serviceSlug}/${locationSlug}`

    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: compositeSlug }, status: { equals: 'published' } },
      limit: 1,
      depth: 2,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = pages.docs[0] as any
    if (page?.seo?.metaTitle) {
      return {
        title: page.seo.metaTitle,
        description: page.seo.metaDescription,
        keywords: page.seo.keywords,
        openGraph: {
          title: page.seo.metaTitle,
          description: page.seo.metaDescription,
          images: page.seo.ogImage?.url ? [{ url: page.seo.ogImage.url }] : [],
        },
        robots: page.seo.robotsMeta,
      }
    }

    return { title: title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }
  } catch {
    return { title }
  }
}

export default async function ServiceLocationPage({ params }: { params: Params }) {
  const { service: serviceSlug, location: locationSlug } = await params

  try {
    const payload = await getPayload()
    const compositeSlug = `${serviceSlug}/${locationSlug}`

    // Try composite slug first
    let pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: compositeSlug }, status: { equals: 'published' } },
      limit: 1,
      depth: 3,
    })

    if (pages.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <RenderBlocks blocks={(pages.docs[0] as any).layout} />
    }

    // Try to build a page from service + location data
    const services = await payload.find({
      collection: 'services',
      where: { slug: { equals: serviceSlug } },
      limit: 1,
      depth: 2,
    })

    const locations = await payload.find({
      collection: 'locations',
      where: { slug: { equals: locationSlug } },
      limit: 1,
    })

    if (services.docs.length === 0 || locations.docs.length === 0) {
      notFound()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = services.docs[0] as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const location = locations.docs[0] as any

    return (
      <div>
        <section
          className="relative min-h-[50vh] flex items-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}
        >
          <div className="container-page text-white py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.title} in {location.name}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Expert {service.title.toLowerCase()} services in {location.name}. Trusted legal professionals ready to assist you.
            </p>
          </div>
        </section>
        {service.content && (
          <section className="py-12">
            <div className="container-page max-w-4xl mx-auto rich-text">
              <p>Service content for {location.name}</p>
            </div>
          </section>
        )}
      </div>
    )
  } catch {
    notFound()
  }
}
