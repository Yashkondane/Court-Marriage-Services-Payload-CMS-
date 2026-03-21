import React from 'react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-[var(--color-primary)] text-white sticky top-0 z-50 shadow-lg">
      <div className="container-page">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between text-sm py-2 border-b border-white/10">
          <div className="flex items-center gap-6">
            <a href="tel:+919650515469" className="hover:text-[var(--color-secondary)] transition-colors">
              📞 +91 96505 15469
            </a>
            <a href="mailto:info@kaushalassociates.com" className="hover:text-[var(--color-secondary)] transition-colors">
              ✉ info@kaushalassociates.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-lg flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-xl font-[var(--font-heading)]">
              K
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Court Marriage Services
              </span>
              <span className="hidden md:block text-xs text-white/60 -mt-1">
                Legal Consultants & Advocates
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="hover:text-[var(--color-secondary)] transition-colors font-medium">
              About
            </Link>
            <Link href="/services" className="hover:text-[var(--color-secondary)] transition-colors font-medium">
              Services
            </Link>
            <Link href="/blog" className="hover:text-[var(--color-secondary)] transition-colors font-medium">
              Blog
            </Link>
            <Link href="/news" className="hover:text-[var(--color-secondary)] transition-colors font-medium">
              News
            </Link>
            <Link href="/contact" className="hover:text-[var(--color-secondary)] transition-colors font-medium">
              Contact
            </Link>
            <Link
              href="/consultation"
              className="btn btn-secondary text-sm py-2 px-5"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
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
