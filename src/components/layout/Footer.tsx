import React from 'react'
import Link from 'next/link'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'

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
    <footer className="bg-[var(--color-bg-dark)] text-white relative z-20">
      {/* Main Footer */}
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Find a Lawyer (Locations) */}
          <div>
            <h3 className="font-bold mb-6 text-lg tracking-wide" style={{ color: '#ffffff' }}>Find a Lawyer</h3>
            <ul className="space-y-3">
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <li key={loc.id}>
                    <Link
                      href={`/locations/${loc.slug || ''}`}
                      className="text-white hover:text-[var(--color-secondary)] transition-colors text-sm"
                    >
                      Lawyers in {loc.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-white text-sm">Configure in Admin {"->"} Locations</li>
              )}
            </ul>
          </div>

          {/* Legal Service & Others (Services) */}
          <div>
            <h3 className="font-bold mb-6 text-lg tracking-wide" style={{ color: '#ffffff' }}>Legal Service & Others</h3>
            <ul className="space-y-3">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/${service.slug || ''}`}
                      className="text-white hover:text-[var(--color-secondary)] transition-colors text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-white text-sm">Configure in Admin {"->"} Services</li>
              )}
            </ul>
          </div>

          {/* Links (Quick Links from Global Settings) */}
          <div>
            <h3 className="font-bold mb-6 text-lg tracking-wide" style={{ color: '#ffffff' }}>Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link: any, index: number) => (
                <li key={index}>
                  <Link
                    href={link.url || '#'}
                    className="text-white hover:text-[var(--color-secondary)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Contact Info from Global Settings) */}
          <div>
            <h3 className="font-bold mb-6 text-lg tracking-wide" style={{ color: '#ffffff' }}>Contact</h3>
            <ul className="space-y-5 text-sm text-white">
              {/* Address */}
              <div>
                <p className="font-semibold text-white mb-1">Head Office Address</p>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-[var(--color-secondary)] text-base mt-0.5 shrink-0" />
                  <span className="leading-relaxed">
                    {settings?.officeAddress || '304 Kanchanjunga, Barakhamba Road, CP, Delhi-110001'}
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <p className="font-semibold text-white mb-2">Contact Details</p>
                <li className="flex items-center gap-2 mb-2">
                  <FiPhone className="text-[var(--color-secondary)] text-base shrink-0" />
                  <a href={`tel:${settings?.phoneNumber || '+919876543210'}`} className="hover:text-[var(--color-secondary)] transition-colors">
                    {settings?.phoneNumber || '+91 98765 43210'}
                  </a>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <FiMail className="text-[var(--color-secondary)] text-base shrink-0" />
                  <a href={`mailto:${settings?.emailAddress || 'contact@vakilfirst.com'}`} className="hover:text-[var(--color-secondary)] transition-colors">
                    {settings?.emailAddress || 'contact@vakilfirst.com'}
                  </a>
                </li>
              </div>

              {/* Opening Hours */}
              <div>
                <p className="font-semibold text-white mb-1">Opening Hours</p>
                <li className="flex items-center gap-2">
                  <FiClock className="text-[var(--color-secondary)] text-base shrink-0" />
                  <span>{settings?.openingHours || '9:00 AM - 8:00 PM'}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container-page py-6 text-xs text-white leading-relaxed text-center md:text-left">
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

