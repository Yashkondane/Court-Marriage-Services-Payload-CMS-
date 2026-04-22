import React from 'react'

interface SectionTitleProps {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  centered?: boolean
  theme?: 'light' | 'dark'
  className?: string
}

export function SectionTitle({ 
  title, 
  subtitle,
  centered = true,
  theme = 'light',
  className = ''
}: SectionTitleProps) {
  return (
    <div className={`mb-10 lg:mb-12 ${centered ? 'text-center flex flex-col items-center' : 'text-left flex flex-col items-start'} ${className}`}>
      <h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-[#111]'
        }`}
      >
        {title}
      </h2>
      <div className="w-24 h-[4px] bg-[var(--color-secondary)] rounded-full mb-5"></div>
      
      {subtitle && (
        <p className={`text-base md:text-lg max-w-3xl ${
          theme === 'dark' ? 'text-white/80' : 'text-gray-600'
        } ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
