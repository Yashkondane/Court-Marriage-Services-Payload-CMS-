import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { FaStar, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaGraduationCap, FaLanguage, FaMoneyBillWave, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'lawyers',
    where: { slug: { equals: slug }, status: { equals: 'approved' } },
    limit: 1,
  })

  const lawyer = result.docs[0]
  if (!lawyer) return { title: 'Lawyer Not Found' }

  return {
    title: `${lawyer.name} — ${lawyer.designation || 'Lawyer'} | VakilFirst`,
    description: `Consult with ${lawyer.name}, an experienced ${lawyer.designation || 'lawyer'} on VakilFirst. ${lawyer.experience ? `${lawyer.experience}+ years of experience.` : ''}`,
  }
}

export default async function LawyerProfilePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'lawyers',
    where: { slug: { equals: slug }, status: { equals: 'approved' } },
    limit: 1,
    depth: 2,
  })

  const lawyer = result.docs[0]
  if (!lawyer) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const photo = lawyer.photo as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const specs = (lawyer.specializations as any[]) || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const education = (lawyer.education as any[]) || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const languages = (lawyer.languages as any[]) || []

  // Increment profile views (fire-and-forget)
  payload.update({
    collection: 'lawyers',
    id: lawyer.id,
    data: { profileViews: ((lawyer.profileViews as number) || 0) + 1 },
  }).catch(() => {})

  return (
    <div className="lawyer-profile-page">
      {/* Hero Section */}
      <div className="lawyer-profile-hero">
        <div className="container-page">
          <div className="lawyer-profile-hero-grid">
            {/* Photo */}
            <div className="lawyer-profile-photo-wrap">
              {photo?.url ? (
                <Image
                  src={photo.url}
                  alt={lawyer.name as string}
                  width={200}
                  height={200}
                  className="lawyer-profile-photo"
                  quality={80}
                />
              ) : (
                <div className="lawyer-profile-photo-placeholder">
                  {(lawyer.name as string)?.charAt(0)?.toUpperCase()}
                </div>
              )}
              {lawyer.isSponsored && (
                <span className="lawyer-profile-sponsored-badge">⭐ SPONSORED</span>
              )}
              {lawyer.isPremiumPartner && (
                <span className="lawyer-profile-premium-badge">💎 PREMIUM PARTNER</span>
              )}
            </div>

            {/* Info */}
            <div className="lawyer-profile-hero-info">
              <h1 className="lawyer-profile-name">{lawyer.name as string}</h1>
              {lawyer.designation && (
                <p className="lawyer-profile-designation">{lawyer.designation as string}</p>
              )}

              <div className="lawyer-profile-meta">
                {lawyer.experience && (
                  <span className="lawyer-profile-meta-item">
                    <FaCalendarAlt /> {lawyer.experience as number}+ years experience
                  </span>
                )}
                {lawyer.locationText && (
                  <span className="lawyer-profile-meta-item">
                    <FaMapMarkerAlt /> {lawyer.locationText as string}
                  </span>
                )}
                {lawyer.responseTime && (
                  <span className="lawyer-profile-meta-item">
                    <FaClock /> {lawyer.responseTime as string}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="lawyer-profile-rating">
                <div className="lawyer-profile-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar
                      key={star}
                      className={star <= Math.round(lawyer.rating as number || 0) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <span className="lawyer-profile-rating-text">
                  {(lawyer.rating as number)?.toFixed(1) || '0.0'} ({lawyer.ratingCount || 0} reviews)
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="lawyer-profile-cta">
                {lawyer.phone && (
                  <a href={`tel:${lawyer.phone}`} className="lawyer-profile-btn-gold">
                    <FaPhone /> Call Now
                  </a>
                )}
                {lawyer.email && (
                  <a href={`mailto:${lawyer.email}`} className="lawyer-profile-btn-outline">
                    <FaEnvelope /> Send Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-page lawyer-profile-body">
        <div className="lawyer-profile-body-grid">
          {/* Main Content */}
          <div className="lawyer-profile-main">
            {/* Specializations */}
            {specs.length > 0 && (
              <section className="lawyer-profile-section">
                <h2 className="lawyer-profile-section-title">Practice Areas</h2>
                <div className="lawyer-profile-specs-grid">
                  {specs.map((spec, i) => (
                    <div key={i} className="lawyer-profile-spec-card">
                      <h3>{spec.title}</h3>
                      {spec.description && <p>{spec.description}</p>}
                      {spec.yearsInField && (
                        <span className="lawyer-profile-spec-years">{spec.yearsInField} years in this field</span>
                      )}
                      {spec.service && typeof spec.service === 'object' && (
                        <Link href={`/${spec.service.slug}`} className="lawyer-profile-spec-link">
                          View {spec.service.title} →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bio */}
            {lawyer.bio && (
              <section className="lawyer-profile-section">
                <h2 className="lawyer-profile-section-title">About</h2>
                <div className="rich-text">
                  {/* Bio is richText from Payload — render as needed */}
                  <p>Professional bio available on full profile.</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lawyer-profile-sidebar">
            {/* Quick Info Card */}
            <div className="lawyer-profile-sidebar-card">
              <h3>Quick Info</h3>
              <ul className="lawyer-profile-sidebar-list">
                {lawyer.barCouncilId && (
                  <li><FaShieldAlt /> <span>Bar Council: {lawyer.barCouncilId as string}</span></li>
                )}
                {lawyer.consultationFee && (
                  <li><FaMoneyBillWave /> <span>Fee: {lawyer.consultationFee as string}</span></li>
                )}
                {lawyer.availableHours && (
                  <li><FaClock /> <span>{lawyer.availableHours as string}</span></li>
                )}
                {languages.length > 0 && (
                  <li><FaLanguage /> <span>{languages.map(l => l.language).join(', ')}</span></li>
                )}
              </ul>
            </div>

            {/* Education Card */}
            {education.length > 0 && (
              <div className="lawyer-profile-sidebar-card">
                <h3>Education</h3>
                <ul className="lawyer-profile-sidebar-list">
                  {education.map((edu, i) => (
                    <li key={i}>
                      <FaGraduationCap />
                      <span>{edu.degree} — {edu.college} {edu.year ? `(${edu.year})` : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lead Capture Card */}
            <div className="lawyer-profile-sidebar-card lawyer-profile-lead-card">
              <h3>Book a Consultation</h3>
              <p>Get expert advice from {lawyer.name as string}</p>
              <Link href={`/consultation?lawyer=${lawyer.slug}`} className="lawyer-profile-btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Book Free Consultation
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
