"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Header({ navServices = [] }: { navServices?: any[] }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'PRACTICE AREAS', href: '/services', isDropdown: true },
    { label: 'CASE RESULTS', href: '/case-results' },
    { label: 'LEGAL BLOG', href: '/blog' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ]

  return (
    <header className="bg-black text-white sticky top-0 z-[100] shadow-2xl border-b border-white/10">
      <div className="container-page">
        <nav className="flex items-center justify-between py-6">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-white rounded-sm rotate-45 transform group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative z-10 text-black font-black text-xl italic flex items-center justify-center -mb-1">
                V
              </div>
            </div>
            <span className="text-2xl font-heading font-extrabold text-white tracking-tighter uppercase group-hover:text-[var(--color-secondary)] transition-colors">
              VakilFirst
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group/nav py-2">
                <Link 
                  href={link.href} 
                  className={`text-[13px] font-bold tracking-[0.1em] hover:text-[var(--color-secondary)] transition-all flex items-center gap-1.5 ${
                    pathname === link.href ? 'text-[var(--color-secondary)]' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                  {link.isDropdown && (
                    <svg className="w-3 h-3 opacity-50 group-hover/nav:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Practice Areas Dropdown */}
                {link.isDropdown && (
                  <div className="absolute top-[100%] left-0 w-72 bg-[#111] border border-white/10 rounded-sm shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 p-4 z-[110]">
                    <div className="grid gap-2">
                      <div className="text-[10px] font-black text-gray-500 tracking-[0.2em] mb-3 uppercase">Top Expertise</div>
                      {navServices.map((svc: any) => (
                        <Link 
                          key={svc.id} 
                          href={`/${svc.slug}`}
                          className="text-sm font-semibold py-2 px-3 hover:bg-white/5 hover:text-[var(--color-secondary)] rounded-sm transition-all border-l-2 border-transparent hover:border-[var(--color-secondary)]"
                        >
                          {svc.title}
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t border-white/5">
                        <Link href="/services" className="text-[11px] font-bold text-[var(--color-secondary)] uppercase tracking-widest hover:underline text-center block">
                          Explore All Services →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Consult Button */}
            <Link
              href="/consultation"
              className="btn-gold px-8 py-3.5 rounded-sm text-sm"
            >
              Consult a Lawyer
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[var(--color-secondary)] transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Nav Menu */}
      <div className={`lg:hidden bg-black border-t border-white/10 overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[90vh] py-8' : 'max-h-0 py-0'}`}>
        <div className="container-page flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-heading font-extrabold uppercase tracking-tight text-white hover:text-[var(--color-secondary)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-gold w-full py-4 text-center mt-4"
          >
            Consult a Lawyer
          </Link>
        </div>
      </div>
    </header>
  )
}
