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
          alt: 'VakilFirst Family Law Banner',
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

  console.log('Checking/Creating Approved Family Lawyer for Carousel...')
  let lawyerId = null
  const lawyersRes = await payload.find({
    collection: 'lawyers',
    where: { 
      status: { equals: 'approved' },
      name: { contains: 'Sen' }
    },
    limit: 1,
  })
  if (lawyersRes.docs.length > 0) {
    lawyerId = lawyersRes.docs[0].id
  } else {
    console.log('Creating a default family lawyer...')
    const dummyLawyer = await payload.create({
      collection: 'lawyers',
      data: {
        name: 'Adv. Shalini Sen',
        email: 'shalini.sen@vakilfirst.com',
        slug: 'shalini-sen',
        status: 'approved',
        experience: 15,
        phone: '9876543211',
        rating: 5,
        ratingCount: 38,
        profileViews: 245,
      }
    })
    lawyerId = dummyLawyer.id
  }

  console.log('Seeding Family Law Testimonials...')
  const tData = [
    { name: 'Neha Kapoor', designation: 'Client – Delhi', content: '“The legal team handled my divorce matter with professionalism and empathy. They explained every step clearly and made a difficult process much easier.”' },
    { name: 'Rakesh Sharma', designation: 'Client – Mumbai', content: '“I received excellent support in my child custody case. The lawyers were responsive, knowledgeable, and genuinely cared about the outcome.”' },
    { name: 'Pooja Verma', designation: 'Client – Bengaluru', content: '“They helped me through a domestic violence matter with complete confidentiality and guidance. I truly felt supported throughout the process.”' },
    { name: 'Ankit Mehra', designation: 'Client – Chandigarh', content: '“The team resolved our family property dispute efficiently and helped us avoid unnecessary litigation. Highly professional service.”' }
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

  console.log('Seeding Family Law FAQs...')
  const faqData = [
    { question: 'What family law services do you provide?', answer: 'We assist with divorce, child custody, maintenance, domestic violence matters, family property disputes, adoption, guardianship, and other family-related legal issues.' },
    { question: 'Can you help with mutual consent divorce?', answer: 'Yes. We assist clients with mutual consent divorce proceedings, documentation, settlement agreements, and court procedures.' },
    { question: 'How long does a divorce case take in India?', answer: 'The timeline depends on the type of divorce and complexity of the matter. Mutual consent divorces are generally resolved faster than contested divorce cases.' },
    { question: 'Are consultations confidential?', answer: 'Yes. All consultations and discussions are handled with complete confidentiality and professionalism.' },
    { question: 'Can you assist NRI clients in family law matters?', answer: 'Yes. We regularly assist NRI clients with divorce, custody disputes, property matters, and other family law cases in India.' },
    { question: 'Do I need to visit your office physically?', answer: 'No. We provide online consultations and legal support through phone calls, video meetings, and email communication.' }
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

  console.log('Constructing Family Law Page Layout...')
  const layout = [
    // 1. Hero Block
    {
      blockType: 'hero',
      layoutStyle: 'standard',
      heading: 'Trusted Family Law Services in India',
      subheading: 'Compassionate and confidential legal support for divorce, child custody, maintenance, domestic violence matters, family disputes, and other sensitive legal issues.',
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
        { icon: 'users', value: '1000+', label: 'Family Matters Assisted' },
        { icon: 'shield', value: 'Confidential', label: 'Legal Support' },
        { icon: 'scale', value: 'Experienced', label: 'Family Lawyers' },
        { icon: 'trophy', value: 'PAN India', label: 'Consultation' }
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
                  text: 'Compassionate Family Law Solutions for Individuals & Families',
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
                  text: 'Family disputes can be emotionally challenging and legally complex. Whether you are dealing with divorce proceedings, child custody concerns, maintenance claims, domestic violence matters, or family property disputes, having the right legal guidance is essential to protect your rights and future.',
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
                  text: 'Our family law team provides practical, confidential, and compassionate legal support tailored to every client’s unique situation. We understand that family matters are deeply personal, which is why we approach each case with sensitivity, professionalism, and a solution-oriented mindset.',
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
                  text: 'We assist clients across a wide range of family law matters, including:',
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
                'Divorce & Mutual Consent Divorce',
                'Child Custody & Visitation Rights',
                'Maintenance & Alimony Matters',
                'Domestic Violence Cases',
                'Family Property & Inheritance Disputes',
                'Judicial Separation',
                'Restitution of Conjugal Rights',
                'Adoption & Guardianship Matters',
                'Prenuptial & Family Agreements',
                'NRI Family Law Matters'
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
                  text: 'Our goal is to help clients navigate difficult situations with clarity, confidence, and strong legal support. We focus on resolving disputes efficiently while safeguarding your emotional and financial well-being.',
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
                  text: 'Why Clients Choose Us',
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
                'Experienced family law professionals',
                'Confidential and compassionate approach',
                'Clear legal guidance at every stage',
                'Personalized legal strategies',
                'Strong representation in court proceedings',
                'Transparent communication and support',
                'PAN India legal consultation'
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
      heading: 'Meet Our Family Law Experts',
      description: 'Our experienced legal professionals assist clients across India with divorce matters, custody disputes, maintenance claims, domestic violence cases, and other sensitive family law issues.',
      lawyers: [lawyerId],
      autoplay: true,
      interval: 5000
    },
    // 4. Testimonials Block (Using Carousel Layout for the Premium Coverflow!)
    {
      blockType: 'testimonialsBlock',
      heading: 'What Our Clients Say',
      layout: 'carousel',
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
      quoteText: '“Trusted legal guidance can help families move forward with clarity and confidence.”',
      ctaText: 'GET LEGAL HELP',
      ctaLink: '/consultation',
      steps: [
        {
          title: 'Initial Consultation',
          description: 'We understand your situation, concerns, and legal objectives to provide the right guidance and strategy for your case.',
          icon: 'gavel'
        },
        {
          title: 'Legal Review & Documentation',
          description: 'Our legal team prepares petitions, notices, agreements, and supporting documents tailored to your legal requirements.',
          icon: 'document'
        },
        {
          title: 'Representation & Resolution',
          description: 'We guide and represent you through negotiations, mediation, and court proceedings while working toward the best possible resolution.',
          icon: 'handshake'
        }
      ]
    }
  ]

  console.log('Checking/Creating Family Law service item in services...')
  let serviceId = null
  const existingService = await payload.find({
    collection: 'services',
    where: { slug: { equals: 'family-law' } }
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
        title: 'Family Law Services',
        slug: 'family-law',
        showInHeader: true,
        showInFooter: true,
        navDropdown: 'legal-matter',
        navCategory: 'Personal & Family',
        uiIcon: 'home',
        layout: layout
      }
    })
    serviceId = createdService.id
  }

  const seo = {
    metaTitle: 'Trusted Family Law Services in India | Divorce & Custody Lawyers',
    metaDescription: 'Compassionate family law legal support for mutual consent divorce, child custody, domestic violence matters, maintenance, alimony, and property disputes in India.',
    keywords: 'family law, divorce lawyer, child custody, domestic violence case, mutual divorce, prenuptial agreement, alimony, maintenance claim',
    robotsMeta: 'index,follow'
  }

  const pageData = {
    title: 'Family Law Services',
    slug: 'family-law',
    pageType: 'service',
    service: serviceId,
    status: 'published',
    publishedDate: new Date().toISOString(),
    seo: seo,
    layout: layout
  }

  console.log('Seeding Family Law Page in pages collection...')
  const existingPages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'family-law' } }
  })

  if (existingPages.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existingPages.docs[0].id,
      data: pageData
    })
    console.log('Family Law Page updated successfully!')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData
    })
    console.log('Family Law Page created successfully!')
  }

  console.log('Seeding completed successfully!')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error during seeding:', err)
  process.exit(1)
})
