import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TestimonialsBlockComponent({ block }: { block: any }) {
  const testimonials = block.testimonials || []

  return (
    <div className="py-12 md:py-16 bg-white">
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
        <div
          className={
            block.layout === 'carousel'
              ? 'flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          }
        >
          {testimonials.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            testimonials.map((t: any, index: number) => (
              <div
                key={t.id || index}
                className={`bg-[var(--color-bg-primary)] rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-[var(--color-border)] ${
                  block.layout === 'carousel' ? 'min-w-[320px] snap-start flex-shrink-0' : ''
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < (t.rating || 5) ? 'text-[var(--color-secondary)]' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                  {t.photo?.url ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                      <Image
                        src={t.photo.url}
                        alt={t.photo.alt || t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-xl font-bold text-[var(--color-primary)] flex-shrink-0">
                      {t.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-[var(--color-primary)]">{t.name}</p>
                    {t.designation && (
                      <p className="text-xs text-[var(--color-text-secondary)]">{t.designation}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--color-text-secondary)]">
                Testimonials will appear here once added.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
