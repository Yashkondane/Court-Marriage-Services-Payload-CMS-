"use client"
import React, { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(4)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validItems = (items || []).filter((item: any) => item.service && typeof item.service !== 'string')
  const totalItems = validItems.length

  if (totalItems === 0) return null

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const scrollPrev = () => {
    const newIndex = currentIndex <= 0 ? totalItems - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const scrollNext = () => {
    const newIndex = currentIndex >= totalItems - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }

  // Auto play
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timer = setInterval(scrollNext, 5000)
    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isTransitioning])

  // Build the visible items array (infinite loop illusion)
  const getVisibleItems = () => {
    const visible = []
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % totalItems
      visible.push({ ...validItems[index], _displayIndex: index })
    }
    return visible
  }

  const visibleItems = getVisibleItems()

  return (
    <section className="svc-carousel-section">
      <div className="container-page">
        {/* Section Heading */}
        <div className="svc-carousel-header">
          <h2 className="svc-carousel-title">{heading || 'Our Legal Services'}</h2>
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
          <div className="svc-carousel-track" ref={trackRef}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {visibleItems.map((item: any, idx: number) => {
              const service = item.service
              // Use overrideIcon if set, otherwise fall back to service's uiIcon
              const selectedIconKey = item.overrideIcon || service.uiIcon || 'gavel'
              const IconComponent = IconMap[selectedIconKey] || IconMap['gavel']
              // Use item's backgroundImage if set, otherwise fall back to service banner
              const bgImageUrl = item.backgroundImage?.url || service.banner?.url || ''
              
              // Get highlights
              const highlights = (item.highlights && item.highlights.length > 0)
                ? item.highlights
                : (service.highlights || [])

              return (
                <div 
                  key={`${item._displayIndex}-${idx}`} 
                  className="svc-card"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
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
                    {/* Icon Circle - Positioned overlapping image and body */}
                    <div className="svc-card-icon-wrap">
                      <div className="svc-card-icon-ring">
                        <IconComponent className="svc-card-icon" />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="svc-card-title">{service.title}</h3>

                    {/* Highlights */}
                    <ul className="svc-card-highlights">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {highlights.slice(0, 4).map((hl: any, i: number) => (
                        <li key={i} className="svc-card-highlight">
                          <span className="svc-card-bullet" />
                          <span>{hl.text || hl.title}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More */}
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
              className={`svc-carousel-dot ${currentIndex === i ? 'svc-carousel-dot--active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
