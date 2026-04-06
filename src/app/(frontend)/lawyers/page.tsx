import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Find a Lawyer | VakilFirst',
  description: 'Browse our directory of verified, expert lawyers across India. Filter by specialization, location, and more.',
}

export default async function LawyersDirectoryPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await (payload.find as any)({
    collection: 'lawyers',
    where: { status: { equals: 'approved' } },
    limit: 100,
    depth: 2,
    sort: '-isSponsored',
  })

  const lawyers = result.docs

  return (
    <div className="lawyers-directory">
      <div className="lawyers-directory-hero">
        <div className="container-page">
          <h1 className="lawyers-directory-title">Find a Lawyer</h1>
          <p className="lawyers-directory-sub">Browse our network of verified legal experts across India</p>
        </div>
      </div>

      <div className="container-page lawyers-directory-content">
        {lawyers.length === 0 ? (
          <div className="lawyers-directory-empty">
            <p>No lawyers available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="lawyers-directory-grid">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {lawyers.map((lawyer: any) => {
              const photo = lawyer.photo
              const specs = lawyer.specializations || []

              return (
                <Link
                  key={lawyer.id}
                  href={`/lawyers/${lawyer.slug}`}
                  className={`lawyers-card ${lawyer.isSponsored ? 'lawyers-card--sponsored' : ''}`}
                >
                  {lawyer.isSponsored && (
                    <span className="lawyers-card-badge">⭐ Sponsored</span>
                  )}

                  <div className="lawyers-card-photo-wrap">
                    {photo?.url ? (
                      <Image
                        src={photo.url}
                        alt={lawyer.name}
                        width={80}
                        height={80}
                        className="lawyers-card-photo"
                        quality={75}
                      />
                    ) : (
                      <div className="lawyers-card-photo-placeholder">
                        {lawyer.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="lawyers-card-info">
                    <h3 className="lawyers-card-name">{lawyer.name}</h3>
                    {lawyer.designation && (
                      <p className="lawyers-card-designation">{lawyer.designation}</p>
                    )}

                    <div className="lawyers-card-rating">
                      <FaStar className="star-filled" />
                      <span>{lawyer.rating?.toFixed(1) || '0.0'}</span>
                      <span className="lawyers-card-rating-count">({lawyer.ratingCount || 0})</span>
                    </div>

                    {lawyer.locationText && (
                      <p className="lawyers-card-location">
                        <FaMapMarkerAlt /> {lawyer.locationText}
                      </p>
                    )}

                    {specs.length > 0 && (
                      <div className="lawyers-card-specs">
                        {specs.slice(0, 3).map((spec: { title: string }, i: number) => (
                          <span key={i} className="lawyers-card-spec-tag">{spec.title}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
