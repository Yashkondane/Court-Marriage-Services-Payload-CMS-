import React from 'react'
import { HeroBlock } from './HeroBlock'
import { RichContentBlock } from './RichContentBlock'
import { FAQBlock } from './FAQBlock'
import { HighlightsBlock } from './HighlightsBlock'
import { CTABlock } from './CTABlock'
import { BlogFeedBlock } from './BlogFeedBlock'
import { NewsFeedBlock } from './NewsFeedBlock'
import { GalleryBlockComponent } from './GalleryBlockComponent'
import { TestimonialsBlockComponent } from './TestimonialsBlockComponent'
import { ServicesCarouselBlock } from './ServicesCarouselBlock'
import { LogosBlock } from './LogosBlock'
import { CodeSnippetBlock } from './CodeSnippetBlock'
import { LawyerListBlock } from './LawyerListBlock'
import { DocumentsBlock } from './DocumentsBlock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = Record<string, any>

const blockComponents: Record<string, React.FC<{ block: Block }>> = {
  hero: HeroBlock,
  richContent: RichContentBlock,
  faq: FAQBlock,
  highlights: HighlightsBlock,
  cta: CTABlock,
  blogFeed: BlogFeedBlock,
  newsFeed: NewsFeedBlock,
  gallery: GalleryBlockComponent,
  testimonials: TestimonialsBlockComponent,
  servicesCarousel: ServicesCarouselBlock,
  logos: LogosBlock,
  codeSnippet: CodeSnippetBlock,
  lawyerList: LawyerListBlock,
  documents: DocumentsBlock,
}

function getVisibilityClasses(block: Block): string {
  const classes: string[] = []
  const visibility = block.visibility || {}

  if (visibility.showOnDesktop === false) classes.push('hide-on-desktop')
  if (visibility.showOnMobile === false) classes.push('hide-on-mobile')

  return classes.join(' ')
}

interface RenderBlocksProps {
  blocks: Block[] | null | undefined
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null

        const visibilityClasses = getVisibilityClasses(block)

        return (
          <section
            key={block.id || index}
            className={`block-section ${visibilityClasses}`}
          >
            <Component block={block} />
          </section>
        )
      })}
    </>
  )
}
