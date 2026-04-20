import React from 'react'
import Link from 'next/link'

export function Footer({ 
  services = [], 
  locations = [], 
  settings = null 
}: { 
  services?: any[], 
  locations?: any[], 
  settings?: any 
}) {
  const quickLinks = settings?.quickLinks || [
    { label: 'About Us', url: '/about' },
    { label: 'Contact Us', url: '/contact' },
    { label: 'Talk To Lawyer', url: '/talk-to-lawyer' },
    { label: 'Ask a Free Question', url: '/ask-free-question' },
  ]

  return (
    <footer className="bg-[var(--color-bg-dark)] text-[var(--color-text-light)] relative z-20">
      {/* Main Footer */}
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Find a Lawyer (Locations) */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Find a Lawyer</h3>
            <ul className="space-y-3">
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <li key={loc.id}>
                    <Link
                      href={`/locations/${loc.slug || ''}`}
                      className="text-white/70 hover:text-[var(--color-secondary)] transition-colors text-sm"
                    >
                      Lawyers in {loc.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-white/40 text-sm">Configure in Admin {"->"} Locations</li>
              )}
            </ul>
          </div>

          {/* Legal Service & Others (Services) */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Legal Service & Others</h3>
            <ul className="space-y-3">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/${service.slug || ''}`}
                      className="text-white/70 hover:text-[var(--color-secondary)] transition-colors text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-white/40 text-sm">Configure in Admin {"->"} Services</li>
              )}
            </ul>
          </div>

          {/* Links (Quick Links from Global Settings) */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link: any, index: number) => (
                <li key={index}>
                  <Link
                    href={link.url || '#'}
                    className="text-white/70 hover:text-[var(--color-secondary)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Contact Info from Global Settings) */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Contact</h3>
            <ul className="space-y-5 text-sm text-white/70">
              {/* Address */}
              <div>
                <p className="font-semibold text-white/90 mb-1">Head Office Address</p>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-gray-400">🏢</span>
                  <span className="leading-relaxed">
                    {settings?.officeAddress || '304 Kanchanjunga, Barakhamba Road, CP, Delhi-110001'}
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <p className="font-semibold text-white/90 mb-2">Contact Details</p>
                <li className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400">📞</span>
                  <a href={`tel:${settings?.phoneNumber || '8800788535'}`} className="hover:text-[var(--color-secondary)] transition-colors">
                    {settings?.phoneNumber || '8800788535'}
                  </a>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400">✉</span>
                  <a href={`mailto:${settings?.emailAddress || 'care@leadindia.law'}`} className="hover:text-[var(--color-secondary)] transition-colors">
                    {settings?.emailAddress || 'care@leadindia.law'}
                  </a>
                </li>
              </div>

              {/* Opening Hours */}
              <div>
                <p className="font-semibold text-white/90 mb-1">Opening Hours</p>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">🕒</span>
                  <span>{settings?.openingHours || '9:00 AM - 8:00 PM'}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container-page py-6 text-xs text-white/40 leading-relaxed text-center md:text-left">
          <p className="mb-2">
            The information provided here is provided AS IS, subject to Terms Of Use & Privacy Policy. 
            It is solely available at your request for informational purposes only, should not be interpreted 
            as soliciting or advertisement. In cases where the user has any legal issues, he/she in all cases 
            must seek independent legal advice. The VakilFirst Logo are registered trademarks. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

