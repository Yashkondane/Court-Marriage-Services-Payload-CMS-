'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaTimes, FaSpinner, FaCheckCircle } from 'react-icons/fa'

const EXCLUDED_PATHS = [
  '/', 
  '/lawyers', 
  '/login', 
  '/register', 
  '/lawyer/login', 
  '/lawyer/register', 
  '/lawyer/dashboard', 
  '/blog', 
  '/news', 
  '/contact', 
  '/about',
  '/consultation',
  '/ask-free-question'
]

export function ServiceLeadPopup() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // 1. Identify if current pathname is a service route
    const isExcluded = EXCLUDED_PATHS.includes(pathname) || 
      pathname.startsWith('/lawyer/') || 
      pathname.startsWith('/api/') || 
      pathname.startsWith('/_next/') || 
      pathname.startsWith('/admin')

    if (isExcluded) return

    // 2. Check session storage to avoid annoying user repeatedly
    const hasClosed = sessionStorage.getItem('service_lead_popup_closed')
    const hasSubmitted = sessionStorage.getItem('service_lead_popup_submitted')
    if (hasClosed || hasSubmitted) return

    // 3. Trigger popup after 30 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [pathname])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('service_lead_popup_closed', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed || !phone) return

    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: '',
          service: pathname.split('/')[1] || 'Service Inquiry',
          sourceUrl: window.location.href,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        sessionStorage.setItem('service_lead_popup_submitted', 'true')
        setTimeout(() => {
          setIsOpen(false)
        }, 3000)
      }
    } catch (err) {
      console.error('Error submitting lead:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
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
              Talk Request Received!
            </h3>
            <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
              Our legal coordinator will call you back within 5 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Header */}
            <h3 className="text-lg font-heading font-black text-slate-800 tracking-wider mb-6">
              TALK TO A LAWYER
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

            {/* Checkbox Term Segment */}
            <div className="flex items-center gap-2.5 mb-6">
              <input 
                type="checkbox" 
                id="popup-agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-slate-300 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)] cursor-pointer"
              />
              <label htmlFor="popup-agree" className="text-xs text-slate-500 font-bold select-none cursor-pointer">
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
          </form>
        )}
      </div>
    </div>
  )
}
