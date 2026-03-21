import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload/getPayload'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest legal insights, articles, and updates from Kaushal Associates.',
}

export const dynamic = 'force-dynamic'

export default async function BlogListPage() {
  let blogs: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'blogs',
      where: { status: { equals: 'published' } },
      sort: '-publishedDate',
      limit: 20,
      depth: 2,
    })
    blogs = result.docs
  } catch {
    // DB not connected
  }

  return (
    <div>
      <section className="bg-[var(--color-primary)] text-white py-16">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Blog</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Expert insights, legal updates, and helpful articles from our team.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <article key={blog.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                  <div className="relative aspect-video overflow-hidden">
                    {blog.featuredImage?.url ? (
                      <Image
                        src={blog.featuredImage.url}
                        alt={blog.featuredImage.alt || blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--color-primary)]/10 flex items-center justify-center text-4xl">📝</div>
                    )}
                  </div>
                  <div className="p-6">
                    {blog.publishedDate && (
                      <span className="text-xs text-[var(--color-text-secondary)] mb-2 block">
                        {new Date(blog.publishedDate).toLocaleDateString('en-IN')}
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    {blog.excerpt && <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">{blog.excerpt}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[var(--color-text-secondary)]">Blog posts coming soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
