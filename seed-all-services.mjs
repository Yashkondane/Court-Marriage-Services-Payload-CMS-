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

  console.log('--- STARTING SEED FOR NEW SERVICES ---')

  // 1. Seed Media
  console.log('[1/5] Checking default media...')
  let mediaId = null
  const mediaResults = await payload.find({
    collection: 'media',
    limit: 1,
  })
  if (mediaResults.docs.length > 0) {
    mediaId = mediaResults.docs[0].id
  } else {
    console.log('No media found, uploading default vakilfirst.png...')
    try {
      const fileData = fs.readFileSync('vakilfirst.png')
      const createdMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'VakilFirst Service Banner',
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

  // 2. Check/Create approved lawyer
  console.log('[2/5] Checking approved lawyer...')
  let lawyerId = null
  const lawyersRes = await payload.find({
    collection: 'lawyers',
    where: { status: { equals: 'approved' } },
    limit: 1,
  })
  if (lawyersRes.docs.length > 0) {
    lawyerId = lawyersRes.docs[0].id
  } else {
    console.log('Creating a default approved lawyer...')
    const dummyLawyer = await payload.create({
      collection: 'lawyers',
      data: {
        name: 'Adv. Priya Sharma',
        email: 'priya.sharma@vakilfirst.com',
        slug: 'priya-sharma',
        status: 'approved',
        experience: 12,
        phone: '9876543208',
        rating: 5,
        ratingCount: 24,
        profileViews: 120,
      }
    })
    lawyerId = dummyLawyer.id
  }

  // Helper to clear existing services/pages to prevent duplicates and ensure absolute freshness
  const cleanOldEntries = async (slug) => {
    const existingP = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
    for (const doc of existingP.docs) {
      await payload.delete({ collection: 'pages', id: doc.id })
    }
    const existingS = await payload.find({ collection: 'services', where: { slug: { equals: slug } } })
    for (const doc of existingS.docs) {
      await payload.delete({ collection: 'services', id: doc.id })
    }
  }

  // ─── SERVICE 1: PROPERTY LAW ────────────────────────────────────────────
  console.log('[3/5] Seeding Property Law Service...')
  await cleanOldEntries('property-law')

  const propTestimonials = [
    { name: 'Vikram Malhotra', designation: 'Property Buyer – Delhi', content: '“The legal team conducted complete title verification and helped us complete our property transaction smoothly and securely.”' },
    { name: 'Sneha Kapoor', designation: 'Commercial Tenant – Mumbai', content: '“They handled our commercial lease agreement professionally and ensured all legal risks were properly addressed.”' },
    { name: 'Rakesh Sharma', designation: 'Landowner – Chandigarh', content: '“I approached them regarding a land dispute, and their legal guidance was clear, practical, and highly professional.”' },
    { name: 'Priya Mehta', designation: 'NRI Client – Bengaluru', content: '“The team assisted me with property documentation and registration in India while I was abroad. Excellent support and communication.”' }
  ]
  const propTestimonialIds = []
  for (const t of propTestimonials) {
    const res = await payload.create({
      collection: 'testimonials',
      data: { name: t.name, designation: t.designation, content: t.content, rating: 5 }
    })
    propTestimonialIds.push(res.id)
  }

  const propFAQs = [
    { question: 'What property law services do you provide?', answer: 'We assist with property title verification, sale agreements, property registration, land disputes, lease agreements, RERA matters, real estate transactions, and succession-related property issues.' },
    { question: 'Can you verify property documents before purchase?', answer: 'Yes. We provide property due diligence and title verification services to help clients identify legal risks before purchasing property.' },
    { question: 'Do you assist with property disputes?', answer: 'Yes. We represent clients in land disputes, ownership conflicts, tenancy disputes, builder disputes, and other property-related legal matters.' },
    { question: 'Can you help NRI clients with property matters in India?', answer: 'Yes. We regularly assist NRI clients with property transactions, documentation, disputes, and registration matters across India.' },
    { question: 'Do you provide lease and rental agreement drafting services?', answer: 'Yes. We draft and review residential and commercial lease agreements, rental agreements, and property-related contracts.' },
    { question: 'Can consultations be conducted online?', answer: 'Yes. We provide online consultations and legal support for clients across India and abroad through phone, video calls, and email communication.' }
  ]
  const propFaqIds = []
  for (const f of propFAQs) {
    const res = await payload.create({
      collection: 'faqs',
      data: { question: f.question, answer: createLexicalRoot([f.answer]), scope: 'service' }
    })
    propFaqIds.push(res.id)
  }

  const propLayout = [
    {
      blockType: 'hero',
      layoutStyle: 'standard',
      heading: 'Trusted Property Law Services in India',
      subheading: 'Comprehensive legal support for property disputes, real estate transactions, title verification, documentation, registration, and land-related legal matters.',
      backgroundType: 'image',
      backgroundImage: mediaId,
      textColorTheme: 'light',
      showSearchBar: false,
      showLeadForm: false,
      ctaText: 'Book a Consultation',
      ctaLink: '/consultation',
      secondaryCta: { text: 'WhatsApp Us', link: 'https://wa.me/919650515469' },
      style: 'fullWidth',
      showStatsBar: true,
      stats: [
        { icon: 'users', value: '1000+', label: 'Property Matters Assisted' },
        { icon: 'scale', value: 'Experienced', label: 'Property Lawyers' },
        { icon: 'shield', value: 'Trusted', label: 'Legal Documentation Support' },
        { icon: 'trophy', value: 'PAN India', label: 'Consultation' }
      ]
    },
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
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'Reliable Property Law Solutions for Individuals & Businesses', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Property and real estate matters often involve significant financial and legal complexities. Whether you are purchasing property, facing ownership disputes, verifying land records, managing commercial real estate transactions, or dealing with tenancy issues, proper legal guidance is essential to safeguard your rights and investments.', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Our property law team provides strategic and practical legal support for individuals, businesses, investors, developers, landlords, and buyers across India. We focus on minimizing legal risks, ensuring proper documentation, and helping clients navigate property-related matters with confidence.', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'We assist clients across a wide range of property law matters, including:', type: 'text', version: 1 }]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Property Title Verification',
                'Sale Deed & Agreement Drafting',
                'Property Registration Support',
                'Real Estate Transactions',
                'Land Ownership & Boundary Disputes',
                'Commercial Property Matters',
                'Lease & Rental Agreements',
                'Builder & RERA Disputes',
                'Property Due Diligence',
                'Inheritance & Property Succession Matters'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: txt, type: 'text', version: 1 }]
              }))
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Our approach combines legal expertise with practical real estate understanding to help clients protect their assets and avoid future disputes.', type: 'text', version: 1 }]
            },
            {
              type: 'heading',
              tag: 'h3',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'Why Clients Choose Us', type: 'text', version: 1 }]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Experienced property law professionals',
                'Strong documentation and due diligence support',
                'Transparent and efficient legal process',
                'Practical real estate advisory',
                'Client-focused legal guidance',
                'Timely legal assistance and consultations',
                'PAN India property law support'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: txt, type: 'text', version: 1 }]
              }))
            }
          ]
        }
      }
    },
    {
      blockType: 'lawyersCarousel',
      heading: 'Meet Our Property Law Experts',
      description: 'Our experienced legal professionals assist clients across India with property transactions, disputes, title verification, registration, and real estate legal matters.',
      lawyers: [lawyerId],
      autoplay: true,
      interval: 5000
    },
    {
      blockType: 'testimonialsBlock',
      heading: 'What Our Clients Say',
      layout: 'carousel',
      testimonials: propTestimonialIds
    },
    {
      blockType: 'faq',
      heading: 'Frequently Asked Questions',
      source: 'manual',
      faqs: propFaqIds,
      style: 'accordion'
    },
    {
      blockType: 'howItWorks',
      processLabel: 'THE PROCESS',
      heading: 'How It Works',
      backgroundImage: mediaId,
      quoteText: '“Proper legal guidance helps protect your property rights and investments with confidence.”',
      ctaText: 'GET LEGAL HELP',
      ctaLink: '/consultation',
      steps: [
        { title: 'Property Consultation & Assessment', description: 'We understand your property matter, legal concerns, documentation requirements, and objectives to determine the right legal strategy.', icon: 'gavel' },
        { title: 'Legal Review & Documentation', description: 'Our legal team reviews title documents, agreements, registrations, and prepares the necessary legal documentation for your matter.', icon: 'document' },
        { title: 'Resolution & Legal Support', description: 'We assist with negotiations, registrations, dispute resolution, and ongoing legal support to help protect your property interests.', icon: 'handshake' }
      ]
    }
  ]

  const propService = await payload.create({
    collection: 'services',
    data: {
      title: 'Property Law Services',
      slug: 'property-law',
      showInHeader: true,
      showInFooter: true,
      navDropdown: 'legal-matter',
      navCategory: 'Personal & Family',
      uiIcon: 'briefcase',
      layout: propLayout
    }
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Property Law Services',
      slug: 'property-law',
      pageType: 'service',
      service: propService.id,
      status: 'published',
      publishedDate: new Date().toISOString(),
      seo: {
        metaTitle: 'Trusted Property Law Services in India | Real Estate Disputes',
        metaDescription: 'Complete property legal services including property verification, sales agreements, RERA disputes, registration support, and title due diligence in India.',
        keywords: 'property law, title verification, sale deed, property disputes, rera registration',
        robotsMeta: 'index,follow'
      },
      layout: propLayout
    }
  })


  // ─── SERVICE 2: CIVIL LAW ───────────────────────────────────────────────
  console.log('[3/5] Seeding Civil Law Service...')
  await cleanOldEntries('civil-law')

  const civilTestimonials = [
    { name: 'Rahul Mehra', designation: 'Business Owner – Delhi', content: '“The team handled our contract dispute professionally and helped us achieve a favorable resolution without unnecessary delays.”' },
    { name: 'Sneha Kapoor', designation: 'Property Owner – Mumbai', content: '“They guided me through a complex property dispute with complete clarity and strong legal representation.”' },
    { name: 'Amit Sharma', designation: 'Entrepreneur – Bengaluru', content: '“The lawyers assisted us in a recovery matter and ensured the process was handled strategically and efficiently.”' },
    { name: 'Priya Verma', designation: 'Client – Chandigarh', content: '“I appreciated their practical advice and transparent communication throughout my civil litigation matter.”' }
  ]
  const civilTestimonialIds = []
  for (const t of civilTestimonials) {
    const res = await payload.create({
      collection: 'testimonials',
      data: { name: t.name, designation: t.designation, content: t.content, rating: 5 }
    })
    civilTestimonialIds.push(res.id)
  }

  const civilFAQs = [
    { question: 'What civil law services do you provide?', answer: 'We assist with civil litigation, contract disputes, recovery matters, property conflicts, injunctions, partnership disputes, legal notices, and other civil legal matters.' },
    { question: 'Can you help with money recovery cases?', answer: 'Yes. We represent clients in recovery matters involving unpaid dues, breach of agreements, commercial disputes, and financial claims.' },
    { question: 'Do you provide court representation?', answer: 'Yes. Our legal team provides representation before civil courts and assists clients throughout litigation and dispute resolution proceedings.' },
    { question: 'Can civil disputes be settled outside court?', answer: 'Yes. Depending on the matter, disputes may be resolved through negotiation, mediation, arbitration, or settlement discussions.' },
    { question: 'Are consultations confidential?', answer: 'Yes. All consultations and legal discussions are handled with complete confidentiality and professionalism.' },
    { question: 'Can consultations be conducted online?', answer: 'Yes. We provide online legal consultations and support through phone calls, video meetings, and email communication across India.' }
  ]
  const civilFaqIds = []
  for (const f of civilFAQs) {
    const res = await payload.create({
      collection: 'faqs',
      data: { question: f.question, answer: createLexicalRoot([f.answer]), scope: 'service' }
    })
    civilFaqIds.push(res.id)
  }

  const civilLayout = [
    {
      blockType: 'hero',
      layoutStyle: 'standard',
      heading: 'Trusted Civil Law Services in India',
      subheading: 'Comprehensive legal support for civil disputes, recovery matters, contract disputes, injunctions, property conflicts, and other civil litigation matters.',
      backgroundType: 'image',
      backgroundImage: mediaId,
      textColorTheme: 'light',
      showSearchBar: false,
      showLeadForm: false,
      ctaText: 'Book a Consultation',
      ctaLink: '/consultation',
      secondaryCta: { text: 'WhatsApp Us', link: 'https://wa.me/919650515469' },
      style: 'fullWidth',
      showStatsBar: true,
      stats: [
        { icon: 'users', value: '1000+', label: 'Civil Matters Assisted' },
        { icon: 'scale', value: 'Experienced', label: 'Civil Litigation Lawyers' },
        { icon: 'shield', value: 'Strategic', label: 'Legal Representation' },
        { icon: 'trophy', value: 'PAN India', label: 'Consultation' }
      ]
    },
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
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'Reliable Civil Law Solutions for Individuals & Businesses', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Civil disputes can arise in both personal and business relationships and often involve complex legal and financial issues. Whether you are facing contract disputes, recovery matters, property conflicts, injunction proceedings, partnership disagreements, or other civil litigation concerns, timely legal guidance is essential to protect your rights and interests.', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Our civil law team provides practical and strategic legal support for individuals, businesses, property owners, professionals, and organizations across India. We focus on resolving disputes efficiently while safeguarding our clients’ legal and financial interests.', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'We assist clients across a wide range of civil law matters, including:', type: 'text', version: 1 }]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Civil Litigation & Court Representation',
                'Contract & Agreement Disputes',
                'Money Recovery Matters',
                'Property & Ownership Disputes',
                'Injunction & Stay Proceedings',
                'Partnership & Business Disputes',
                'Consumer & Compensation Claims',
                'Legal Notices & Civil Remedies',
                'Specific Performance Matters',
                'Settlement & Dispute Resolution'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: txt, type: 'text', version: 1 }]
              }))
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Our approach combines legal expertise with practical dispute resolution strategies to help clients achieve effective and timely legal outcomes.', type: 'text', version: 1 }]
            },
            {
              type: 'heading',
              tag: 'h3',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'Why Clients Choose Us', type: 'text', version: 1 }]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Experienced civil litigation professionals',
                'Strategic and practical legal advice',
                'Strong court representation',
                'Transparent and responsive communication',
                'Efficient dispute resolution approach',
                'Client-focused legal support',
                'PAN India legal assistance'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: txt, type: 'text', version: 1 }]
              }))
            }
          ]
        }
      }
    },
    {
      blockType: 'lawyersCarousel',
      heading: 'Meet Our Civil Law Experts',
      description: 'Our legal professionals assist clients across India with civil disputes, litigation, recovery proceedings, injunctions, and other civil law matters.',
      lawyers: [lawyerId],
      autoplay: true,
      interval: 5000
    },
    {
      blockType: 'testimonialsBlock',
      heading: 'What Our Clients Say',
      layout: 'carousel',
      testimonials: civilTestimonialIds
    },
    {
      blockType: 'faq',
      heading: 'Frequently Asked Questions',
      source: 'manual',
      faqs: civilFaqIds,
      style: 'accordion'
    },
    {
      blockType: 'howItWorks',
      processLabel: 'THE PROCESS',
      heading: 'How It Works',
      backgroundImage: mediaId,
      quoteText: '“Strategic legal guidance helps resolve disputes effectively while protecting your rights and interests.”',
      ctaText: 'GET LEGAL HELP',
      ctaLink: '/consultation',
      steps: [
        { title: 'Consultation & Case Evaluation', description: 'We understand your dispute, legal concerns, documentation, and objectives to determine the best legal strategy for your matter.', icon: 'gavel' },
        { title: 'Legal Review & Documentation', description: 'Our legal team reviews agreements, evidence, notices, and prepares the required legal documents tailored to your case.', icon: 'document' },
        { title: 'Representation & Resolution', description: 'We represent and guide you through negotiations, settlements, litigation, and court proceedings to achieve the best possible outcome.', icon: 'handshake' }
      ]
    }
  ]

  const civilService = await payload.create({
    collection: 'services',
    data: {
      title: 'Civil Law Services',
      slug: 'civil-law',
      showInHeader: true,
      showInFooter: true,
      navDropdown: 'legal-matter',
      navCategory: 'Personal & Family',
      uiIcon: 'briefcase',
      layout: civilLayout
    }
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Civil Law Services',
      slug: 'civil-law',
      pageType: 'service',
      service: civilService.id,
      status: 'published',
      publishedDate: new Date().toISOString(),
      seo: {
        metaTitle: 'Trusted Civil Law Services in India | Court Representation',
        metaDescription: 'Complete civil legal services including contract disputes, money recovery matters, stay orders, injunctions, and civil court litigation in India.',
        keywords: 'civil law, recovery suit, injunction application, contract dispute, legal notice',
        robotsMeta: 'index,follow'
      },
      layout: civilLayout
    }
  })


  // ─── SERVICE 3: CONSUMER LAW ────────────────────────────────────────────
  console.log('[3/5] Seeding Consumer Law Service...')
  await cleanOldEntries('consumer-law')

  const consTestimonials = [
    { name: 'Rahul Verma', designation: 'Consumer – Delhi', content: '“The legal team helped me recover compensation for a defective product issue quickly and professionally. Excellent support throughout the process.”' },
    { name: 'Sneha Kapoor', designation: 'Client – Mumbai', content: '“They guided me through a consumer court complaint against a service provider and ensured complete transparency at every stage.”' },
    { name: 'Amit Sharma', designation: 'E-commerce Customer – Bengaluru', content: '“I approached them regarding an online shopping dispute, and they handled the matter efficiently and professionally.”' },
    { name: 'Priya Mehta', designation: 'Insurance Claim Client – Pune', content: '“The lawyers assisted me in resolving an insurance claim dispute successfully. Their guidance was practical and reliable.”' }
  ]
  const consTestimonialIds = []
  for (const t of consTestimonials) {
    const res = await payload.create({
      collection: 'testimonials',
      data: { name: t.name, designation: t.designation, content: t.content, rating: 5 }
    })
    consTestimonialIds.push(res.id)
  }

  const consFAQs = [
    { question: 'What consumer law services do you provide?', answer: 'We assist with consumer court complaints, defective products, refund claims, compensation matters, unfair trade practices, insurance disputes, e-commerce disputes, and consumer litigation.' },
    { question: 'Can I file a complaint for defective products or poor services?', answer: 'Yes. Consumers can file complaints against businesses or service providers for defective products, deficient services, unfair practices, or negligence.' },
    { question: 'Do you assist with online shopping and e-commerce disputes?', answer: 'Yes. We help clients resolve disputes related to online purchases, refund delays, defective products, non-delivery issues, and platform-related concerns.' },
    { question: 'Can consumer disputes be resolved without going to court?', answer: 'Yes. Some matters may be resolved through legal notices, negotiation, settlement discussions, or mediation before formal litigation.' },
    { question: 'Are consultations confidential?', answer: 'Yes. All consultations and legal discussions are handled with complete confidentiality and professionalism.' },
    { question: 'Can consultations be conducted online?', answer: 'Yes. We provide online consultations and legal support across India through phone calls, video meetings, and email communication.' }
  ]
  const consFaqIds = []
  for (const f of consFAQs) {
    const res = await payload.create({
      collection: 'faqs',
      data: { question: f.question, answer: createLexicalRoot([f.answer]), scope: 'service' }
    })
    consFaqIds.push(res.id)
  }

  const consLayout = [
    {
      blockType: 'hero',
      layoutStyle: 'standard',
      heading: 'Trusted Consumer Law Services in India',
      subheading: 'Comprehensive legal support for consumer disputes, defective products, service deficiencies, refund claims, unfair trade practices, and consumer court matters.',
      backgroundType: 'image',
      backgroundImage: mediaId,
      textColorTheme: 'light',
      showSearchBar: false,
      showLeadForm: false,
      ctaText: 'Book a Consultation',
      ctaLink: '/consultation',
      secondaryCta: { text: 'WhatsApp Us', link: 'https://wa.me/919650515469' },
      style: 'fullWidth',
      showStatsBar: true,
      stats: [
        { icon: 'users', value: '1000+', label: 'Consumer Matters Assisted' },
        { icon: 'scale', value: 'Experienced', label: 'Consumer Law Professionals' },
        { icon: 'shield', value: 'Strong Consumer Rights', label: 'Protection' },
        { icon: 'trophy', value: 'PAN India', label: 'Consultation' }
      ]
    },
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
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'Reliable Consumer Law Solutions for Individuals & Businesses', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Consumers have legal rights against defective products, poor services, unfair trade practices, false advertising, and unfair business conduct. Whether you are facing issues related to refunds, delayed services, defective goods, insurance claims, e-commerce disputes, or negligence by service providers, proper legal guidance can help protect your rights and interests.', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Our consumer law team provides practical and strategic legal support for individuals, customers, and businesses across India. We focus on resolving disputes efficiently while helping clients seek fair compensation and legal remedies under consumer protection laws.', type: 'text', version: 1 }]
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'We assist clients across a wide range of consumer law matters, including:', type: 'text', version: 1 }]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Consumer Court Complaints',
                'Defective Products & Services',
                'Refund & Compensation Claims',
                'E-commerce & Online Shopping Disputes',
                'Insurance Claim Disputes',
                'Medical Negligence Consumer Claims',
                'Real Estate Consumer Disputes',
                'False Advertising & Unfair Trade Practices',
                'Warranty & Service Issues',
                'Legal Notices & Consumer Litigation'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: txt, type: 'text', version: 1 }]
              }))
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Our approach focuses on protecting consumer rights, resolving disputes effectively, and ensuring clients receive proper legal support throughout the process.', type: 'text', version: 1 }]
            },
            {
              type: 'heading',
              tag: 'h3',
              format: '',
              indent: 0,
              version: 1,
              children: [{ detail: 0, format: 1, mode: 'normal', style: '', text: 'Why Clients Choose Us', type: 'text', version: 1 }]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                'Experienced consumer law professionals',
                'Strong consumer rights advocacy',
                'Practical and strategic legal guidance',
                'Transparent legal process',
                'Timely dispute resolution support',
                'Responsive and confidential consultations',
                'PAN India legal assistance'
              ].map(txt => ({
                type: 'listitem',
                format: '',
                indent: 0,
                version: 1,
                children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: txt, type: 'text', version: 1 }]
              }))
            }
          ]
        }
      }
    },
    {
      blockType: 'lawyersCarousel',
      heading: 'Meet Our Consumer Law Experts',
      description: 'Our legal professionals assist clients across India with consumer disputes, refund claims, compensation matters, and consumer court proceedings.',
      lawyers: [lawyerId],
      autoplay: true,
      interval: 5000
    },
    {
      blockType: 'testimonialsBlock',
      heading: 'What Our Clients Say',
      layout: 'carousel',
      testimonials: consTestimonialIds
    },
    {
      blockType: 'faq',
      heading: 'Frequently Asked Questions',
      source: 'manual',
      faqs: consFaqIds,
      style: 'accordion'
    },
    {
      blockType: 'howItWorks',
      processLabel: 'THE PROCESS',
      heading: 'How It Works',
      backgroundImage: mediaId,
      quoteText: '“Strong legal support helps consumers protect their rights and seek fair remedies with confidence.”',
      ctaText: 'GET LEGAL HELP',
      ctaLink: '/consultation',
      steps: [
        { title: 'Consultation & Case Review', description: 'We understand your consumer dispute, supporting documents, and legal concerns to determine the right legal strategy.', icon: 'gavel' },
        { title: 'Legal Notice & Documentation', description: 'Our legal team prepares notices, complaints, evidence documentation, and legal filings tailored to your consumer matter.', icon: 'document' },
        { title: 'Representation & Resolution', description: 'We assist with negotiations, settlements, consumer court proceedings, and dispute resolution to help protect your rights and interests.', icon: 'handshake' }
      ]
    }
  ]

  const consService = await payload.create({
    collection: 'services',
    data: {
      title: 'Consumer Law Services',
      slug: 'consumer-law',
      showInHeader: true,
      showInFooter: true,
      navDropdown: 'legal-matter',
      navCategory: 'Personal & Family',
      uiIcon: 'briefcase',
      layout: consLayout
    }
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Consumer Law Services',
      slug: 'consumer-law',
      pageType: 'service',
      service: consService.id,
      status: 'published',
      publishedDate: new Date().toISOString(),
      seo: {
        metaTitle: 'Trusted Consumer Law Services in India | Consumer Court Complaints',
        metaDescription: 'Complete consumer protection legal services including defective products compensation, online shopping disputes, insurance claims, and consumer court filings.',
        keywords: 'consumer law, consumer court, insurance claim dispute, refund claim, deficient service',
        robotsMeta: 'index,follow'
      },
      layout: consLayout
    }
  })


  // ─── MASTER COMPLETED ──────────────────────────────────────────────────
  console.log('[4/5] All 3 new services successfully seeded in Pages & Services collections!')
  console.log('[5/5] Seeding complete!')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error during seeding:', err)
  process.exit(1)
})
