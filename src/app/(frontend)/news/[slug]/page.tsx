import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload/getPayload'

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
      <article>
        <section className="bg-[var(--color-primary)] text-white py-16">
          <div className="container-page max-w-4xl mx-auto">
            {item.publishedDate && (
              <span className="text-sm text-white/60 mb-3 block">
                {new Date(item.publishedDate).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h1>
            {item.excerpt && (
              <p className="text-lg text-white/80 max-w-3xl">{item.excerpt}</p>
            )}
          </div>
        </section>
        <section className="py-12">
          <div className="container-page max-w-4xl mx-auto rich-text">
            <p>News content rendered here via Lexical.</p>
          </div>
        </section>
      </article>
    )
  } catch {
    notFound()
  }
}
