"use client"
import React, { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { 
  FaGavel, FaHandshake, FaBalanceScale, FaRegBuilding, 
  FaFileContract, FaShieldAlt, FaUserTie, FaUsers, 
  FaCalculator, FaHome, FaBriefcase, FaLandmark, 
  FaMoneyBillWave, FaBook, FaStamp, FaChevronLeft, FaChevronRight
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
  const [cardsPerView, setCardsPerView] = useState(4)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Filter items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validItems = (items || []).filter((item: any) => item.service && typeof item.service !== 'string')
  const baseCount = validItems.length
  
  if (baseCount === 0) return null

  // Create a triple-cloned array for seamless infinite looping
  // [Set 1 (Clones), Set 2 (Actual), Set 3 (Clones)]
  const loopItems = [...validItems, ...validItems, ...validItems]

  // Start in the middle set
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setCurrentIndex(baseCount)
  }, [baseCount])

  // Responsive cards per view
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) setCardsPerView(4)
      else if (window.innerWidth >= 1024) setCardsPerView(3)
      else if (window.innerWidth >= 640) setCardsPerView(2)
      else setCardsPerView(1)
    }
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const handleTransitionEnd = () => {
    setIsTransitioning(false)
    
    // Seamless jump
    if (currentIndex >= baseCount * 2) {
      // If we've reached the third set, jump back to the middle set
      setCurrentIndex(currentIndex - baseCount)
    } else if (currentIndex < baseCount) {
      // If we've reached the first set, jump forward to the middle set
      setCurrentIndex(currentIndex + baseCount)
    }
  }

  const scrollPrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const scrollNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [isTransitioning])

  // Auto play
  useEffect(() => {
    const timer = setInterval(scrollNext, 5000)
    return () => clearInterval(timer)
  }, [isTransitioning, scrollNext])

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(baseCount + index)
  }

  // The math: Move by one card width + one gap width per index
  // cardWidth = (100% - (cardsPerView - 1) * gap) / cardsPerView
  const trackStyle = {
    transform: `translateX(calc(-${currentIndex} * (100% + 1.25rem) / ${cardsPerView}))`,
    transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  }

  return (
    <section className="svc-carousel-section">
      <div className="container-page">
        {/* Section Heading */}
        <div className="svc-carousel-header">
          <SectionTitle title={heading || 'Our Legal Services'} centered={true} />
        </div>

        <div className="svc-carousel-wrapper">
          {/* Prev Button */}
          <button 
            onClick={scrollPrev}
            className="svc-carousel-nav svc-carousel-nav--prev"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          {/* Cards Track */}
          <div 
            className="svc-carousel-track" 
            style={trackStyle}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {loopItems.map((item: any, idx: number) => {
              const service = item.service
              const selectedIconKey = item.overrideIcon || service.uiIcon || 'gavel'
              const IconComponent = IconMap[selectedIconKey] || IconMap['gavel']
              const bgImageUrl = item.backgroundImage?.url || service.banner?.url || ''
              const highlights = (item.highlights && item.highlights.length > 0)
                ? item.highlights
                : (service.highlights || [])

              return (
                <div key={`${idx}`} className="svc-card">
                  {/* Card Background Image */}
                  <div className="svc-card-img">
                    {bgImageUrl ? (
                      <Image 
                        src={bgImageUrl}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="svc-card-img-placeholder" />
                    )}
                    <div className="svc-card-img-overlay" />
                  </div>

                  {/* Card Body */}
                  <div className="svc-card-body">
                    <div className="svc-card-icon-wrap">
                      <div className="svc-card-icon-ring">
                        <IconComponent className="svc-card-icon" />
                      </div>
                    </div>
                    <h3 className="svc-card-title">{service.title}</h3>
                    <ul className="svc-card-highlights">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {highlights.slice(0, 4).map((hl: any, i: number) => (
                        <li key={i} className="svc-card-highlight">
                          <span className="svc-card-bullet" />
                          <span>{hl.text || hl.title}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/${service.slug}`} className="svc-card-link">
                      Learn More <span className="svc-card-arrow">→</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Next Button */}
          <button 
            onClick={scrollNext}
            className="svc-carousel-nav svc-carousel-nav--next"
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="svc-carousel-dots">
          {validItems.map((_: unknown, i: number) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`svc-carousel-dot ${(currentIndex % baseCount) === i ? 'svc-carousel-dot--active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
