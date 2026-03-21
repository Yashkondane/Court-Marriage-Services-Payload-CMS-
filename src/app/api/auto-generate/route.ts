import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload/getPayload'

/**
 * Auto-generate pages for all areas under a city for a given service.
 *
 * POST /api/auto-generate
 * Body: { serviceId: string, cityId: string }
 *
 * This will:
 * 1. Find the service by ID
 * 2. Find all areas under the given city
 * 3. Create a Page document for each service+area combination
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload()

    // Verify the user is admin or developer
    // (In production, verify via headers/cookies)

    const body = await request.json()
    const { serviceId, cityId } = body

    if (!serviceId || !cityId) {
      return NextResponse.json(
        { error: 'serviceId and cityId are required' },
        { status: 400 },
      )
    }

    // Get the service
    const service = await payload.findByID({
      collection: 'services',
      id: serviceId,
    })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Get the city
    const city = await payload.findByID({
      collection: 'locations',
      id: cityId,
    })

    if (!city || city.type !== 'city') {
      return NextResponse.json(
        { error: 'Location must be a city' },
        { status: 400 },
      )
    }

    // Find all areas under this city
    const areas = await payload.find({
      collection: 'locations',
      where: {
        type: { equals: 'area' },
        parent: { equals: cityId },
      },
      limit: 500,
    })

    const createdPages: string[] = []
    const skippedPages: string[] = []

    for (const area of areas.docs) {
      const slug = `${service.slug}/${city.slug}/${area.slug}`

      // Check if page already exists
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        skippedPages.push(slug)
        continue
      }

      // Create the page
      await payload.create({
        collection: 'pages',
        data: {
          title: `${service.title} in ${area.name}`,
          slug,
          status: 'draft',
          pageType: 'serviceLocation',
          service: service.id,
          location: area.id,
          layout: [
            {
              blockType: 'hero',
              heading: `${service.title} in ${area.name}`,
              subheading: `Expert ${service.title.toLowerCase()} services in ${area.name}, ${city.name}. Contact our experienced lawyers today.`,
              style: 'fullWidth',
              visibility: { showOnDesktop: true, showOnMobile: true, targetType: 'global' },
            },
            {
              blockType: 'cta',
              heading: `Need ${service.title} Help in ${area.name}?`,
              description: `Our experienced team is ready to assist you. Get a free consultation today.`,
              primaryButton: { text: 'Book Consultation', link: '/consultation' },
              secondaryButton: { text: 'Call Now', link: 'tel:+919999999999' },
              style: 'banner',
              visibility: { showOnDesktop: true, showOnMobile: true, targetType: 'global' },
            },
          ],
          seo: {
            metaTitle: `${service.title} in ${area.name}, ${city.name} | Kaushal Associates`,
            metaDescription: `Looking for ${service.title.toLowerCase()} in ${area.name}, ${city.name}? Kaushal Associates provides expert legal services. Call now for a free consultation.`,
            robotsMeta: 'index,follow',
          },
        },
      })

      createdPages.push(slug)
    }

    return NextResponse.json({
      success: true,
      created: createdPages.length,
      skipped: skippedPages.length,
      pages: createdPages,
      skippedSlugs: skippedPages,
    })
  } catch (err) {
    console.error('Auto-generate error:', err)
    return NextResponse.json(
      { error: 'Failed to auto-generate pages' },
      { status: 500 },
    )
  }
}
