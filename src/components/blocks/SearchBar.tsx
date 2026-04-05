'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locations?: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services?: any[]
}

export function SearchBar({ locations = [], services = [] }: SearchBarProps) {
  const router = useRouter()
  const [city, setCity] = useState('')
  const [matter, setMatter] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    
    // Build the URL based on selections
    const selectedService = services.find(s => s.id?.toString() === matter)
    const selectedLocation = locations.find(l => l.id?.toString() === city)

    if (selectedService?.slug && selectedLocation?.slug) {
      router.push(`/${selectedService.slug}/${selectedLocation.slug}`)
    } else if (selectedService?.slug) {
      router.push(`/${selectedService.slug}`)
    } else {
      router.push('/consultation')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap lg:flex-nowrap items-stretch bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden transition-all hover:border-white/20">
      
      {/* City Select */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-r border-white/10 flex-1 min-w-[160px]">
        <svg className="w-4 h-4 text-[var(--color-secondary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div className="flex flex-col flex-1">
          <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.15em] leading-none mb-1">City</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent text-white text-sm font-semibold outline-none cursor-pointer appearance-none w-full"
          >
            <option value="" className="bg-[#111] text-white">Enter your city</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id} className="bg-[#111] text-white">{loc.name || loc.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Legal Matter Select */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-r border-white/10 flex-1 min-w-[180px]">
        <svg className="w-4 h-4 text-[var(--color-secondary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 01-6.001 0M18 7l-3 9m0-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
        <div className="flex flex-col flex-1">
          <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.15em] leading-none mb-1">Legal Matter</span>
          <select
            value={matter}
            onChange={(e) => setMatter(e.target.value)}
            className="bg-transparent text-white text-sm font-semibold outline-none cursor-pointer appearance-none w-full"
          >
            <option value="" className="bg-[#111] text-white">e.g. Property Dispute</option>
            {services.map((svc) => (
              <option key={svc.id} value={svc.id} className="bg-[#111] text-white">{svc.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Find Expert Button */}
      <button
        type="submit"
        className="btn-gold px-6 py-3.5 flex items-center gap-2 shrink-0 rounded-none text-xs"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="font-black tracking-wider uppercase">Find Expert</span>
      </button>
    </form>
  )
}
