import { getPayload } from '../lib/payload/getPayload'

async function seed() {
  const payload = await getPayload()

  console.log('--- Checking Media ---')
  const media = await payload.find({ collection: 'media', limit: 5 })
  const defaultMediaId = media.docs[0]?.id || null
  if (defaultMediaId) {
    console.log(`Using existing media (ID: ${defaultMediaId}) as placeholder.`)
  } else {
    console.log('No media found. Some images will be blank.')
  }

  console.log('\n--- Seeding Services ---')

  const services = [
    { title: 'Arya Samaj Marriage', slug: 'arya-samaj-marriage' },
    { title: 'Court Marriage', slug: 'court-marriage' },
    { title: 'Same Day Court Marriage', slug: 'same-day-court-marriage' },
    { title: 'Marriage Registration', slug: 'marriage-registration' },
    { title: 'Muslim Marriage', slug: 'muslim-marriage' },
    { title: 'NRI Marriage', slug: 'nri-marriage' },
  ]

  const serviceIds: Record<string, string> = {}

  for (let i = 0; i < services.length; i++) {
    const svc = services[i]
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: svc.slug } },
    })

    if (existing.docs.length === 0) {
      console.log(`Creating service: ${svc.title}`)
      const doc = await payload.create({
        collection: 'services',
        // @ts-ignore
        data: {
          title: svc.title,
          slug: svc.slug,
          showInHeader: true,
          menuOrder: i + 1,
          banner: defaultMediaId,
          content: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [{ type: 'text', text: `Comprehensive legal assistance for ${svc.title}. We provide expert guidance and handle all the paperwork for a seamless experience.`, version: 1 }],
                },
              ],
            },
          },
          highlights: [
            { title: 'Expert Lawyers', description: 'Assistance from lawyers with 10+ years of experience.' },
            { title: 'Quick & Transparent', description: 'Clear process with no hidden costs and fast processing.' },
            { title: 'Legally Valid', description: 'All registrations are fully compliant with Indian laws.' },
          ],
        },
      })
      serviceIds[svc.slug] = doc.id as any
    } else {
      console.log(`Service already exists: ${svc.title}`)
      serviceIds[svc.slug] = existing.docs[0].id as any
    }
  }

  console.log('\n--- Seeding Blogs (Dummy) ---')
  for (let i = 1; i <= 3; i++) {
    const slug = `blog-post-${i}`
    const existing = await payload.find({
      collection: 'blogs',
      where: { slug: { equals: slug } },
    })
    if (existing.docs.length === 0) {
      console.log(`Creating dummy blog: ${i}`)
      await payload.create({
        collection: 'blogs',
        // @ts-ignore
        data: {
          title: `Essential Guide to ${services[(i-1) % services.length].title}`,
          slug,
          excerpt: 'This is a dummy blog post for testing purposes. It covers various aspects of legal marriage in India.',
          status: 'published',
          featuredImage: defaultMediaId,
          content: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [{ 
                type: 'paragraph', 
                format: '',
                indent: 0,
                version: 1,
                children: [{ type: 'text', text: 'Dummy content for blog post testing.', version: 1 }] 
              }],
            },
          },
        },
      })
    }
  }

  console.log('\n--- Seeding News (Dummy) ---')
  for (let i = 1; i <= 3; i++) {
    const slug = `news-update-${i}`
    const existing = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
    })
    if (existing.docs.length === 0) {
      console.log(`Creating dummy news: ${i}`)
      await payload.create({
        collection: 'news',
        // @ts-ignore
        data: {
          title: `Legal Update: New Marriage Guidelines 2026 - Part ${i}`,
          slug,
          excerpt: 'A short summary of latest legal news for testing the news section.',
          status: 'published',
          featuredImage: defaultMediaId,
          content: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [{ 
                type: 'paragraph', 
                format: '',
                indent: 0,
                version: 1,
                children: [{ type: 'text', text: 'Dummy content for news testing.', version: 1 }] 
              }],
            },
          },
        },
      })
    }
  }

  console.log('\n--- Seeding Testimonials (Dummy) ---')
  const testimonialIds: any[] = []
  const testimonials = [
    { name: 'Rahul & Priya', content: 'The entire court marriage process was so smooth. Highly recommended!' },
    { name: 'Amit Shah', content: 'Professional and transparent. They helped me with NRI marriage documents without any hassle.' },
  ]
  for (const t of testimonials) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { name: { equals: t.name } },
    })
    if (existing.docs.length === 0) {
      console.log(`Creating testimonial for ${t.name}`)
      const doc = await payload.create({
        collection: 'testimonials',
        data: t,
      })
      testimonialIds.push(doc.id)
    } else {
      testimonialIds.push(existing.docs[0].id)
    }
  }

  console.log('\n--- Seeding Pages ---')
  const basePages = [
    {
      title: 'Home',
      slug: 'home',
      status: 'published',
      pageType: 'custom',
      layout: [
        {
          blockType: 'hero',
          layoutStyle: 'withLeadForm',
          heading: 'Get the best legal services in Delhi with us',
          subheading: 'Specialized in Arya Samaj, Court Marriage, and NRI marriage services with 10+ years of legal excellence.',
          backgroundImage: defaultMediaId,
        },
        { 
          blockType: 'servicesCarousel', 
          heading: 'Our Specialist Services',
          items: services.map(svc => ({
            service: serviceIds[svc.slug],
          }))
        },
        { 
          blockType: 'testimonialsBlock', 
          heading: 'Client Success Stories', 
          layout: 'carousel',
          testimonials: testimonialIds 
        },
        { blockType: 'blogFeed', heading: 'Latest Legal Insights' },
      ],
    },
    {
      title: 'About Us',
      slug: 'about',
      status: 'published',
      pageType: 'custom',
      layout: [
        {
          blockType: 'hero',
          layoutStyle: 'standard',
          heading: 'Dedicated to Legal Integrity',
          subheading: 'Serving Delhi NCR for over a decade with transparent and fast-track legal solutions.',
          backgroundImage: defaultMediaId,
        },
        {
          blockType: 'richContent',
          content: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Our Mission', version: 1 }], version: 1, format: '', indent: 0, direction: 'ltr' },
                { type: 'paragraph', children: [{ type: 'text', text: 'To provide the fastest, most reliable legal marriage services in India.', version: 1 }], version: 1, format: '', indent: 0, direction: 'ltr' },
              ],
            },
          },
        },
      ],
    },
    {
      title: 'Contact Us',
      slug: 'contact',
      status: 'published',
      pageType: 'custom',
      layout: [
        {
          blockType: 'hero',
          layoutStyle: 'withLeadForm',
          heading: 'Connect for a Free Consultation',
          subheading: 'Our experts are available on WhatsApp to answer your legal queries.',
          backgroundImage: defaultMediaId,
        },
      ],
    },
    {
      title: 'Charges',
      slug: 'charges',
      status: 'published',
      pageType: 'custom',
      layout: [
        {
          blockType: 'hero',
          layoutStyle: 'standard',
          style: 'centered',
          heading: 'Transparent Pricing & Charges',
          subheading: 'Clear and affordable fees for all our legal marriage services. No hidden costs.',
          backgroundImage: defaultMediaId,
        },
        {
          blockType: 'richContent',
          content: {
            root: {
              type: 'root',
              children: [
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Our Service Fees', version: 1 }], version: 1 },
                { type: 'paragraph', children: [{ type: 'text', text: 'We believe in full transparency. Our charges include government fees, legal documentation, and processing assistance.', version: 1 }], version: 1 },
              ],
            },
          },
        },
      ],
    },
    {
      title: 'Consultation',
      slug: 'consultation',
      status: 'published',
      pageType: 'custom',
      layout: [
        {
          blockType: 'hero',
          layoutStyle: 'withLeadForm',
          heading: 'Book a Legal Consultation',
          subheading: 'Speak with our expert advocates to clarify your doubts regarding legal marriage procedures.',
          backgroundImage: defaultMediaId,
        },
      ],
    },
    {
      title: 'Lawyer Services',
      slug: 'lawyer-services',
      status: 'published',
      pageType: 'custom',
      layout: [
        {
          blockType: 'hero',
          layoutStyle: 'standard',
          style: 'split',
          heading: 'Expert Lawyer Services',
          subheading: 'Professional advocates to represent you in court and handle all legal formalities.',
          backgroundImage: defaultMediaId,
        },
        {
          blockType: 'richContent',
          content: {
            root: {
              type: 'root',
              children: [
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Comprehensive Legal Support', version: 1 }], version: 1 },
                { type: 'paragraph', children: [{ type: 'text', text: 'Our team of experienced lawyers provides complete end-to-end support for all types of legal marriage registrations.', version: 1 }], version: 1 },
              ],
            },
          },
        },
        {
          blockType: 'lawyerList',
          heading: 'Meet Our Expert Advocates',
          subheading: 'Dedicated legal professionals with years of experience in family and marriage law.',
          showBio: true,
          showContact: true,
        },
      ],
    },
  ]

  const pagesToCreate = [...basePages]

  // Add individual service pages
  for (const svc of services) {
    pagesToCreate.push({
      title: `${svc.title} Services`,
      slug: svc.slug,
      status: 'published',
      pageType: 'service',
      // @ts-ignore
      service: serviceIds[svc.slug],
      layout: [
        {
          blockType: 'hero',
          layoutStyle: 'withLeadForm',
          heading: `Expert ${svc.title} in Delhi`,
          subheading: `Professional legal assistance for ${svc.title.toLowerCase()} with complete document verification.`,
          backgroundImage: defaultMediaId,
        },
        { 
          // @ts-ignore
          items: [
            { title: 'Documentation', description: 'Complete assistance with all required legal documents.' },
            { title: 'Verification', description: 'Thorough verification of all identities and witnesses.' }
          ]
        },
        // @ts-ignore
        { blockType: 'faq', heading: 'Common Questions', source: 'auto', autoScope: 'service' },
      ],
    })
  }

  for (let i = 0; i < pagesToCreate.length; i++) {
    const pg = pagesToCreate[i]
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pg.slug } },
    })
    
    if (existing.docs.length === 0) {
      console.log(`Creating page: ${pg.title}`)
      try {
        await payload.create({ 
          collection: 'pages', 
          // @ts-ignore
          data: pg 
        })
      } catch (err: any) {
        console.error(`Error creating page ${pg.title}:`, JSON.stringify(err.data || err.message, null, 2))
      }
    } else {
      console.log(`Updating existing page: ${pg.slug}`)
      try {
        await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          // @ts-ignore
          data: pg,
        })
      } catch (err: any) {
        console.error(`Error updating page ${pg.slug}:`, JSON.stringify(err.data || err.message, null, 2))
      }
    }
  }

  console.log('\nSeed complete!')
  process.exit(0)
}

seed()
