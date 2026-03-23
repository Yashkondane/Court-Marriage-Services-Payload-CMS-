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
      collection: 'blogs',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blog = result.docs[0] as any
    if (!blog) return { title: slug }

    const seo = blog.seo
    return {
      title: seo?.metaTitle || blog.title,
      description: seo?.metaDescription || blog.excerpt,
      openGraph: {
        title: seo?.metaTitle || blog.title,
        description: seo?.metaDescription || blog.excerpt,
        images: (seo?.ogImage?.url || blog.featuredImage?.url)
          ? [{ url: seo?.ogImage?.url || blog.featuredImage?.url }]
          : [],
        type: 'article',
      },
      robots: seo?.robotsMeta,
    }
  } catch {
    return { title: slug }
  }
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'blogs',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
      depth: 3,
    })

    if (result.docs.length === 0) notFound()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blog = result.docs[0] as any

    return (
      <article className="bg-white min-h-screen">
        <section className="bg-[var(--color-primary)] text-white py-16 md:py-24">
          <div className="container-page max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              {blog.categories?.[0]?.category && (
                <span className="text-sm bg-[var(--color-secondary)] text-[var(--color-primary-dark)] px-3 py-1 rounded font-bold uppercase tracking-wider">
                  {blog.categories[0].category}
                </span>
              )}
              {blog.publishedDate && (
                <span className="text-sm text-white/70">
                  {new Date(blog.publishedDate).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-[var(--font-heading)] leading-tight">{blog.title}</h1>
            {blog.excerpt && (
              <p className="text-xl text-white/80 max-w-3xl leading-relaxed">{blog.excerpt}</p>
            )}
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container-page max-w-4xl mx-auto rich-text prose prose-lg prose-slate prose-headings:font-[var(--font-heading)]">
            {blog.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: serializeLexical(blog.content),
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
