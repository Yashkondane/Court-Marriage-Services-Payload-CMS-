'use client'
import React, { useState } from 'react'

export function LeadFormWidget({ services = [], locations = [] }: { services?: any[], locations?: any[] }) {
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

  if (success) {
    return (
      <div className="bg-[#111] p-10 shadow-2xl text-center rounded-sm border border-white/10 min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-[var(--color-secondary)] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-heading font-black text-white mb-4 uppercase tracking-tight">Request Received!</h3>
        <p className="text-gray-400 font-medium max-w-xs">A top legal expert will call you within the next 5 minutes.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#111] shadow-[0_20px_80px_rgba(0,0,0,0.5)] rounded-sm border border-white/10 overflow-hidden flex flex-col w-full max-w-md mx-auto animate-fade-in-up">
      
      {/* Form Header */}
      <div className="p-8 pb-4 relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
        <div className="absolute top-0 right-0 p-4">
           <div className="text-[10px] font-black bg-[var(--color-secondary)] text-black px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg">
             Most Trusted Legal Platform
           </div>
        </div>

        <div className="flex items-center justify-between mb-2">
           <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tight leading-none">
             Premium Legal <br /> Consultation
           </h3>
           <div className="text-right">
              <div className="flex -space-x-3 mb-1 justify-end">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-600 overflow-hidden relative shadow-md">
                     <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600" />
                  </div>
                ))}
              </div>
              <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Top-Rated Experts</span>
           </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-4 flex-1">
        
        {/* Name input */}
        <div className="relative">
          <input 
            type="text" 
            name="name" 
            required 
            placeholder="Your Name" 
            className="w-full px-5 py-4 bg-white rounded-sm text-black font-semibold placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-secondary)] transition-all outline-none"
          />
        </div>
        
        {/* Phone input */}
        <div className="relative">
          <input 
            type="tel" 
            name="phone" 
            required 
            placeholder="Phone Number" 
            className="w-full px-5 py-4 bg-white rounded-sm text-black font-semibold placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-secondary)] transition-all outline-none"
          />
        </div>

        {/* Email input */}
        <div className="relative">
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="Email Address" 
            className="w-full px-5 py-4 bg-white rounded-sm text-black font-semibold placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-secondary)] transition-all outline-none"
          />
        </div>

        {/* Service Select */}
        <div className="relative group">
          <select 
            name="service" 
            required 
            className="w-full px-5 py-4 bg-white rounded-sm text-black font-bold focus:ring-2 focus:ring-[var(--color-secondary)] transition-all outline-none appearance-none cursor-pointer"
          >
            <option value="">Legal Matter</option>
            {services.map((svc) => (
              <option key={svc.id} value={svc.id}>{svc.title}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-gold w-full py-4.5 rounded-sm flex justify-center items-center gap-3 active:scale-[0.98] transition-transform"
        >
          {loading ? 'Processing...' : (
            <>
              <svg className="w-5 h-5 fill-black" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm font-black">Request Priority Call</span>
            </>
          )}
        </button>

        <div className="pt-2 flex items-center justify-center gap-2 opacity-60">
           <svg className="w-3.5 h-3.5 text-[var(--color-secondary)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
           </svg>
           <span className="text-[11px] font-bold text-white uppercase tracking-wider">Typically responds in &lt; 5 mins</span>
        </div>
      </form>
    </div>
  )
}

