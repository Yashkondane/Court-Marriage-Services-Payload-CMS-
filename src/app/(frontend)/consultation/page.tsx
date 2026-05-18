'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaTimes, FaSpinner, FaCheckCircle, FaLock } from 'react-icons/fa'

const LEGAL_SERVICES = [
  { value: 'court-marriage', label: 'Court Marriage & Registration' },
  { value: 'family-law', label: 'Family Law & Mutual Consent' },
  { value: 'corporate-law', label: 'Corporate & MSME Registration' },
  { value: 'property-disputes', label: 'Property Title Verification' },
  { value: 'taxation-compliance', label: 'Taxation & GST Compliance' },
  { value: 'general-consultation', label: 'General Legal Advisory' },
]

export default function ConsultationPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('court-marriage')
  const [location, setLocation] = useState('')
  const [agreed, setAgreed] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Redirect back or to home if closed
  const handleClose = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !location) return

    setLoading(true)

    try {
      const selectedServiceLabel = LEGAL_SERVICES.find(s => s.value === service)?.label || service
      const combinedNotes = `Consultation Request. Client Location: ${location}`

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: '',
          service: selectedServiceLabel,
          sourceUrl: window.location.href,
          notes: combinedNotes,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    } catch (err) {
      console.error('Error submitting consultation popup:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505]/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative border border-slate-100 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <FaTimes className="text-base" />
        </button>

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <FaCheckCircle className="text-5xl text-[var(--color-secondary)] animate-bounce" />
            <h3 className="text-xl font-heading font-black text-slate-900 uppercase tracking-tight">
              Consultation Reserved!
            </h3>
            <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
              Our lead legal coordinator will call you back within 5 minutes. Redirecting you to homepage...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Header */}
            <h3 className="text-base font-heading font-black text-slate-800 tracking-wider mb-6">
              BOOK AN ELITE CONSULTATION
            </h3>

            {/* Name Input - Border Label Design */}
            <div className="relative mb-6">
              <span className="absolute -top-2.5 left-4 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                Name
              </span>
              <input 
                type="text" 
                required 
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all bg-white font-semibold"
              />
            </div>

            {/* Code & Mobile Inputs - Side-by-Side with Border Label Design */}
            <div className="flex gap-3 mb-6">
              {/* Code */}
              <div className="relative w-1/3">
                <span className="absolute -top-2.5 left-3 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                  Code
                </span>
                <input 
                  type="text" 
                  readOnly
                  value="IN(+91)"
                  className="w-full border border-slate-200 rounded-lg px-2 py-3.5 text-sm text-slate-800 focus:outline-none bg-slate-50 text-center font-bold cursor-not-allowed select-none"
                />
              </div>

              {/* Mobile */}
              <div className="relative flex-1">
                <span className="absolute -top-2.5 left-4 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                  Mobile
                </span>
                <input 
                  type="tel" 
                  required 
                  placeholder="Enter Mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all bg-white font-semibold"
                />
              </div>
            </div>

            {/* Service Selection - Border Label Design */}
            <div className="relative mb-6">
              <span className="absolute -top-2.5 left-4 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                Desired Legal Service
              </span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all bg-white font-semibold appearance-none cursor-pointer"
              >
                {LEGAL_SERVICES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Input - Border Label Design */}
            <div className="relative mb-6">
              <span className="absolute -top-2.5 left-4 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                City / Location
              </span>
              <input 
                type="text" 
                required 
                placeholder="e.g., Delhi, Mumbai, Noida"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all bg-white font-semibold"
              />
            </div>

            {/* Checkbox Term Segment */}
            <div className="flex items-center gap-2.5 mb-6">
              <input 
                type="checkbox" 
                id="consultation-agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-slate-300 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)] cursor-pointer"
              />
              <label htmlFor="consultation-agree" className="text-xs text-slate-500 font-bold select-none cursor-pointer">
                I agree to <span className="text-[var(--color-secondary)] underline font-black">terms and conditions</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading || !agreed}
              className="w-full bg-[#111111] hover:bg-black text-white font-black uppercase text-xs tracking-widest py-4 rounded-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-sm" />
              ) : (
                'Submit'
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-4">
              <FaLock className="text-slate-300 text-xs" />
              <span>100% Encrypted & Confidential</span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
