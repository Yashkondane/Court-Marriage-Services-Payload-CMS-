'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Tab = 'profile' | 'specializations' | 'analytics'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LawyerProfile = any

export default function LawyerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [lawyer, setLawyer] = useState<LawyerProfile>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Profile form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    phone: '',
    barCouncilId: '',
    experience: '',
    consultationFee: '',
    availableHours: '',
    locationText: '',
    responseTime: '',
  })

  // Education state
  const [education, setEducation] = useState<{ degree: string; college: string; year: string }[]>([])

  // Languages state
  const [languages, setLanguages] = useState<{ language: string }[]>([])

  // Specializations state
  const [specializations, setSpecializations] = useState<{
    service: string;
    title: string;
    description: string;
    yearsInField: string;
  }[]>([])

  // Available services for specialization select
  const [availableServices, setAvailableServices] = useState<{ id: string; title: string; slug: string }[]>([])

  const getToken = () => localStorage.getItem('lawyer_token')

  const fetchProfile = useCallback(async () => {
    const token = getToken()
    if (!token) {
      router.push('/lawyer/login')
      return
    }

    try {
      const res = await fetch('/api/lawyer/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 401) {
        localStorage.removeItem('lawyer_token')
        localStorage.removeItem('lawyer_refresh')
        localStorage.removeItem('lawyer_profile')
        router.push('/lawyer/login')
        return
      }

      const data = await res.json()
      if (data.success) {
        setLawyer(data.lawyer)
        setFormData({
          name: data.lawyer.name || '',
          designation: data.lawyer.designation || '',
          phone: data.lawyer.phone || '',
          barCouncilId: data.lawyer.barCouncilId || '',
          experience: data.lawyer.experience?.toString() || '',
          consultationFee: data.lawyer.consultationFee || '',
          availableHours: data.lawyer.availableHours || '',
          locationText: data.lawyer.locationText || '',
          responseTime: data.lawyer.responseTime || '',
        })
        setEducation(
          data.lawyer.education?.map((e: { degree: string; college: string; year: number }) => ({
            degree: e.degree || '', college: e.college || '', year: e.year?.toString() || '',
          })) || []
        )
        setLanguages(data.lawyer.languages || [])
        setSpecializations(
          data.lawyer.specializations?.map((s: { service: { id: string } | string; title: string; description: string; yearsInField: number }) => ({
            service: typeof s.service === 'object' ? s.service.id : s.service || '',
            title: s.title || '',
            description: s.description || '',
            yearsInField: s.yearsInField?.toString() || '',
          })) || []
        )
      }
    } catch {
      setError('Failed to load profile.')
    } finally {
      setLoading(false)
    }
  }, [router])

  // Fetch services list for specialization dropdown
  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) {
        const data = await res.json()
        setAvailableServices(data.docs || [])
      }
    } catch {
      // Silently fail - services might not be available via API
    }
  }, [])

  useEffect(() => {
    fetchProfile()
    fetchServices()
  }, [fetchProfile, fetchServices])

  async function saveProfile() {
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const token = getToken()
      const res = await fetch('/api/lawyer/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          experience: formData.experience ? parseInt(formData.experience) : undefined,
          education: education.map(e => ({
            degree: e.degree,
            college: e.college,
            year: e.year ? parseInt(e.year) : undefined,
          })),
          languages,
          specializations: specializations.map(s => ({
            service: s.service,
            title: s.title,
            description: s.description,
            yearsInField: s.yearsInField ? parseInt(s.yearsInField) : undefined,
          })),
        }),
      })

      const data = await res.json()
      if (data.success) {
        setMessage('Profile saved successfully!')
        setLawyer(data.lawyer)
      } else {
        setError(data.error || 'Failed to save.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setSaving(false)
    }
  }

  function logout() {
    localStorage.removeItem('lawyer_token')
    localStorage.removeItem('lawyer_refresh')
    localStorage.removeItem('lawyer_profile')
    router.push('/lawyer/login')
  }

  if (loading) {
    return (
      <div className="lawyer-dash-loading">
        <div className="lawyer-dash-spinner" />
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  if (!lawyer) return null

  const statusColors: Record<string, string> = {
    pending_review: '#f59e0b',
    approved: '#10b981',
    rejected: '#ef4444',
    suspended: '#6b7280',
  }

  const statusLabels: Record<string, string> = {
    pending_review: '⏳ Pending Review',
    approved: '✅ Approved',
    rejected: '❌ Rejected',
    suspended: '🚫 Suspended',
  }

  return (
    <div className="lawyer-dash">
      {/* Top Bar */}
      <div className="lawyer-dash-topbar">
        <div className="container-page lawyer-dash-topbar-inner">
          <div className="lawyer-dash-topbar-left">
            <h1 className="lawyer-dash-title">Lawyer Dashboard</h1>
            <span
              className="lawyer-dash-status-badge"
              style={{ background: statusColors[lawyer.status] || '#6b7280' }}
            >
              {statusLabels[lawyer.status] || lawyer.status}
            </span>
          </div>
          <div className="lawyer-dash-topbar-right">
            {lawyer.status === 'approved' && (
              <Link href={`/lawyers/${lawyer.slug}`} className="lawyer-dash-view-profile" target="_blank">
                View Public Profile ↗
              </Link>
            )}
            <button onClick={logout} className="lawyer-dash-logout">Logout</button>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      {lawyer.status === 'pending_review' && (
        <div className="lawyer-dash-banner lawyer-dash-banner--warning">
          <strong>Profile Under Review</strong> — Our team is verifying your details. This usually takes less than 24 hours. 
          Complete your profile below to speed up the process.
        </div>
      )}

      {lawyer.status === 'rejected' && (
        <div className="lawyer-dash-banner lawyer-dash-banner--error">
          <strong>Profile Rejected</strong> — {lawyer.statusNote || 'Please contact support for more details.'}
        </div>
      )}

      <div className="container-page lawyer-dash-content">
        {/* Tabs */}
        <div className="lawyer-dash-tabs">
          {([
            { key: 'profile', label: 'Profile' },
            { key: 'specializations', label: 'Specializations' },
            { key: 'analytics', label: 'Analytics' },
          ] as { key: Tab; label: string }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`lawyer-dash-tab ${activeTab === tab.key ? 'lawyer-dash-tab--active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        {message && <div className="lawyer-dash-msg lawyer-dash-msg--success">{message}</div>}
        {error && <div className="lawyer-dash-msg lawyer-dash-msg--error">{error}</div>}

        {/* ===== PROFILE TAB ===== */}
        {activeTab === 'profile' && (
          <div className="lawyer-dash-section">
            <div className="lawyer-dash-card">
              <h3 className="lawyer-dash-card-title">Basic Information</h3>
              <div className="lawyer-dash-grid">
                <div className="lawyer-auth-field">
                  <label>Full Name</label>
                  <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="lawyer-auth-field">
                  <label>Designation</label>
                  <input value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} placeholder="e.g., Senior Advocate" />
                </div>
                <div className="lawyer-auth-field">
                  <label>Phone</label>
                  <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="lawyer-auth-field">
                  <label>Bar Council No.</label>
                  <input value={formData.barCouncilId} onChange={e => setFormData({...formData, barCouncilId: e.target.value})} />
                </div>
                <div className="lawyer-auth-field">
                  <label>Experience (years)</label>
                  <input type="number" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
                </div>
                <div className="lawyer-auth-field">
                  <label>Location</label>
                  <input value={formData.locationText} onChange={e => setFormData({...formData, locationText: e.target.value})} placeholder="e.g., Connaught Place, Delhi" />
                </div>
                <div className="lawyer-auth-field">
                  <label>Consultation Fee</label>
                  <input value={formData.consultationFee} onChange={e => setFormData({...formData, consultationFee: e.target.value})} placeholder="e.g., ₹500 - ₹2000" />
                </div>
                <div className="lawyer-auth-field">
                  <label>Available Hours</label>
                  <input value={formData.availableHours} onChange={e => setFormData({...formData, availableHours: e.target.value})} placeholder="e.g., Mon-Fri, 9AM-6PM" />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="lawyer-dash-card">
              <div className="lawyer-dash-card-header">
                <h3 className="lawyer-dash-card-title">Education</h3>
                <button className="lawyer-dash-add-btn" onClick={() => setEducation([...education, { degree: '', college: '', year: '' }])}>+ Add</button>
              </div>
              {education.map((edu, i) => (
                <div key={i} className="lawyer-dash-array-item">
                  <div className="lawyer-dash-grid lawyer-dash-grid--3">
                    <input placeholder="Degree (e.g., LLB)" value={edu.degree} onChange={e => { const arr = [...education]; arr[i].degree = e.target.value; setEducation(arr) }} />
                    <input placeholder="College" value={edu.college} onChange={e => { const arr = [...education]; arr[i].college = e.target.value; setEducation(arr) }} />
                    <input type="number" placeholder="Year" value={edu.year} onChange={e => { const arr = [...education]; arr[i].year = e.target.value; setEducation(arr) }} />
                  </div>
                  <button className="lawyer-dash-remove-btn" onClick={() => setEducation(education.filter((_, idx) => idx !== i))}>✕</button>
                </div>
              ))}
              {education.length === 0 && <p className="lawyer-dash-empty">No education added yet.</p>}
            </div>

            {/* Languages */}
            <div className="lawyer-dash-card">
              <div className="lawyer-dash-card-header">
                <h3 className="lawyer-dash-card-title">Languages</h3>
                <button className="lawyer-dash-add-btn" onClick={() => setLanguages([...languages, { language: '' }])}>+ Add</button>
              </div>
              <div className="lawyer-dash-tags">
                {languages.map((lang, i) => (
                  <div key={i} className="lawyer-dash-tag">
                    <input placeholder="e.g., Hindi" value={lang.language} onChange={e => { const arr = [...languages]; arr[i].language = e.target.value; setLanguages(arr) }} />
                    <button onClick={() => setLanguages(languages.filter((_, idx) => idx !== i))}>✕</button>
                  </div>
                ))}
              </div>
              {languages.length === 0 && <p className="lawyer-dash-empty">No languages added yet.</p>}
            </div>

            <button className="lawyer-auth-btn" onClick={saveProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        )}

        {/* ===== SPECIALIZATIONS TAB ===== */}
        {activeTab === 'specializations' && (
          <div className="lawyer-dash-section">
            <div className="lawyer-dash-card">
              <div className="lawyer-dash-card-header">
                <div>
                  <h3 className="lawyer-dash-card-title">Your Practice Areas</h3>
                  <p className="lawyer-dash-card-desc">
                    Add your specializations. Each one links to a service so clients can find you on the right pages.
                  </p>
                </div>
                <button className="lawyer-dash-add-btn" onClick={() => setSpecializations([...specializations, { service: '', title: '', description: '', yearsInField: '' }])}>
                  + Add Specialization
                </button>
              </div>

              {specializations.map((spec, i) => (
                <div key={i} className="lawyer-dash-spec-card">
                  <div className="lawyer-dash-spec-header">
                    <span className="lawyer-dash-spec-num">#{i + 1}</span>
                    <button className="lawyer-dash-remove-btn" onClick={() => setSpecializations(specializations.filter((_, idx) => idx !== i))}>Remove</button>
                  </div>
                  <div className="lawyer-dash-grid">
                    <div className="lawyer-auth-field">
                      <label>Service Area</label>
                      <select value={spec.service} onChange={e => { const arr = [...specializations]; arr[i].service = e.target.value; setSpecializations(arr) }}>
                        <option value="">Select a service...</option>
                        {availableServices.map(svc => (
                          <option key={svc.id} value={svc.id}>{svc.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="lawyer-auth-field">
                      <label>Your Title</label>
                      <input placeholder="e.g., Divorce Lawyer" value={spec.title} onChange={e => { const arr = [...specializations]; arr[i].title = e.target.value; setSpecializations(arr) }} />
                    </div>
                  </div>
                  <div className="lawyer-auth-field">
                    <label>Description</label>
                    <textarea placeholder="Describe your expertise in this area..." value={spec.description} onChange={e => { const arr = [...specializations]; arr[i].description = e.target.value; setSpecializations(arr) }} rows={3} />
                  </div>
                  <div className="lawyer-auth-field" style={{ maxWidth: '200px' }}>
                    <label>Years in this field</label>
                    <input type="number" value={spec.yearsInField} onChange={e => { const arr = [...specializations]; arr[i].yearsInField = e.target.value; setSpecializations(arr) }} />
                  </div>
                </div>
              ))}

              {specializations.length === 0 && (
                <div className="lawyer-dash-empty-state">
                  <p>No specializations added yet.</p>
                  <p>Add your practice areas so clients can find you on relevant service pages.</p>
                </div>
              )}
            </div>

            <button className="lawyer-auth-btn" onClick={saveProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save Specializations'}
            </button>
          </div>
        )}

        {/* ===== ANALYTICS TAB ===== */}
        {activeTab === 'analytics' && (
          <div className="lawyer-dash-section">
            <div className="lawyer-dash-analytics-grid">
              <div className="lawyer-dash-analytics-card">
                <span className="lawyer-dash-analytics-value">{lawyer.profileViews || 0}</span>
                <span className="lawyer-dash-analytics-label">Profile Views</span>
              </div>
              <div className="lawyer-dash-analytics-card">
                <span className="lawyer-dash-analytics-value">{lawyer.rating?.toFixed(1) || '0.0'}</span>
                <span className="lawyer-dash-analytics-label">Average Rating</span>
              </div>
              <div className="lawyer-dash-analytics-card">
                <span className="lawyer-dash-analytics-value">{lawyer.ratingCount || 0}</span>
                <span className="lawyer-dash-analytics-label">Total Reviews</span>
              </div>
              <div className="lawyer-dash-analytics-card">
                <span className="lawyer-dash-analytics-value">{lawyer.specializations?.length || 0}</span>
                <span className="lawyer-dash-analytics-label">Specializations</span>
              </div>
            </div>

            {lawyer.status !== 'approved' && (
              <div className="lawyer-dash-banner lawyer-dash-banner--info">
                Analytics will be more detailed once your profile is approved and live.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
