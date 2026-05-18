"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaRegFileAlt, FaHandshake, FaGavel, FaBalanceScale, FaShieldAlt 
} from 'react-icons/fa'

const IconMap: Record<string, React.ElementType> = {
  'document': FaRegFileAlt,
  'handshake': FaHandshake,
  'gavel': FaGavel,
  'scale': FaBalanceScale,
  'shield': FaShieldAlt,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HowItWorksBlock({ block }: { block: any }) {
  const { processLabel, heading, backgroundImage, quoteText, steps, ctaText, ctaLink } = block

  return (
    <section className="bg-[#0a0a0a] overflow-hidden">
      <div className="grid lg:grid-cols-2">
        
        {/* Left Side: Cinematic Visual */}
        <div className="relative min-h-[350px] lg:min-h-[550px] flex items-center justify-center px-8 md:px-16 overflow-hidden border-r border-white/5">
          {backgroundImage && typeof backgroundImage === 'object' && (
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt || 'Legal Background'}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          {/* Subtle Color Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-[var(--color-secondary)]/10" />
          
          <div className="relative z-10 max-w-lg">
            <div className="flex gap-6">
              <div className="w-1.5 bg-gold-gradient shrink-0 rounded-full shadow-lg shadow-[var(--color-secondary)]/20" />
              <p className="text-xl md:text-3xl font-heading font-medium text-white italic leading-relaxed drop-shadow-md">
                {quoteText}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: The Process */}
        <div className="py-12 lg:py-16 px-8 md:px-16 lg:px-24 flex flex-col justify-center relative">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="mb-8 relative z-10">
            <span className="section-eyebrow">
              {processLabel || 'The Roadmap'}
            </span>
            <h2 className="section-heading section-heading--dark">
              {heading}
            </h2>
            <div className="section-rule" />
          </div>

          {/* Vertical Timeline */}
          <div className="relative space-y-8 mb-10 z-10">
            {/* Thread Path Line */}
            <div className="absolute left-7 top-4 bottom-4 w-px bg-white/10" />
            
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {steps?.map((step: any, index: number) => {
              const IconComponent = IconMap[step.icon] || FaGavel
              return (
                <div key={index} className="relative flex gap-8 group">
                  <div className="relative z-10 shrink-0">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:border-[var(--color-secondary)] group-hover:shadow-2xl group-hover:shadow-[var(--color-secondary)]/30 transition-all duration-500 backdrop-blur-sm">
                      <IconComponent className="text-xl text-[var(--color-secondary)] group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="card-heading mb-1 group-hover:text-[var(--color-secondary)] transition-colors duration-300" style={{ color: '#ffffff' }}>
                      {step.title}
                    </h3>
                    <p className="block-body--dark text-[0.9375rem] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="flex relative z-10">
            <Link 
              href={ctaLink || '/'}
              className="btn-gold px-12 py-5 rounded-lg text-center font-black uppercase tracking-widest text-xs hover:scale-[1.05] active:scale-[0.98] transition-all"
            >
              {ctaText}
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
