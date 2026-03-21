import React from 'react'
import Link from 'next/link'

export function Navigation() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] font-medium transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
