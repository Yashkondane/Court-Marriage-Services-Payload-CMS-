import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CodeSnippetBlock({ block }: { block: any }) {
  if (!block.htmlCode) return null

  return (
    <div 
      className="code-embed-container w-full"
      dangerouslySetInnerHTML={{ __html: block.htmlCode }} 
    />
  )
}
