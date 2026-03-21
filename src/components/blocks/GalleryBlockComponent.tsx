import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GalleryBlockComponent({ block }: { block: any }) {
  const images = block.images || []

  const colsMap: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container-page">
        {block.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {block.heading}
          </h2>
        )}
        <div className={`grid grid-cols-1 ${colsMap[block.columns] || colsMap['3']} gap-4`}>
          {images.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            images.map((item: any, index: number) => (
              <div
                key={item.id || index}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.caption || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-primary)]/5 flex items-center justify-center text-4xl">
                    🖼️
                  </div>
                )}
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm">{item.caption}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--color-text-secondary)]">Gallery images will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
