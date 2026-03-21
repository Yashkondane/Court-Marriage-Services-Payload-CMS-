import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-dark)] text-[var(--color-text-light)]">
      {/* Main Footer */}
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-lg flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-xl">
                K
              </div>
              <span className="text-xl font-bold font-[var(--font-heading)]">
                Kaushal Associates
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Trusted legal consultants providing comprehensive legal services across India.
              Specializing in court marriage, property law, family disputes, and corporate law.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--color-secondary)] font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Blog', 'News', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-white/60 hover:text-[var(--color-secondary)] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[var(--color-secondary)] font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              {[
                'Court Marriage',
                'Property Law',
                'Family Law',
                'Criminal Law',
                'Corporate Law',
              ].map((service) => (
                <li key={service}>
                  <Link
                    href={`/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-white/60 hover:text-[var(--color-secondary)] transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[var(--color-secondary)] font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>123 Legal Chamber, District Court Complex, New Delhi - 110001</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">📞</span>
                <a href="tel:+919650515469" className="hover:text-[var(--color-secondary)] transition-colors">
                  +91 96505 15469
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉</span>
                <a href="mailto:info@kaushalassociates.com" className="hover:text-[var(--color-secondary)] transition-colors">
                  info@kaushalassociates.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Court Marriage Services. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-white/60 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
