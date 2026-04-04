"use client"
import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaMapMarkerAlt, FaClock, FaCheckCircle, FaAward } from 'react-icons/fa'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LawyersCarouselBlock({ block }: { block: any }) {
  const { heading, lawyers, autoplay = true, interval = 5000 } = block
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const items = lawyers || []
  if (items.length === 0) return null

  // Infinite loop logic: we basically want to scroll to the next one
  // If we reach the end, we go back to index 0
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  useEffect(() => {
    if (autoplay && !isPaused) {
      const timer = setInterval(() => {
        nextSlide()
      }, interval)
      return () => clearInterval(timer)
    }
  }, [autoplay, interval, isPaused, nextSlide])

  // Scroll to active index
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const cardWidth = container.querySelector('.lawyer-card')?.clientWidth || 0
      const gap = 24 // gap-6
      container.scrollTo({
        left: activeIndex * (cardWidth + gap),
        behavior: 'smooth'
      })
    }
  }, [activeIndex])

  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#111] tracking-tight border-b-4 border-[var(--color-secondary)] inline-block pb-2">
            {heading}
          </h2>
        </div>

        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden transition-all duration-700 ease-in-out px-4 md:px-0"
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {items.map((lawyer: any, index: number) => {
              // Handle relationship data
              const data = typeof lawyer === 'object' ? lawyer : {}
              const { name, photo, isSponsored, isPremiumPartner, rating, ratingCount, locationText, experience, specializations, responseTime } = data
              
              return (
                <div 
                  key={data.id || index}
                  className="lawyer-card shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group/card p-8 flex flex-col items-center text-center"
                >
                  {/* Sponsored Badge */}
                  {isSponsored && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200">
                        Sponsored
                      </span>
                    </div>
                  )}

                  {/* Profile Image Wrapper */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner relative z-0">
                      <Image 
                        src={photo?.url || '/fallback-lawyer.jpg'} 
                        alt={name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Verification Badge */}
                    <div className="absolute bottom-2 right-2 z-10 bg-white rounded-full p-0.5">
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-heading font-black text-[#111]">Adv. {name}</h3>
                    {isPremiumPartner && (
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200">
                        <FaStar className="text-xs" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Premium Partner</span>
                      </div>
                    )}
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(rating || 5) ? 'fill-current' : 'text-gray-200'} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-500">{ratingCount || 0}+ user ratings</span>
                  </div>

                  {/* Info Grid */}
                  <div className="w-full text-left space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <FaAward className="text-sm" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{experience || 0} Years Experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <FaMapMarkerAlt className="text-sm" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">{locationText || 'India'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <FaBalanceScale className="text-sm" />
                      </div>
                      <p className="text-sm font-medium text-gray-500 line-clamp-1">
                        {specializations?.map((s: any) => s.specialization).join(', ') || 'General Law'}
                        <span className="text-[var(--color-secondary)] font-bold ml-1">, +more</span>
                      </p>
                    </div>
                  </div>

                  {/* Response Time Badge */}
                  <div className="mb-8 w-full">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50/50 rounded-full border border-amber-100 text-amber-800">
                      <FaClock className="text-sm opacity-60" />
                      <span className="text-[11px] font-black uppercase tracking-wider">{responseTime || 'Typically responds in 1 hour'}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={`/lawyer/${data.slug || ''}`}
                    className="btn-gold w-full py-4 text-center rounded-lg text-sm font-black active:scale-[0.98] transition-transform"
                  >
                    View Profile
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] transition-all md:-left-6 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)] transition-all md:-right-6 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {items.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'bg-[var(--color-secondary)] w-10' : 'bg-gray-200 w-2.5 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Icon for the grid view
function FaBalanceScale({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.501 3.501 0 0113 16a3.5 3.5 0 01-4.718-2.618l-.963-.482a1 1 0 01-.447-1.342l1.638-3.276-1.51-.604V18a1 1 0 11-2 0V7.618l-1.51.604 1.638 3.276a1 1 0 01-.447 1.342l-.963.482A3.5 3.5 0 013 16a3.501 3.501 0 01-4.718-2.618a1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L13 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  )
}
