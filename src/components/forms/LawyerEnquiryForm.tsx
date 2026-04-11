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
      <div className="enquiry-card-v2 text-center py-12">
        <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h3 className="enquiry-title-v2">Enquiry Sent!</h3>
        <p className="text-gray-600 mb-6">Adv. {lawyerName} will get back to you shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-sm font-bold text-gray-400 hover:text-gray-600 underline"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <div className="enquiry-card-v2">
      <h3 className="enquiry-title-v2">Enquiry to Adv. {lawyerName}</h3>
      
      <form onSubmit={handleSubmit} className="enquiry-form-v2">
        <div className="enquiry-field-v2">
          <label>Name<span>*</span></label>
          <input 
            type="text" 
            placeholder="Enter Name" 
            required 
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="enquiry-field-v2">
          <label>Email<span>*</span></label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            required 
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="enquiry-field-v2">
          <label>Phone<span>*</span></label>
          <input 
            type="tel" 
            placeholder="Enter Phone" 
            required 
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="enquiry-field-v2">
          <label>Subject<span>*</span></label>
          <input 
            type="text" 
            placeholder="Enter Subject" 
            required 
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>

        <div className="enquiry-field-v2">
          <label>Message<span>*</span></label>
          <textarea 
            placeholder="Enter Message" 
            required 
            rows={4}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm font-bold">
            <FaExclamationCircle />
            <span>{errorMsg}</span>
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === 'loading' || cooldown > 0} 
          className="enquiry-submit-v2"
        >
          {status === 'loading' ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <span>Submit</span>
              <FaPaperPlane className="text-sm" />
            </>
          )}
        </button>

        {cooldown > 0 && (
          <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-2">
            Please wait {cooldown}s before sending another
          </p>
        )}
      </form>
    </div>
  )
}
