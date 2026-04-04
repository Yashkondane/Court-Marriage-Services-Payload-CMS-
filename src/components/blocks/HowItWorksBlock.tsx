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
    <section className="bg-white overflow-hidden">
      <div className="grid lg:grid-cols-2">
        
        {/* Left Side: Cinematic Visual */}
        <div className="relative min-h-[500px] lg:min-h-[700px] flex items-center justify-center px-8 md:px-16 overflow-hidden">
          {backgroundImage && typeof backgroundImage === 'object' && (
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt || 'Legal Background'}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />
          
          <div className="relative z-10 max-w-lg">
            <div className="flex gap-6">
              <div className="w-1.5 bg-gold-gradient shrink-0 rounded-full" />
              <p className="text-2xl md:text-3xl font-heading font-medium text-white italic leading-relaxed">
                {quoteText}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: The Process */}
        <div className="py-20 lg:py-32 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
          <div className="mb-12">
            <span className="text-[var(--color-secondary)] text-xs font-black tracking-[0.3em] uppercase block mb-4">
              {processLabel}
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#111] tracking-tight">
              {heading}
            </h2>
          </div>

          {/* Vertical Timeline */}
          <div className="relative space-y-12 mb-16">
            {/* Thread Path Line */}
            <div className="absolute left-7 top-4 bottom-4 w-px bg-gray-100" />
            
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {steps?.map((step: any, index: number) => {
              const IconComponent = IconMap[step.icon] || FaGavel
              return (
                <div key={index} className="relative flex gap-8 group">
                  <div className="relative z-10 shrink-0">
                    <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm group-hover:border-[var(--color-secondary)]/50 group-hover:shadow-md transition-all duration-500">
                      <IconComponent className="text-xl text-[var(--color-secondary)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-black text-[#111] mb-2 tracking-tight group-hover:text-[var(--color-secondary)] transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="flex">
            <Link 
              href={ctaLink || '/'}
              className="btn-gold px-12 py-5 rounded-lg text-center"
            >
              {ctaText}
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
