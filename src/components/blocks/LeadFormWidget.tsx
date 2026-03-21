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
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
        <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Request Received!</h3>
        <p className="text-gray-600">Our legal team will contact you shortly on WhatsApp.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-left text-slate-900 border border-slate-100">
      <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Get Instant Quote</h3>
      <p className="text-gray-500 mb-6 text-sm">Fill in your details — we'll reply on WhatsApp!</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          required 
          placeholder="Your Full Name" 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#facc15] focus:border-transparent transition-all outline-none"
        />
        <input 
          type="tel" 
          name="phone" 
          required 
          placeholder="Your Phone Number" 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#facc15] focus:border-transparent transition-all outline-none"
        />
        <select 
          name="service" 
          required 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#facc15] focus:border-transparent transition-all outline-none bg-white text-gray-700"
        >
          <option value="">Select Service...</option>
          <option value="Court Marriage">Court Marriage</option>
          <option value="Divorce Matters">Divorce Matters</option>
          <option value="Property Dispute">Property Dispute</option>
          <option value="Consumer Case">Consumer Case</option>
          <option value="Other Consulting">Other Consulting</option>
        </select>
        <textarea 
          name="message" 
          rows={3}
          placeholder="Briefly describe your legal issue (optional)" 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#facc15] focus:border-transparent transition-all outline-none resize-none text-gray-700"
        ></textarea>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#facc15] text-[var(--color-primary-dark)] font-bold py-4 rounded-lg hover:bg-yellow-500 transition-colors flex justify-center items-center gap-2"
        >
          {loading ? 'Submitting...' : 'Book on WhatsApp'}
        </button>
      </form>
    </div>
  )
}
