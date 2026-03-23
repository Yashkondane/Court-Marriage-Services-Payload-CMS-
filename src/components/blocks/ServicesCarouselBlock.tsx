"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ServicesCarouselBlock({ block }: { block: any }) {
  const { heading, items } = block
  const [activeIndex, setActiveIndex] = React.useState(0)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  if (!items || items.length === 0) return null

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const index = Math.round(scrollLeft / clientWidth)
      setActiveIndex(index)
    }
  }

  return (
    <section className="py-20 bg-gray-50/50 overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{heading}</h2>
        </div>

        <div className="relative group px-4 md:px-0">
          {/* Navigation Buttons */}
          <button 
            onClick={() => {
              if (scrollRef.current) {
                const width = scrollRef.current.clientWidth
                scrollRef.current.scrollBy({ left: -width, behavior: 'smooth' })
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 md:-left-6"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={() => {
              if (scrollRef.current) {
                const width = scrollRef.current.clientWidth
                scrollRef.current.scrollBy({ left: width, behavior: 'smooth' })
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 md:-right-6"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal scroll container with snap */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 hide-scrollbar scroll-smooth"
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {items.map((item: any, index: number) => {
              const service = item.service
              if (!service || typeof service === 'string') return null

              const displayIcon = item.customIcon || service.icon

              return (
                <div 
                  key={item.id || index} 
                  className="snap-center shrink-0 w-full md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)] bg-[#1a365d] rounded-[2.5rem] p-10 flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group/card"
                >
                  {/* Icon Circle */}
                  <div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-8 group-hover/card:scale-110 group-hover/card:bg-white/20 transition-all duration-300 overflow-hidden">
                    <div className="w-28 h-28 flex items-center justify-center relative">
                      {displayIcon?.url ? (
                        <Image 
                          src={displayIcon.url} 
                          alt={displayIcon.alt || service.title} 
                          fill
                          className="object-contain rounded-full"
                        />
                      ) : (
                        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-2xl font-extrabold mb-8 text-center leading-tight uppercase tracking-widest"
                    style={{ color: '#c7a84b' }}
                  >
                    {service.title}
                  </h3>

                  {/* Highlights List - Custom or Default */}
                  <ul className="w-full space-y-4 mb-10 flex-grow">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(item.highlights && item.highlights.length > 0 ? item.highlights : (service.highlights || [])).slice(0, 4).map((hl: any, i: number) => (
                      <li key={i} className="flex items-start text-[15px] text-white/90 font-bold">
                        <span className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-3 shrink-0 shadow-sm">
                          <svg className="w-3.5 h-3.5 text-[#c7a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="leading-tight">{hl.text || hl.title}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link 
                    href={`/${service.slug}`}
                    className="mt-auto px-10 py-3 bg-white rounded-xl text-[#1a365d] font-extrabold hover:bg-[#f8f6f0] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group/btn"
                  >
                    Read More 
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => {
                  if (scrollRef.current) {
                    const width = scrollRef.current.clientWidth
                    scrollRef.current.scrollTo({ left: i * width, behavior: 'smooth' })
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'bg-slate-400 w-6' : 'bg-slate-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  )
}
