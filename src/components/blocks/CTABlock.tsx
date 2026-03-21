import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CTABlock({ block }: { block: any }) {
  const styleMap: Record<string, string> = {
    default: 'bg-[var(--color-primary)] text-white',
    banner: 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white',
    card: 'bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)]',
  }

  const btnClass = block.style === 'card' ? 'btn btn-primary' : 'btn btn-secondary'

  return (
    <div className={`relative overflow-hidden ${styleMap[block.style] || styleMap.default}`}>
      {block.backgroundImage?.url && (
        <>
          <Image
            src={block.backgroundImage.url}
            alt={block.backgroundImage.alt || 'CTA background'}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-primary-dark)]/80" />
        </>
      )}
      <div className="container-page relative z-10 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{block.heading}</h2>
        {block.description && (
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${block.style === 'card' ? 'text-[var(--color-text-secondary)]' : 'opacity-90'}`}>
            {block.description}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {block.primaryButton?.text && block.primaryButton?.link && (
            <Link href={block.primaryButton.link} className={btnClass}>
              {block.primaryButton.text}
            </Link>
          )}
          {block.secondaryButton?.text && block.secondaryButton?.link && (
            <Link
              href={block.secondaryButton.link}
              className={`btn ${block.style === 'card' ? 'btn-outline' : 'btn-outline border-white text-white hover:bg-white hover:text-[var(--color-primary)]'}`}
            >
              {block.secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
