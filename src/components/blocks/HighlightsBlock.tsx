import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HighlightsBlock({ block }: { block: any }) {
  const items = block.items || []
  const layoutStyle = block.layoutStyle || 'cards'
  const columns = block.columns || '3'

  if (layoutStyle === 'statsBar') {
    return (
      <div className="relative z-40 -mt-10 md:-mt-16 container-page pb-12">
        <div className="bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-wrap lg:flex-nowrap divide-y lg:divide-y-0 lg:divide-x divide-gray-100 overflow-hidden animate-fade-in-up">
           {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
           {items.map((item: any, index: number) => (
             <div key={item.id || index} className="flex-1 flex items-center gap-5 p-8 lg:p-10 hover:bg-gray-50 transition-colors group">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center text-[var(--color-secondary)] group-hover:scale-110 transition-transform">
                   {item.icon?.url ? (
                     <div className="relative w-full h-full">
                        <Image src={item.icon.url} alt={item.title} fill className="object-contain" />
                     </div>
                   ) : (
                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                   )}
                </div>
                <div className="flex flex-col">
                   <span className="text-2xl md:text-3xl font-heading font-black text-[#111] leading-none mb-1">
                     {item.title}
                   </span>
                   <span className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
                     {item.description}
                   </span>
                </div>
             </div>
           ))}
        </div>
      </div>
    )
  }

  const gridCols: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className="py-20 md:py-24 bg-white">
      <div className="container-page">
        {(block.heading || block.description) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {block.heading && (
              <h2 className="text-4xl md:text-5xl font-heading font-black text-[#111] mb-6 tracking-tight">
                {block.heading}
              </h2>
            )}
            {block.description && (
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                {block.description}
              </p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {items.map((item: any, index: number) => (
            <div
              key={item.id || index}
              className="bg-[var(--color-surface)] rounded-sm p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-[var(--color-secondary)]/20 group transform hover:-translate-y-1"
            >
              {item.icon?.url ? (
                <div className="w-16 h-16 mb-8 relative group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt || item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 mb-8 rounded-sm bg-black/5 flex items-center justify-center text-3xl group-hover:bg-[var(--color-secondary)]/10 transition-colors">
                  ⚖️
                </div>
              )}
              <h3 className="text-xl font-heading font-extrabold text-[#111] mb-4 group-hover:text-[var(--color-secondary)] transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-gray-500 leading-relaxed text-sm font-medium">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
