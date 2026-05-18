import { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'

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

  console.log('--- STARTING LAWYERS PAGE SEEDING ---')

  // 1. Create specialized FAQs for Lawyers Page
  console.log('[1/4] Seeding specialized FAQs for Lawyers Page...')
  const lawyersFAQs = [
    {
      question: 'How does VakilFirst verify the advocates on the platform?',
      answer: 'Every advocate listed on VakilFirst undergoes a strict verification process. We cross-verify their Bar Council registration details, academic credentials, and professional practice history to ensure absolute legal expertise.'
    },
    {
      question: 'Can I choose a lawyer based on my specific city and case type?',
      answer: 'Yes! Our advanced directory allows you to filter lawyers by state, city, and specialization (such as Court Marriage, Family Law, Property Disputes, Corporate Filings, or Civil/Criminal litigation).'
    },
    {
      question: 'Is my initial consultation or callback request confidential?',
      answer: 'Absolutely. All communications, documents shared, and details discussed during the consultation are protected under strict lawyer-client confidentiality.'
    },
    {
      question: 'What are the charges for booking a legal consultation?',
      answer: 'We offer standardized pricing for general consultations starting at just ₹1000 with no time limit, allowing you to discuss your case thoroughly. Specific representation fees vary based on the lawyer and complexity of the matter.'
    }
  ]

  const lawyersFaqIds = []
  for (const f of lawyersFAQs) {
    const createdFaq = await payload.create({
      collection: 'faqs',
      data: {
        question: f.question,
        answer: createLexicalRoot([f.answer]),
        scope: 'global'
      }
    })
    lawyersFaqIds.push(createdFaq.id)
  }

  // 2. Create specialized client reviews / testimonials for Lawyers Page
  console.log('[2/4] Seeding client testimonials for Lawyers Page...')
  const lawyersReviews = [
    {
      name: 'Rohan Malhotra',
      role: 'Business Owner, Delhi',
      quote: 'I found an exceptional corporate lawyer through VakilFirst. The consultation was thorough, clear, and extremely professional. The callback was arranged in less than 5 minutes!',
      rating: 5
    },
    {
      name: 'Sneha Rao',
      role: 'IT Professional, Bangalore',
      quote: 'Extremely satisfied with the family lawyer I consulted for property dispute resolution. They guided us step-by-step through the process, keeping everything confidential.',
      rating: 5
    },
    {
      name: 'Aditya & Priya',
      role: 'Married Couple, Mumbai',
      quote: 'Finding a court marriage advocate in Mumbai was so easy. Advocate Priya was extremely patient, answered all our queries, and handled all documentation beautifully.',
      rating: 5
    },
    {
      name: 'Vikram Singh',
      role: 'Startup Founder, Noida',
      quote: 'The legal advice we got for company incorporation and trademark registration was precise. Having Bar Council verified lawyers on call gives extreme peace of mind.',
      rating: 5
    }
  ]

  const lawyersReviewIds = []
  for (const r of lawyersReviews) {
    const createdRev = await payload.create({
      collection: 'testimonials',
      data: {
        name: r.name,
        designation: r.role,
        content: r.quote,
        rating: r.rating
      }
    })
    lawyersReviewIds.push(createdRev.id)
  }

  // 3. Construct Layout Block for Lawyers List
  console.log('[3/4] Constructing Lawyers List layout block...')
  const lawyersBlocks = [
    {
      blockType: 'lawyersList',
      heading: 'Consult with the Best Lawyers & Advocates in India',
      subheading: 'Navigating legal matters can be daunting, but with the best lawyers in India, you can secure the expert guidance you need. We connect individuals and businesses with top-rated advocates and legal experts.',
      onlineCountText: '104+ Lawyers Online',
      showFilters: true,
      whyChooseHeading: 'Why Choose Our Lawyers & Advocates?',
      whyChoosePoints: [
        {
          title: 'Bar Council Verified Advocates',
          description: 'Every lawyer registered with VakilFirst undergoes rigorous verification of their credentials, licensing, and enrollment details.',
        },
        {
          title: '4.8+ Client Ratings & Reviews',
          description: 'Read verified testimonials, reviews, and client satisfaction ratings before consulting with your advocate.',
        },
        {
          title: '100% Secure & Confidential',
          description: 'All consultations, case evaluations, and document transmissions are protected under strict attorney-client privilege.',
        },
        {
          title: 'Quick Response (under 5 Min)',
          description: 'Connect with a local legal expert instantly for urgent litigation, document filings, or general counsel.',
        }
      ],
      faqsHeading: 'Frequently Asked Questions',
      faqs: lawyersFaqIds,
      reviewsHeading: 'What Our Clients Say',
      reviews: lawyersReviewIds,
      consultationWidget: {
        heading: 'Consult a Lawyer',
        subheading: 'No Minutes Limit',
        price: '1000',
        originalPrice: '2000',
      },
      helpContactWidget: {
        heading: 'Need Help?',
        phone: '+91-8800 788 535',
        timings: 'Timing: 9AM to 8PM',
        callbackText: 'Arrange a Callback',
      }
    }
  ]

  // 4. Delete existing Lawyers Page and seed fresh one
  console.log('[4/4] Cleaning and seeding dynamic Lawyers Page...')
  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'lawyers' } },
    limit: 1,
  })

  if (existingPage.docs.length > 0) {
    await payload.delete({
      collection: 'pages',
      id: existingPage.docs[0].id
    })
    console.log('Old dynamic lawyers page deleted!')
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Verified Lawyers Directory',
      slug: 'lawyers',
      pageType: 'custom',
      status: 'published',
      publishedDate: new Date().toISOString(),
      seo: {
        metaTitle: 'Find a Lawyer | VakilFirst Verified Advocate Directory',
        metaDescription: 'Browse and consult with our pan-India network of Bar Council verified lawyers. Filter by city, state, rating, and specialization.',
        keywords: 'lawyers directory, advocates india, find lawyer, verified lawyers, legal consultation',
        robotsMeta: 'index,follow'
      },
      layout: lawyersBlocks
    }
  })

  console.log('✨ LAWYERS PAGE SUCCESSFULLY SEEDED! ✨')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error seeding lawyers page:', err)
  process.exit(1)
})
