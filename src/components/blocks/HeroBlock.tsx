import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage
  const isLeadForm = block.layoutStyle === 'withLeadForm'
  const style = block.style || 'fullWidth'
  const isCentered = !isLeadForm && style === 'centered'
  const isSplit = !isLeadForm && style === 'split'

  // New Background Logic
  const backgroundType = block.backgroundType || 'image'
  const backgroundColor = block.backgroundColor || 'white'
  const textColorTheme = block.textColorTheme || 'auto'

  const bgMap = {
    white: 'bg-white',
    black: 'bg-black',
    gold: 'bg-[var(--color-secondary)]',
  }
  const bgClasses = bgMap[backgroundColor as keyof typeof bgMap] || 'bg-white'

  // Theme Determination
  let isDarkContent = false
  if (textColorTheme === 'light') isDarkContent = true
  if (textColorTheme === 'dark') isDarkContent = false
  if (textColorTheme === 'auto') {
    if (backgroundType === 'color') {
      if (backgroundColor === 'black') isDarkContent = true
    } else {
      // For images, assume dark overlay / light text by default for premium look
      isDarkContent = true
    }
  }

  const textHeadingColor = isDarkContent ? 'text-white' : 'text-black'
  const textSubheadingColor = isDarkContent ? 'text-white/80' : 'text-slate-700'
  const badgeClasses = isDarkContent 
    ? 'bg-white/10 text-white border-white/20' 
    : 'bg-black/5 text-black border-black/10'

  return (
    <div className={`relative overflow-hidden min-h-[85vh] flex items-center transition-colors duration-500 ${backgroundType === 'color' ? bgClasses : 'bg-black'}`}>
      
      {/* Background Media */}
      {backgroundType === 'image' && bgImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt={bgImage.alt || 'Hero background'}
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Overlay for contrast */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        </div>
      )}
      
      <div className="container-page relative z-20 py-24">
        <div className={`grid gap-16 items-center ${
          isLeadForm 
            ? 'lg:grid-cols-[1.2fr_0.8fr]' 
            : isSplit 
              ? 'lg:grid-cols-2' 
              : 'max-w-5xl mx-auto'
        } ${isCentered ? 'text-center' : ''}`}>
          
          {/* Text Area */}
          <div className={`flex flex-col relative z-20 animate-fade-in-up ${isCentered ? 'items-center text-center' : 'items-start'}`}>
            
            {/* Elegant Trust Badge */}
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest mb-8 border shadow-sm backdrop-blur-sm transition-all ${badgeClasses}`}>
              <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />
              Trusted Legal Services In India
            </div>

            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tighter ${textHeadingColor} uppercase`}>
              {block.heading}
            </h1>
            
            {block.subheading && (
              <p className={`text-xl md:text-2xl mb-12 leading-relaxed font-medium ${textSubheadingColor} ${isCentered ? 'max-w-3xl' : 'max-w-2xl'}`}>
                {block.subheading}
              </p>
            )}

            <div className={`flex flex-wrap gap-5 mt-4 ${isCentered ? 'justify-center' : ''}`}>
              {block.ctaText && block.ctaLink && (
                <Link href={block.ctaLink} className="group flex items-center gap-3 bg-[var(--color-secondary)] text-black font-black uppercase text-sm tracking-widest px-10 py-5 rounded-none hover:bg-white transition-all shadow-xl hover:-translate-y-1">
                  {block.ctaText}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              )}
              {block.secondaryCta?.text && block.secondaryCta?.link && (
                <Link href={block.secondaryCta.link} className={`flex items-center gap-2 border-2 font-black uppercase text-sm tracking-widest px-10 py-5 rounded-none transition-all shadow-sm hover:shadow-md hover:-translate-y-1 ${
                  isDarkContent ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'
                }`}>
                  {block.secondaryCta.text}
                </Link>
              )}
            </div>
          </div>

          {/* Side Content */}
          {isLeadForm ? (
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-white p-8 md:p-10 shadow-2xl border-t-8 border-[var(--color-secondary)]">
                <LeadFormWidget />
              </div>
            </div>
          ) : isSplit && bgImage?.url ? (
            <div className="hidden lg:block relative h-[600px] rounded-none overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src={bgImage.url}
                  alt={bgImage.alt || 'Hero feature'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
