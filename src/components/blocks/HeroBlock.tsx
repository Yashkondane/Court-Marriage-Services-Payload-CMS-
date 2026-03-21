import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage
  const isLeadForm = block.layoutStyle === 'withLeadForm'

  return (
    <div className="relative overflow-hidden min-h-[70vh] flex items-center bg-slate-900 text-white">
      {bgImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt={bgImage.alt || 'Hero background'}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="container-page relative z-10 py-20">
        <div className={`grid gap-12 items-center ${isLeadForm ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'max-w-3xl mx-auto text-center'}`}>
          {/* Text Area */}
          <div className={`${!isLeadForm && 'flex flex-col items-center'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-[#f8fafc]">
              {block.heading}
            </h1>
            {block.subheading && (
              <p className={`text-lg md:text-xl text-slate-300 mb-10 leading-relaxed ${!isLeadForm && 'max-w-2xl'}`}>
                {block.subheading}
              </p>
            )}
            <div className={`flex flex-wrap gap-4 ${!isLeadForm && 'justify-center'}`}>
              {block.ctaText && block.ctaLink && (
                <Link href={block.ctaLink} className="bg-[#facc15] text-[var(--color-primary-dark)] font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors">
                  {block.ctaText}
                </Link>
              )}
              {block.secondaryCta?.text && block.secondaryCta?.link && (
                <Link href={block.secondaryCta.link} className="bg-transparent border-2 border-slate-300 text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[var(--color-primary-dark)] transition-colors">
                  {block.secondaryCta.text}
                </Link>
              )}
            </div>
          </div>

          {/* Form Area Conditional */}
          {isLeadForm && (
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <LeadFormWidget />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
