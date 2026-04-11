import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { 
  FaStar, FaMapMarkerAlt, FaCalendarAlt, FaLanguage, 
  FaCheck, FaChevronDown, FaGavel
} from 'react-icons/fa'
import LawyerEnquiryForm from '@/components/forms/LawyerEnquiryForm'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await (payload.find as any)({
    collection: 'lawyers',
    where: { slug: { equals: slug }, status: { equals: 'approved' } },
    limit: 1,
  })

  const lawyer = result.docs[0] as any
  if (!lawyer) return { title: 'Lawyer Not Found' }

  return {
    title: `Advocate ${lawyer.name} — ${lawyer.designation || 'Lawyer'} | VakilFirst`,
    description: `Consult with Advocate ${lawyer.name}, an experienced ${lawyer.designation || 'lawyer'} practicing in ${lawyer.courts || lawyer.locationText}.`,
  }
}

export default async function LawyerProfilePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await (payload.find as any)({
    collection: 'lawyers',
    where: { slug: { equals: slug }, status: { equals: 'approved' } },
    limit: 1,
    depth: 2,
  })

  const lawyer = result.docs[0] as any
  if (!lawyer) notFound()

  const photo = lawyer.photo
  const specs = (lawyer.specializations || []) as any[]
  const languages = (lawyer.languages || []) as any[]

  // Increment profile views
  payload.update({
    collection: 'lawyers',
    id: lawyer.id,
    data: { profileViews: (lawyer.profileViews || 0) + 1 } as any,
  }).catch(() => {})

  return (
    <div className="lawyer-profile-v2">
      <div className="container-page py-12">
        <div className="lawyer-profile-body-grid">
          {/* Main Content Column */}
          <div className="flex flex-col gap-6">
            <div className="lawyer-card-main">
              <h1 className="lawyer-header-title">Advocate {lawyer.name}</h1>
              
              <div className="lawyer-info-flex">
                {/* Avatar */}
                <div className="lawyer-avatar-v2">
                  {photo?.url ? (
                    <Image src={photo.url} alt={lawyer.name} width={150} height={150} quality={90} />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-300">
                      {lawyer.name?.charAt(0)}
                    </div>
                  )}
                  <div className="lawyer-verify-badge">
                    <FaCheck />
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex-1">
                  <div className="lawyer-rating-v2">
                    <div className="lawyer-rating-stars">
                      {[1, 2, 3, 4, 5].map(s => (
                        <FaStar key={s} className={s <= Math.round(lawyer.rating || 5) ? 'text-orange-400' : 'text-slate-200'} />
                      ))}
                    </div>
                    <div className="lawyer-rating-count">
                      {lawyer.rating?.toFixed(1) || '5.0'} <span>| {lawyer.ratingCount || '350'}+ Ratings</span>
                    </div>
                  </div>

                  <div className="lawyer-detail-list">
                    <div className="lawyer-detail-item">
                      <FaCalendarAlt />
                      <span>{lawyer.experience || '0'} Years Experience</span>
                    </div>
                    <div className="lawyer-detail-item">
                      <FaMapMarkerAlt />
                      <span>{lawyer.locationText || 'India'}</span>
                    </div>
                    <div className="lawyer-detail-item">
                      <FaLanguage />
                      <span>{languages.length > 0 ? languages.map(l => l.language).join(', ') : 'English, Hindi'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lawyer-separator" />

              {/* About Section */}
              <div className="lawyer-section-v2">
                <h3>About:</h3>
                <div className="lawyer-bio-v2">
                  <p>
                    Advocate {lawyer.name} is a dedicated legal professional {lawyer.experience ? `with over ${lawyer.experience} years of experience` : ''}. 
                    Expert at handling complex legal matters and providing strategic counsel to clients.
                  </p>
                </div>
                <div className="lawyer-see-more">
                  <span>See more</span>
                  <FaChevronDown className="text-[10px]" />
                </div>
              </div>

              <div className="lawyer-separator" />

              {/* Courts Section */}
              <div className="lawyer-section-v2">
                <h3>Courts:</h3>
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="text-slate-400"><FaGavel /></span>
                  <span>{lawyer.courts || 'High Court, District Courts'}</span>
                </div>
              </div>
            </div>

            {/* Experience & Specialization Card */}
            <div className="lawyer-card-main">
              <h2 className="lawyer-spec-title-main">Experience & Specialization</h2>
              
              <div className="flex flex-col gap-4">
                {specs.length > 0 ? specs.map((spec, i) => (
                  <div key={i} className="lawyer-spec-item-v2">
                    <div className="lawyer-spec-name-v2">{spec.title}</div>
                    <div className="lawyer-spec-desc-v2">
                      {spec.description || `Specialized expertise in ${spec.title} matters with a proven track record of successful outcomes.`}
                    </div>
                  </div>
                )) : (
                  <div className="text-slate-400 italic py-4">No specializations listed.</div>
                )}
              </div>

              {specs.length > 2 && (
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-50">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total:{specs.length}</span>
                  <div className="lawyer-see-more m-0">
                    <span>See more</span>
                    <FaChevronDown className="text-[10px]" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column */}
          <aside>
            <LawyerEnquiryForm 
              lawyerId={lawyer.id} 
              lawyerName={lawyer.name} 
              lawyerSlug={lawyer.slug} 
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
