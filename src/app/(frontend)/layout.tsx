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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let navServices: any[] = []
  
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'services',
      where: {
        showInHeader: { equals: true },
      },
      sort: 'menuOrder',
      limit: 100,
    })
    navServices = result.docs
  } catch (error) {
    console.error('Error fetching nav services:', error)
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header navServices={navServices} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
