"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaGavel, FaHandshake, FaBalanceScale, FaRegBuilding, 
  FaFileContract, FaShieldAlt, FaUserTie, FaUsers, 
  FaCalculator, FaHome, FaBriefcase, FaLandmark, 
  FaMoneyBillWave, FaBook, FaStamp 
} from 'react-icons/fa'

const IconMap: Record<string, React.ElementType> = {
  'gavel': FaGavel,
  'handshake': FaHandshake,
  'scale': FaBalanceScale,
  'building': FaRegBuilding,
  'file-contract': FaFileContract,
  'shield': FaShieldAlt,
  'user-tie': FaUserTie,
  'users': FaUsers,
  'calculator': FaCalculator,
  'home': FaHome,
  'briefcase': FaBriefcase,
  'landmark': FaLandmark,
  'money-bill': FaMoneyBillWave,
  'book': FaBook,
  'stamp': FaStamp,
}

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

  // Auto-scroll effect or arrow clicks
  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' })
    }
  }

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-page relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] tracking-tight">{heading || 'Our Legal Services'}</h2>
        </div>

        <div className="relative group px-4 md:px-0 mt-8">
          {/* Navigation Buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:scale-105 transition-all opacity-0 group-hover:opacity-100 md:-left-7"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={scrollNext}
            className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:scale-105 transition-all opacity-0 group-hover:opacity-100 md:-right-7"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal scroll container with snap */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 hide-scrollbar scroll-smooth px-2"
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {items.map((item: any, index: number) => {
              const service = item.service
              if (!service || typeof service === 'string') return null

              const selectedIconKey = service.uiIcon || 'gavel'
              const IconComponent = IconMap[selectedIconKey] || IconMap['gavel']
              
              // Fallback image if no banner exists
              const bgImageUrl = service.banner?.url || '/fallback-law.jpg'

              return (
                <div 
                  key={item.id || index} 
                  className="snap-center shrink-0 w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white rounded-md flex flex-col border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group/card overflow-hidden"
                >
                  {/* Top Header Image */}
                  <div className="w-full h-40 relative bg-gray-100">
                    <Image 
                      src={bgImageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/0 transition-colors" />
                  </div>

                  {/* Body Wrapper */}
                  <div className="pt-10 pb-8 px-6 flex flex-col flex-grow relative">
                    
                    {/* Overlapping Icon Circle */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm">
                      <div className="w-full h-full rounded-full border border-[var(--color-secondary)] flex items-center justify-center bg-white">
                        <IconComponent className="w-7 h-7 text-[var(--color-secondary)]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-extrabold mb-4 text-center text-[#111]">
                      {service.title}
                    </h3>

                    {/* Highlights List */}
                    <ul className="w-full space-y-2 mb-8 flex-grow">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(item.highlights && item.highlights.length > 0 ? item.highlights : (service.highlights || [])).slice(0, 4).map((hl: any, i: number) => (
                        <li key={i} className="flex items-start text-[14px] text-gray-600 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] mt-1.5 shrink-0 mr-2" />
                          <span className="leading-snug">{hl.text || hl.title}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Footer Link */}
                    <Link 
                      href={`/${service.slug}`}
                      className="mt-auto block text-center font-bold text-[#111] hover:text-[var(--color-secondary)] group/btn transition-colors text-sm uppercase tracking-wider"
                    >
                      Learn More 
                      <span className="inline-block transition-transform group-hover/btn:translate-x-1 ml-1">➔</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {items.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => {
                  if (scrollRef.current) {
                    const width = scrollRef.current.clientWidth
                    scrollRef.current.scrollTo({ left: i * width, behavior: 'smooth' })
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'bg-[#111] w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
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
