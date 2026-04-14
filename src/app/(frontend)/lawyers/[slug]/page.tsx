import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { 
  FaStar, FaMapMarkerAlt, FaCalendarAlt, FaLanguage, 
  FaCheck, FaChevronDown, FaGavel, FaGraduationCap
} from 'react-icons/fa'
import LawyerEnquiryForm from '@/components/forms/LawyerEnquiryForm'
import LawyerRatingForm from '@/components/forms/LawyerRatingForm'

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
      {/* ===== PREMIUM HERO SECTION ===== */}
      <section className="lawyer-hero-premium">
        <div className="container-page">
          <div className="lawyer-hero-grid">
            <div className="lawyer-avatar-premium">
              {photo?.url ? (
                <Image src={photo.url} alt={lawyer.name} width={200} height={200} quality={90} priority />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-5xl font-black text-slate-600">
                  {lawyer.name?.charAt(0)}
                </div>
              )}
              <div className="lawyer-badge-premium">
                <FaCheck /> Verified
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="lawyer-rating-stars">
                  {[1, 2, 3, 4, 5].map(s => (
                    <FaStar key={s} className={s <= Math.round(lawyer.rating || 5) ? 'text-orange-400' : 'text-slate-600'} />
                  ))}
                </div>
                <div className="text-white/60 font-bold text-sm">
                  {lawyer.rating?.toFixed(1) || '0.0'} | {lawyer.ratingCount || 0} Verified Ratings
                </div>
              </div>

              <h1 className="lawyer-name-premium">Advocate {lawyer.name}</h1>
              <p className="lawyer-desig-premium">{lawyer.designation || 'Supreme Court of India'}</p>

              <div className="lawyer-stats-premium">
                <div className="lawyer-stat-item-premium">
                  <FaCalendarAlt />
                  <span>{lawyer.experience || '0'} Years Experience</span>
                </div>
                <div className="lawyer-stat-item-premium">
                  <FaMapMarkerAlt />
                  <span>{lawyer.locationText || 'New Delhi, India'}</span>
                </div>
                <div className="lawyer-stat-item-premium">
                  <FaLanguage />
                  <span>{languages.length > 0 ? languages.map(l => l.language).join(', ') : 'English, Hindi'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div className="container-page pb-20">
        <div className="lawyer-content-grid">
          {/* LEFT: Details */}
          <main>
            {/* About Card */}
            <div className="lawyer-card-premium">
              <h3 className="lawyer-card-title-premium">About Advocate</h3>
              <div className="lawyer-bio-premium">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {typeof lawyer.bio === 'string' ? lawyer.bio : 
                   (lawyer.bio?.root ? "Professional bio being updated..." : 
                   (lawyer.bio || `Advocate ${lawyer.name} is a dedicated legal professional specializing in ${lawyer.designation || 'legal matters'}. With a client-focused approach and a track record of success, they provide strategic counsel across various complex jurisdictions.`))}
                </p>
                {!lawyer.bio && (
                  <p className="mt-4 opacity-50 italic text-sm">
                    Detailed credentials and case history available upon verified request.
                  </p>
                )}
              </div>
            </div>

            {/* Education Card */}
            {lawyer.education && lawyer.education.length > 0 && (
              <div className="lawyer-card-premium">
                <h3 className="lawyer-card-title-premium">Education & Qualifications</h3>
                <div className="space-y-4 pt-2">
                  {lawyer.education.map((edu: any, i: number) => (
                    <div key={i} className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-4 shrink-0">
                        <FaGraduationCap className="text-gold" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{edu.degree}</div>
                        <div className="text-gray-500 text-sm font-medium">{edu.college}</div>
                        {edu.year && <div className="text-gold font-bold text-xs mt-1">Class of {edu.year}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courts Card */}
            <div className="lawyer-card-premium">
              <h3 className="lawyer-card-title-premium">Practicing Courts</h3>
              <div className="space-y-3 pt-2">
                {(lawyer.courts || 'Supreme Court of India, Delhi High Court').split(',').map((court: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="font-medium">{court.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialization Card */}
            <div className="lawyer-card-premium">
              <h3 className="lawyer-card-title-premium">Experience & Specialization</h3>
              <div className="space-y-6 pt-4">
                {specs.length > 0 ? specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{spec.title}</div>
                      <div className="text-gray-600 leading-relaxed mt-1">
                        {spec.description && !spec.description.includes('lorem') ? spec.description : `Expert legal representation and strategic counsel in ${spec.title} matters.`}
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-400 italic">No specializations listed.</p>
                )}
              </div>
            </div>
          </main>

          {/* RIGHT: Enquiry Sticky */}
          <aside className="space-y-8">
            <LawyerEnquiryForm 
              lawyerId={lawyer.id} 
              lawyerName={lawyer.name} 
              lawyerSlug={lawyer.slug} 
            />
            
            <LawyerRatingForm lawyerId={lawyer.id} />
          </aside>
        </div>
      </div>
    </div>
  )
}

