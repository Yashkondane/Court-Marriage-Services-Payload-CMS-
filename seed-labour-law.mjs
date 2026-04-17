import { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'

// Helper to convert simple strings to Payload 3 Lexical format
function createLexicalRoot(paragraphs) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: paragraphs.map(text => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: text,
            type: 'text',
            version: 1,
          },
        ],
      })),
    },
  }
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding Testimonials...')
  const t1 = await payload.create({
    collection: 'testimonials',
    data: {
      name: 'Marcus Thorne',
      designation: 'CEO, THORNE DYNAMICS',
      content: 'When my business faced a complex intellectual property dispute, the team didn\'t just provide counsel; they provided a masterclass in strategic defense. Their precision is unmatched.',
      rating: 5,
    },
  })

  const t2 = await payload.create({
    collection: 'testimonials',
    data: {
      name: 'Elena Rostova',
      designation: 'MANAGING PARTNER, VERTEX CAPITAL',
      content: 'Navigating a high-stakes corporate merger requires steady hands. The team here offered not only brilliant legal foresight but a calming authority that guided us through every negotiation.',
      rating: 5,
    },
  })

  const t3 = await payload.create({
    collection: 'testimonials',
    data: {
      name: 'Julian Hayes',
      designation: 'FOUNDER, HAYES INSTITUTE',
      content: 'In a landscape cluttered with generic advice, they deliver bespoke, incisive legal solutions. Their attention to detail during our appellate case was nothing short of extraordinary.',
      rating: 5,
    },
  })

  console.log('Seeding FAQs...')
  const faqs = []
  const faqData = [
    { question: 'What is the standard notice period under Indian Labour Law?', answer: 'It varies depending on the state and the nature of employment, but typically it ranges from 30 to 90 days as per the Industrial Disputes Act and state-specific Shops and Establishment Acts.' },
    { question: 'Is POSH compliance mandatory for my startup?', answer: 'Yes, setting up an Internal Complaints Committee (ICC) and ensuring POSH compliance is mandatory for any organization in India with 10 or more employees.' },
    { question: 'Can an employer terminate an employee without notice?', answer: 'Termination without notice is generally only permitted in cases of proven misconduct. Otherwise, notice or payment in lieu of notice is legally required.' },
    { question: 'How do you handle executive compensation disputes?', answer: 'We thoroughly review employment agreements, ESOP structures, and severance clauses to negotiate favorable outcomes or litigate when necessary.' },
  ]

  for (const f of faqData) {
    const createdFaq = await payload.create({
      collection: 'faqs',
      data: {
        question: f.question,
        answer: createLexicalRoot([f.answer]),
        scope: 'global',
      },
    })
    faqs.push(createdFaq.id)
  }

  console.log('Fetching Lawyers...')
  const lawyerResults = await payload.find({
    collection: 'lawyers',
    where: { status: { equals: 'approved' } },
    limit: 6,
  })
  const lawyerIds = lawyerResults.docs.map(l => l.id)

  console.log('Fetching Media for How It Works...')
  const mediaResults = await payload.find({
    collection: 'media',
    limit: 1,
  })
  const mediaId = mediaResults.docs.length > 0 ? mediaResults.docs[0].id : null

  console.log('Creating Labour Law Page...')
  try {
    const existingPages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'labour-&-employment-law' } }
    })
    
    // Build layout dynamically to avoid validation errors for missing relations
    const layout = [
      {
        blockType: 'hero',
        layoutStyle: 'standard',
        heading: 'Expert Labour & Employment Counsel in India',
        subheading: 'Navigate complex Indian labour compliances, protect your workforce, and resolve disputes seamlessly with our top-tier legal experts.',
        backgroundType: 'color',
        backgroundColor: 'black',
        textColorTheme: 'light',
        ctaText: 'Consult an Expert Today',
        ctaLink: '/consultation',
        style: 'centered',
        showStatsBar: false,
      },
      {
        blockType: 'richContent',
        maxWidth: 'default',
        content: createLexicalRoot([
          "Navigating India's dynamic labour landscape requires more than just legal knowledge; it requires strategic foresight. Our Labour & Employment Law practice is dedicated to helping businesses and executives thrive while ensuring rigorous compliance with central and state legislations.",
          "From the Industrial Disputes Act and the Factories Act to modern codes on wages and social security, our experts deliver bespoke structuring for employment contracts, intricate ESOP policies, and robust non-compete agreements.",
          "We also specialize in rigorous POSH (Prevention of Sexual Harassment) compliance, conducting audits, setting up ICCs, and providing mandatory training to ensure a safe, inclusive, and legally sound workplace.",
          "Whether you are facing wrongful termination claims, union negotiations, or complex executive severance disputes, our litigators and strategic advisors ensure your interests are aggressively protected across all tribunals and high courts in India."
        ])
      }
    ]

    // Omitted lawyersCarousel programmatically to prevent validation errors.

    layout.push(
      {
        blockType: 'testimonialsBlock',
        heading: 'Voices of Trust & Justice',
        description: 'Our legacy is defined by the success of those we represent. Read the firsthand accounts of clients who entrusted us with their most critical legal matters.',
        layout: 'grid',
        testimonials: [t1.id, t2.id, t3.id],
      },
      {
        blockType: 'faq',
        heading: 'Frequently Asked Questions',
        layout: 'accordion',
        faqs: faqs,
      }
    )

    if (mediaId) {
      layout.push({
        blockType: 'howItWorks',
        heading: 'Our Process',
        backgroundImage: mediaId,
        steps: [
          { title: 'Initial Consultation', description: 'We analyze your current HR policies, disputes, or compliance needs.', icon: 'document' },
          { title: 'Strategic Roadmap', description: 'Our experts draft a customized legal strategy for your specific corporate environment.', icon: 'handshake' },
          { title: 'Resolution & Compliance', description: 'We execute the plan, ensuring watertight compliance and swift dispute resolution.', icon: 'scale' },
        ]
      })
    }

    layout.push({
      blockType: 'highlights',
      heading: 'Core Practice Areas',
      style: 'cards',
      items: [
        { title: 'POSH Compliance', description: 'ICC setup, audits, and mandatory employee training programs.' },
        { title: 'Employment Contracts', description: 'Drafting robust NDA, non-compete, and executive compensation agreements.' },
        { title: 'Dispute Resolution', description: 'Handling wrongful termination, gratuity, and PF disputes at tribunals.' },
      ]
    })

    const pageData = {
      title: 'Labour & Employment Law',
      slug: 'labour-&-employment-law',
      layout: layout
    }

    if (existingPages.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData
      })
      console.log('Page updated successfully.')
    } else {
      await payload.create({
        collection: 'pages',
        data: pageData
      })
      console.log('Page created successfully.')
    }

    console.log('Successfully completed Labour Law seeding!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding Labour Law page:', error)
    process.exit(1)
  }
}

seed()
