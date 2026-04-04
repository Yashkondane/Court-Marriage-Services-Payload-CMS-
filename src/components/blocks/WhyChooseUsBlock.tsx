"use client"
import React from 'react'
import { 
  FaPhoneAlt, FaChess, FaGavel, FaChartLine, 
  FaLaptop, FaCreditCard, FaShieldAlt, FaUsers 
} from 'react-icons/fa'

const IconMap: Record<string, React.ElementType> = {
  'phone': FaPhoneAlt,
  'strategy': FaChess,
  'gavel': FaGavel,
  'trending': FaChartLine,
  'laptop': FaLaptop,
  'payments': FaCreditCard,
  'shield': FaShieldAlt,
  'users': FaUsers,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function WhyChooseUsBlock({ block }: { block: any }) {
  const { heading, subheading, benefits, trustBadges } = block

  return (
    <section className="py-24 bg-[var(--color-surface)] overflow-hidden">
      <div className="container-page">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#111] mb-6 tracking-tight">
            {heading}
          </h2>
          <div className="w-20 h-1.5 bg-gold-gradient mx-auto mb-8 rounded-full" />
          {subheading && (
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Bento-Style Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {benefits?.map((benefit: any, index: number) => {
            const IconComponent = IconMap[benefit.icon] || FaGavel
            
            return (
              <div 
                key={index}
                className="bg-white border border-gray-100 p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group flex items-start gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-gold-gradient transition-all duration-500">
                    <IconComponent className="text-3xl text-[var(--color-secondary)] group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-black text-[#111] mb-4 group-hover:text-[var(--color-secondary)] transition-colors duration-500">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Badges Bar */}
        {trustBadges && trustBadges.length > 0 && (
          <div className="pt-12 border-t border-gray-100 flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {trustBadges.map((badge: any, index: number) => (
              <React.Fragment key={index}>
                <span className="font-heading font-black text-xs md:text-sm tracking-[0.2em] uppercase text-[#111]">
                  {badge.badgeText}
                </span>
                {index < trustBadges.length - 1 && (
                  <div className="hidden md:block h-4 w-px bg-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
