import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RichContentBlock({ block }: { block: any }) {
  const widthMap: Record<string, string> = {
    narrow: 'max-w-[640px]',
    default: 'max-w-[768px]',
    wide: 'max-w-[1024px]',
    full: 'max-w-full',
  }

  const maxWidth = widthMap[block.maxWidth] || widthMap.default

  // Payload Lexical richText is stored as serialized JSON.
  // For full rendering, you'd use @payloadcms/richtext-lexical/react
  // For now, we render a placeholder or serialized content.
  return (
    <div className="py-12 md:py-16">
      <div className={`container-page ${maxWidth} mx-auto`}>
        <div className="rich-text prose prose-lg">
          {block.content && typeof block.content === 'object' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: serializeLexical(block.content),
              }}
            />
          ) : (
            <p>{String(block.content || '')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Basic Lexical to HTML serializer.
 * For production, use @payloadcms/richtext-lexical/react RichText component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeLexical(content: any): string {
  if (!content?.root?.children) return ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function serializeNode(node: any): string {
    if (node.type === 'text') {
      let text = escapeHtml(node.text || '')
      if (node.format & 1) text = `<strong>${text}</strong>` // bold
      if (node.format & 2) text = `<em>${text}</em>` // italic
      if (node.format & 8) text = `<u>${text}</u>` // underline
      if (node.format & 4) text = `<s>${text}</s>` // strikethrough
      return text
    }

    const children = (node.children || []).map(serializeNode).join('')

    switch (node.type) {
      case 'paragraph':
        return `<p>${children}</p>`
      case 'heading':
        return `<${node.tag}>${children}</${node.tag}>`
      case 'list':
        const tag = node.listType === 'number' ? 'ol' : 'ul'
        return `<${tag}>${children}</${tag}>`
      case 'listitem':
        return `<li>${children}</li>`
      case 'link':
        return `<a href="${escapeHtml(node.fields?.url || '#')}" target="${node.fields?.newTab ? '_blank' : '_self'}">${children}</a>`
      case 'quote':
        return `<blockquote>${children}</blockquote>`
      default:
        return children
    }
  }

  return content.root.children.map(serializeNode).join('')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
