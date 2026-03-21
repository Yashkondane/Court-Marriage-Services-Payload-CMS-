import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

type Params = Promise<{ service: string; location: string; area: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service: serviceSlug, location: locationSlug, area: areaSlug } = await params
  const title = `${serviceSlug.replace(/-/g, ' ')} in ${areaSlug.replace(/-/g, ' ')}, ${locationSlug.replace(/-/g, ' ')}`

  try {
    const payload = await getPayload()
    const compositeSlug = `${serviceSlug}/${locationSlug}/${areaSlug}`

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
        openGraph: {
          title: page.seo.metaTitle,
          description: page.seo.metaDescription,
        },
        robots: page.seo.robotsMeta,
      }
    }

    return { title: title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }
  } catch {
    return { title }
  }
}

export default async function ServiceLocationAreaPage({ params }: { params: Params }) {
  const { service: serviceSlug, location: locationSlug, area: areaSlug } = await params

  try {
    const payload = await getPayload()
    const compositeSlug = `${serviceSlug}/${locationSlug}/${areaSlug}`

    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: compositeSlug }, status: { equals: 'published' } },
      limit: 1,
      depth: 3,
    })

    if (pages.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <RenderBlocks blocks={(pages.docs[0] as any).layout} />
    }

    // Build from service + area data
    const services = await payload.find({
      collection: 'services',
      where: { slug: { equals: serviceSlug } },
      limit: 1,
    })

    const areas = await payload.find({
      collection: 'locations',
      where: { slug: { equals: areaSlug }, type: { equals: 'area' } },
      limit: 1,
    })

    if (services.docs.length === 0 || areas.docs.length === 0) {
      notFound()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = services.docs[0] as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const area = areas.docs[0] as any

    return (
      <div>
        <section
          className="relative min-h-[50vh] flex items-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}
        >
          <div className="container-page text-white py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.title} in {area.name}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Looking for {service.title.toLowerCase()} in {area.name}?
              Our experienced lawyers provide dedicated legal services in your area.
            </p>
          </div>
        </section>
      </div>
    )
  } catch {
    notFound()
  }
}
