import React from 'react'
import Link from 'next/link'
import { getPayload } from '@/lib/payload/getPayload'

export async function Header() {
  let navServices: any[] = []
  
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'services',
      where: {
        showInHeader: { equals: true },
      },
      sort: 'menuOrder',
      limit: 100,
    })
    navServices = result.docs
  } catch (error) {
    console.error('Error fetching nav services:', error)
  }

  return (
    <header className="bg-[var(--color-primary)] text-white sticky top-0 z-50 shadow-lg border-b border-white/5">
      <div className="container-page">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between text-sm py-2 border-b border-white/10">
          <div className="flex items-center gap-6">
            <a href="tel:+919650515469" className="hover:text-[var(--color-secondary)] transition-colors flex items-center gap-2">
              <span className="text-lg">📞</span> +91 96505 15469
            </a>
            <a href="mailto:info@kaushalassociates.com" className="hover:text-[var(--color-secondary)] transition-colors flex items-center gap-2">
              <span className="text-lg">✉</span> info@kaushalassociates.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">Home</Link>
            <span className="opacity-30">|</span>
            <Link href="/blog" className="hover:text-[var(--color-secondary)] transition-colors">Blog</Link>
            <span className="opacity-30">|</span>
            <Link href="/news" className="hover:text-[var(--color-secondary)] transition-colors">News</Link>
            <span className="opacity-30">|</span>
            <Link href="/contact" className="hover:text-[var(--color-secondary)] transition-colors">Contact</Link>
            <span className="opacity-30 ml-2">|</span>
            <span>🕘 Mon – Sat: 9:00 AM – 7:00 PM</span>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-lg flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-xl font-[var(--font-heading)] group-hover:scale-105 transition-transform shadow-inner">
              K
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight group-hover:text-[var(--color-secondary-light)] transition-colors">
                Court Marriage Services
              </span>
              <span className="hidden md:block text-[10px] text-white/50 uppercase tracking-[2px] font-bold -mt-0.5">
                Legal Consultants & Advocates
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown - Renamed to Marriage Registration */}
            <div className="relative group py-2">
              <Link href="/services" className="flex items-center gap-1 hover:text-[var(--color-secondary)] transition-colors font-semibold">
                Marriage Registration
                <svg className="w-4 h-4 mt-0.5 opacity-60 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <div className="absolute top-[100%] left-0 w-64 bg-white text-slate-800 rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 p-2 z-[60] border border-slate-100">
                <div className="py-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                  Our Specializations
                </div>
                {navServices.map((svc: any) => (
                  <Link 
                    key={svc.id} 
                    href={`/${svc.slug}`}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-50 hover:text-[var(--color-primary)] transition-all font-medium border-l-2 border-transparent hover:border-[var(--color-primary)]"
                  >
                    {svc.title}
                  </Link>
                ))}
                {navServices.length === 0 && (
                  <div className="px-4 py-3 text-slate-400 italic text-sm">
                    No services featured yet.
                  </div>
                )}
                <div className="mt-2 border-t border-slate-50 pt-1">
                  <Link href="/services" className="flex items-center justify-center px-4 py-2 text-xs font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-md transition-colors uppercase tracking-wider">
                    View All Services
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/charges" className="hover:text-[var(--color-secondary)] transition-colors font-semibold py-2">
              Charges
            </Link>
            <Link href="/consultation" className="hover:text-[var(--color-secondary)] transition-colors font-semibold py-2">
              Consultation
            </Link>
            <Link href="/lawyer-services" className="hover:text-[var(--color-secondary)] transition-colors font-semibold py-2">
              Lawyer Services
            </Link>
            <Link
              href="/consultation"
              className="bg-[var(--color-secondary)] text-[var(--color-primary-dark)] px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-[var(--color-secondary)]/30 hover:-translate-y-0.5 transition-all"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
