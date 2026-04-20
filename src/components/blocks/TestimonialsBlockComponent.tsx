import React from 'react'
import { FaUserCircle, FaStar } from 'react-icons/fa'
import { ImQuotesRight } from 'react-icons/im'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TestimonialsBlockComponent({ block }: { block: any }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testimonials = (block.testimonials || []).map((t: any) => ({
    quote: t.content || t.quote || '',
    name: t.name || t.author || 'Anonymous',
    role: t.designation || '',
    rating: t.rating || 5,
  }))

  return (
    <div className="py-20 md:py-28 bg-[#fafafa] overflow-hidden">
      <div className="container-page px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {block.heading && (
            <div className="relative inline-block mb-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#111]">
                {block.heading}
              </h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-secondary)]" />
            </div>
          )}
          {block.description && (
            <p className="text-lg text-gray-600 mt-6 leading-relaxed">
              {block.description}
            </p>
          )}
        </div>

        {/* Grid */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {testimonials.map((t: any, i: number) => (
              <div
                key={i}
                className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300 relative group"
              >
                {/* Stars + quote icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex text-[var(--color-secondary)] gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={
                          idx < Math.round(t.rating)
                            ? 'text-[var(--color-secondary)]'
                            : 'text-gray-200'
                        }
                      />
                    ))}
                  </div>
                  <ImQuotesRight className="text-5xl text-gray-50 absolute top-6 right-6 group-hover:text-gray-100 transition-colors" />
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed italic mb-8 flex-grow z-10 relative text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 z-10 relative">
                  <FaUserCircle className="text-4xl text-gray-800" />
                  <div>
                    <div className="font-bold text-[#111] text-sm tracking-wide">{t.name}</div>
                    {t.role && (
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                        {t.role}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-md border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">
              Your client success stories will appear here.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
