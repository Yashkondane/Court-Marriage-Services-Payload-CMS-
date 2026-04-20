'use client'
import React, { useState } from 'react'
import { FaPhoneAlt, FaArrowRight, FaCheckCircle, FaLock } from 'react-icons/fa'

export function InlineLeadForm({ services = [] }: { services?: any[] }) {
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
          service: formData.get('service'),
          sourceUrl: window.location.href,
        }),
      })
      if (res.ok) setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="inline-lead-success">
        <div className="inline-lead-success-icon">
          <FaCheckCircle />
        </div>
        <h3>You&apos;re All Set!</h3>
        <p>A top legal expert will call you within the next <strong>5 minutes</strong>.</p>
        <div className="inline-lead-success-badge">Response Guaranteed</div>
      </div>
    )
  }

  return (
    <div className="inline-lead-card">

      {/* Top badge */}
      <div className="inline-lead-badge">
        <span className="inline-lead-badge-dot" />
        Most Trusted Legal Platform
      </div>

      {/* Header */}
      <div className="inline-lead-header">
        <h3 className="inline-lead-title">
          Get Free Legal<br />
          <span className="inline-lead-title-accent">Expert Callback</span>
        </h3>
        <p className="inline-lead-subtitle">Our lawyers call back within 5 minutes</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="inline-lead-form">

        <div className="inline-lead-field">
          <label className="inline-lead-label">Your Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="inline-lead-input"
          />
        </div>

        <div className="inline-lead-field">
          <label className="inline-lead-label">Phone Number</label>
          <div className="inline-lead-phone-wrap">
            <span className="inline-lead-phone-prefix">
              <FaPhoneAlt />
              +91
            </span>
            <input
              type="tel"
              name="phone"
              required
              placeholder="10-digit mobile number"
              className="inline-lead-input inline-lead-input--phone"
            />
          </div>
        </div>

        <div className="inline-lead-field">
          <label className="inline-lead-label">Legal Matter</label>
          <select name="service" className="inline-lead-select">
            <option value="">Select a service...</option>
            {services.map((svc) => (
              <option key={svc.id} value={svc.id}>{svc.title}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading} className="inline-lead-submit">
          {loading ? (
            <span className="inline-lead-spinner" />
          ) : (
            <>
              <FaPhoneAlt />
              <span>Request Free Callback</span>
              <FaArrowRight className="inline-lead-submit-arrow" />
            </>
          )}
        </button>

        <div className="inline-lead-privacy">
          <FaLock />
          100% confidential. No spam, ever.
        </div>
      </form>
    </div>
  )
}
