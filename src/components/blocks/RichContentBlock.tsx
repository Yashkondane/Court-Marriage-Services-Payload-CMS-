import React from 'react'
import { serializeLexical } from '@/lib/payload/lexical'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RichContentBlock({ block }: { block: any }) {
  const widthMap: Record<string, string> = {
    narrow: 'max-w-[640px]',
    default: 'max-w-[768px]',
    wide: 'max-w-[1024px]',
    full: 'max-w-full',
  }

  const maxWidth = widthMap[block.maxWidth] || widthMap.default

  return (
    <div className="py-8 md:py-10">
      <div className={`container-page ${maxWidth} mx-auto`}>
        <div className="rich-text">
          {block.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: serializeLexical(block.content),
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
