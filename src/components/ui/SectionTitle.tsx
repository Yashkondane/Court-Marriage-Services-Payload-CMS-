import React from 'react'

interface SectionTitleProps {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  label?: string               // small eyebrow label above title
  centered?: boolean
  theme?: 'light' | 'dark'
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  label,
  centered = true,
  theme = 'light',
  className = '',
}: SectionTitleProps) {
  const isDark = theme === 'dark'
  return (
    <div
      className={`section-title-wrap ${centered ? 'section-title-wrap--centered' : ''} ${className}`}
    >
      {label && (
        <span className={`section-eyebrow ${isDark ? 'section-eyebrow--dark' : ''}`}>
          {label}
        </span>
      )}
      <h2 className={`section-heading ${isDark ? 'section-heading--dark' : ''}`}>
        {title}
      </h2>
      <div className="section-rule" />
      {subtitle && (
        <p className={`section-subtitle ${isDark ? 'section-subtitle--dark' : ''} ${centered ? 'section-subtitle--centered' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
