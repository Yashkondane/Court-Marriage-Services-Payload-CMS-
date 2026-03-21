import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ServicesCarouselBlock({ block }: { block: any }) {
  const { heading, services } = block

  if (!services || services.length === 0) return null

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>
        </div>

        <div className="relative">
          {/* Horizontal scroll container with snap */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {services.map((service: any, index: number) => {
              // Service relationship returns the whole document
              if (typeof service === 'string') return null // Just in case it's not populated

              return (
                <div 
                  key={service.id || index} 
                  className="snap-start shrink-0 w-[280px] md:w-[320px] bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center hover:shadow-md transition-shadow"
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                    {service.icon?.url ? (
                      <Image 
                        src={service.icon.url} 
                        alt={service.icon.alt || service.title} 
                        width={32} 
                        height={32} 
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-red-500 rounded-sm opacity-50"></div> // fallback
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">{service.title}</h3>

                  {/* Highlights List */}
                  {service.highlights && service.highlights.length > 0 && (
                    <ul className="w-full space-y-3 mb-8 flex-grow">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {service.highlights.slice(0, 4).map((hl: any, i: number) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{hl.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link 
                    href={`/services/${service.slug}`}
                    className="mt-auto px-6 py-2 border border-gray-300 rounded text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors w-full text-center"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Required CSS for hiding scrollbar visually but keeping functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  )
}
