'use client'

import React, { useState } from 'react'
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

type Props = {
  lawyerId: string
  lawyerName: string
  lawyerSlug: string
}

export default function LawyerEnquiryForm({ lawyerId, lawyerName, lawyerSlug }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [cooldown, setCooldown] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cooldown > 0) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lawyerId,
          sourceUrl: window.location.href,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        // Set a 1-minute cooldown
        setCooldown(60)
        const timer = setInterval(() => {
          setCooldown(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection.')
    }
  }

  if (status === 'success') {
    return (
      <div className="enquiry-card-premium text-center py-20">
        <FaCheckCircle className="text-6xl text-amber-500 mx-auto mb-6" />
        <h3 className="enquiry-title-premium !mb-2">Enquiry Sent!</h3>
        <p className="enquiry-sub-premium">Adv. {lawyerName} will connect with you soon.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-xs font-bold text-amber-500/60 hover:text-amber-500 underline uppercase tracking-widest"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <div className="enquiry-card-premium">
      <h3 className="enquiry-title-premium">Enquiry to Adv. {lawyerName}</h3>
      <p className="enquiry-sub-premium">Response time: &lt; 24 hours</p>
      
      <form onSubmit={handleSubmit} className="enquiry-form-premium">
        <div className="enquiry-field-premium">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            required 
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="enquiry-field-premium">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            required 
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="enquiry-field-premium">
          <label>Phone Number</label>
          <input 
            type="tel" 
            placeholder="+91 00000 00000" 
            required 
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="enquiry-field-premium">
          <label>Legal Subject</label>
          <input 
            type="text" 
            placeholder="Case Subject" 
            required 
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>

        <div className="enquiry-field-premium">
          <label>Case Details</label>
          <textarea 
            placeholder="Describe your legal matter..." 
            required 
            rows={4}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-rose-500 text-sm font-bold bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
            <FaExclamationCircle />
            <span>{errorMsg}</span>
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === 'loading' || cooldown > 0} 
          className="enquiry-submit-premium"
        >
          {status === 'loading' ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <span>Submit Case</span>
              <FaPaperPlane className="text-sm" />
            </>
          )}
        </button>

        {cooldown > 0 && (
          <div className="text-[10px] text-center text-amber-500/40 font-bold uppercase tracking-widest mt-2 bg-amber-500/5 py-2 rounded-full border border-amber-500/10">
            Cooldown: {cooldown}s
          </div>
        )}
      </form>
    </div>
  )
}

