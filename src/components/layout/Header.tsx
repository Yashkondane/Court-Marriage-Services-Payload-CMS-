"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronDown } from 'react-icons/fa'

type NavItem = { id: string; label: string; slug: string }
type NavGroup = { category: string; order: number; items: NavItem[] }

export function Header({
  navServices = [],
  findALawyerGroups = [],
  legalMatterGroups = [],
}: {
  navServices?: any[]
  findALawyerGroups?: NavGroup[]
  legalMatterGroups?: NavGroup[]
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null)

  const staticLinks = [
    { label: 'LEGAL BLOG', href: '/blog' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ]

  return (
    <header className="bg-black text-white sticky top-0 z-[100] shadow-2xl border-b border-white/10">
      <div className="container-page">
        <nav className="flex items-center justify-between py-5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-white rounded-sm rotate-45 transform group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative z-10 text-black font-black text-xl italic flex items-center justify-center -mb-1">V</div>
            </div>
            <span className="text-2xl font-heading font-extrabold text-white tracking-tighter uppercase group-hover:text-[var(--color-secondary)] transition-colors">
              VakilFirst
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">

            {/* Find A Lawyer Mega Dropdown */}
            <MegaDropdown
              label="Find A Lawyer"
              groups={findALawyerGroups}
              fallbackServices={navServices.filter((s: any) => !s.navDropdown || s.navDropdown === 'none')}
              allHref="/lawyers"
              allLabel="Browse All Lawyers"
            />

            {/* Legal Matter Mega Dropdown */}
            <MegaDropdown
              label="Legal Matter"
              groups={legalMatterGroups}
              fallbackServices={[]}
              allHref="/services"
              allLabel="Explore All Legal Services"
            />

            {/* Static links */}
            {staticLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[13px] font-bold tracking-[0.1em] hover:text-[var(--color-secondary)] transition-all ${
                  pathname === link.href ? 'text-[var(--color-secondary)]' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA */}
            <Link href="/consultation" className="btn-gold px-7 py-3.5 rounded-sm text-sm shrink-0">
              Talk to a Lawyer
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[var(--color-secondary)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Nav Panel */}
      <div
        className={`lg:hidden bg-[#0a0a0a] border-t border-white/10 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[100vh] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col divide-y divide-white/5">
          
          {/* Find A Lawyer mobile */}
          <MobileMegaSection
            label="Find A Lawyer"
            groups={findALawyerGroups}
            allHref="/lawyers"
            allLabel="Browse All Lawyers"
            isOpen={mobileOpenSection === 'lawyer'}
            onToggle={() => setMobileOpenSection(mobileOpenSection === 'lawyer' ? null : 'lawyer')}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Legal Matter mobile */}
          <MobileMegaSection
            label="Legal Matter"
            groups={legalMatterGroups}
            allHref="/services"
            allLabel="All Legal Services"
            isOpen={mobileOpenSection === 'legal'}
            onToggle={() => setMobileOpenSection(mobileOpenSection === 'legal' ? null : 'legal')}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Static mobile links */}
          {staticLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-6 py-5 text-base font-bold uppercase tracking-wider transition-colors ${
                pathname === link.href ? 'text-[var(--color-secondary)]' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="p-5">
            <Link
              href="/consultation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gold w-full py-4 text-center block tracking-widest"
            >
              Talk to a Lawyer
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─────────────── DESKTOP MEGA DROPDOWN ─────────────── */

function MegaDropdown({
  label,
  groups,
  fallbackServices,
  allHref,
  allLabel,
}: {
  label: string
  groups: NavGroup[]
  fallbackServices: any[]
  allHref: string
  allLabel: string
}) {
  const hasGroups = groups.length > 0
  const hasFallback = fallbackServices.length > 0

  if (!hasGroups && !hasFallback) {
    // Empty — still show the label as a link
    return (
      <Link
        href={allHref}
        className="text-[13px] font-bold tracking-[0.1em] text-gray-300 hover:text-[var(--color-secondary)] transition-all flex items-center gap-1.5"
      >
        {label}
        <FaChevronDown className="w-2.5 h-2.5 opacity-50" />
      </Link>
    )
  }

  // Calculate grid columns — max 6 columns desktop
  const colCount = Math.min(hasGroups ? groups.length : 1, 6)

  return (
    <div className="relative group/mega py-2">
      <button className="text-[13px] font-bold tracking-[0.1em] text-gray-300 hover:text-[var(--color-secondary)] transition-all flex items-center gap-1.5 group-hover/mega:text-[var(--color-secondary)]">
        {label}
        <FaChevronDown className="w-2.5 h-2.5 opacity-50 group-hover/mega:rotate-180 transition-transform duration-300" />
      </button>

      {/* Mega dropdown panel */}
      {/* Wrapper with padding-top (pt-6) creates an invisible "bridge" for the mouse, preventing it from losing hover state. */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-3 pointer-events-none group-hover/mega:opacity-100 group-hover/mega:translate-y-0 group-hover/mega:pointer-events-auto transition-all duration-300 z-[110]">
        <div
          className="bg-white border border-gray-100 shadow-2xl rounded-sm min-w-[480px] relative"
          style={{ width: `${Math.max(480, colCount * 180)}px`, maxWidth: '90vw' }}
        >
          {/* Arrow tip */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,0.04)]" />

        {hasGroups ? (
          <div className="p-6">
            <div
              className="grid gap-x-8 gap-y-1"
              style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
            >
              {groups.map((group) => (
                <div key={group.category} className="min-w-0">
                  {/* Category heading */}
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 pb-2 border-b border-gray-100">
                    {group.category}
                  </div>
                  {/* Items */}
                  <div className="flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/services/${item.slug}`}
                        className="text-[13px] font-medium text-gray-700 py-1.5 hover:text-[var(--color-secondary)] transition-colors whitespace-nowrap"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Fallback: plain list */
          <div className="p-4 grid gap-1">
            {fallbackServices.map((svc: any) => (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="text-sm font-medium text-gray-700 py-2 px-3 hover:bg-gray-50 hover:text-[var(--color-secondary)] rounded-sm transition-all border-l-2 border-transparent hover:border-[var(--color-secondary)]"
              >
                {svc.navLabel || svc.title}
              </Link>
            ))}
          </div>
        )}

        {/* Bottom banner */}
        <div className="bg-gray-50 border-t border-gray-100 p-4 rounded-b-sm flex items-center justify-between">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 block" />
            Verified Experts
            <span className="mx-1 text-gray-300">·</span>
            Free First Consultation
          </div>
          <Link
            href={allHref}
            className="text-[11px] font-black text-[var(--color-secondary)] uppercase tracking-[0.15em] hover:text-[#a07c16] transition-colors flex items-center"
          >
            {allLabel} <span className="ml-1 text-[14px]">→</span>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── MOBILE MEGA SECTION ─────────────── */

function MobileMegaSection({
  label,
  groups,
  allHref,
  allLabel,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string
  groups: NavGroup[]
  allHref: string
  allLabel: string
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-base font-bold uppercase tracking-wider text-white hover:text-[var(--color-secondary)] transition-colors"
      >
        {label}
        <FaChevronDown className={`w-4 h-4 opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="px-6 pb-6 flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.category}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-2">
                {group.category}
              </div>
              <div className="flex flex-col gap-2 pl-3 border-l border-white/10">
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/services/${item.slug}`}
                    onClick={onClose}
                    className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href={allHref}
            onClick={onClose}
            className="text-xs font-black text-[var(--color-secondary)] uppercase tracking-widest border-t border-white/5 pt-4"
          >
            {allLabel} →
          </Link>
        </div>
      </div>
    </div>
  )
}
