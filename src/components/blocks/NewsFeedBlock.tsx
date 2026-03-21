import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NewsFeedBlock({ block }: { block: any }) {
  const news = block.selectedNews || []

  const layoutMap: Record<string, string> = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    list: 'space-y-6',
    carousel: 'flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4',
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container-page">
        {block.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {block.heading}
          </h2>
        )}
        <div className={layoutMap[block.layout] || layoutMap.grid}>
          {news.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            news.map((item: any, index: number) => (
              <article
                key={item.id || index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  {item.featuredImage?.url ? (
                    <Image
                      src={item.featuredImage.url}
                      alt={item.featuredImage.alt || item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[var(--color-primary)]/10 flex items-center justify-center text-4xl">
                      📰
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {item.publishedDate && (
                    <span className="text-xs text-[var(--color-text-secondary)] mb-2 block">
                      {new Date(item.publishedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  {item.excerpt && (
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--color-text-secondary)]">
                News updates will appear here once published.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
