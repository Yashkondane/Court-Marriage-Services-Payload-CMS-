'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FaUser, FaBriefcase, FaGraduationCap, FaChartLine, FaSignOutAlt, 
  FaCamera, FaCheckCircle, FaTimesCircle, FaExclamationCircle, 
  FaHistory, FaGlobe, FaMapMarkerAlt, FaClock, FaRupeeSign,
  FaTrashAlt, FaPlus, FaExternalLinkAlt, FaSpinner, FaPhone
} from 'react-icons/fa'

type Tab = 'profile' | 'specializations' | 'messages' | 'analytics'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LawyerProfile = any

export default function LawyerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [lawyer, setLawyer] = useState<LawyerProfile>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Profile form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    phone: '',
    barCouncilId: '',
    experience: '',
    consultationFee: '',
    availableHours: '',
    bio: '',
    locationText: '',
    courts: '',
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
  
  // Leads state
  const [leads, setLeads] = useState<any[]>([])
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)

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
          bio: data.lawyer.bio || '',
          locationText: data.lawyer.locationText || '',
          courts: data.lawyer.courts || '',
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

  const fetchLeads = useCallback(async () => {
    const token = getToken()
    if (!token) return

    setLeadsLoading(true)
    try {
      const res = await fetch('/api/lawyer/leads', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setLeads(data.leads || [])
      }
    } catch {
      setError('Failed to load messages.')
    } finally {
      setLeadsLoading(false)
    }
  }, [])

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) {
        const data = await res.json()
        setAvailableServices(data.docs || [])
      }
    } catch {
      // Silently fail
    }
  }, [])

  useEffect(() => {
    fetchProfile()
    fetchServices()
  }, [fetchProfile, fetchServices])

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchLeads()
    }
  }, [activeTab, fetchLeads])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    setMessage('')

    try {
      const token = getToken()
      const fd = new FormData()
      fd.append('file', file)

      const res = await fetch('/api/lawyer/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      })

      const data = await res.json()
      if (data.success) {
        setMessage('Profile photo updated successfully!')
        // Refresh profile to get the new photo URL
        await fetchProfile()
      } else {
        setError(data.error || 'Failed to upload photo.')
      }
    } catch {
      setError('Network error during upload.')
    } finally {
      setUploading(false)
    }
  }

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
          bio: formData.bio,
          locationText: formData.locationText,
          courts: formData.courts,
          education: education.map(e => ({
            degree: e.degree,
            college: e.college,
            year: e.year ? parseInt(e.year) : undefined,
          })),
          languages,
          specializations: specializations.map(s => ({
            service: s.service ? parseInt(s.service) : undefined,
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

  const statusConfig: Record<string, { color: string; label: string; icon: any }> = {
    pending_review: { color: '#f59e0b', label: 'Pending Review', icon: FaHistory },
    approved: { color: '#10b981', label: 'Approved', icon: FaCheckCircle },
    rejected: { color: '#ef4444', label: 'Rejected', icon: FaTimesCircle },
    suspended: { color: '#6b7280', label: 'Suspended', icon: FaExclamationCircle },
  }

  const currentStatus = statusConfig[lawyer.status] || { color: '#6b7280', label: lawyer.status, icon: FaExclamationCircle }

  return (
    <div className="lawyer-dash">
      {/* Top Bar */}
      <div className="lawyer-dash-topbar">
        <div className="container-page lawyer-dash-topbar-inner">
          <div className="lawyer-dash-topbar-left">
            <h1 className="lawyer-dash-title">Lawyer Dashboard</h1>
            <div className="lawyer-dash-status-pill" style={{ borderColor: currentStatus.color, color: currentStatus.color }}>
              <currentStatus.icon className="text-sm" />
              <span>{currentStatus.label}</span>
            </div>
          </div>
          <div className="lawyer-dash-topbar-right">
            {lawyer.status === 'approved' && (
              <Link href={`/lawyers/${lawyer.slug}`} className="lawyer-dash-view-profile" target="_blank">
                <span>View Public Profile</span>
                <FaExternalLinkAlt className="text-xs" />
              </Link>
            )}
            <button onClick={logout} className="lawyer-dash-logout">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Banners (Clean) */}
      {lawyer.status === 'pending_review' && (
        <div className="lawyer-dash-banner lawyer-dash-banner--warning">
          <FaHistory className="text-xl" />
          <p>
            <strong>Profile Under Review</strong> — Our team is verifying your details. This usually takes less than 24 hours. 
            Complete your profile below to speed up the process.
          </p>
        </div>
      )}

      {lawyer.status === 'rejected' && (
        <div className="lawyer-dash-banner lawyer-dash-banner--error">
          <FaTimesCircle className="text-xl" />
          <p>
            <strong>Profile Rejected</strong> — {lawyer.statusNote || 'Please contact support for more details.'}
          </p>
        </div>
      )}

      <div className="container-page lawyer-dash-content">
        {/* Tabs */}
        <div className="lawyer-dash-tabs">
          {([
            { key: 'profile', label: 'Profile', icon: FaUser },
            { key: 'specializations', label: 'Specializations', icon: FaBriefcase },
            { key: 'messages', label: 'Messages', icon: FaHistory },
            { key: 'analytics', label: 'Analytics', icon: FaChartLine },
          ] as { key: Tab; label: string; icon: any }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`lawyer-dash-tab ${activeTab === tab.key ? 'lawyer-dash-tab--active' : ''}`}
            >
              <tab.icon className="text-base" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Global Messages */}
        <div className="lawyer-dash-msgs">
          {message && <div className="lawyer-dash-msg lawyer-dash-msg--success"><FaCheckCircle /> {message}</div>}
          {error && <div className="lawyer-dash-msg lawyer-dash-msg--error"><FaExclamationCircle /> {error}</div>}
        </div>

        {/* ===== PROFILE TAB ===== */}
        {activeTab === 'profile' && (
          <div className="lawyer-dash-section">
            <div className="lawyer-dash-grid-main">
              {/* Left Column: Photo & Basic */}
              <div className="lawyer-dash-col-left">
                <div className="lawyer-dash-card lawyer-dash-card--center">
                  <div className="lawyer-dash-photo-wrap">
                    <div className="lawyer-dash-photo shadow-lg">
                      {lawyer.photo?.url ? (
                        <Image src={lawyer.photo.url} alt={lawyer.name} fill className="object-cover" />
                      ) : (
                        <div className="lawyer-dash-photo-placeholder">
                          <FaUser className="text-4xl text-gray-300" />
                        </div>
                      )}
                      {uploading && (
                        <div className="lawyer-dash-photo-overlay">
                          <FaSpinner className="animate-spin text-white text-2xl" />
                        </div>
                      )}
                    </div>
                    <button 
                      className="lawyer-dash-upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <FaCamera />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <h3 className="lawyer-dash-user-name">{lawyer.name}</h3>
                  <p className="lawyer-dash-user-sub">{lawyer.designation || 'No designation set'}</p>
                </div>

                <div className="lawyer-dash-card">
                  <h3 className="lawyer-dash-card-title">Practice Info</h3>
                  <div className="space-y-4 pt-4">
                    <div className="lawyer-auth-field">
                      <label><FaPhone className="mr-2" /> Phone</label>
                      <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="lawyer-auth-field">
                      <label><FaMapMarkerAlt className="mr-2" /> Location</label>
                      <input value={formData.locationText} onChange={e => setFormData({...formData, locationText: e.target.value})} placeholder="e.g., Delhi High Court" />
                    </div>
                    <div className="lawyer-auth-field">
                      <label><FaPlus className="mr-2" /> Courts Practicing In</label>
                      <textarea value={formData.courts} onChange={e => setFormData({...formData, courts: e.target.value})} placeholder="e.g., District Civil Court-1, Jamshedpur" rows={2} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Extended Details */}
              <div className="lawyer-dash-col-right">
                <div className="lawyer-dash-card">
                  <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <FaUser className="text-gold" />
                    <h3 className="lawyer-dash-card-title m-0">Professional Profile</h3>
                  </div>
                  <div className="lawyer-dash-form-grid">
                    <div className="lawyer-auth-field">
                      <label>Full Name</label>
                      <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="lawyer-auth-field">
                      <label>Designation</label>
                      <input value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} placeholder="e.g., Senior Advocate" />
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
                      <label><FaRupeeSign className="mr-1" /> Consultation Fee</label>
                      <input value={formData.consultationFee} onChange={e => setFormData({...formData, consultationFee: e.target.value})} placeholder="e.g., ₹500 - ₹2000" />
                    </div>
                    <div className="lawyer-auth-field">
                      <label><FaClock className="mr-2" /> Available Hours</label>
                      <input value={formData.availableHours} onChange={e => setFormData({...formData, availableHours: e.target.value})} placeholder="e.g., Mon-Fri, 9AM-6PM" />
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="lawyer-dash-card">
                  <div className="lawyer-dash-card-header">
                    <div className="flex items-center gap-2">
                      <FaGraduationCap className="text-gold" />
                      <h3 className="lawyer-dash-card-title m-0">Education</h3>
                    </div>
                    <button className="lawyer-dash-add-btn" onClick={() => setEducation([...education, { degree: '', college: '', year: '' }])}>
                      <FaPlus /> <span>Add Degree</span>
                    </button>
                  </div>
                  <div className="space-y-4 pt-4">
                    {education.map((edu, i) => (
                      <div key={i} className="lawyer-dash-array-item border rounded-lg p-4 bg-gray-50/50">
                        <div className="lawyer-dash-grid lawyer-dash-grid--3">
                          <input placeholder="Degree (e.g., LLB)" value={edu.degree} onChange={e => { const arr = [...education]; arr[i].degree = e.target.value; setEducation(arr) }} />
                          <input placeholder="College/University" value={edu.college} onChange={e => { const arr = [...education]; arr[i].college = e.target.value; setEducation(arr) }} />
                          <input type="number" placeholder="Year" value={edu.year} onChange={e => { const arr = [...education]; arr[i].year = e.target.value; setEducation(arr) }} />
                        </div>
                        <button className="lawyer-dash-remove-btn text-red-500 hover:bg-red-50" onClick={() => setEducation(education.filter((_, idx) => idx !== i))}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    ))}
                    {education.length === 0 && <p className="lawyer-dash-empty">No qualifications added.</p>}
                  </div>
                </div>

                {/* Languages Section */}
                <div className="lawyer-dash-card">
                  <div className="lawyer-dash-card-header">
                    <div className="flex items-center gap-2">
                      <FaGlobe className="text-gold" />
                      <h3 className="lawyer-dash-card-title m-0">Languages</h3>
                    </div>
                    <button className="lawyer-dash-add-btn" onClick={() => setLanguages([...languages, { language: '' }])}>
                      <FaPlus /> <span>Add Language</span>
                    </button>
                  </div>
                  <div className="lawyer-dash-tags pt-4">
                    {languages.map((lang, i) => (
                      <div key={i} className="lawyer-dash-tag bg-white border">
                        <input placeholder="e.g., English" value={lang.language} onChange={e => { const arr = [...languages]; arr[i].language = e.target.value; setLanguages(arr) }} />
                        <button onClick={() => setLanguages(languages.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">
                          <FaTimesCircle />
                        </button>
                      </div>
                    ))}
                    {languages.length === 0 && <p className="lawyer-dash-empty">No languages added.</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                   <button className="btn-gold px-12 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all" onClick={saveProfile} disabled={saving}>
                    {saving ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" /> Saving...</div> : 'Save Profile Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== SPECIALIZATIONS TAB ===== */}
        {activeTab === 'specializations' && (
          <div className="lawyer-dash-section">
            <div className="lawyer-dash-card">
              <div className="lawyer-dash-card-header flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FaBriefcase className="text-gold" />
                    <h3 className="lawyer-dash-card-title m-0">Your Practice Areas</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Connect your profile to relevant legal services to be discovered by clients.
                  </p>
                </div>
                <button className="btn-gold !bg-black !text-white px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2" onClick={() => setSpecializations([...specializations, { service: '', title: '', description: '', yearsInField: '' }])}>
                  <FaPlus /> Add Specialization
                </button>
              </div>

              <div className="space-y-6 pt-6">
                {specializations.map((spec, i) => (
                  <div key={i} className="lawyer-dash-spec-card border-l-4 border-gold shadow-sm hover:shadow-md transition-shadow">
                    <div className="lawyer-dash-spec-header border-b bg-gray-50/50">
                      <span className="font-black text-xs uppercase tracking-widest text-gray-400">Specialization #{i + 1}</span>
                      <button className="text-red-500 p-2 hover:bg-red-50 rounded" onClick={() => setSpecializations(specializations.filter((_, idx) => idx !== i))}>
                        <FaTrashAlt />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="lawyer-dash-grid">
                        <div className="lawyer-auth-field">
                          <label>Service Category</label>
                          <select value={spec.service} onChange={e => { const arr = [...specializations]; arr[i].service = e.target.value; setSpecializations(arr) }}>
                            <option value="">Select a service category...</option>
                            {availableServices.map(svc => (
                              <option key={svc.id} value={svc.id}>{svc.title}</option>
                            ))}
                          </select>
                        </div>
                        <div className="lawyer-auth-field">
                          <label>Display Title</label>
                          <input placeholder="e.g., Corporate Lease Expert" value={spec.title} onChange={e => { const arr = [...specializations]; arr[i].title = e.target.value; setSpecializations(arr) }} />
                        </div>
                      </div>
                      <div className="lawyer-auth-field mt-4">
                        <label>Brief Expertise Summary</label>
                        <textarea placeholder="Tell clients about your specific experience in this area..." value={spec.description} onChange={e => { const arr = [...specializations]; arr[i].description = e.target.value; setSpecializations(arr) }} rows={3} />
                      </div>
                      <div className="lawyer-auth-field mt-4" style={{ maxWidth: '240px' }}>
                        <label>Years of Practice in this Area</label>
                        <input type="number" value={spec.yearsInField} onChange={e => { const arr = [...specializations]; arr[i].yearsInField = e.target.value; setSpecializations(arr) }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {specializations.length === 0 && (
                <div className="lawyer-dash-empty-state py-12 text-center bg-gray-50 rounded-xl border border-dashed mt-6">
                  <FaBriefcase className="text-4xl text-gray-200 mx-auto mb-4" />
                  <p className="font-bold text-gray-400">No practice areas listed.</p>
                  <p className="text-sm text-gray-400">Add specializations to appear on service search results.</p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-8">
              <button className="btn-gold px-12 py-4 rounded-xl font-bold shadow-lg" onClick={saveProfile} disabled={saving}>
                {saving ? 'Processing...' : 'Save Specializations'}
              </button>
            </div>
          </div>
        )}

        {/* ===== MESSAGES TAB ===== */}
        {activeTab === 'messages' && (
          <div className="lawyer-dash-section">
            <div className="lawyer-dash-card">
              <div className="lawyer-dash-card-header">
                <div className="flex items-center gap-2">
                  <FaHistory className="text-gold" />
                  <h3 className="lawyer-dash-card-title m-0">Inbound Enquiries</h3>
                </div>
                <div className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  {leads.length} TOTAL
                </div>
              </div>

              <div className="pt-6">
                {leadsLoading ? (
                  <div className="py-20 text-center">
                    <FaSpinner className="animate-spin text-3xl text-gold mx-auto mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching your messages...</p>
                  </div>
                ) : leads.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="lawyer-dash-table">
                      <thead>
                        <tr>
                          <th>Client</th>
                          <th>Contact</th>
                          <th>Subject/Preview</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="font-bold text-gray-900">{lead.name}</td>
                            <td>
                              <div className="text-xs space-y-1">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <FaPhone className="text-[10px]" /> {lead.phone}
                                </div>
                                {lead.email && (
                                  <div className="flex items-center gap-1 text-gray-400">
                                    <FaGlobe className="text-[10px]" /> {lead.email}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="max-w-[200px] truncate text-sm text-gray-600">
                                {lead.message?.split('\n')[0] || 'No subject'}
                              </div>
                            </td>
                            <td className="text-xs text-gray-400">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <button 
                                onClick={() => setSelectedLead(lead)}
                                className="text-gold font-bold text-xs uppercase hover:underline"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="lawyer-dash-empty-state py-20">
                    <FaHistory className="text-4xl text-gray-200 mx-auto mb-4" />
                    <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">No enquiries yet.</p>
                    <p className="text-sm text-gray-400 mt-2">When clients enquire via your profile, they will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lead Detail Modal Backdrop */}
            {selectedLead && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <div>
                      <h3 className="text-lg font-black text-gray-900">Enquiry Details</h3>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
                        Received on {new Date(selectedLead.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
                      <FaTimesCircle className="text-2xl" />
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <span className="block text-[10px] font-black uppercase text-gold tracking-widest mb-2">Client Info</span>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedLead.name}</h4>
                        <div className="space-y-2">
                          <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold transition-colors">
                            <FaPhone className="text-gold" /> {selectedLead.phone}
                          </a>
                          {selectedLead.email && (
                            <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold transition-colors">
                              <FaGlobe className="text-gold" /> {selectedLead.email}
                            </a>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="block text-[10px] font-black uppercase text-gold tracking-widest mb-2">Lead Source</span>
                        <div className="bg-gray-50 p-3 rounded-lg border text-xs text-gray-500 break-all">
                          {selectedLead.sourceUrl || 'Profile Form'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-navy/5 rounded-xl border-l-4 border-gold p-6">
                      <span className="block text-[10px] font-black uppercase text-gold tracking-widest mb-3">Client Message</span>
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {selectedLead.message}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50 border-t flex flex-wrap gap-3">
                    <a href={`tel:${selectedLead.phone}`} className="flex-1 btn-gold py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:translate-y-[-2px] transition-all">
                      <FaPhone /> Call Now
                    </a>
                    <a href={`mailto:${selectedLead.email}`} className="flex-1 bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:translate-y-[-2px] transition-all">
                      <FaGlobe /> Send Email
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ANALYTICS TAB ===== */}
        {activeTab === 'analytics' && (
          <div className="lawyer-dash-section">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Metric Card: Views */}
              <div className="lawyer-dash-card p-8 flex flex-col items-center text-center transition-transform hover:translate-y-[-4px]">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 text-gold">
                  <FaChartLine className="text-2xl" />
                </div>
                <div className="text-3xl font-black text-navy">{lawyer?.profileViews || 0}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Profile Visits</div>
                <p className="text-[10px] text-gray-400 mt-4 italic uppercase font-bold tracking-tighter">Engagement Velocity: Stable</p>
              </div>

              {/* Metric Card: Leads */}
              <div className="lawyer-dash-card p-8 flex flex-col items-center text-center transition-transform hover:translate-y-[-4px]">
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-4 text-navy">
                  <FaHistory className="text-2xl" />
                </div>
                <div className="text-3xl font-black text-navy">{leads.length}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Inbound Leads</div>
                <p className="text-[10px] text-gray-400 mt-4 italic uppercase font-bold tracking-tighter">Conversion Opportunities</p>
              </div>

              {/* Metric Card: Conversion */}
              <div className="lawyer-dash-card p-8 flex flex-col items-center text-center border-l-4 border-gold transition-transform hover:translate-y-[-4px]">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-500">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div className="text-3xl font-black text-navy">
                  {lawyer?.profileViews > 0 ? ((leads.length / lawyer.profileViews) * 100).toFixed(1) : '0.0'}%
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Conversion Efficiency</div>
                <p className="text-[10px] text-gray-400 mt-4 italic uppercase font-bold tracking-tighter">Visits to Enquiry Ratio</p>
              </div>
            </div>

            <div className="lawyer-dash-card p-10 bg-black text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full bg-gold animate-pulse"></div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold">Real-time Performance Metrics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Market Responsiveness</div>
                        <div className="text-gold font-black text-xs uppercase tracking-widest">{lawyer?.responseTime || 'Faster than 90%'}</div>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-gold to-orange-400" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 italic leading-relaxed">
                      Maintaining a response time under 4 hours significantly improves your ranking in national and local search results.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Profile SEO Strength</div>
                        <div className="text-white font-black text-xs uppercase tracking-widest">Premium Status</div>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white/40" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 italic leading-relaxed">
                      Your profile completeness is excellent. Adding more specialized case results can further boost your organic visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {lawyer?.status !== 'approved' && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-8 flex items-center gap-4">
                <FaExclamationCircle className="text-orange-500 text-2xl flex-shrink-0" />
                <div>
                   <h4 className="text-sm font-black text-orange-900 uppercase tracking-widest mb-1">Status: Pending Verification</h4>
                   <p className="text-xs text-orange-800 opacity-80 leading-relaxed font-bold">
                     Your profile is currently under review by our legal compliance team. Analytics will start tracking public traffic once your credentials are verified.
                   </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
