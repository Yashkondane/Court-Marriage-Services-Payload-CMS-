'use client'
import React, { useState } from 'react'

export function LeadFormWidget() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          service: formData.get('service'),
          message: formData.get('message'),
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
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border-t-4 border-[#1a365d]">
        <div className="w-16 h-16 bg-blue-50 text-[#1a365d] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1a365d] mb-4">Request Received!</h3>
        <p className="text-slate-600 font-medium">Our legal team will contact you shortly on WhatsApp.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-0 rounded-2xl shadow-2xl text-left text-slate-900 border border-slate-100 relative overflow-hidden flex flex-col">
      <div className="bg-[#1a365d] p-6 pb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-1 font-heading relative z-10">Get Instant Quote</h3>
        <p className="text-blue-100 text-sm font-medium relative z-10">Fill in your details — we'll reply on WhatsApp!</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 flex-1 bg-white">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            placeholder="e.g. Rahul Sharma" 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1a365d] focus:border-transparent transition-all outline-none bg-slate-50 text-slate-900 placeholder:text-slate-400"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
          <input 
            type="tel" 
            name="phone" 
            required 
            placeholder="e.g. +91 98765 43210" 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1a365d] focus:border-transparent transition-all outline-none bg-slate-50 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Legal Service</label>
          <select 
            name="service" 
            required 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1a365d] focus:border-transparent transition-all outline-none bg-slate-50 text-slate-800"
          >
            <option value="">Select Service...</option>
            <option value="Court Marriage">Court Marriage</option>
            <option value="Divorce Matters">Divorce Matters</option>
            <option value="Property Dispute">Property Dispute</option>
            <option value="Consumer Case">Consumer Case</option>
            <option value="Other Consulting">Other Consulting</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Message (Optional)</label>
          <textarea 
            name="message" 
            rows={2}
            placeholder="Describe your legal issue..." 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1a365d] focus:border-transparent transition-all outline-none resize-none text-slate-800 bg-slate-50 placeholder:text-slate-400"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#1a365d] text-white font-bold py-4 rounded-xl hover:bg-[#2a4a7f] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex justify-center items-center gap-2 mt-4"
        >
          {loading ? 'Submitting...' : (
            <>
              <span>Get Free Consultation</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
