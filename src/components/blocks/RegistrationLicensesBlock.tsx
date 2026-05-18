"use client"
import React from 'react'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { 
  FaWallet, FaRegBuilding, FaUtensils, FaBriefcase, 
  FaGlobe, FaCertificate, FaCrown, FaFileContract,
  FaShieldAlt, FaGavel, FaBolt
} from 'react-icons/fa'

const IconMap: Record<string, React.ElementType> = {
  'wallet': FaWallet,
  'corporate': FaRegBuilding,
  'restaurant': FaUtensils,
  'business': FaBriefcase,
  'public': FaGlobe,
  'verified': FaCertificate,
  'premium': FaCrown,
  'policy': FaFileContract,
  'shield': FaShieldAlt,
  'gavel': FaGavel,
  'speed': FaBolt,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RegistrationLicensesBlock({ block }: { block: any }) {
  const { badge, heading, subheading, cards, ctaSection } = block

  return (
    <section className="section bg-[var(--color-surface)] overflow-hidden">
      <div className="container-page px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          {badge && (
            <div className="inline-block px-4 py-1.5 mb-6 bg-white border border-gray-200 text-[10px] font-black tracking-[0.2em] uppercase text-[#111] rounded-sm shadow-sm">
              {badge}
            </div>
          )}
          <SectionTitle 
            title={heading} 
            subtitle={subheading} 
            centered={true} 
            className="md:items-center"
          />
        </div>

        {/* Square Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {cards?.map((card: any, index: number) => {
            const IconComponent = IconMap[card.icon] || FaFileContract
            const CardContent = (
              <div className="h-full w-full p-8 flex flex-col items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-[#fdf8ed] border border-[var(--color-secondary)]/20 flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:border-[var(--color-secondary)] transition-all duration-500">
                  <IconComponent className="text-2xl text-[var(--color-secondary)] group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-black text-[#111] mb-2 group-hover:text-[var(--color-secondary)] transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {card.description}
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-secondary)] group-hover:underline underline-offset-4 transition-all duration-300">
                    Know More →
                  </span>
                </div>
              </div>
            )

            const cardClasses = "group bg-white border border-[var(--color-secondary)]/30 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-secondary)]/10 aspect-square overflow-hidden"

            if (card.link) {
              return (
                <Link key={index} href={card.link} className={cardClasses}>
                  {CardContent}
                </Link>
              )
            }

            return (
              <div key={index} className={cardClasses}>
                {CardContent}
              </div>
            )
          })}
        </div>

        {/* High-Conversion CTA Banner */}
        {ctaSection && (
          <div className="mt-20 relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border border-white/5">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-secondary)]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--color-secondary)]/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 leading-tight" style={{ color: '#ffffff' }}>
                {ctaSection.ctaHeading}
              </h2>
              <p className="text-white/70 font-medium md:text-lg">
                {ctaSection.ctaSubheading}
              </p>
            </div>
            
            <Link 
              href={ctaSection.ctaLink || '/'}
              className="btn-gold relative z-10 px-12 py-5 rounded-lg text-center min-w-[220px]"
            >
              {ctaSection.ctaButtonText}
            </Link>
          </div>
        )}

        {/* Global Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap justify-center items-center gap-10 md:gap-16">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-xl text-[var(--color-secondary)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111]">Secure Filing</span>
          </div>
          <div className="hidden md:block h-5 w-px bg-gold-gradient" />
          <div className="flex items-center gap-3">
            <FaGavel className="text-xl text-[var(--color-secondary)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111]">Expert Vetted</span>
          </div>
          <div className="hidden md:block h-5 w-px bg-gold-gradient" />
          <div className="flex items-center gap-3">
            <FaBolt className="text-xl text-[var(--color-secondary)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111]">Swift Processing</span>
          </div>
        </div>

      </div>
    </section>
  )
}
