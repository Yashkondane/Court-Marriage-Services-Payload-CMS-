'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Step = 'create_account' | 'verify_email' | 'onboarding' | 'profile'

export default function LawyerRegisterPage() {
  const [step, setStep] = useState<Step>('create_account')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  // Step 1 form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  // Step 3 (onboarding) form
  const [barCouncilId, setBarCouncilId] = useState('')
  const [designation, setDesignation] = useState('')
  const [experience, setExperience] = useState('')
  const [locationText, setLocationText] = useState('')

  // Step 1: Create Account
  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lawyer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Registration failed.')
        return
      }

      setStep('verify_email')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Check email verification status
  async function checkVerification() {
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email, password,
      })

      if (signInError) {
        if (signInError.message?.includes('Email not confirmed')) {
          setError('Email not verified yet. Please check your inbox and click the confirmation link.')
        } else {
          setError(signInError.message)
        }
        return
      }

      if (data.session) {
        setToken(data.session.access_token)
        setStep('onboarding')
      }
    } catch {
      setError('Failed to verify. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Submit onboarding info
  async function handleOnboarding(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lawyer/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          barCouncilId,
          designation,
          experience: experience ? parseInt(experience) : undefined,
          locationText,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to save.')
        return
      }

      setStep('profile')
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lawyer-auth-page">
      <div className="lawyer-auth-container">
        {/* Left - Branding Panel */}
        <div className="lawyer-auth-brand">
          <div className="lawyer-auth-brand-inner">
            <div className="flex items-center gap-2 mb-10">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-[var(--color-secondary)] rounded-sm rotate-45" />
                <div className="relative z-10 text-[#0a0a0a] font-black text-sm italic flex items-center justify-center -mb-0.5">V</div>
              </div>
              <span className="text-lg font-heading font-extrabold text-[var(--color-secondary)] tracking-widest uppercase">
                VakilFirst
              </span>
            </div>
            
            <h2 className="lawyer-auth-brand-title">Join <span style={{color: 'var(--color-secondary)'}}>VakilFirst</span></h2>
            <p className="lawyer-auth-brand-sub">
              Create your legal presence with India's most trusted legal platform. Get discovered by thousands of clients.
            </p>
            <div className="lawyer-auth-brand-stats">
              <div className="lawyer-auth-brand-stat">
                <span className="lawyer-auth-brand-stat-value">25k+</span>
                <span className="lawyer-auth-brand-stat-label">Monthly Visitors</span>
              </div>
              <div className="lawyer-auth-brand-stat">
                <span className="lawyer-auth-brand-stat-value">1.2k+</span>
                <span className="lawyer-auth-brand-stat-label">Verified Lawyers</span>
              </div>
              <div className="lawyer-auth-brand-stat">
                <span className="lawyer-auth-brand-stat-value">98%</span>
                <span className="lawyer-auth-brand-stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form Panel */}
        <div className="lawyer-auth-form-panel">
          {/* Progress Steps */}
          <div className="lawyer-reg-steps">
            {['Account', 'Verify', 'Details', 'Done'].map((label, i) => {
              const stepKeys: Step[] = ['create_account', 'verify_email', 'onboarding', 'profile']
              const currentIdx = stepKeys.indexOf(step)
              const isActive = i <= currentIdx
              return (
                <div key={label} className={`lawyer-reg-step ${isActive ? 'lawyer-reg-step--active' : ''}`}>
                  <div className={`lawyer-reg-step-dot ${isActive ? 'lawyer-reg-step-dot--active' : ''}`}>
                    {i < currentIdx ? '✓' : i + 1}
                  </div>
                  <span className="lawyer-reg-step-label">{label}</span>
                </div>
              )
            })}
          </div>

          {error && (
            <div className="lawyer-auth-error">
              {error}
            </div>
          )}

          {/* ===== STEP 1: Create Account ===== */}
          {step === 'create_account' && (
            <form onSubmit={handleCreateAccount} className="lawyer-auth-form">
              <h3 className="lawyer-auth-heading">Create Your Account</h3>
              <p className="lawyer-auth-sub">Start building your professional profile</p>

              <div className="lawyer-auth-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g., Adv. Priya Sharma"
                  required
                />
              </div>

              <div className="lawyer-auth-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="lawyer-auth-field">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                />
              </div>

              <div className="lawyer-auth-field">
                <label>Phone Number <span className="lawyer-auth-optional">(optional)</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <button type="submit" className="lawyer-auth-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="lawyer-auth-link-text">
                Already have an account? <Link href="/lawyer/login" className="lawyer-auth-link">Login here</Link>
              </p>
            </form>
          )}

          {/* ===== STEP 2: Verify Email ===== */}
          {step === 'verify_email' && (
            <div className="lawyer-auth-form">
              <div className="lawyer-auth-icon-wrap">
                <svg className="lawyer-auth-icon-mail" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="lawyer-auth-heading">Check Your Email</h3>
              <p className="lawyer-auth-sub">
                We&apos;ve sent a verification link to <strong>{email}</strong>. Click the link in the email to verify your account.
              </p>

              <button onClick={checkVerification} className="lawyer-auth-btn" disabled={loading}>
                {loading ? 'Checking...' : 'I\'ve Verified My Email'}
              </button>

              <p className="lawyer-auth-sub" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
                Didn&apos;t receive it? Check your spam folder or wait a minute.
              </p>
            </div>
          )}

          {/* ===== STEP 3: Onboarding Details ===== */}
          {step === 'onboarding' && (
            <form onSubmit={handleOnboarding} className="lawyer-auth-form">
              <h3 className="lawyer-auth-heading">Tell Us About Yourself</h3>
              <p className="lawyer-auth-sub">This helps us verify your profile faster</p>

              <div className="lawyer-auth-field">
                <label>Bar Council Enrollment No.</label>
                <input
                  type="text"
                  value={barCouncilId}
                  onChange={e => setBarCouncilId(e.target.value)}
                  placeholder="e.g., DEL/12345/2020"
                />
              </div>

              <div className="lawyer-auth-field">
                <label>Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  placeholder="e.g., Senior Advocate, Family Law Expert"
                />
              </div>

              <div className="lawyer-auth-row">
                <div className="lawyer-auth-field">
                  <label>Years of Experience</label>
                  <input
                    type="number"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    placeholder="e.g., 8"
                    min="0"
                  />
                </div>
                <div className="lawyer-auth-field">
                  <label>Location</label>
                  <input
                    type="text"
                    value={locationText}
                    onChange={e => setLocationText(e.target.value)}
                    placeholder="e.g., New Delhi"
                  />
                </div>
              </div>

              <button type="submit" className="lawyer-auth-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Continue to Profile'}
              </button>
            </form>
          )}

          {/* ===== STEP 4: Success ===== */}
          {step === 'profile' && (
            <div className="lawyer-auth-form">
              <div className="lawyer-auth-icon-wrap">
                <svg className="lawyer-auth-icon-check" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="lawyer-auth-heading">You&apos;re All Set!</h3>
              <p className="lawyer-auth-sub">
                Your profile is under review. Our team will verify your details within 24 hours. 
                Meanwhile, you can complete your profile with specializations and more details.
              </p>
              <Link href="/lawyer/dashboard" className="lawyer-auth-btn" style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
