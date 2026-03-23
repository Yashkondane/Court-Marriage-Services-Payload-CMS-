import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { serializeLexical } from '@/lib/payload/lexical'

type Params = Promise<{ service: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service: serviceSlug } = await params

  try {
    const payload = await getPayload()
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: serviceSlug } },
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
      }
    }

    const services = await payload.find({
      collection: 'services',
      where: { slug: { equals: serviceSlug } },
      limit: 1,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svc = services.docs[0] as any
    return { title: svc?.title || serviceSlug }
  } catch {
    return { title: serviceSlug }
  }
}

export default async function ServicePage({ params }: { params: Params }) {
  const { service: serviceSlug } = await params

  try {
    const payload = await getPayload()

    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: serviceSlug } },
      limit: 1,
      depth: 3,
    })

    if (pages.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const page = pages.docs[0] as any
      return <RenderBlocks blocks={page.layout} />
    }

    const services = await payload.find({
      collection: 'services',
      where: { slug: { equals: serviceSlug } },
      limit: 1,
      depth: 3,
    })

    if (services.docs.length === 0) notFound()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = services.docs[0] as any

    return (
      <div className="bg-white min-h-screen">
        <section className="relative bg-[var(--color-primary)] text-white py-20 md:py-32 overflow-hidden shadow-inner">
          {service.banner?.url && (
            <div className="absolute inset-0 z-0">
              <img
                src={service.banner.url}
                alt={service.banner.alt || service.title}
                className="w-full h-full object-cover opacity-30 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/70 to-transparent" />
            </div>
          )}
          <div className="container-page relative z-10">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 font-[var(--font-heading)] leading-tight max-w-5xl tracking-tight text-white drop-shadow-2xl">
              {service.title}
            </h1>
            <div className="w-24 h-2 bg-[var(--color-secondary)] rounded-full shadow-sm" />
          </div>
        </section>
        
        {service.content && (
          <section className="py-16 md:py-24">
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
          <section className="py-20 bg-slate-50 border-y border-slate-100">
            <div className="container-page max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-heading)] text-slate-900">Key Highlights</h2>
                <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.highlights.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-6 flex items-center justify-center w-16 h-16 bg-slate-50 text-[var(--color-primary)] rounded-xl border border-slate-100 shadow-inner overflow-hidden">
                      {item.icon?.url ? (
                        <img src={item.icon.url} alt={item.title} className="w-10 h-10 object-contain p-1" />
                      ) : (
                        <span className="text-2xl font-bold opacity-30">{idx + 1}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
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
