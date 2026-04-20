import React from 'react'
import type { Metadata } from 'next'
import '@/app/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getPayload } from '@/lib/payload/getPayload'

export const metadata: Metadata = {
  title: {
    default: 'VakilFirst | Premium Legal Services in India',
    template: '%s | VakilFirst',
  },
  description:
    'Expert legal services for court marriage, property disputes, family law, and more. Trusted lawyers across India.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL 
      ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith('http') ? process.env.NEXT_PUBLIC_SITE_URL : `https://${process.env.NEXT_PUBLIC_SITE_URL}`) 
      : 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'VakilFirst',
  },
  robots: {
    index: true,
    follow: true,
  },
}

type NavGroup = {
  category: string
  order: number
  items: { id: string; label: string; slug: string }[]
}

function groupServices(docs: any[], dropdown: string): NavGroup[] {
  const filtered = docs.filter((s: any) => s.navDropdown === dropdown)
  const groupMap: Record<string, NavGroup> = {}

  for (const svc of filtered) {
    const cat = svc.navCategory || 'General'
    if (!groupMap[cat]) {
      groupMap[cat] = { category: cat, order: svc.navCategoryOrder ?? 99, items: [] }
    }
    groupMap[cat].items.push({
      id: svc.id,
      label: svc.navLabel || svc.title,
      slug: svc.slug,
    })
  }

  return Object.values(groupMap).sort((a, b) => a.order - b.order)
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let findALawyerGroups: NavGroup[] = []
  let legalMatterGroups: NavGroup[] = []
  let navServices: any[] = [] // keep for backward compat
  
  let footerServices: any[] = []
  let footerLocations: any[] = []
  let siteSettings: any = null
  
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'services',
      where: {
        showInHeader: { equals: true },
      },
      sort: 'menuOrder',
      limit: 200,
      depth: 0,
    })
    navServices = result.docs
    findALawyerGroups = groupServices(result.docs, 'find-a-lawyer')
    legalMatterGroups = groupServices(result.docs, 'legal-matter')

    // Fetch footer data
    const footerSvcResult = await payload.find({
      collection: 'services',
      where: { showInFooter: { equals: true } },
      sort: 'footerOrder',
      limit: 50,
      depth: 0,
    })
    footerServices = footerSvcResult.docs

    const footerLocResult = await payload.find({
      collection: 'locations',
      where: { showInFooter: { equals: true } },
      sort: 'footerOrder',
      limit: 50,
      depth: 0,
    })
    footerLocations = footerLocResult.docs

    // Bypass type check completely by casting payload to any until types generation syncs
    siteSettings = await (payload as any).findGlobal({
      slug: 'site-settings',
      depth: 0,
    })
  } catch (error) {
    console.error('Error fetching nav services:', error)
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header 
          navServices={navServices}
          findALawyerGroups={findALawyerGroups}
          legalMatterGroups={legalMatterGroups}
        />
        <main className="flex-1">{children}</main>
        <Footer 
          services={footerServices} 
          locations={footerLocations} 
          settings={siteSettings} 
        />
      </body>
    </html>
  )
}
