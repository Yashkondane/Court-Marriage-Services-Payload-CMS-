import { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'
import fs from 'fs'

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

  console.log('Seeding Media for Hero and Process Background...')
  let mediaId = null
  const mediaResults = await payload.find({
    collection: 'media',
    limit: 1,
  })
  if (mediaResults.docs.length > 0) {
    mediaId = mediaResults.docs[0].id
  } else {
    console.log('No media found, uploading vakilfirst.png...')
    try {
      const fileData = fs.readFileSync('vakilfirst.png')
      const createdMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'VakilFirst Corporate Law Banner',
        },
        file: {
          data: fileData,
          name: 'vakilfirst.png',
          mimetype: 'image/png',
          size: fileData.length,
        }
      })
      mediaId = createdMedia.id
    } catch (err) {
      console.error('Failed to upload default media:', err)
    }
  }

  console.log('Checking/Creating Approved Lawyer for Carousel...')
  let lawyerId = null
  const lawyersRes = await payload.find({
    collection: 'lawyers',
    where: { status: { equals: 'approved' } },
    limit: 1,
  })
  if (lawyersRes.docs.length > 0) {
    lawyerId = lawyersRes.docs[0].id
  } else {
    console.log('No approved lawyer found, creating a default corporate lawyer...')
    const dummyLawyer = await payload.create({
      collection: 'lawyers',
      data: {
        name: 'Adv. Priya Sharma',
        email: 'priya.sharma@vakilfirst.com',
        slug: 'priya-sharma',
        status: 'approved',
        experience: 12,
        phone: '9876543210',
        rating: 5,
        ratingCount: 24,
        profileViews: 120,
      }
    })
    lawyerId = dummyLawyer.id
  }

  console.log('Seeding Testimonials...')
  const tData = [
    { name: 'Rohit Mehra', designation: 'Tech Startup Founder – Bengaluru', content: '“The team helped us structure our startup legally and prepared all investor agreements professionally. Their response time and clarity were exceptional.”' },
    { name: 'Priya Sharma', designation: 'Manufacturing Business Owner – Delhi', content: '“We received complete compliance support for our private limited company. The process was smooth, transparent, and highly professional.”' },
    { name: 'Amit Verma', designation: 'E-commerce Entrepreneur – Mumbai', content: '“They reviewed our contracts and vendor agreements thoroughly and helped us avoid major legal risks. Highly recommended for growing businesses.”' },
    { name: 'Karan Bedi', designation: 'Logistics Company Director – Chandigarh', content: '“Their corporate advisory support during our expansion phase was extremely valuable. The legal guidance was practical and business-oriented.”' }
  ]

  const testimonialIds = []
  for (const t of tData) {
    const createdTestimonial = await payload.create({
      collection: 'testimonials',
      data: {
        name: t.name,
        designation: t.designation,
        content: t.content,
        rating: 5,
      }
    })
    testimonialIds.push(createdTestimonial.id)
  }

  console.log('Seeding FAQs...')
  const faqData = [
    { question: 'What corporate law services do you provide?', answer: 'We provide company incorporation, contract drafting, compliance advisory, shareholder agreements, mergers & acquisitions support, due diligence, employment documentation, dispute resolution, and general corporate legal advisory services.' },
    { question: 'Do you assist startups and small businesses?', answer: 'Yes. We regularly work with startups, MSMEs, LLPs, and private limited companies across India and provide practical legal solutions suited to growing businesses.' },
    { question: 'Can you help with company compliance in India?', answer: 'Yes. We assist with ROC compliance, annual filings, board resolutions, corporate governance requirements, and other regulatory obligations under Indian corporate laws.' },
    { question: 'Do you provide contract drafting and review services?', answer: 'Yes. We draft and review business agreements including vendor agreements, employment contracts, partnership agreements, NDAs, service agreements, and shareholder agreements.' },
    { question: 'Can consultations be done online?', answer: 'Yes. We offer online consultations and legal support for clients across India through video calls, email, and phone consultations.' },
    { question: 'How much do corporate legal services cost?', answer: 'The cost depends on the nature and complexity of the legal matter. After understanding your requirements, we provide transparent pricing and consultation details.' }
  ]

  const faqIds = []
  for (const f of faqData) {
    const createdFaq = await payload.create({
      collection: 'faqs',
      data: {
        question: f.question,
        answer: createLexicalRoot([f.answer]),
        scope: 'service',
      }
    })
    faqIds.push(createdFaq.id)
  }

  console.log('Constructing Corporate Law Page Layout...')
  const layout = [
    // 1. Hero Block
    {
      blockType: 'hero',
      layoutStyle: 'standard',
      heading: 'Corporate Law Services for Modern Businesses in India',
      subheading: 'From company formation and compliance to mergers, contracts, and corporate disputes — our legal team helps businesses stay protected, compliant, and growth-ready.',
      backgroundType: 'image',
      backgroundImage: mediaId,
      textColorTheme: 'light',
      showSearchBar: false,
      showLeadForm: false,
      ctaText: 'Book a Consultation',
      ctaLink: '/consultation',
      secondaryCta: {
        text: 'WhatsApp Us',
        link: 'https://wa.me/919650515469'
      },
      style: 'fullWidth',
      showStatsBar: true,
      stats: [
        { icon: 'users', value: '500+', label: 'Businesses Assisted' },
        { icon: 'clock', value: '10+', label: 'Years Corporate Experience' },
        { icon: 'scale', value: 'PAN India', label: 'Legal Support' },
        { icon: 'shield', value: 'Fast & Confidential', label: 'Consultation' }
      ]
    },
    // 2. Rich Content Block
    {
      blockType: 'richContent',
      maxWidth: 'default',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'heading',
              tag: 'h2',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 1, // bold
                  mode: 'normal',
                  style: '',
                  text: 'Trusted Corporate Legal Solutions for Indian Businesses',
                  type: 'text',
                  version: 1
                }
              ]
            },
            {
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
                  text: 'Whether you are launching a startup, scaling operations, onboarding investors, or handling complex corporate transactions, legal compliance is critical at every stage of business growth.',
                  type: 'text',
                  version: 1
                }
              ]
            },
            {
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
                  text: 'Our corporate law team assists startups, SMEs, private limited companies, LLPs, and established enterprises with practical and business-focused legal solutions tailored to Indian laws and regulations.',
                  type: 'text',
                  version: 1
                }
              ]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 1, // bold
                  mode: 'normal',
                  style: '',
                  text: 'We provide end-to-end legal support across:',
                  type: 'text',
                  version: 1
                }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Company Incorporation & Business Structuring',
                'Shareholder Agreements & Founders Agreements',
                'Contract Drafting & Review',
                'Legal Due Diligence',
                'Corporate Compliance & Regulatory Advisory',
                'Mergers & Acquisitions',
                'Employment & HR Policies',
                'Intellectual Property Protection',
                'Investor Documentation & Funding Support',
                'Corporate Dispute Resolution'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: txt,
                    type: 'text',
                    version: 1
                  }
                ]
              }))
            },
            {
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
                  text: 'Our approach focuses on reducing legal risks while enabling smooth business operations. We combine legal expertise with commercial understanding to provide strategic advice that supports long-term business success.',
                  type: 'text',
                  version: 1
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 1, // bold
                  mode: 'normal',
                  style: '',
                  text: 'Why Businesses Choose Us',
                  type: 'text',
                  version: 1
                }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Experienced corporate legal professionals',
                'Transparent legal process',
                'Startup-friendly advisory',
                'Timely compliance support',
                'Confidential and client-focused approach',
                'PAN India consultation support'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: txt,
                    type: 'text',
                    version: 1
                  }
                ]
              }))
            }
          ]
        }
      }
    },
    // 3. Lawyers Carousel Block
    {
      blockType: 'lawyersCarousel',
      heading: 'Meet Our Corporate Law Experts',
      lawyers: [lawyerId],
      autoplay: true,
      interval: 5000
    },
    // 4. Testimonials Block
    {
      blockType: 'testimonialsBlock',
      heading: 'What Our Clients Say',
      layout: 'grid',
      testimonials: testimonialIds
    },
    // 5. FAQ Block
    {
      blockType: 'faq',
      heading: 'Frequently Asked Questions',
      source: 'manual',
      faqs: faqIds,
      style: 'accordion'
    },
    // 6. How It Works Block
    {
      blockType: 'howItWorks',
      processLabel: 'THE PROCESS',
      heading: 'How It Works',
      backgroundImage: mediaId,
      quoteText: '“Strong legal foundations help businesses grow with confidence and compliance.”',
      ctaText: 'GET LEGAL HELP',
      ctaLink: '/consultation',
      steps: [
        {
          title: 'Consultation & Business Assessment',
          description: 'We understand your business structure, legal requirements, operational risks, and growth objectives to identify the right legal solutions.',
          icon: 'gavel'
        },
        {
          title: 'Documentation & Legal Strategy',
          description: 'Our legal team prepares contracts, compliance documents, agreements, and strategic legal frameworks tailored to your business needs.',
          icon: 'document'
        },
        {
          title: 'Execution & Ongoing Support',
          description: 'We assist with filings, negotiations, compliance management, and continuous legal support to help your business operate smoothly.',
          icon: 'handshake'
        }
      ]
    }
  ]

  console.log('Checking/Creating Corporate Law service item...')
  let serviceId = null
  const existingService = await payload.find({
    collection: 'services',
    where: { slug: { equals: 'corporate-law' } }
  })
  if (existingService.docs.length > 0) {
    serviceId = existingService.docs[0].id
    await payload.update({
      collection: 'services',
      id: serviceId,
      data: {
        layout: layout
      }
    })
  } else {
    const createdService = await payload.create({
      collection: 'services',
      data: {
        title: 'Corporate Law Services',
        slug: 'corporate-law',
        showInHeader: true,
        showInFooter: true,
        navDropdown: 'legal-matter',
        navCategory: 'Corporate & Business',
        uiIcon: 'building',
        layout: layout
      }
    })
    serviceId = createdService.id
  }

  const seo = {
    metaTitle: 'Corporate Law Services for Businesses in India | VakilFirst',
    metaDescription: 'Complete corporate legal support including company incorporation, contracts, compliance advisory, shareholder agreements, mergers, and business structuring in India.',
    keywords: 'corporate law, company compliance, business incorporation, startup legal, shareholder agreement, mergers and acquisitions, contract drafting',
    robotsMeta: 'index,follow'
  }

  const pageData = {
    title: 'Corporate Law Services',
    slug: 'corporate-law',
    pageType: 'service',
    service: serviceId,
    status: 'published',
    publishedDate: new Date().toISOString(),
    seo: seo,
    layout: layout
  }

  console.log('Seeding Corporate Law Page in pages collection...')
  const existingPages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'corporate-law' } }
  })

  if (existingPages.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existingPages.docs[0].id,
      data: pageData
    })
    console.log('Corporate Law Page updated successfully!')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData
    })
    console.log('Corporate Law Page created successfully!')
  }

  console.log('Seeding completed successfully!')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error during seeding:', err)
  process.exit(1)
})
