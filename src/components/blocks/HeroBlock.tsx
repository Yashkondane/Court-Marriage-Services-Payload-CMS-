import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'
import { SearchBar } from './SearchBar'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  FaBalanceScale,
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaFileAlt,
  FaTrophy,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa'
import { InlineLeadForm } from './InlineLeadForm'

const IconMap: Record<string, React.ReactNode> = {
  scale: <FaBalanceScale />,
  check: <FaCheckCircle />,
  users: <FaUsers />,
  clock: <FaClock />,
  shield: <FaShieldAlt />,
  star: <FaStar />,
  file: <FaFileAlt />,
  trophy: <FaTrophy />,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage
  const isLeadForm = block.layoutStyle === 'withLeadForm'

  const payload = await getPayload({ config: configPromise })
  const [svcRes, locRes] = await Promise.all([
    payload.find({ collection: 'services', limit: 100, depth: 0 }),
    payload.find({ collection: 'locations', limit: 100, depth: 0 }),
  ])
  const services = svcRes.docs
  const locations = locRes.docs

  return (
    <div className="hero-wrapper">

      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <div className="hero-section">

        {/* Background */}
        {bgImage?.url ? (
          <div className="hero-bg">
            <Image
              src={bgImage.url}
              alt={bgImage.alt || 'Hero background'}
              fill
              className="hero-bg-img"
              priority
              sizes="100vw"
            />
            <div className="hero-overlay hero-overlay-lr" />
            <div className="hero-overlay hero-overlay-bt" />
          </div>
        ) : (
          <div className="hero-bg hero-bg-solid">
            <div className="hero-glow" />
          </div>
        )}

        <div className="container-page hero-content">
          <div className={`hero-grid ${isLeadForm ? 'hero-grid--with-form' : 'hero-grid--with-form'}`}>

            {/* ── LEFT — Text Content ──────────────────────────────── */}
            <div className="hero-text">

              {/* Live badge */}
              <div className="hero-badge">
                <div className="hero-badge-avatars">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="hero-badge-avatar">
                      <div className="hero-badge-avatar-inner" />
                    </div>
                  ))}
                </div>
                <span className="hero-badge-label">
                  <span className="hero-badge-dot">
                    <span className="hero-badge-dot-ping" />
                    <span className="hero-badge-dot-solid" />
                  </span>
                  150+ Lawyers Online Now
                </span>
              </div>

              {/* Heading */}
              <h1 className="hero-heading">
                {block.heading || 'Online Legal Advice From Top Lawyers In India'}
              </h1>

              {/* Subheading */}
              {block.subheading && (
                <p className="hero-subheading">{block.subheading}</p>
              )}

              {/* Trust pills */}
              <div className="hero-trust-pills">
                <div className="hero-trust-pill">
                  <FaCheckCircle className="hero-trust-pill-icon" />
                  Free First Consultation
                </div>
                <div className="hero-trust-pill">
                  <FaShieldAlt className="hero-trust-pill-icon" />
                  100% Confidential
                </div>
                <div className="hero-trust-pill">
                  <FaClock className="hero-trust-pill-icon" />
                  Reply in &lt; 5 Min
                </div>
              </div>

              {/* CTA buttons — only on full-screen (no lead form) */}
              {!isLeadForm && (
                <div className="hero-cta-row">
                  <Link href={block.ctaLink || '/consultation'} className="hero-btn-gold">
                    <FaPhoneAlt />
                    {block.ctaText || 'Book Free Consultation'}
                  </Link>
                  <a
                    href={block.secondaryCtaLink || 'https://wa.me/919650515469'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn-whatsapp"
                  >
                    <FaWhatsapp />
                    {block.secondaryCtaText || 'WhatsApp Us'}
                  </a>
                </div>
              )}
            </div>

            {/* ── RIGHT — Lead Form (both layouts now show a form) ─── */}
            <div className="hero-form-wrap">
              <div className="hero-form-glow" />
              <div className="hero-form-inner">
                {isLeadForm ? (
                  <LeadFormWidget services={services} locations={locations} />
                ) : (
                  <InlineLeadForm services={services} />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      {block.showStatsBar !== false && (() => {
        const defaultStats = [
          { icon: 'scale', value: '25k+', label: 'Consultations' },
          { icon: 'check', value: '98%', label: 'Success Rate' },
          { icon: 'users', value: '1.2k+', label: 'Verified Advocates' },
          { icon: 'clock', value: '15m', label: 'Response Time' },
        ]
        const statsData = block.stats && block.stats.length > 0 ? block.stats : defaultStats

        return (
          <div className="hero-stats-bar">
            <div className="container-page">
              <div className="hero-stats-grid">
                {statsData.map((stat: { icon: string; value: string; label: string }, i: number) => (
                  <div key={i} className="hero-stat-item">
                    <span className="hero-stat-icon text-[var(--color-secondary)]">
                      {IconMap[stat.icon] || <FaStar />}
                    </span>
                    <div>
                      <span className="hero-stat-value">{stat.value}</span>
                      <span className="hero-stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
