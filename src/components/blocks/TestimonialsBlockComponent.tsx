"use client"

import React, { useState, useEffect } from 'react'
import { FaUserCircle, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ImQuotesRight } from 'react-icons/im'
import { SectionTitle } from '@/components/ui/SectionTitle'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TestimonialsBlockComponent({ block }: { block: any }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testimonials = (block.testimonials || []).map((t: any) => ({
    quote: t.content || t.quote || '',
    name: t.name || t.author || 'Anonymous',
    role: t.designation || '',
    rating: t.rating || 5,
  }))

  const [activeIdx, setActiveIdx] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length)
  }

  // Auto-play for carousel layout (scrolls every 6 seconds)
  useEffect(() => {
    if (block.layout !== 'carousel' || testimonials.length <= 1) return
    const timer = setInterval(handleNext, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length, block.layout, activeIdx])

  // Swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    if (distance > minSwipeDistance) {
      handleNext()
    } else if (distance < -minSwipeDistance) {
      handlePrev()
    }
  }

  if (testimonials.length === 0) {
    return (
      <div className="section bg-[#fafafa]">
        <div className="container-page text-center py-10 bg-white rounded-md border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">Your client success stories will appear here.</p>
        </div>
      </div>
    )
  }

  const isCarousel = block.layout === 'carousel'

  return (
    <div className="section bg-[#fafafa] overflow-hidden">
      <div className="container-page">
        <SectionTitle
          title={block.heading || 'What Our Clients Say'}
          subtitle={block.description}
          centered={true}
        />

        {!isCarousel ? (
          /* ── GRID LAYOUT ───────────────────────────────────────────────── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((t: any, i: number) => (
              <div
                key={i}
                className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300 relative group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex text-[var(--color-secondary)] gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={idx < Math.round(t.rating) ? 'text-[var(--color-secondary)]' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                  <ImQuotesRight className="text-5xl text-gray-50 absolute top-6 right-6 group-hover:text-gray-100 transition-colors" />
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-8 flex-grow z-10 relative text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
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
          /* ── PREMIUM 3D COVERFLOW CAROUSEL LAYOUT ──────────────────────── */
          <div className="relative w-full max-w-5xl mx-auto mt-12 flex flex-col items-center select-none">
            
            {/* Carousel Container */}
            <div 
              className="relative w-full h-[370px] md:h-[400px] flex items-center justify-center overflow-hidden px-4"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {testimonials.map((t: any, idx: number) => {
                // Calculate relative offset with circular loop support
                let offset = idx - activeIdx
                const len = testimonials.length

                // Handle circular looping
                if (offset < -Math.floor(len / 2)) {
                  offset += len
                } else if (offset > Math.floor(len / 2)) {
                  offset -= len
                }

                // Handle special layouts when length is 2 to avoid single direction
                const isCenter = offset === 0
                const isLeft = offset === -1 || (len === 2 && activeIdx === 1 && idx === 0)
                const isRight = offset === 1 || (len === 2 && activeIdx === 0 && idx === 1)

                let posClass = 'opacity-0 scale-50 pointer-events-none'
                if (isCenter) {
                  posClass = 'carousel-card-center'
                } else if (isLeft) {
                  posClass = 'carousel-card-left'
                } else if (isRight) {
                  posClass = 'carousel-card-right'
                }

                return (
                  <div
                    key={idx}
                    className={`carousel-card ${posClass}`}
                    onClick={() => {
                      if (isLeft) handlePrev()
                      if (isRight) handleNext()
                    }}
                  >
                    {/* Stars + Quote Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex text-[var(--color-secondary)] gap-1">
                        {[...Array(5)].map((_, sIdx) => (
                          <FaStar
                            key={sIdx}
                            className={sIdx < Math.round(t.rating) ? 'text-[var(--color-secondary)]' : 'text-gray-200'}
                          />
                        ))}
                      </div>
                      <ImQuotesRight className={`text-4xl transition-colors duration-300 ${isCenter ? 'text-gray-100' : 'text-gray-50'}`} />
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-gray-700 leading-relaxed italic my-2 flex-grow text-[13px] md:text-[14.5px] overflow-y-auto pr-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author Details */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-gray-800 flex items-center justify-center text-white text-[13px] font-bold uppercase tracking-wider shadow-sm shrink-0">
                        {t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-[#111] text-[13.5px] tracking-wide truncate">{t.name}</div>
                        {t.role && (
                          <div className="text-[9.5px] text-gray-500 font-bold uppercase tracking-widest mt-0.5 truncate">
                            {t.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation buttons and Pagination dots */}
            {testimonials.length > 1 && (
              <div className="flex items-center gap-6 mt-4">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] transition-all active:scale-95 shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft className="text-xs" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {testimonials.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeIdx === idx ? 'bg-[var(--color-secondary)] w-6' : 'bg-gray-300 hover:bg-gray-400 w-2'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] transition-all active:scale-95 shadow-sm"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
