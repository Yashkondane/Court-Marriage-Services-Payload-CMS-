"use client"
import React from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'
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
    <section className="section bg-[var(--color-surface)] overflow-hidden">
      <div className="container-page">

        <SectionTitle title={heading} subtitle={subheading} centered={true} />

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {benefits?.map((benefit: any, index: number) => {
            const IconComponent = IconMap[benefit.icon] || FaGavel
            return (
              <div
                key={index}
                className="card group flex items-start gap-6"
              >
                <div className="card-icon-wrap shrink-0">
                  <IconComponent className="card-icon" />
                </div>
                <div>
                  <h3 className="card-heading group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="block-body">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Badges Bar */}
        {trustBadges && trustBadges.length > 0 && (
          <div className="pt-6 border-t border-gray-200 flex flex-wrap justify-center gap-8 md:gap-14 items-center">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {trustBadges.map((badge: any, index: number) => (
              <React.Fragment key={index}>
                <span className="font-heading font-black text-xs tracking-[0.2em] uppercase text-[#111]">
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
