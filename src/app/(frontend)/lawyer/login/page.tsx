'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LawyerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lawyer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed.')
        return
      }

      // Store session in localStorage
      localStorage.setItem('lawyer_token', data.session.access_token)
      localStorage.setItem('lawyer_refresh', data.session.refresh_token)
      localStorage.setItem('lawyer_profile', JSON.stringify(data.lawyer))

      router.push('/lawyer/dashboard')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lawyer-auth-page">
      <div className="lawyer-auth-container lawyer-auth-container--login">
        {/* Left Panel */}
        <div className="lawyer-auth-brand">
          <div className="lawyer-auth-brand-inner">
            <h2 className="lawyer-auth-brand-title">Welcome Back</h2>
            <p className="lawyer-auth-brand-sub">
              Log in to manage your profile, view analytics, and connect with potential clients.
            </p>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="lawyer-auth-form-panel">
          <form onSubmit={handleLogin} className="lawyer-auth-form">
            <h3 className="lawyer-auth-heading">Lawyer Login</h3>
            <p className="lawyer-auth-sub">Access your professional dashboard</p>

            {error && <div className="lawyer-auth-error">{error}</div>}

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
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="lawyer-auth-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="lawyer-auth-link-text">
              Don&apos;t have an account? <Link href="/lawyer/register" className="lawyer-auth-link">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
