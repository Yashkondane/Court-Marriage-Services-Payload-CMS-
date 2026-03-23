import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'
import { serializeLexical } from '@/lib/payload/lexical'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = result.docs[0] as any
    if (!item) return { title: slug }
    return {
      title: item.seo?.metaTitle || item.title,
      description: item.seo?.metaDescription || item.excerpt,
      openGraph: {
        title: item.seo?.metaTitle || item.title,
        description: item.seo?.metaDescription || item.excerpt,
        type: 'article',
      },
    }
  } catch {
    return { title: slug }
  }
}

export default async function NewsDetailPage({ params }: { params: Params }) {
  const { slug } = await params

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
      depth: 3,
    })

    if (result.docs.length === 0) notFound()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = result.docs[0] as any

    return (
      <article className="bg-white min-h-screen">
        <section className="bg-[var(--color-primary)] text-white py-16 md:py-24 border-b-4 border-[var(--color-secondary)]">
          <div className="container-page max-w-4xl mx-auto">
            {item.publishedDate && (
              <span className="text-sm text-[var(--color-secondary-light)] mb-4 block font-medium uppercase tracking-widest">
                NEWS • {new Date(item.publishedDate).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-[var(--font-heading)] leading-tight">{item.title}</h1>
            {item.excerpt && (
              <p className="text-xl text-white/80 max-w-3xl leading-relaxed">{item.excerpt}</p>
            )}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-page max-w-4xl mx-auto rich-text prose prose-lg prose-slate prose-headings:font-[var(--font-heading)]">
            {item.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: serializeLexical(item.content),
                }}
              />
            )}
          </div>
        </section>
      </article>
    )
  } catch {
    notFound()
  }
}
