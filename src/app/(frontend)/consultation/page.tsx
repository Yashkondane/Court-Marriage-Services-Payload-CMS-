'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FaCheckCircle, FaSpinner, FaLock, FaShieldAlt, FaBriefcase, FaEnvelope, FaChevronRight } from 'react-icons/fa'

const LEGAL_DOMAINS = [
  { id: 'court-marriage', title: 'Court Marriage', desc: 'Special Marriage Act & Registration' },
  { id: 'family-law', title: 'Family Law', desc: 'Divorce, Custody & Mutual Consent' },
  { id: 'corporate-law', title: 'Corporate Compliance', desc: 'Registrations, Filings & GST' },
  { id: 'property-disputes', title: 'Property Verification', desc: 'Title Check, Due Diligence & Deeds' },
  { id: 'taxation-compliance', title: 'Tax & Audits', desc: 'Income Tax, Filings & Advisory' },
  { id: 'general-consultation', title: 'General Advice', desc: 'Civil Disputes & Custom Issues' },
]

const TIME_SLOTS = [
  { id: 'immediate', label: 'Call within 5 mins', sub: 'High Priority' },
  { id: 'morning', label: 'Morning (9 AM - 12 PM)', sub: 'Next Available' },
  { id: 'afternoon', label: 'Afternoon (12 PM - 4 PM)', sub: 'Convenient Slot' },
  { id: 'evening', label: 'Evening (4 PM - 8 PM)', sub: 'After Work' },
]

export default function ConsultationPage() {
  const [selectedDomain, setSelectedDomain] = useState('court-marriage')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('immediate')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return

    setLoading(true)

    try {
      const preferredTimeLabel = TIME_SLOTS.find(t => t.id === selectedTimeSlot)?.label || 'Immediate'
      const combinedNotes = `Preferred Time: ${preferredTimeLabel}. Client Message: ${message || 'No additional details provided.'}`

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          service: selectedDomain,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          notes: combinedNotes,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      }
    } catch (err) {
      console.error('Error booking consultation:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#fafafa] text-[#111111] min-h-screen font-body flex flex-col justify-between">

      {/* Luxury Hero Banner */}
      <section className="relative bg-[#0a0a0a] text-white py-16 md:py-24 overflow-hidden border-b border-neutral-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/consultation_hero_accent.png"
            alt="Elite Legal Consultation Background"
            fill
            className="object-cover object-center scale-105"
            priority
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-page max-w-6xl mx-auto px-4 relative z-10 text-center space-y-6">
          <span className="text-[var(--color-secondary)] text-[10px] font-black tracking-[0.3em] uppercase block">
            VakilFirst Premium Advisory
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Schedule Your Private <span className="text-[var(--color-secondary)]">Legal Consultation</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto font-semibold leading-relaxed">
            Connect securely with senior advocates and corporate partners. Receive result-oriented strategies tailored exactly to your case.
          </p>
          <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>
      </section>

      {/* Main Form & Trust Panel Layout */}
      <section className="py-12 md:py-20 flex-1">
        <div className="container-page max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Interactive Booking Form */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-6 md:p-10 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient" />

              {success ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-6">
                  <FaCheckCircle className="text-6xl text-[var(--color-secondary)] animate-bounce" />
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-slate-900 uppercase tracking-tight">
                    Consultation Reserved!
                  </h2>
                  <p className="text-sm md:text-base text-slate-500 font-semibold max-w-md leading-relaxed">
                    Our lead legal coordinator has received your details and is assigning the senior-most advocate for your matter. We will call you within 5 minutes.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-xs font-black text-[var(--color-secondary)] hover:underline uppercase tracking-widest"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Step 1: Select Case Domain */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                      1. Select Your Case Category
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {LEGAL_DOMAINS.map((domain) => (
                        <div
                          key={domain.id}
                          onClick={() => setSelectedDomain(domain.id)}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between h-28 hover:shadow-md ${selectedDomain === domain.id
                              ? 'border-[#111] bg-[#111] text-white'
                              : 'border-slate-100 bg-[#fafafa] hover:border-slate-200 text-slate-800'
                            }`}
                        >
                          <span className={`text-lg ${selectedDomain === domain.id ? 'text-[var(--color-secondary)]' : 'text-slate-400'
                            }`}>
                            <FaBriefcase />
                          </span>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider line-clamp-1">
                              {domain.title}
                            </p>
                            <p className={`text-[10px] font-semibold mt-1 line-clamp-1 ${selectedDomain === domain.id ? 'text-white/60' : 'text-slate-400'
                              }`}>
                              {domain.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Floating Labels Details */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                      2. Personal Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="relative">
                        <span className="absolute -top-2.5 left-4 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                          Full Name
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

                      {/* Email */}
                      <div className="relative">
                        <span className="absolute -top-2.5 left-4 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                          Email Address
                        </span>
                        <input
                          type="email"
                          placeholder="Enter Email (Optional)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all bg-white font-semibold"
                        />
                      </div>
                    </div>

                    {/* Code & Mobile */}
                    <div className="flex gap-3 pt-2">
                      {/* Code */}
                      <div className="relative w-1/4 min-w-[90px]">
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
                          Mobile Number
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="Enter Mobile Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all bg-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Time Slot Radio Buttons */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                      3. Preferred Schedule
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => (
                        <div
                          key={slot.id}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all text-center space-y-1 hover:shadow-sm ${selectedTimeSlot === slot.id
                              ? 'border-[var(--color-secondary)] bg-amber-50/20 text-slate-900 shadow-sm ring-1 ring-[var(--color-secondary)]'
                              : 'border-slate-100 bg-[#fafafa] text-slate-500 hover:border-slate-200'
                            }`}
                        >
                          <p className="text-xs font-black uppercase tracking-wider">
                            {slot.label.split(' ')[0]}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400">
                            {slot.sub}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Notes / Case Details */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                      4. Brief Case Context (Optional)
                    </h3>
                    <div className="relative">
                      <span className="absolute -top-2.5 left-4 px-1.5 bg-white text-[10px] font-black uppercase text-slate-400 select-none z-10 tracking-wider">
                        Context
                      </span>
                      <textarea
                        rows={4}
                        placeholder="Please describe your legal matter briefly so we can match you with the right courtroom specialist..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all bg-white font-semibold resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button & Security Compliance */}
                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#111111] hover:bg-black text-white font-black uppercase text-xs tracking-widest py-4.5 rounded-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin text-sm" />
                      ) : (
                        <>
                          <span>Confirm Private Consultation</span>
                          <FaChevronRight className="text-[10px]" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <FaLock className="text-slate-300 text-xs" />
                      <span>100% Encrypted & NDA Protected Case Submissions</span>
                    </div>
                  </div>

                </form>
              )}
            </div>

            {/* Right Column: Premium Trust Panel */}
            <div className="lg:col-span-4 space-y-6">

              {/* Consultation Highlights */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-secondary)]/5 blur-[50px] rounded-full pointer-events-none" />

                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  What to Expect Next
                </h4>

                <div className="space-y-5">
                  {[
                    { num: '1', title: 'Case Pre-screening', desc: 'Our case legal analyst reviews your submission details immediately.' },
                    { num: '2', title: 'Specialist Pairing', desc: 'We select the senior advocate with the highest courtroom success in your domain.' },
                    { num: '3', title: 'Structured Roadmap', desc: 'Receive dedicated advisory with complete flat-fee pricing options.' }
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-sm">
                        {step.num}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-wider text-slate-800">{step.title}</p>
                        <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees List */}
              <div className="bg-[#111111] text-white rounded-2xl p-6 space-y-4 border border-neutral-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/10 blur-[40px] rounded-full pointer-events-none" />

                <h4 className="text-xs font-black uppercase tracking-wider text-[var(--color-secondary)]">
                  VakilFirst Safeguards
                </h4>

                <ul className="space-y-3">
                  {[
                    'Bar Council Certified Senior Advocates Only',
                    'ISO 27001 Data Confidentiality Certified',
                    'Zero Consultation Fee for First 15 Mins Call',
                    'Complete Flat-Fee Transparent Billing Roadmap'
                  ].map((gua, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-wider text-white/80">
                      <FaShieldAlt className="text-[var(--color-secondary)] text-sm shrink-0" />
                      <span>{gua}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Luxury Glassmorphic Testimonial */}
              <div className="bg-[#fafafa] rounded-2xl border border-slate-100 shadow-sm p-6 relative">
                <div className="text-slate-300 text-4xl font-serif absolute -top-2 left-4">“</div>
                <div className="relative z-10 space-y-3">
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed italic">
                    "The initial consultation with VakilFirst clarified all our doubts regarding the Special Marriage Act within minutes. Extremely professional."
                  </p>
                  <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-800">Meera & Aditya</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-secondary)]">New Delhi</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
