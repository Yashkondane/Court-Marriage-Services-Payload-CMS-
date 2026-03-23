import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LogosBlock({ block }: { block: any }) {
  const { heading, logos } = block

  if (!logos || logos.length === 0) return null

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="container-page">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
            Media Recognition
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d]">
            {heading || 'As Featured In'}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {logos.map((logoItem: any, index: number) => {
            const img = logoItem.image
            if (!img?.url) return null

            const logoElement = (
              <div key={index} className="relative w-32 h-16 md:w-40 md:h-20 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center">
                <Image
                  src={img.url}
                  alt={img.alt || 'Media logo'}
                  fill
                  className="object-contain"
                />
              </div>
            )

            if (logoItem.link) {
              return (
                <a key={index} href={logoItem.link} target="_blank" rel="noopener noreferrer">
                  {logoElement}
                </a>
              )
            }

            return logoElement
          })}
        </div>
      </div>
    </section>
  )
}
