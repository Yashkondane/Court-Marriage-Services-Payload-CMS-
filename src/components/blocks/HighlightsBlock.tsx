import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HighlightsBlock({ block }: { block: any }) {
  const items = block.items || []
  const columns = block.columns || '3'

  const gridCols: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container-page">
        {block.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {block.heading}
          </h2>
        )}
        {block.description && (
          <p className="text-center text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            {block.description}
          </p>
        )}
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {items.map((item: any, index: number) => (
            <div
              key={item.id || index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-[var(--color-border)] hover:border-[var(--color-secondary)]/30 group"
            >
              {item.icon?.url && (
                <div className="w-12 h-12 mb-6 relative rounded-lg overflow-hidden bg-[var(--color-primary)]/5 group-hover:bg-[var(--color-secondary)]/10 transition-colors">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt || item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {!item.icon?.url && (
                <div className="w-12 h-12 mb-6 rounded-lg bg-[var(--color-primary)]/5 flex items-center justify-center text-xl group-hover:bg-[var(--color-secondary)]/10 transition-colors">
                  ⚖️
                </div>
              )}
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-primary-light)] transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
