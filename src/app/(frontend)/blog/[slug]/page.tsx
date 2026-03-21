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
      <article>
        <section className="bg-[var(--color-primary)] text-white py-16">
          <div className="container-page max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              {blog.categories?.[0]?.category && (
                <span className="text-sm text-[var(--color-secondary)] font-semibold uppercase">
                  {blog.categories[0].category}
                </span>
              )}
              {blog.publishedDate && (
                <span className="text-sm text-white/60">
                  {new Date(blog.publishedDate).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            {blog.excerpt && (
              <p className="text-lg text-white/80 max-w-3xl">{blog.excerpt}</p>
            )}
          </div>
        </section>
        <section className="py-12">
          <div className="container-page max-w-4xl mx-auto rich-text">
            <p>Blog content rendered here via Lexical.</p>
          </div>
        </section>
      </article>
    )
  } catch {
    notFound()
  }
}
