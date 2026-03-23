/**
 * Basic Lexical to HTML serializer for Payload 3.x.
 * Handles blocks (specifically CodeSnippet) and standard text formatting.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeLexical(content: any): string {
  if (!content?.root?.children) return ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function serializeNode(node: any): string {
    if (node.type === 'text') {
      let text = escapeHtml(node.text || '')
      if (node.format & 1) text = `<strong>${text}</strong>` // bold
      if (node.format & 2) text = `<em>${text}</em>` // italic
      if (node.format & 8) text = `<u>${text}</u>` // underline
      if (node.format & 4) text = `<s>${text}</s>` // strikethrough
      if (node.format & 16) text = `<code>${text}</code>` // inline code
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
        return `<a href="${escapeHtml(node.fields?.url || '#')}" target="${node.fields?.newTab ? '_blank' : '_self'}" class="text-blue-600 hover:underline">${children}</a>`
      case 'quote':
        return `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4">${children}</blockquote>`
      case 'block':
        // Support for integrated CodeSnippet block
        if (node.fields?.blockType === 'codeSnippet') {
          return node.fields.htmlCode || ''
        }
        return ''
      case 'upload':
        // Basic image support
        if (node.value?.url) {
          return `<div class="my-6"><img src="${node.value.url}" alt="${node.value.alt || ''}" class="rounded-lg shadow-md max-w-full h-auto" /></div>`
        }
        return ''
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
    .replace(/'/g, '&#039;')
}
