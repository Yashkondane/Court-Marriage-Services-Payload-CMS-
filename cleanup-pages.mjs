import { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'

async function cleanup() {
  const payload = await getPayload({ config: configPromise })

  console.log('--- STARTING CLEANUP OF DUPLICATE PAGES ---')

  console.log('Fetching all pages with pageType = "service" from Pages collection...')
  const pagesRes = await payload.find({
    collection: 'pages',
    where: {
      pageType: { equals: 'service' }
    },
    limit: 100
  })

  console.log(`Found ${pagesRes.docs.length} service pages in the Pages collection.`)

  for (const page of pagesRes.docs) {
    console.log(`Deleting duplicate page: "${page.title}" (${page.slug})`)
    await payload.delete({
      collection: 'pages',
      id: page.id
    })
  }

  console.log('✅ CLEANUP COMPLETE: No more duplicate service pages in "Web Pages"!')
  process.exit(0)
}

cleanup().catch(err => {
  console.error('Error during cleanup:', err)
  process.exit(1)
})
