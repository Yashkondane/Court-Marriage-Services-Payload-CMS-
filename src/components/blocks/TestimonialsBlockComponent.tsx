import React from 'react'
import CircularTestimonials from '@/components/ui/circular-testimonials'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TestimonialsBlockComponent({ block }: { block: any }) {
  const testimonials = (block.testimonials || []).map((t: any) => ({
    quote: t.content || t.quote || '',
    name: t.name || t.author || 'Anonymous',
    role: t.designation || '',
    img: t.photo?.url || '/placeholder-avatar.png',
    rating: t.rating || 5,
  }))

  return (
    <div className="py-20 md:py-28 bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
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

        {testimonials.length > 0 ? (
          <CircularTestimonials testimonials={testimonials} />
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">
              Your client success stories will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
