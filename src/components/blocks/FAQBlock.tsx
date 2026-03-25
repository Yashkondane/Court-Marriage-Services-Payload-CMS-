'use client'

import React, { useState } from 'react'
import { serializeLexical } from '@/lib/payload/lexical'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FAQBlock({ block }: { block: any }) {
  const faqs = block.faqs || []

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="container-page max-w-4xl mx-auto">
        {block.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {block.heading}
          </h2>
        )}
        {block.description && (
          <p className="text-center text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            {block.description}
          </p>
        )}
        <div className="space-y-3">
          {faqs.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            faqs.map((faq: any, index: number) => (
              <FAQItem
                key={faq.id || index}
                question={faq.question || `Question ${index + 1}`}
                answer={faq.answer}
                style={block.style}
              />
            ))
          ) : (
            <p className="text-center text-[var(--color-text-secondary)]">
              No FAQs available.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function FAQItem({
  question,
  answer,
  style,
}: {
  question: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any
  style: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  if (style === 'list') {
    return (
      <div className="border-b border-[var(--color-border)] pb-8 mb-6 last:border-0 last:mb-0">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-bold flex-shrink-0 mt-1">
            ✓
          </div>
          <div>
            <h3 className="font-bold text-xl text-[var(--color-primary)] mb-3">{question}</h3>
            <div className="text-[var(--color-text-secondary)] leading-relaxed rich-text prose prose-sm max-w-none">
              {typeof answer === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: answer }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: serializeLexical(answer) }} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[var(--color-primary)] pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[var(--color-secondary)] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] bg-slate-50/50">
          <div className="pt-5 rich-text prose prose-sm max-w-none">
            {typeof answer === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: answer }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: serializeLexical(answer) }} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
