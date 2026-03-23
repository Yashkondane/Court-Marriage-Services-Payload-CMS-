import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TestimonialsBlockComponent({ block }: { block: any }) {
  const testimonials = block.testimonials || []

  return (
    <div className="py-20 md:py-28 bg-[var(--color-bg-primary)]">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 block">
            Client Success
          </span>
          {block.heading && (
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a365d]">
              {block.heading}
            </h2>
          )}
          {block.description && (
            <p className="text-lg text-[var(--color-text-secondary)]">
              {block.description}
            </p>
          )}
        </div>

        <div
          className={
            block.layout === 'carousel'
              ? 'flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
          }
        >
          {testimonials.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            testimonials.map((t: any, index: number) => (
              <div
                key={t.id || index}
                className={`relative bg-white rounded-2xl p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col ${
                  block.layout === 'carousel' ? 'min-w-[380px] snap-start flex-shrink-0' : ''
                }`}
              >
                {/* Decorative Quote Mark */}
                <div className="absolute top-6 right-8 text-amber-100 select-none">
                  <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2 0C5.90805 0 0 5.64516 0 12.6C0 19.5548 4.2931 22.8871 8.7931 22.8871C6.2069 28.3226 2.48276 31.5806 0 33.7581L4.13793 40.2822C9.51724 35.5645 15.7241 27.5887 17.5862 17.6774C18.4138 13.3226 18.2069 0 13.2 0ZM52.2 0C44.9081 0 39 5.64516 39 12.6C39 19.5548 43.2931 22.8871 47.7931 22.8871C45.2069 28.3226 41.4828 31.5806 39 33.7581L43.1379 40.2822C48.5172 35.5645 54.7241 27.5887 56.5862 17.6774C57.4138 13.3226 57.2069 0 52.2 0Z" />
                  </svg>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < (t.rating || 5) ? 'text-amber-500' : 'text-slate-200'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-[var(--color-primary)] text-xl font-medium leading-[1.6] mb-8 font-heading flex-grow relative z-10">
                  {t.content}
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-slate-50 mt-auto">
                  {t.photo?.url ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden relative flex-shrink-0 ring-4 ring-slate-50">
                      <Image
                        src={t.photo.url}
                        alt={t.photo.alt || t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-[#1a365d] flex-shrink-0 ring-4 ring-slate-50">
                      {t.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#1a365d] text-lg">{t.name}</p>
                    {t.designation && (
                      <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">{t.designation}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-lg">
                Your client success stories will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
