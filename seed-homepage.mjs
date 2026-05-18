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

  console.log('--- STARTING HOMEPAGE SEEDING ---')

  // 1. Get default media
  console.log('[1/7] Fetching default media...')
  let mediaId = null
  const mediaResults = await payload.find({
    collection: 'media',
    limit: 1,
  })
  if (mediaResults.docs.length > 0) {
    mediaId = mediaResults.docs[0].id
  } else {
    console.log('No media found, creating default vakilfirst.png...')
    try {
      const fileData = fs.readFileSync('vakilfirst.png')
      const createdMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'VakilFirst Logo / Banner',
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

  // 2. Get approved lawyer
  console.log('[2/7] Fetching approved lawyer...')
  let lawyerId = null
  const lawyersRes = await payload.find({
    collection: 'lawyers',
    where: { status: { equals: 'approved' } },
    limit: 1,
  })
  if (lawyersRes.docs.length > 0) {
    lawyerId = lawyersRes.docs[0].id
  } else {
    console.log('Creating default approved lawyer...')
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

  // 3. Fetch all services dynamically
  console.log('[3/7] Fetching all legal services dynamically...')
  const servicesRes = await payload.find({
    collection: 'services',
    limit: 50,
  })
  const allServices = servicesRes.docs
  console.log(`Found ${allServices.length} services to populate in the homepage carousel:`)
  allServices.forEach(s => console.log(`  - ${s.title} (${s.slug})`))

  if (allServices.length === 0) {
    throw new Error('No services found in database! Please seed services first.')
  }

  // 4. Create/Clean Homepage FAQs
  console.log('[4/7] Cleaning and seeding Homepage FAQs...')
  const oldHomeFaqs = await payload.find({
    collection: 'faqs',
    where: { scope: { equals: 'global' } },
    limit: 100,
  })
  for (const doc of oldHomeFaqs.docs) {
    await payload.delete({ collection: 'faqs', id: doc.id })
  }

  const homepageFAQs = [
    {
      question: 'What services does VakilFirst offer?',
      answer: 'VakilFirst is a comprehensive legal platform providing professional support across India for court marriage, family law, property title verification, taxation, corporate registration, and civil dispute resolution.'
    },
    {
      question: 'How can I book a legal consultation?',
      answer: 'You can book a consultation instantly by clicking any "Book Free Consultation" button, sending us a WhatsApp message, or calling us directly at +91 96505 15469.'
    },
    {
      question: 'Are your services available pan-India?',
      answer: 'Yes! We provide digital consultations and have an extensive network of verified, experienced local advocates to represent and assist you in major courts and cities across India.'
    },
    {
      question: 'Is my information kept confidential?',
      answer: 'Absolutely. We prioritize client privacy. All consultations, records, and case files are protected by high-standard compliance and strict confidentiality policies.'
    },
    {
      question: 'How long does a typical service take?',
      answer: 'Timelines depend on the type of service (e.g., GST registration takes 2-3 days, company incorporation 5-7 days, while litigation matters depend on court schedules). We always provide clear timeline expectations beforehand.'
    }
  ]
  const homepageFaqIds = []
  for (const f of homepageFAQs) {
    const createdFaq = await payload.create({
      collection: 'faqs',
      data: {
        question: f.question,
        answer: createLexicalRoot([f.answer]),
        scope: 'global'
      }
    })
    homepageFaqIds.push(createdFaq.id)
  }

  // 5. Construct Layout Blocks
  console.log('[5/7] Constructing premium Homepage layout blocks...')
  const carouselItems = allServices.map(service => {
    // Determine a fitting default icon
    let icon = 'briefcase'
    if (service.slug?.includes('marriage')) icon = 'handshake'
    else if (service.slug?.includes('family')) icon = 'users'
    else if (service.slug?.includes('property')) icon = 'home'
    else if (service.slug?.includes('tax') || service.slug?.includes('compliance')) icon = 'calculator'
    else if (service.slug?.includes('civil')) icon = 'scale'
    else if (service.slug?.includes('consumer')) icon = 'shield'

    return {
      service: service.id,
      overrideIcon: icon,
      highlights: [
        { text: 'Confidential Legal Support' },
        { text: 'Experienced Legal Advisory' }
      ]
    }
  })

  const homepageBlocks = [
    // --- BLOCK 1: HERO ---
    {
      blockType: 'hero',
      layoutStyle: 'standard',
      heading: 'Elite Legal & Compliance Services in India',
      subheading: 'Compassionate, confidential, and professional legal support. We assist individuals and businesses with court marriage, family law, property disputes, taxation, corporate filings, and civil litigation.',
      backgroundType: 'image',
      backgroundImage: mediaId,
      textColorTheme: 'light',
      showSearchBar: true,
      showLeadForm: false,
      ctaText: 'Book Free Consultation',
      ctaLink: '/consultation',
      secondaryCta: { text: 'WhatsApp Us', link: 'https://wa.me/919650515469' },
      style: 'fullWidth',
      showStatsBar: true,
      stats: [
        { icon: 'users', value: '15,000+', label: 'Matters Assisted' },
        { icon: 'shield', value: '100% Secure', label: 'Confidential Process' },
        { icon: 'scale', value: '25+ Years', label: 'Legal Heritage' },
        { icon: 'trophy', value: '98%', label: 'Satisfaction Rate' }
      ]
    },
    // --- BLOCK 2: SERVICES CAROUSEL ---
    {
      blockType: 'servicesCarousel',
      heading: 'Explore Our Premier Services',
      items: carouselItems
    },
    // --- BLOCK 3: LAWYERS ---
    {
      blockType: 'lawyersCarousel',
      heading: 'Consult Our Elite Advocates',
      description: 'Connect with verified, senior legal specialists possessing a proven track record of successful defense, arbitration, and advisory.',
      lawyers: [lawyerId],
      autoplay: true,
      interval: 5000
    },
    // --- BLOCK 4: HOW IT WORKS ---
    {
      blockType: 'howItWorks',
      processLabel: 'THE ROADMAP',
      heading: 'How It Works',
      backgroundImage: mediaId,
      quoteText: '“Precision, clarity, and dedicated advocacy at every step of your legal journey.”',
      ctaText: 'TALK TO A LAWYER',
      ctaLink: '/consultation',
      steps: [
        { title: 'Free Initial Consultation', description: 'Schedule a free consultation to share your legal requirements, review options, and chart out a roadmap.', icon: 'gavel' },
        { title: 'Document Drafting & Due Diligence', description: 'Our senior advocates carefully draft, review, and organize all legal filings and agreements on your behalf.', icon: 'document' },
        { title: 'Secure Execution & Representation', description: 'We complete court filings, registrations, or representative legal advocacy to guarantee a secure and successful outcome.', icon: 'handshake' }
      ]
    },
    // --- BLOCK 5: WHY CHOOSE US (6 Cards) ---
    {
      blockType: 'whyChooseUs',
      heading: 'Why Thousands Trust VakilFirst',
      subheading: 'Experience modern, transparent, and client-centric legal solutions backed by absolute professional integrity and decades of heritage.',
      benefits: [
        {
          title: '25+ Years of Legal Heritage',
          description: 'Decades of combined legal expertise across civil, criminal, family, property, and corporate domains in India.',
          icon: 'gavel'
        },
        {
          title: 'Transparent & Affordable Pricing',
          description: 'No hidden charges. Clear, upfront, and budget-friendly legal consulting with structured installment options.',
          icon: 'payments'
        },
        {
          title: '98% Client Satisfaction Rate',
          description: 'Trusted by over 10,000+ individuals and businesses across the nation with highly positive feedback.',
          icon: 'users'
        },
        {
          title: 'Secure & Confidential Processes',
          description: 'Your files, consultations, and personal information are protected by top-grade privacy standards.',
          icon: 'shield'
        },
        {
          title: 'Digital-First Modern Experience',
          description: 'Complete online consultation, status tracking, document management, and seamless virtual updates.',
          icon: 'laptop'
        },
        {
          title: 'Result-Oriented Legal Strategy',
          description: 'Strategic planning, meticulous preparation, and focused advocacy tailored to achieve positive legal outcomes.',
          icon: 'strategy'
        }
      ],
      trustBadges: [
        { badgeText: 'Bar Council Verified Advocates' },
        { badgeText: 'ISO 27001 Data Confidentiality Certified' },
        { badgeText: 'PAN India Local Court Network' }
      ]
    },
    // --- BLOCK 6: REGISTRATION & LICENSES ---
    {
      blockType: 'registrationLicenses',
      badge: 'Corporate & Compliance Scale',
      heading: 'Business Registrations & Licenses',
      subheading: 'Launch and scale your business with absolute legal peace of mind. Complete compliance and document filing managed by tax & corporate specialists.',
      cards: [
        {
          title: 'GST Registration',
          description: 'Instant GST registration and filing setup under expert tax guidance.',
          icon: 'wallet',
          link: '/taxation-compliance'
        },
        {
          title: 'Private Limited Company',
          description: 'Incorporate your business in 7 days. Complete legal documentation & MCA filings.',
          icon: 'corporate',
          link: '/corporate-law'
        },
        {
          title: 'MSME / Udyam Registration',
          description: 'Avail government schemes, low-interest bank loans, and subsidies easily.',
          icon: 'business',
          link: '/taxation-compliance'
        },
        {
          title: 'Trademark Registration',
          description: 'Protect your brand name, logo, and identity with strategic trademark filings.',
          icon: 'premium',
          link: '/corporate-law'
        },
        {
          title: 'FSSAI Food License',
          description: 'Mandatory regulatory food safety compliance for all restaurant & food tech startups.',
          icon: 'restaurant',
          link: '/taxation-compliance'
        },
        {
          title: 'Import Export Code (IEC)',
          description: 'Get registered for international trade. Required for all import/export businesses.',
          icon: 'public',
          link: '/taxation-compliance'
        }
      ],
      ctaSection: {
        ctaHeading: 'Confused About Regulatory Compliances?',
        ctaSubheading: 'Consult our senior corporate legal partners for a customized company registration and licensing roadmap.',
        ctaButtonText: 'Book Free Call',
        ctaLink: '/consultation'
      }
    },
    // --- BLOCK 7: FAQS ---
    {
      blockType: 'faq',
      heading: 'Frequently Asked Questions',
      source: 'manual',
      faqs: homepageFaqIds,
      style: 'accordion'
    }
  ]

  // 6. Delete old homepage
  console.log('[6/7] Deleting any existing homepage with slug "home"...')
  const existingHomepage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  if (existingHomepage.docs.length > 0) {
    await payload.delete({
      collection: 'pages',
      id: existingHomepage.docs[0].id
    })
    console.log('Old homepage successfully deleted!')
  }

  // 7. Seed fresh homepage page document
  console.log('[7/7] Seeding fresh premium Homepage into the Pages collection...')
  await payload.create({
    collection: 'pages',
    data: {
      title: 'VakilFirst Homepage',
      slug: 'home',
      pageType: 'custom',
      status: 'published',
      publishedDate: new Date().toISOString(),
      seo: {
        metaTitle: 'VakilFirst | Trusted Court Marriage & Elite Legal Services in India',
        metaDescription: 'VakilFirst provides professional legal services for court marriage, family law, property verification, corporate registrations, and civil litigation across India.',
        keywords: 'court marriage, property lawyer, corporate law, legal advice india, online legal service',
        robotsMeta: 'index,follow'
      },
      layout: homepageBlocks
    }
  })

  console.log('✨ HOMEPAGE SUCCESSFULLY SEEDED WITH 7 PREMIUM BLOCKS! ✨')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error seeding homepage:', err)
  process.exit(1)
})
