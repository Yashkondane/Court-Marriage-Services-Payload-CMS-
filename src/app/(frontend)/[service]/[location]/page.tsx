import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'
import { serializeLexical } from '@/lib/payload/lexical'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

type Params = Promise<{ service: string; location: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service: serviceSlug, location: locationSlug } = await params
  
  try {
    const payload = await getPayload()
    const compositeSlug = `${serviceSlug}/${locationSlug}`

    // 1. Priority: Check for custom Page
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: compositeSlug }, status: { equals: 'published' } },
      limit: 1,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = pages.docs[0] as any
    if (page?.seo?.metaTitle) {
      return {
        title: page.seo.metaTitle,
        description: page.seo.metaDescription,
        keywords: page.seo.keywords,
      }
    }

    // 2. Fallback: Localized Service data
    const [services, locations] = await Promise.all([
      payload.find({ collection: 'services', where: { slug: { equals: serviceSlug } }, limit: 1 }),
      payload.find({ collection: 'locations', where: { slug: { equals: locationSlug } }, limit: 1 })
    ])
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svc = services.docs[0] as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loc = locations.docs[0] as any
    
    if (svc && loc) {
      return { title: `${svc.title} in ${loc.name} | Legal Experts` }
    }
    
    return { title: `${serviceSlug.replace(/-/g, ' ')} in ${locationSlug.replace(/-/g, ' ')}` }
  } catch {
    return { title: 'Legal Services' }
  }
}

export default async function ServiceLocationPage({ params }: { params: Params }) {
  const { service: serviceSlug, location: locationSlug } = await params

  try {
    const payload = await getPayload()
    const compositeSlug = `${serviceSlug}/${locationSlug}`

    // 1. Try composite slug Page first (custom CMS design)
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: compositeSlug }, status: { equals: 'published' } },
      limit: 1,
      depth: 3, // For block media
    })

    if (pages.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <RenderBlocks blocks={(pages.docs[0] as any).layout} />
    }

    // 2. Fallback to Premium Localized Template (Service + Location data)
    const [services, locations] = await Promise.all([
      payload.find({ collection: 'services', where: { slug: { equals: serviceSlug } }, limit: 1, depth: 3 }),
      payload.find({ collection: 'locations', where: { slug: { equals: locationSlug } }, limit: 1 })
    ])

    if (services.docs.length === 0 || locations.docs.length === 0) {
      notFound()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = services.docs[0] as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const location = locations.docs[0] as any

    // Ensure service supports this location
    const isSupported = service.activeLocations?.some((loc: any) => 
      typeof loc === 'string' ? loc === location.id : loc?.id === location.id
    )

    if (!isSupported) {
      notFound()
    }

    return (
      <div className="bg-[var(--color-surface)] min-h-screen">
        {/* Dynamic Hero Section */}
        <section className="relative bg-[#0a0a0a] text-white py-20 md:py-32 overflow-hidden">
          {service.banner?.url && (
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.banner.url}
                alt={service.banner.alt || service.title}
                className="w-full h-full object-cover opacity-30 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>
          )}
          <div className="container-page relative z-10">
            <span className="text-[var(--color-secondary)] text-xs font-black tracking-[0.3em] uppercase block mb-4">
              Local Legal Expertise
            </span>
            <h1 className="text-4xl md:text-7xl font-heading font-black mb-6 leading-tight max-w-5xl tracking-tight text-white drop-shadow-2xl">
              {service.title} in <span className="text-[var(--color-secondary)]">{location.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-medium max-w-2xl">
              Connect with our Elite Legal Experts tailored for {location.name}. Swift, secure, and result-oriented.
            </p>
            <div className="w-24 h-1.5 bg-gold-gradient rounded-full" />
          </div>
        </section>
        
        {/* Main Content Section */}
        {service.content && (
          <section className="py-20 md:py-32 bg-white">
            <div className="container-page max-w-4xl mx-auto">
              <div className="prose prose-lg prose-slate max-w-none font-medium leading-loose text-gray-600">
                <div
                  dangerouslySetInnerHTML={{
                    __html: serializeLexical(service.content),
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Highlights Section */}
        {service.highlights && service.highlights.length > 0 && (
          <section className="py-24 bg-[var(--color-surface)] border-y border-gray-100">
            <div className="container-page max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="text-[var(--color-secondary)] text-xs font-black tracking-[0.3em] uppercase block mb-4">Why Choose Us</span>
                <h2 className="text-3xl md:text-5xl font-heading font-black mb-4 text-[#111] tracking-tight">
                  Expertise in {location.name}
                </h2>
                <div className="w-16 h-1.5 bg-gold-gradient mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {service.highlights.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                    <div className="mb-8 w-16 h-16 bg-amber-50 flex items-center justify-center rounded-xl group-hover:bg-gold-gradient transition-all duration-500">
                      {item.icon?.url ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.icon.url} alt={item.title} className="w-8 h-8 object-contain group-hover:invert transition-all" />
                        </>
                      ) : (
                        <span className="text-2xl font-black text-[var(--color-secondary)] group-hover:text-white">{idx + 1}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-heading font-black mb-4 text-[#111] tracking-tight group-hover:text-[var(--color-secondary)] transition-colors">{item.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    )
  } catch {
    notFound()
  }
}
