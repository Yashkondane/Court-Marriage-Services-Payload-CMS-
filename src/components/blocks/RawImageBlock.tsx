import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RawImageBlock({ block }: { block: any }) {
  const image = block.image
  if (!image?.url) return null

  const align = block.align || 'center'
  const width = block.width || 'content'
  const customWidth = block.customWidth

  const alignMap: Record<string, string> = {
    left: 'margin-right: auto',
    center: 'margin-left: auto; margin-right: auto',
    right: 'margin-left: auto',
  }

  const maxWidthMap: Record<string, string> = {
    content: '768px',
    wide: '1024px',
    full: '100%',
    custom: customWidth ? `${customWidth}px` : '768px',
  }

  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    padding: '2rem 0',
  }

  const imgWrapStyle: React.CSSProperties = {
    maxWidth: maxWidthMap[width],
    width: '100%',
    ...(align === 'left' ? { marginRight: 'auto' } : {}),
    ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
    ...(align === 'right' ? { marginLeft: 'auto' } : {}),
    display: 'block',
  }

  return (
    <div style={wrapperStyle} className="raw-image-block">
      <div style={imgWrapStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={block.alt || image.alt || ''}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          loading="lazy"
        />
        {block.caption && (
          <p className="raw-image-caption">{block.caption}</p>
        )}
      </div>
    </div>
  )
}
