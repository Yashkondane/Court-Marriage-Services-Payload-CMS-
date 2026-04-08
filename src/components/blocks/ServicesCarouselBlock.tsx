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
  
  // Filter items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validItems = (items || []).filter((item: any) => item.service && typeof item.service !== 'string')
  const totalItems = validItems.length
  
  const [cardsPerView, setCardsPerView] = useState(4)
  const [currentIndex, setCurrentIndex] = useState(0) // Logic index (0 to totalItems - 1)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [displayIndex, setDisplayIndex] = useState(0) // The actual index for the track transform
  
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

  // For infinite loop, we clone cardsPerView items at BOTH ends
  // We want the initial position to be showing the first real item
  // After initial load, we start at transform = - (cardsPerView * cardWidth)
  useEffect(() => {
    setDisplayIndex(currentIndex)
  }, [currentIndex])

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1))
  }

  const scrollNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= totalItems - 1 ? 0 : prev + 1))
  }, [totalItems])

  // Auto play
  useEffect(() => {
    const timer = setInterval(scrollNext, 5000)
    return () => clearInterval(timer)
  }, [scrollNext])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Calculate the transform percentage
  // Each card width is 100% / cardsPerView
  // Gap is 1.25rem
  const transformX = -(currentIndex * (100 / cardsPerView))
  
  // However, because we have a gap, it's better to use a simple calc-based translation
  // Or just translate by 100% / cardsPerView per item
  // The gap is handled by the flex container gap property.
  // The transform should be: -(index * (card_width + gap_offset))
  // In our CSS, card width is calc((100% - gap_total) / cards_per_view)
  // So movement is exactly index * (100% + gap) / cards_per_view ... NO.
  // Simplify: movement is (currentIndex * (100% / cardsPerView)) + (currentIndex * gap / cardsPerView)
  
  const trackStyle = {
    transform: `translateX(calc(-${currentIndex} * (100% + 1.25rem) / ${cardsPerView}))`,
  }

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
          <div className="svc-carousel-track" style={trackStyle}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {validItems.map((item: any, idx: number) => {
              const service = item.service
              const selectedIconKey = item.overrideIcon || service.uiIcon || 'gavel'
              const IconComponent = IconMap[selectedIconKey] || IconMap['gavel']
              const bgImageUrl = item.backgroundImage?.url || service.banner?.url || ''
              const highlights = (item.highlights && item.highlights.length > 0)
                ? item.highlights
                : (service.highlights || [])

              return (
                <div key={idx} className="svc-card">
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
              className={`svc-carousel-dot ${currentIndex === i ? 'svc-carousel-dot--active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
