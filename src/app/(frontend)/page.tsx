import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload/getPayload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload()
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' }, status: { equals: 'published' } },
      limit: 1,
    })

    const page = pages.docs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seo = (page as any)?.seo

    if (seo) {
      return {
        title: seo.metaTitle || 'Court Marriage Services | Expert Legal Services',
        description: seo.metaDescription || 'Trusted legal services across India.',
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
    // DB not connected yet — use defaults
  }

  return {
    title: 'Court Marriage Services | Expert Legal Services',
    description:
      'Trusted legal consultants providing court marriage, property law, family law, and corporate law services across India.',
  }
}

export default async function HomePage() {
  let page = null

  try {
    const payload = await getPayload()
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' }, status: { equals: 'published' } },
      limit: 1,
      depth: 3,
    })
    page = pages.docs[0]
  } catch {
    // DB not connected yet
  }

  if (!page) {
    return (
      <div>
        {/* Fallback hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
          <div className="container-page text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up font-[var(--font-heading)]">
              Expert Legal Services<br />Across India
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Trusted advocates for court marriage, property disputes, family law, criminal defense, and corporate matters.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/consultation" className="btn btn-secondary">Book Free Consultation</a>
              <a href="/services" className="btn btn-outline border-white text-white hover:bg-white hover:text-[var(--color-primary)]">Our Services</a>
            </div>
          </div>
        </section>

        {/* Fallback highlights */}
        <section className="py-16">
          <div className="container-page">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Court Marriage Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '⚖️', title: '25+ Years Experience', desc: 'Decades of legal expertise serving thousands of clients across India.' },
                { icon: '🏛️', title: 'Pan-India Presence', desc: 'Legal services available in major cities with local court expertise.' },
                { icon: '🤝', title: '98% Success Rate', desc: 'Proven track record with highest client satisfaction in legal services.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-all border border-[var(--color-border)]">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{item.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-primary)] text-white py-16">
          <div className="container-page text-center">
            <h2 className="text-3xl font-bold mb-4">Need Legal Assistance?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">Get expert legal counsel for your case. Our team is ready to help.</p>
            <a href="tel:+919650515469" className="btn btn-secondary">Call Now: +91 96505 15469</a>
          </div>
        </section>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RenderBlocks blocks={(page as any).layout} />
}
