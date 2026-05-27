"use client"
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star, MapPin, Globe,
  Search, RotateCcw, ChevronDown,
  User, Briefcase, Clock, Phone,
  X, CheckCircle, Zap, Award
} from 'lucide-react'
import { serializeLexical } from '@/lib/payload/lexical'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LawyersListClient({ block, lawyers, initialFaqs, initialReviews }: any) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState(block.preselectedCity || '')
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('')
  const [selectedRating, setSelectedRating] = useState('')

  // Pagination State - 20 items per page!
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Callback Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLawyerForCallback, setSelectedLawyerForCallback] = useState<any>(null)
  const [callbackName, setCallbackName] = useState('')
  const [callbackPhone, setCallbackPhone] = useState('')
  const [callbackFormSuccess, setCallbackFormSuccess] = useState(false)
  const [callbackLoading, setCallbackLoading] = useState(false)

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null)

  // Extract unique filtering values dynamically
  const filterOptions = useMemo(() => {
    const states = new Set<string>()
    const cities = new Set<string>()
    const practiceAreas = new Set<string>()

    lawyers.forEach((lawyer: any) => {
      if (lawyer.locationText) {
        const parts = lawyer.locationText.split(',').map((p: string) => p.trim())
        if (parts.length > 1) {
          states.add(parts[parts.length - 1])
          cities.add(parts[0])
        } else if (parts.length === 1) {
          cities.add(parts[0])
        }
      }
      if (lawyer.specializations) {
        lawyer.specializations.forEach((spec: any) => {
          if (spec.title) practiceAreas.add(spec.title)
        })
      }
    })

    return {
      states: Array.from(states).sort(),
      cities: Array.from(cities).sort(),
      practiceAreas: Array.from(practiceAreas).sort()
    }
  }, [lawyers])

  // Filter Logic
  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer: any) => {
      const matchSearch = searchQuery
        ? lawyer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.locationText?.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      const matchState = selectedState
        ? lawyer.locationText?.toLowerCase().includes(selectedState.toLowerCase())
        : true

      const matchCity = selectedCity
        ? lawyer.locationText?.toLowerCase().includes(selectedCity.toLowerCase())
        : true

      const matchPracticeArea = selectedPracticeArea
        ? lawyer.specializations?.some((s: any) => s.title?.toLowerCase() === selectedPracticeArea.toLowerCase())
        : true

      const matchRating = selectedRating
        ? lawyer.rating >= parseFloat(selectedRating)
        : true

      return matchSearch && matchState && matchCity && matchPracticeArea && matchRating
    })
  }, [lawyers, searchQuery, selectedState, selectedCity, selectedPracticeArea, selectedRating])

  // Paginated Lawyers
  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage)
  const paginatedLawyers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredLawyers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredLawyers, currentPage, itemsPerPage])

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedState('')
    setSelectedCity('')
    setSelectedPracticeArea('')
    setSelectedRating('')
    setCurrentPage(1)
  }

  // Handle callback submit
  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCallbackLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: callbackName,
          phone: callbackPhone,
          service: selectedLawyerForCallback?.specializations?.[0]?.title || 'general-lawyer-consultation',
          sourceUrl: window.location.href,
          notes: `Arranged callback with Advocate: ${selectedLawyerForCallback?.name || 'Any Available'}`
        })
      })
      if (res.ok) {
        setCallbackFormSuccess(true)
        setTimeout(() => {
          setIsModalOpen(false)
          setCallbackFormSuccess(false)
          setCallbackName('')
          setCallbackPhone('')
          setSelectedLawyerForCallback(null)
        }, 3000)
      }
    } catch (err) {
      console.error('Error submitting lead', err)
    } finally {
      setCallbackLoading(false)
    }
  }

  const openCallbackModal = (e: React.MouseEvent, lawyer: any = null) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedLawyerForCallback(lawyer)
    setIsModalOpen(true)
  }

  return (
    <section className="section bg-[#fafafa] text-[#111111] py-10">
      <div className="container-page px-4 md:px-6">

        {/* Dynamic Premium Header Card - Sleek Grid with Right Image Accent */}
        <div className="bg-[#0a0a0a] text-white rounded-2xl p-8 md:p-10 border border-neutral-800 shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-secondary)]/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content Column */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-secondary)]"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                  {block.onlineCountText || '104+ Verified Advocates Active'}
                </span>
              </div>

              <h1
                className="text-2xl md:text-4xl font-heading font-black leading-tight tracking-tight"
                style={{ color: '#ffffff' }}
              >
                {block.heading}
              </h1>

              <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-2xl">
                {block.subheading}
              </p>

              {/* Quick Filter Tag Chips for Rapid Search */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mr-1">Popular Cities:</span>
                {['Delhi', 'Mumbai', 'Bangalore', 'Noida', 'Pune'].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(selectedCity === city ? '' : city)
                      setCurrentPage(1)
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${selectedCity === city
                        ? 'bg-[var(--color-secondary)] border-[var(--color-secondary)] text-black'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Accent Image Column */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[240px] aspect-[4/3] rounded-xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-[#121212] to-[#000000] shadow-2xl flex items-center justify-center group/img">
                <Image
                  src="/images/law_hero_accent.png"
                  alt="Elite Legal Scales of Justice Accent"
                  fill
                  className="object-cover opacity-90 group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by advocate name, specialty, or court..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] text-xs font-semibold shadow-inner transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredLawyers.length} Advocates
          </div>
        </div>

        {/* Main Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* LEFT SIDE: Directory Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Highly Polished List View of Cards */}
            <div className="space-y-4">
              {paginatedLawyers.length > 0 ? (
                paginatedLawyers.map((lawyer: any) => (
                  <Link
                    key={lawyer.id}
                    href={`/lawyers/${lawyer.slug}`}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[var(--color-secondary)]/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch group hover:bg-slate-50/50"
                  >
                    {/* Left Section: Profile Photo with Badge */}
                    <div className="sm:w-44 bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col items-center justify-start gap-4 border-b sm:border-b-0 sm:border-r border-slate-200 shrink-0">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-white shadow-md shrink-0">
                        {lawyer.photo?.url ? (
                          <Image
                            src={lawyer.photo.url}
                            alt={lawyer.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white">
                            <User size={40} />
                          </div>
                        )}
                      </div>

                      {/* Rating Badge */}
                      <div className="flex flex-col items-center gap-1 w-full">
                        <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-slate-900">
                          <Star size={16} className="text-amber-400 fill-amber-400" />
                          <span>{lawyer.rating?.toFixed(1) || '5.0'}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-500">({lawyer.ratingCount || 0} {lawyer.ratingCount === 1 ? 'review' : 'reviews'})</span>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-col gap-2 w-full">
                        {lawyer.isSponsored && (
                          <div className="flex items-center justify-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5">
                            <Award size={14} className="text-amber-600" />
                            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Sponsored</span>
                          </div>
                        )}
                        {lawyer.isPremiumPartner && (
                          <div className="flex items-center justify-center gap-1.5 bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/30 rounded-lg px-2 py-1.5">
                            <Award size={14} className="text-[var(--color-secondary)]" />
                            <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide">Premium</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Middle Section: Advocate Details */}
                    <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-[var(--color-secondary)] transition-colors leading-tight">
                            Advocate {lawyer.name}
                          </h3>
                          <p className="text-sm font-bold text-[var(--color-secondary)] uppercase tracking-wide mt-1">
                            {lawyer.designation || 'Legal Practitioner'}
                          </p>
                        </div>

                        {/* Info Grid with Icons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {/* Experience */}
                          <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200/50">
                            <Briefcase size={18} className="text-[var(--color-secondary)] shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Experience</span>
                              <span className="text-sm font-black text-slate-900">{lawyer.experience || 0} Years</span>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200/50">
                            <MapPin size={18} className="text-red-500 shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location</span>
                              <span className="text-sm font-black text-slate-900 truncate">{lawyer.locationText || 'India'}</span>
                            </div>
                          </div>

                          {/* Languages */}
                          <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200/50">
                            <Globe size={18} className="text-blue-500 shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Languages</span>
                              <span className="text-sm font-black text-slate-900 truncate">
                                {lawyer.languages?.map((l: any) => l.language).join(', ') || 'English, Hindi'}
                              </span>
                            </div>
                          </div>

                          {/* Response Time */}
                          <div className="flex items-center gap-3 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200/50">
                            <Clock size={18} className="text-emerald-600 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Response</span>
                              <span className="text-sm font-black text-emerald-900">{lawyer.responseTime || 'Quick'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Specializations Skill Chips */}
                      {lawyer.specializations && lawyer.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {lawyer.specializations.slice(0, 3).map((spec: any, idx: number) => (
                            <span
                              key={idx}
                              className="bg-[var(--color-secondary)]/8 text-[var(--color-secondary)] text-xs font-bold px-3 py-1.5 rounded-full border border-[var(--color-secondary)]/20"
                            >
                              {spec.title}
                            </span>
                          ))}
                          {lawyer.specializations.length > 3 && (
                            <span className="text-xs font-bold text-slate-500 px-3 py-1.5">
                              +{lawyer.specializations.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Section: CTA Button */}
                    <div className="p-6 flex flex-col justify-center items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 bg-slate-50 sm:w-48 shrink-0">
                      <button
                        onClick={(e) => openCallbackModal(e, lawyer)}
                        className="btn-gold w-full py-3 px-4 text-center text-xs font-black tracking-widest uppercase rounded-xl active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <Phone size={16} />
                        Contact Now
                      </button>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/50 w-full justify-center">
                        <Zap size={14} className="fill-emerald-600" />
                        Instant Callback
                      </div>
                    </div>

                  </Link>
                ))
              ) : (
                <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-4 shadow-sm">
                  <p className="text-slate-600 font-bold text-lg">No matching advocates found.</p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    <RotateCcw size={16} /> Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1.5 pt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(p => Math.max(p - 1, 1))
                    window.scrollTo({ top: 300, behavior: 'smooth' })
                  }}
                  className="px-3 py-1.5 rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1)
                      window.scrollTo({ top: 300, behavior: 'smooth' })
                    }}
                    className={`w-8 h-8 rounded text-xs font-bold transition-all ${currentPage === i + 1
                        ? 'bg-[var(--color-secondary)] text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(p => Math.min(p + 1, totalPages))
                    window.scrollTo({ top: 300, behavior: 'smooth' })
                  }}
                  className="px-3 py-1.5 rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  Next
                </button>
              </div>
            )}

            {/* FAQs Sub-Section */}
            {initialFaqs && initialFaqs.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xl font-heading font-black text-slate-900 border-b border-slate-100 pb-3">
                  {block.faqsHeading || 'Frequently Asked Questions'}
                </h3>
                <div className="space-y-2">
                  {initialFaqs.map((faq: any, idx: number) => {
                    const isOpen = openFaqIdx === idx
                    return (
                      <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden transition-all shadow-sm">
                        <button
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-bold text-slate-800 text-xs md:text-sm">{faq.question}</span>
                          <ChevronDown
                            size={18}
                            className={`text-[var(--color-secondary)] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                          <div className="overflow-hidden">
                            <div className="p-4 bg-slate-50/50 border-t border-slate-200 text-xs font-semibold text-slate-600 leading-relaxed rich-text prose prose-sm max-w-none">
                              {typeof faq.answer === 'string' ? (
                                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                              ) : (
                                <div dangerouslySetInnerHTML={{ __html: serializeLexical(faq.answer) }} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Reviews Sub-Section */}
            {initialReviews && initialReviews.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xl font-heading font-black text-slate-900 border-b border-slate-100 pb-3">
                  {block.reviewsHeading || 'Success Stories'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {initialReviews.map((rev: any, idx: number) => (
                    <div key={idx} className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex gap-0.5 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < (rev.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
                            />
                          ))}
                        </div>
                        <p className="text-slate-600 font-semibold italic text-xs leading-relaxed mb-4">
                          &ldquo;{rev.content}&rdquo;
                        </p>
                      </div>
                      <div className="border-t border-slate-200/60 pt-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)] text-black flex items-center justify-center font-bold text-[10px] uppercase shadow-sm shrink-0">
                          {rev.name?.[0] || 'C'}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 text-xs block">{rev.name}</span>
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">{rev.designation || 'Client'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT SIDE: Sticky Filtering Sidebar ── */}
          <aside className="lg:sticky lg:top-8 space-y-6">

            {/* Sidebar Search Widget */}
            {block.showFilters && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-heading font-black text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                  Refine Search
                </h3>

                {/* State Select */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] cursor-pointer"
                  >
                    <option value="">All States</option>
                    {filterOptions.states.map((st, idx) => (
                      <option key={idx} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* City Select */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] cursor-pointer"
                  >
                    <option value="">All Cities</option>
                    {filterOptions.cities.map((ct, idx) => (
                      <option key={idx} value={ct}>{ct}</option>
                    ))}
                  </select>
                </div>

                {/* Practice Area Select */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Expertise</label>
                  <select
                    value={selectedPracticeArea}
                    onChange={(e) => {
                      setSelectedPracticeArea(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] cursor-pointer"
                  >
                    <option value="">All Expertise</option>
                    {filterOptions.practiceAreas.map((pa, idx) => (
                      <option key={idx} value={pa}>{pa}</option>
                    ))}
                  </select>
                </div>

                {/* Ratings Select */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Minimum Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => {
                      setSelectedRating(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] cursor-pointer"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">⭐⭐⭐⭐⭐ 4.5 & Above</option>
                    <option value="4.0">⭐⭐⭐⭐ 4.0 & Above</option>
                    <option value="3.0">⭐⭐⭐ 3.0 & Above</option>
                  </select>
                </div>

                {/* Reset Buttons */}
                <button
                  onClick={handleResetFilters}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
                >
                  <FaUndo /> Reset Filters
                </button>
              </div>
            )}

            {/* Consultation Widget - Elegant White Design */}
            {block.consultationWidget && (
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="relative z-10 space-y-5">
                  <div className="space-y-2">
                    <span className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md inline-block">
                      ⚡ {block.consultationWidget.subheading}
                    </span>
                    <h3 className="text-lg font-heading font-black text-slate-900 leading-tight">
                      {block.consultationWidget.heading}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                      Connect directly with elite advocates. Secure, confidential, and comprehensive legal advice.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">Fee</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-2xl font-heading font-black text-slate-900">
                          ₹{block.consultationWidget.price}
                        </span>
                        <span className="text-xs font-bold text-slate-400 line-through">
                          ₹{block.consultationWidget.originalPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => openCallbackModal(e, null)}
                      className="btn-gold py-2.5 px-5 text-center text-xs font-black tracking-widest uppercase rounded-lg active:scale-95 transition-all shadow-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-secondary)]/5 blur-[40px] rounded-full pointer-events-none" />
              </div>
            )}

          </aside>

        </div>

      </div>

      {/* ── CALLBACK FORM MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">

            {/* Header */}
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-heading font-black text-slate-900 text-xs md:text-sm">
                {selectedLawyerForCallback ? `Consult Advocate ${selectedLawyerForCallback.name}` : 'Arrange a Callback'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-all"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {callbackFormSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <FaCheckCircle className="text-xl" />
                  </div>
                  <h5 className="text-lg font-heading font-black text-slate-900">Request Confirmed!</h5>
                  <p className="text-slate-500 font-medium text-xs">
                    An expert counselor will call you within 5 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={callbackLoading}
                      className="btn-gold w-full py-3 text-center text-xs font-black tracking-widest uppercase rounded-lg active:scale-95 transition-all shadow-md"
                    >
                      {callbackLoading ? 'Scheduling...' : 'Request Instant Callback'}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
