import { getPayload } from '../lib/payload/getPayload'

async function check() {
  const payload = await getPayload()

  const media = await payload.find({ collection: 'media', limit: 10 })
  console.log('--- Media ---')
  media.docs.forEach(m => console.log(`- ${m.alt} (ID: ${m.id}, URL: ${m.url})`))

  const services = await payload.find({ collection: 'services' })
  console.log('\n--- Services ---')
  services.docs.forEach(svc => console.log(`- ${svc.title} (${svc.slug})`))

  const pages = await payload.find({ collection: 'pages' })
  console.log('\n--- Pages ---')
  pages.docs.forEach(pg => console.log(`- ${pg.title} (${pg.slug})`))

  process.exit(0)
}

check()
