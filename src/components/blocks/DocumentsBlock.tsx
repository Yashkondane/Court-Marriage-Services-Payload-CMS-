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
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-100/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-page relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <span className="text-[var(--color-secondary)] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
            Requirements Checklist
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#1a365d] mb-8 leading-tight">
            {block.heading}
          </h2>
          {block.description && (
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {block.description}
            </p>
          )}
          <div className="mt-8 w-24 h-1.5 bg-[var(--color-secondary)] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item: any, index: number) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-10px_rgba(26,54,93,0.15)] transition-all duration-500 border border-slate-100 flex flex-col hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1a365d] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Card Header */}
              <div className="flex items-start gap-5 mb-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#1a365d] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <div className="text-[var(--color-secondary)]">
                    {Icons[item.icon] || Icons.document}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--color-secondary)] font-bold text-lg block mb-1">0{index + 1}</span>
                  <h3 className="text-2xl font-bold text-[#1a365d] leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body - Styled Content */}
              <div className="flex-1">
                <div 
                  className="text-slate-700 leading-relaxed prose prose-sm max-w-none
                    prose-ul:list-none prose-ul:pl-0 
                    prose-li:relative prose-li:pl-8 
                    prose-li:mb-3
                    prose-li:before:content-[''] 
                    prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[12px]
                    prose-li:before:w-5 prose-li:before:h-px 
                    prose-li:before:bg-[var(--color-secondary)]"
                  dangerouslySetInnerHTML={{ __html: serializeLexical(item.content) }} 
                />
              </div>

              {/* Premium Important Note */}
              {item.note && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                   <div className="bg-[#1a365d]/[0.03] border-l-4 border-[var(--color-secondary)] p-5 rounded-r-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[10px] font-black text-[#1a365d] uppercase tracking-wider">Advocate's Note</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-normal italic">
                        {item.note}
                      </p>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white p-6 md:p-4 pr-10 pl-6 rounded-full shadow-xl border border-slate-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-slate-700 font-medium">Joined by <span className="font-bold text-[#1a365d]">5,400+ clients</span> this year</p>
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            <button className="bg-[#1a365d] text-[var(--color-secondary)] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-blue-900/20">
              Get Verified Document Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
