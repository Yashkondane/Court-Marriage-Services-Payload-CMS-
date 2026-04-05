import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'
import { SearchBar } from './SearchBar'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage
  const isLeadForm = block.layoutStyle === 'withLeadForm'
  const showSearch = block.showSearchBar !== false

  // Fetch services and locations for the lead form + search bar
  const payload = await getPayload({ config: configPromise })
  const [svcRes, locRes] = await Promise.all([
    payload.find({ collection: 'services', limit: 100, depth: 0 }),
    payload.find({ collection: 'locations', limit: 100, depth: 0 }),
  ])
  const services = svcRes.docs
  const locations = locRes.docs

  return (
    <div className="hero-section relative min-h-[92vh] flex items-center bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Image / Overlay */}
      {bgImage?.url ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt={bgImage.alt || 'Hero background'}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          {/* Multi-layer gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          {/* Subtle decorative glow when no background image */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-secondary)]/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/20 to-transparent" />
        </div>
      )}
      
      <div className="container-page relative z-20 py-16 lg:py-24">
        <div className={`grid ${isLeadForm ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-1 max-w-4xl'} gap-12 lg:gap-16 items-center`}>
          
          {/* Text Content */}
          <div className="flex flex-col items-start">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-gray-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-600 to-gray-400" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-white/90 tracking-[0.15em] uppercase flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                150+ Lawyers Online Now
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-black mb-6 leading-[0.95] tracking-tight text-white max-w-[640px] drop-shadow-2xl">
              {block.heading || 'Online Legal Advice From Top Lawyers In India'}
            </h1>
            
            {block.subheading && (
              <p className="text-base md:text-lg mb-8 text-gray-400 leading-relaxed font-medium max-w-xl">
                {block.subheading}
              </p>
            )}

            {/* Search Bar */}
            {showSearch && (
              <div className="w-full max-w-xl mb-8">
                <SearchBar locations={locations} services={services} />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              {block.ctaText && (
                <Link 
                  href={block.ctaLink || '/consultation'} 
                  className="btn-gold px-8 py-3.5 rounded-sm flex items-center gap-2.5 text-sm"
                >
                  {block.ctaText}
                </Link>
              )}
              
              {block.secondaryCta?.text && (
                <a 
                  href={block.secondaryCta.link || 'https://wa.me/919650515469'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-8 py-3.5 rounded-sm text-sm"
                >
                  <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {block.secondaryCta.text}
                </a>
              )}
            </div>
          </div>

          {/* Form Side - only when layoutStyle is withLeadForm */}
          {isLeadForm && (
            <div className="relative z-30 group/form mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-[var(--color-secondary)]/5 blur-[100px] rounded-full scale-150 transition-all group-hover/form:bg-[var(--color-secondary)]/10" />
              <div className="relative">
                <LeadFormWidget services={services} locations={locations} />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-surface)] to-transparent z-10" />
    </div>
  )
}
