import React from 'react'
import { serializeLexical } from '@/lib/payload/lexical'

// Simple SVG Icons
const Icons: Record<string, React.ReactNode> = {
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  location: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  camera: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DocumentsBlock({ block }: { block: any }) {
  const items = block.items || []

  return (
    <div className="py-20 bg-slate-50">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a365d] mb-6">
            {block.heading}
          </h2>
          {block.description && (
            <p className="text-lg text-slate-600 leading-relaxed italic">
              "{block.description}"
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, index: number) => (
            <div 
              key={index} 
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header with Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1a365d]/5 text-[#1a365d] flex items-center justify-center group-hover:bg-[#1a365d] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 shadow-sm">
                  {Icons[item.icon] || Icons.document}
                </div>
                <h3 className="text-xl font-bold text-[#1a365d]">
                  {index + 1}. {item.title}
                </h3>
              </div>

              {/* Card Body - Rich Text */}
              <div className="flex-1 rich-text prose prose-sm max-w-none prose-ul:pl-0 prose-li:pl-0">
                <div 
                  dangerouslySetInnerHTML={{ __html: serializeLexical(item.content) }} 
                  className="text-slate-700 space-y-2"
                />
              </div>

              {/* Optional Note/Tip */}
              {item.note && (
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100/50">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Important Note</p>
                    <p className="text-sm text-amber-900 leading-snug">{item.note}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Disclaimer Card */}
        <div className="mt-16 bg-[#1a365d] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 -m-8 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
             <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-4xl flex-shrink-0 animate-pulse">
               💡
             </div>
             <div>
               <h4 className="text-2xl font-bold mb-2">Need Professional Assistance?</h4>
               <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                 Gathering legal documents can be confusing. Our expert team at Kaushal & Associates helps you verify and organize everything to ensure a 100% rejection-free registration.
               </p>
             </div>
             <div className="md:ml-auto">
               <button className="bg-[var(--color-secondary)] text-[#1a365d] px-8 py-4 rounded-full font-bold hover:bg-white transition-all whitespace-nowrap shadow-xl">
                 Speak to an Expert
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
