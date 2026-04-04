import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'
import { serializeLexical } from '@/lib/payload/lexical'

type Params = Promise<{ service: string, city: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service: serviceSlug, city: locationSlug } = await params
  try {
    const payload = await getPayload()
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
    return { title: `${serviceSlug} in ${locationSlug}` }
  } catch {
    return { title: `${serviceSlug} in ${locationSlug}` }
  }
}

export default async function ServiceCityPage({ params }: { params: Params }) {
  const { service: serviceSlug, city: locationSlug } = await params

  try {
    const payload = await getPayload()
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

    // Validate that the service explicitly supports this location
    const isSupported = service.supportedLocations?.some((loc: any) => 
      typeof loc === 'string' ? loc === location.id : loc?.id === location.id
    )

    if (!isSupported) {
      notFound()
    }

    return (
      <div className="bg-[var(--color-surface)] min-h-screen">
        <section className="relative bg-[var(--color-primary)] text-white py-20 md:py-32 overflow-hidden shadow-inner">
          {service.banner?.url && (
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.banner.url}
                alt={service.banner.alt || service.title}
                className="w-full h-full object-cover opacity-30 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-container)] via-[var(--color-primary)]/70 to-transparent" />
            </div>
          )}
          <div className="container-page relative z-10">
            {/* Dynamic Localized Title! */}
            <h1 className="text-4xl md:text-7xl font-bold mb-6 font-heading leading-tight max-w-5xl tracking-tight text-[var(--color-on-primary)] drop-shadow-2xl">
              {service.title} in {location.name}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-secondary)] mb-8 font-medium">
              Expert Legal Services Localized for {location.name}
            </p>
            <div className="w-24 h-2 bg-[var(--color-secondary)] rounded-full shadow-sm" />
          </div>
        </section>
        
        {service.content && (
          <section className="py-16 md:py-24 bg-[var(--color-surface)]">
            <div className="container-page max-w-4xl mx-auto rich-text prose prose-lg prose-slate max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: serializeLexical(service.content),
                }}
              />
            </div>
          </section>
        )}

        {service.highlights && service.highlights.length > 0 && (
          <section className="py-20 bg-[var(--color-surface-container-low)] border-y border-[var(--color-outline-variant)]">
            <div className="container-page max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-[var(--color-on-surface)]">
                  Key Highlights in {location.name}
                </h2>
                <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {service.highlights.map((item: any, idx: number) => (
                  <div key={idx} className="bg-[var(--color-surface-container-lowest)] p-8 rounded-xl shadow-sm border border-[var(--color-outline-variant)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-6 flex items-center justify-center w-16 h-16 bg-[var(--color-surface-container)] text-[var(--color-primary)] rounded-xl overflow-hidden">
                      {item.icon?.url ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.icon.url} alt={item.title} className="w-10 h-10 object-contain p-1" />
                        </>
                      ) : (
                        <span className="text-2xl font-bold opacity-30">{idx + 1}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-on-surface)] tracking-tight">{item.title}</h3>
                    <p className="text-[var(--color-on-surface-variant)] leading-relaxed text-sm">{item.description}</p>
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
