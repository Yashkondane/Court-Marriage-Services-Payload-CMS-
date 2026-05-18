import { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'

async function check() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })
  console.log('--- SERVICES ---')
  for (const s of services.docs) {
    console.log(`ID: ${s.id} | Slug: ${s.slug} | Title: ${s.title}`)
  }
  
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  })
  console.log('--- PAGES ---')
  for (const p of pages.docs) {
    console.log(`ID: ${p.id} | Slug: ${p.slug} | Title: ${p.title}`)
  }
  process.exit(0)
}

check()
