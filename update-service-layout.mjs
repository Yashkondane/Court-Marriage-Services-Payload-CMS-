npx tsx --env-file=.env seed-family-law.mjsimport { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'

async function update() {
  const payload = await getPayload({ config: configPromise })

  console.log('Fetching existing page layout from pages collection...')
  const pageRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'corporate-law' } },
    limit: 1,
  })

  if (pageRes.docs.length === 0) {
    console.error('Page "corporate-law" not found! Run the seed script first.')
    process.exit(1)
  }

  const pageDoc = pageRes.docs[0]
  const layout = pageDoc.layout

  console.log('Updating layout for the corporate-law service in services collection...')
  const serviceRes = await payload.find({
    collection: 'services',
    where: { slug: { equals: 'corporate-law' } },
    limit: 1,
  })

  if (serviceRes.docs.length === 0) {
    console.error('Service "corporate-law" not found!')
    process.exit(1)
  }

  const serviceDoc = serviceRes.docs[0]
  await payload.update({
    collection: 'services',
    id: serviceDoc.id,
    data: {
      layout: layout
    }
  })

  console.log('Service layout updated successfully!')
  process.exit(0)
}

update().catch(err => {
  console.error(err)
  process.exit(1)
})
