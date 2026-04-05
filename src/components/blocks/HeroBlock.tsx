import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LeadFormWidget } from './LeadFormWidget'
import { SearchBar } from './SearchBar'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function HeroBlock({ block }: { block: any }) {
  const bgImage = block.backgroundImage
  const isLeadForm = block.layoutStyle === 'withLeadForm'
  const showSearch = block.showSearchBar !== false

  // Fetch services and locations for the lead form + search bar
  const payload = await getPayload({ config: configPromise })
  const [svcRes, locRes] = await Promise.all([
    payload.find({ collection: 'services', limit: 100, depth: 0 }),
    payload.find({ collection: 'locations', limit: 100, depth: 0 }),
  ])
  const services = svcRes.docs
  const locations = locRes.docs

  return (
    <div className="hero-wrapper">
      {/* ===== HERO SECTION ===== */}
      <div className="hero-section">
        
        {/* Background Image + Overlay */}
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
          <div className={`hero-grid ${isLeadForm ? 'hero-grid--with-form' : 'hero-grid--no-form'}`}>
            
            {/* ===== LEFT - Text Content ===== */}
            <div className="hero-text">
              
              {/* Live Status Badge */}
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

              {/* Main Heading - BIG WHITE BOLD */}
              <h1 className="hero-heading">
                {block.heading || 'Online Legal Advice From Top Lawyers In India'}
              </h1>
              
              {/* Subheading */}
              {block.subheading && (
                <p className="hero-subheading">
                  {block.subheading}
                </p>
              )}

              {/* Search Bar */}
              {showSearch && (
                <div className="hero-search-wrap">
                  <SearchBar locations={locations} services={services} />
                </div>
              )}

              {/* CTA Buttons */}
              <div className="hero-cta-row">
                <Link 
                  href={block.ctaLink || '/consultation'} 
                  className="hero-btn-gold"
                >
                  {block.ctaText || 'Book Free Consultation'}
                </Link>
                
                {block.secondaryCta?.text && (
                  <a 
                    href={block.secondaryCta.link || 'https://wa.me/919650515469'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn-whatsapp"
                  >
                    <svg className="hero-wa-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {block.secondaryCta.text}
                  </a>
                )}
              </div>
            </div>

            {/* ===== RIGHT - Lead Form ===== */}
            {isLeadForm && (
              <div className="hero-form-wrap">
                <div className="hero-form-glow" />
                <div className="hero-form-inner">
                  <LeadFormWidget services={services} locations={locations} />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ===== STATS BAR (CMS-editable, with fallback defaults) ===== */}
      {block.showStatsBar !== false && (() => {
        const defaultStats = [
          { icon: '⚖️', value: '25k+', label: 'Consultations' },
          { icon: '✅', value: '98%', label: 'Success Rate' },
          { icon: '👨‍⚖️', value: '1.2k+', label: 'Verified Advocates' },
          { icon: '⏱️', value: '15m', label: 'Response Time' },
        ]
        const statsData = block.stats && block.stats.length > 0 ? block.stats : defaultStats

        return (
          <div className="hero-stats-bar">
            <div className="container-page">
              <div className="hero-stats-grid">
                {statsData.map((stat: { icon: string; value: string; label: string }, i: number) => (
                  <div key={i} className="hero-stat-item">
                    <span className="hero-stat-icon">{stat.icon}</span>
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
