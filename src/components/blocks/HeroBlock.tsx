import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage
  
  // Fetch services and locations for the lead form
  const payload = await getPayload({ config: configPromise })
  const [svcRes, locRes] = await Promise.all([
    payload.find({ collection: 'services', limit: 100, depth: 0 }),
    payload.find({ collection: 'locations', limit: 100, depth: 0 }),
  ])
  const services = svcRes.docs
  const locations = locRes.docs

  return (
    <div className="relative min-h-[90vh] flex items-center bg-black overflow-hidden">
      
      {/* Background Image / Overlay */}
      {bgImage?.url ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt={bgImage.alt || 'Hero background'}
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          {/* Deep dark gradient overlay for text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent lg:to-black/30" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-secondary)]/5 to-transparent flex items-center justify-center opacity-50">
              <div className="w-[500px] h-[500px] border border-[var(--color-secondary)]/10 rounded-full animate-pulse" />
           </div>
        </div>
      )}
      
      <div className="container-page relative z-20 py-20 lg:py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col items-start">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-gray-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-600 to-gray-400" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-white/90 tracking-widest uppercase ml-1">
                <span className="text-green-400 mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                150+ Lawyers Online Now
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-heading font-black mb-8 leading-[1] tracking-tight text-white max-w-2xl drop-shadow-2xl">
              {block.heading || 'Online Legal Advice From Top Lawyers In India'}
            </h1>
            
            {block.subheading && (
              <p className="text-lg md:text-xl mb-12 text-gray-300 leading-relaxed font-medium max-w-xl">
                {block.subheading}
              </p>
            )}

            <div className="flex flex-wrap gap-5">
              <Link href="/consultation" className="btn-gold px-10 py-4 rounded-sm flex items-center gap-3">
                Book Free Consultation
              </Link>
              
              <a 
                href="https://wa.me/919650515469" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-10 py-4 rounded-sm"
              >
                <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative z-30 group/form mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-[var(--color-secondary)]/5 blur-[100px] rounded-full scale-150 transition-all group-hover/form:bg-[var(--color-secondary)]/10" />
            <div className="relative">
              <LeadFormWidget services={services} locations={locations} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
