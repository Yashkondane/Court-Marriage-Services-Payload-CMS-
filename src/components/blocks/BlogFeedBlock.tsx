import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogFeedBlock({ block }: { block: any }) {
  // In production, this would fetch blogs based on block.source
  // For now, render selected blogs or show a placeholder
  const blogs = block.selectedBlogs || []

  const layoutMap: Record<string, string> = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    list: 'space-y-6',
    carousel: 'flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4',
  }

  return (
    <div className="py-12 md:py-16 bg-[var(--color-bg-primary)]">
      <div className="container-page">
        {block.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {block.heading}
          </h2>
        )}
        <div className={layoutMap[block.layout] || layoutMap.grid}>
          {blogs.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            blogs.map((blog: any, index: number) => (
              <BlogCard key={blog.id || index} blog={blog} layout={block.layout} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--color-text-secondary)]">
                Blog posts will appear here once published.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BlogCard({ blog, layout }: { blog: any; layout: string }) {
  const isCarousel = layout === 'carousel'
  const isList = layout === 'list'

  return (
    <article
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${
        isCarousel ? 'min-w-[320px] snap-start flex-shrink-0' : ''
      } ${isList ? 'flex gap-6' : ''}`}
    >
      <div className={`relative overflow-hidden ${isList ? 'w-48 flex-shrink-0' : 'aspect-video'}`}>
        {blog.featuredImage?.url ? (
          <Image
            src={blog.featuredImage.url}
            alt={blog.featuredImage.alt || blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-primary)]/10 flex items-center justify-center text-4xl">
            📝
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {blog.categories?.[0]?.category && (
            <span className="text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-wider">
              {blog.categories[0].category}
            </span>
          )}
          {blog.publishedDate && (
            <span className="text-xs text-[var(--color-text-secondary)]">
              {new Date(blog.publishedDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>
        {blog.excerpt && (
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{blog.excerpt}</p>
        )}
      </div>
    </article>
  )
}
