import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LogosBlock({ block }: { block: any }) {
  const { heading, logos } = block

  if (!logos || logos.length === 0) return null

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container-page">
        {heading && (
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900">{heading}</h2>
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {logos.map((logoItem: any, index: number) => {
            const img = logoItem.image
            if (!img?.url) return null

            const logoElement = (
              <div key={index} className="relative w-24 h-24 md:w-32 md:h-32 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer">
                <Image
                  src={img.url}
                  alt={img.alt || 'Partner logo'}
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
