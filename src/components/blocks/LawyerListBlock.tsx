import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from '@/lib/payload/getPayload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function LawyerListBlock({ block }: { block: any }) {
  const payload = await getPayload()
  
  const { docs: fetchedLawyers } = await payload.find({
    collection: 'lawyers',
    limit: block.limit || 4,
    sort: '-createdAt',
  })
  
  const lawyers = fetchedLawyers as any[]

  return (
    <div className="py-16 md:py-24 bg-slate-50">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a365d] mb-4">
            {block.heading}
          </h2>
          {block.subheading && (
            <p className="text-lg text-slate-600">
              {block.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.length > 0 ? (
            lawyers.map((lawyer: any) => (
              <LawyerCard 
                key={lawyer.id} 
                lawyer={lawyer} 
                showBio={block.showBio}
                showContact={block.showContact}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 text-lg">
                No lawyers found. Add some in the CMS to see them here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LawyerCard({ lawyer, showBio, showContact }: { lawyer: any, showBio: boolean, showContact: boolean }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full">
      {/* Photo Section */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {lawyer.photo?.url ? (
          <Image
            src={lawyer.photo.url}
            alt={lawyer.photo.alt || lawyer.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-6xl opacity-20">
            {/* Professional placeholder instead of emoji */}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#1a365d] group-hover:text-[#2a4a7f] transition-colors leading-tight">
            Adv. {lawyer.name}
          </h3>
            <p className="text-sm font-semibold text-[#1a365d]/70 uppercase tracking-wider mt-1">
              {lawyer.designation}
            </p>
        </div>

        {lawyer.experience && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-700 text-xs font-bold mb-4 w-fit">
            <span>{lawyer.experience}+ Years Exp.</span>
          </div>
        )}

        {showBio && lawyer.bio && (
          <div className="text-sm text-slate-600 mb-6 line-clamp-3 overflow-hidden">
            {/* Simple text conversion for Lexical if needed, or just skip if too complex for preview */}
            {typeof lawyer.bio === 'string' ? lawyer.bio : 'Expert legal advisor specializing in family and marriage law.'}
          </div>
        )}

        <div className="mt-auto space-y-3">
          {showContact && (
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
              {lawyer.email && (
                <a href={`mailto:${lawyer.email}`} className="text-xs text-slate-500 hover:text-[#1a365d] flex items-center gap-2">
                  {lawyer.email}
                </a>
              )}
              {lawyer.phone && (
                <a href={`tel:${lawyer.phone}`} className="text-xs text-slate-500 hover:text-[#1a365d] flex items-center gap-2">
                  {lawyer.phone}
                </a>
              )}
            </div>
          )}
          
          <Link 
            href="/contact" 
            className="block w-full text-center py-3 bg-[#1a365d] text-white rounded-lg font-bold text-sm hover:bg-[#2a4a7f] transition-colors mt-4"
          >
            Consult Now
          </Link>
        </div>
      </div>
    </div>
  )
}
