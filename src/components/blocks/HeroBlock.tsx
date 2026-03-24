import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage
  const isLeadForm = block.layoutStyle === 'withLeadForm'
  const style = block.style || 'fullWidth'

  // Determine grid and alignment classes based on style and layoutType
  const isCentered = !isLeadForm && style === 'centered'
  const isSplit = !isLeadForm && style === 'split'

  return (
    <div className={`relative overflow-hidden min-h-[70vh] flex items-center ${bgImage?.url ? 'bg-white' : 'bg-gradient-to-br from-[#f8f6f0]/50 via-white to-slate-50'}`}>
      {/* Subtle modern background elements when no image is present */}
      {!bgImage?.url && (
        <>
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1a365d 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 -m-32 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--color-primary)]/5 to-transparent rounded-full blur-3xl -z-10" />
        </>
      )}
      {bgImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt={bgImage.alt || 'Hero background'}
            fill
            className="object-cover"
            priority
          />
          {/* Enhanced gradient: Centered needs a more balanced overlay, split needs side-weighted */}
          <div className={`absolute inset-0 z-10 ${
            isCentered 
              ? 'bg-white/60' 
              : isSplit 
                ? 'bg-gradient-to-r from-white via-white/40 to-transparent' 
                : 'bg-gradient-to-r from-white via-white/80 to-transparent'
          }`} />
        </div>
      )}
      
      <div className="container-page relative z-20 py-20">
        <div className={`grid gap-12 items-center ${
          isLeadForm 
            ? 'lg:grid-cols-[1.2fr_0.8fr]' 
            : isSplit 
              ? 'lg:grid-cols-2' 
              : 'max-w-4xl mx-auto'
        } ${isCentered ? 'text-center' : ''}`}>
          
          {/* Text Area */}
          <div className={`flex flex-col relative z-20 animate-fade-in-up ${isCentered ? 'items-center text-center' : 'items-start'}`}>
            
            {/* Elegant Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-semibold text-sm mb-6 border border-[var(--color-primary)]/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
              Trusted Legal Services In India
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-[#1a365d]">
              {block.heading}
            </h1>
            {block.subheading && (
              <p className={`text-lg md:text-xl text-[#1e293b] mb-10 leading-relaxed font-medium ${isCentered ? 'max-w-3xl' : 'max-w-2xl'}`}>
                {block.subheading}
              </p>
            )}
            <div className={`flex flex-wrap gap-4 mt-4 ${isCentered ? 'justify-center' : ''}`}>
              {block.ctaText && block.ctaLink && (
                <Link href={block.ctaLink} className="group flex items-center gap-2 bg-[#1a365d] text-white font-bold px-8 py-4 rounded-full hover:bg-[#2a4a7f] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  {block.ctaText}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              )}
              {block.secondaryCta?.text && block.secondaryCta?.link && (
                <Link href={block.secondaryCta.link} className="flex items-center gap-2 bg-white border-2 border-[#1a365d] text-[#1a365d] font-bold px-8 py-4 rounded-full hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                  {block.secondaryCta.text}
                </Link>
              )}
            </div>
          </div>

          {/* Form Area or Image Area for Split */}
          {isLeadForm ? (
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <LeadFormWidget />
            </div>
          ) : isSplit ? (
            <div className="hidden lg:block relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
               {bgImage?.url && (
                <Image
                  src={bgImage.url}
                  alt={bgImage.alt || 'Feature side image'}
                  fill
                  className="object-cover"
                />
               )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
