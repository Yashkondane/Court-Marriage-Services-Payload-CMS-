"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaGavel, FaStar, FaLock, FaRegClock, FaArrowRight } from 'react-icons/fa'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ConsultationBlock({ block }: { block: any }) {
  const { 
    formHeading, 
    formSubheading, 
    image, 
    imageHeading, 
    imageSubheading, 
    trustText, 
    ctaButtonText 
  } = block

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          service: formData.get('service'),
          sourceUrl: window.location.href,
        }),
      })

      if (res.ok) {
        setSuccess(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-surface py-12 md:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Lead Capture Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          {success ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-heading font-black text-[#111] mb-4">Request Received!</h2>
              <p className="text-gray-500 font-medium">An expert advisor will call you within 5 minutes.</p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-heading font-black text-[#111] mb-3 leading-tight">
                  {formHeading}
                </h2>
                <p className="text-gray-500 font-medium md:text-lg">
                  {formSubheading}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <input 
                    name="name"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] focus:bg-white outline-none transition-all font-semibold" 
                    placeholder="e.g. Adv. Rajesh Sharma" 
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                    <input 
                      name="phone"
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] focus:bg-white outline-none transition-all font-semibold" 
                      placeholder="+91 98XXX XXXXX" 
                      type="tel"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <input 
                      name="email"
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] focus:bg-white outline-none transition-all font-semibold" 
                      placeholder="advocate@example.com" 
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Legal Matter Type</label>
                  <select 
                    name="service"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] focus:bg-white outline-none transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option value="">Select a Practice Area</option>
                    <option value="corporate">Corporate & Business Law</option>
                    <option value="property">Property & Real Estate</option>
                    <option value="matrimonial">Matrimonial & Family Law</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="intellectual">IP & Trademarks</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={loading}
                    className="btn-gold w-full py-5 rounded-xl font-heading font-black uppercase tracking-widest flex items-center justify-center gap-3 group active:scale-[0.98] transition-all"
                    type="submit"
                  >
                    {loading ? 'Processing...' : (
                      <>
                        {ctaButtonText}
                        <FaArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-wider">
                      <FaLock className="text-[var(--color-secondary)]" />
                      100% Secure & Confidential
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-wider">
                      <FaRegClock className="text-[var(--color-secondary)]" />
                      Guaranteed Response &lt; 5 mins
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right Side: Professional Visual */}
        <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full bg-[#0a0a0a] flex flex-col justify-end p-8 md:p-16">
          {image && typeof image === 'object' && (
            <Image
              src={image.url}
              alt={image.alt || 'Legal Expert'}
              fill
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gold-gradient rounded-xl shadow-lg">
                <FaGavel className="text-black text-xl" />
              </div>
              <span className="text-2xl font-heading font-black text-white tracking-tight">VakilFirst</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-heading font-black text-white leading-[1.1] tracking-tight">
                {imageHeading?.split(' ').map((word: string, i: number) => (
                  <span key={i}>
                    {word === 'Legal' || word === 'Excellence' ? (
                      <span className="text-[var(--color-secondary)]">{word} </span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </h3>
              <p className="text-gray-400 font-medium text-lg max-w-sm leading-relaxed">
                {imageSubheading}
              </p>
            </div>

            {/* Trust Markers */}
            <div className="pt-10 border-t border-white/10">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111] bg-gray-800 flex items-center justify-center overflow-hidden">
                       <span className="text-[10px] font-bold text-gray-500">USER</span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-white font-black text-sm block tracking-wide">{trustText}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar key={i} className="text-[var(--color-secondary)] text-xs" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-10 flex">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">131+ Lawyers Online Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
