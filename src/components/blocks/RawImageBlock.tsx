'use client'
import React, { useState } from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RawImageBlock({ block }: { block: any }) {
  const image = block.image
  const [imgError, setImgError] = useState(false)

  if (!image?.url) return null

  const align = block.align || 'center'
  const width = block.width || 'content'
  const customWidth = block.customWidth

  const maxWidthMap: Record<string, string> = {
    content: '768px',
    wide: '1024px',
    full: '100%',
    custom: customWidth ? `${customWidth}px` : '768px',
  }

  const marginMap: Record<string, React.CSSProperties> = {
    left: { marginRight: 'auto' },
    center: { marginLeft: 'auto', marginRight: 'auto' },
    right: { marginLeft: 'auto' },
  }

  const wrapStyle: React.CSSProperties = {
    width: '100%',
    padding: '2rem 0',
  }

  const innerStyle: React.CSSProperties = {
    maxWidth: maxWidthMap[width],
    width: '100%',
    display: 'block',
    ...marginMap[align],
  }

  // Use natural dimensions from Payload if available, else fall back to a
  // large safe default so Next.js can scale down correctly.
  const natW = image.width  || 1920
  const natH = image.height || 1080

  return (
    <div style={wrapStyle} className="raw-image-block">
      <div style={innerStyle}>
        {imgError ? (
          // Fallback to plain <img> if Next/Image fails (e.g. domain not whitelisted)
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt={block.alt || image.alt || ''}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            loading="lazy"
          />
        ) : (
          <Image
            src={image.url}
            alt={block.alt || image.alt || ''}
            width={natW}
            height={natH}
            // quality={90} — near-lossless. WebP at 90 is ~20% smaller than
            // the original JPEG while being visually indistinguishable.
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={() => setImgError(true)}
          />
        )}
        {block.caption && (
          <p className="raw-image-caption">{block.caption}</p>
        )}
      </div>
    </div>
  )
}
