import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'
import { SearchBar } from './SearchBar'
import { InlineLeadForm } from './InlineLeadForm'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import {
  FaBalanceScale, FaCheckCircle, FaUsers, FaClock,
  FaShieldAlt, FaStar, FaFileAlt, FaTrophy,
  FaPhoneAlt, FaWhatsapp,
} from 'react-icons/fa'

const IconMap: Record<string, React.ReactNode> = {
  scale: <FaBalanceScale />, check: <FaCheckCircle />, users: <FaUsers />,
  clock: <FaClock />, shield: <FaShieldAlt />, star: <FaStar />,
  file: <FaFileAlt />, trophy: <FaTrophy />,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage

  // ── Layout flags ──────────────────────────────────────────────────────────
  // withLeadForm  → split: text left, full lead form right
  // standard + showLeadForm checked → split: text left, compact form right
  // standard (default) → everything CENTERED, no form at all
  const isWithLeadForm = block.layoutStyle === 'withLeadForm'
  const isStandardForm = block.layoutStyle === 'standard' && block.showLeadForm === true
  const hasRightPanel = isWithLeadForm || isStandardForm
  const showSearch = block.showSearchBar !== false

  const payload = await getPayload({ config: configPromise })
  const [svcRes, locRes] = await Promise.all([
    payload.find({ collection: 'services', limit: 100, depth: 0 }),
    payload.find({ collection: 'locations', limit: 100, depth: 0 }),
  ])

  // Only include services that have showInHeroForm explicitly true,
  // or that don't have the field yet (for backward compatibility).
  const services = svcRes.docs.filter((s: any) => s.showInHeroForm !== false)
  const locations = locRes.docs

  return (
    <div className="hero-wrapper">

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <div className={`hero-section ${hasRightPanel ? 'hero-section--tall' : 'hero-section--compact'}`}>

        {/* Background */}
        {bgImage?.url ? (
          <div className="hero-bg">
            <Image src={bgImage.url} alt={bgImage.alt || ''} fill className="hero-bg-img" priority sizes="100vw" />
            <div className="hero-overlay hero-overlay-lr" />
            <div className="hero-overlay hero-overlay-bt" />
          </div>
        ) : (
          <div className="hero-bg hero-bg-solid"><div className="hero-glow" /></div>
        )}

        <div className="container-page hero-content">

          {/* ── CENTERED layout (standard, no form) ──────────────────────── */}
          {!hasRightPanel && (
            <div className="hero-centered">
              {/* Live badge */}
              <div className="hero-badge">
                <div className="hero-badge-avatars">
                  {[1, 2, 3].map((i) => <div key={i} className="hero-badge-avatar"><div className="hero-badge-avatar-inner" /></div>)}
                </div>
                <span className="hero-badge-label">
                  <span className="hero-badge-dot"><span className="hero-badge-dot-ping" /><span className="hero-badge-dot-solid" /></span>
                  150+ Lawyers Online Now
                </span>
              </div>

              <h1 className="hero-heading hero-heading--centered">
                {block.heading || 'Online Legal Advice From Top Lawyers In India'}
              </h1>

              {block.subheading && (
                <p className="hero-subheading hero-subheading--centered">{block.subheading}</p>
              )}

              {/* Trust pills */}
              <div className="hero-trust-pills hero-trust-pills--centered">
                <div className="hero-trust-pill"><FaCheckCircle className="hero-trust-pill-icon" />Free First Consultation</div>
                <div className="hero-trust-pill"><FaShieldAlt className="hero-trust-pill-icon" />100% Confidential</div>
                <div className="hero-trust-pill"><FaClock className="hero-trust-pill-icon" />Reply in &lt; 5 Min</div>
              </div>

              {/* Search bar */}
              {showSearch && (
                <div className="hero-search-wrap hero-search-wrap--centered">
                  <SearchBar locations={locations} services={services} />
                </div>
              )}

              {/* CTA buttons */}
              <div className="hero-cta-row hero-cta-row--centered">
                <Link href={block.ctaLink || '/consultation'} className="hero-btn-gold">
                  <FaPhoneAlt />{block.ctaText || 'Book Free Consultation'}
                </Link>
                {block.secondaryCta?.text && (
                  <a href={block.secondaryCta.link || 'https://wa.me/919650515469'} target="_blank" rel="noopener noreferrer" className="hero-btn-whatsapp">
                    <FaWhatsapp />{block.secondaryCta.text}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ── SPLIT layout (with form) ──────────────────────────────────── */}
          {hasRightPanel && (
            <div className="hero-grid hero-grid--with-form">
              {/* Left */}
              <div className="hero-text">
                <div className="hero-badge">
                  <div className="hero-badge-avatars">
                    {[1, 2, 3].map((i) => <div key={i} className="hero-badge-avatar"><div className="hero-badge-avatar-inner" /></div>)}
                  </div>
                  <span className="hero-badge-label">
                    <span className="hero-badge-dot"><span className="hero-badge-dot-ping" /><span className="hero-badge-dot-solid" /></span>
                    150+ Lawyers Online Now
                  </span>
                </div>

                <h1 className="hero-heading">{block.heading || 'Online Legal Advice From Top Lawyers In India'}</h1>

                {block.subheading && <p className="hero-subheading">{block.subheading}</p>}

                <div className="hero-trust-pills">
                  <div className="hero-trust-pill"><FaCheckCircle className="hero-trust-pill-icon" />Free First Consultation</div>
                  <div className="hero-trust-pill"><FaShieldAlt className="hero-trust-pill-icon" />100% Confidential</div>
                  <div className="hero-trust-pill"><FaClock className="hero-trust-pill-icon" />Reply in &lt; 5 Min</div>
                </div>

                {/* Search bar */}
                {showSearch && (
                  <div className="hero-search-wrap max-w-xl mb-6">
                    <SearchBar locations={locations} services={services} />
                  </div>
                )}

                <div className="hero-cta-row">
                  <Link href={block.ctaLink || '/consultation'} className="hero-btn-gold">
                    <FaPhoneAlt />{block.ctaText || 'Book Free Consultation'}
                  </Link>
                  {block.secondaryCta?.text && (
                    <a href={block.secondaryCta.link || 'https://wa.me/919650515469'} target="_blank" rel="noopener noreferrer" className="hero-btn-whatsapp">
                      <FaWhatsapp />{block.secondaryCta.text}
                    </a>
                  )}
                </div>
              </div>

              {/* Right — form */}
              <div className="hero-form-wrap">
                <div className="hero-form-glow" />
                <div className="hero-form-inner">
                  {isWithLeadForm
                    ? <LeadFormWidget services={services} locations={locations} />
                    : <InlineLeadForm services={services} />}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      {block.showStatsBar !== false && (() => {
        const defaultStats = [
          { icon: 'scale', value: '25k+', label: 'Consultations' },
          { icon: 'check', value: '98%', label: 'Success Rate' },
          { icon: 'users', value: '1.2k+', label: 'Verified Advocates' },
          { icon: 'clock', value: '15m', label: 'Response Time' },
        ]
        const statsData = (block.stats?.length > 0) ? block.stats : defaultStats
        return (
          <div className="hero-stats-bar">
            <div className="container-page">
              <div className="hero-stats-grid">
                {statsData.map((stat: { icon: string; value: string; label: string }, i: number) => (
                  <div key={i} className="hero-stat-item">
                    <span className="hero-stat-icon text-[var(--color-secondary)]">{IconMap[stat.icon] || <FaStar />}</span>
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
