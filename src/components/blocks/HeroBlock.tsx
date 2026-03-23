import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroBlock({ block }: { block: any }) {
  const showBgImage = block.showBackgroundImage !== false
  const sideImage = block.sideImage
  const sideImageShape = block.sideImageShape || 'circular'
  const bgImage = block.backgroundImage

  const isLeadForm = block.layoutStyle === 'withLeadForm'
  const style = block.style || 'fullWidth'

  // Determine grid and alignment classes based on style and layoutType
  const isCentered = !isLeadForm && style === 'centered'
  const isSplit = !isLeadForm && style === 'split'

  return (
    <div className={`relative overflow-hidden min-h-[80vh] flex items-center ${showBgImage ? 'bg-[#1a365d]' : 'bg-slate-50'}`}>
      {showBgImage && bgImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt={bgImage.alt || 'Hero background'}
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Enhanced gradient: Centered needs a more balanced overlay, split needs side-weighted */}
          <div className={`absolute inset-0 z-10 ${
            isCentered 
              ? 'bg-[#1a365d]/40' 
              : isSplit 
                ? 'bg-gradient-to-r from-[#1a365d] via-[#1a365d]/60 to-transparent' 
                : 'bg-gradient-to-r from-[#1a365d] via-[#1a365d]/40 to-transparent'
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
          <div className={`flex flex-col ${isCentered ? 'items-center' : 'items-start'}`}>
            <h1 className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight ${showBgImage ? 'text-white' : 'text-[#1a365d]'}`}>
              {block.heading}
            </h1>
            {block.subheading && (
              <p className={`text-lg md:text-xl mb-10 leading-relaxed font-medium ${isCentered ? 'max-w-3xl' : 'max-w-2xl'} ${showBgImage ? 'text-blue-50' : 'text-[#1e293b]'}`}>
                {block.subheading}
              </p>
            )}
            <div className={`flex flex-wrap gap-4 ${isCentered ? 'justify-center' : ''}`}>
              {block.ctaText && block.ctaLink && (
                <Link href={block.ctaLink} className={`${showBgImage ? 'bg-[#c7a84b] text-white hover:bg-[#b08d3a]' : 'bg-[#1a365d] text-white hover:bg-[#2a4a7f]'} font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl`}>
                  {block.ctaText}
                </Link>
              )}
              {block.secondaryCta?.text && block.secondaryCta?.link && (
                <Link href={block.secondaryCta.link} className={`bg-transparent border-2 ${showBgImage ? 'border-white text-white hover:bg-white/10' : 'border-[#1a365d] text-[#1a365d] hover:bg-slate-50'} font-bold px-8 py-4 rounded-full transition-all`}>
                  {block.secondaryCta.text}
                </Link>
              )}
            </div>
          </div>

          {/* Form Area or Image Area for Split */}
          {isLeadForm ? (
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {sideImage?.url && (
                <div className={`relative w-full aspect-square mb-6 overflow-hidden shadow-2xl ${sideImageShape === 'circular' ? 'rounded-full' : 'rounded-3xl'}`}>
                  <Image
                    src={sideImage.url}
                    alt={sideImage.alt || 'Lead form side image'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <LeadFormWidget />
            </div>
          ) : isSplit ? (
            <div className="flex justify-center lg:justify-end">
               {(sideImage?.url || bgImage?.url) && (
                <div className={`relative w-full max-w-[500px] aspect-square overflow-hidden shadow-2xl border-4 ${showBgImage ? 'border-white/20' : 'border-white'} ${sideImageShape === 'circular' ? 'rounded-full' : 'rounded-3xl'}`}>
                  <Image
                    src={sideImage?.url || bgImage.url}
                    alt={sideImage?.alt || bgImage?.alt || 'Feature side image'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
               )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
