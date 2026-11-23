import type { Metadata } from 'next'
import LayoutWrapper from '@/components/LayoutWrapper'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://loagomov.blancsociety.co.uk'),
  title: {
    default: 'Loago Montsho (Mov) | Data Analytics, Quantitative Systems & Ventures',
    template: '%s | Loago Montsho (Mov)',
  },
  description:
    'Personal portfolio and interactive macOS system for Loago Kevin Montsho (Mov) — BSc Business Intelligence & Data Analytics undergraduate, Data Engineer, Quant Systems Builder, and Founder based in Gaborone, Botswana.',
  alternates: {
    canonical: 'https://loagomov.blancsociety.co.uk',
  },
  openGraph: {
    type: 'website',
    locale: 'en_BW',
    url: 'https://loagomov.blancsociety.co.uk',
    siteName: 'Loago Kevin Montsho (Mov)',
    title: 'Loago Montsho (Mov) | Data Analytics Student · Full-Stack Developer · Founder',
    description:
      'Turning raw data into actionable insight and shipping software that solves real-world business problems. Operating across Databricks, PySpark, Delta Lake, Swin Transformers, and full-stack systems.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Loago Kevin Montsho (Mov) — Portfolio & macOS Desktop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@loagomov',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-BW" data-scroll-behavior="smooth" className="h-full">
      <body className="min-h-full flex flex-col bg-[#121212] text-white/90 antialiased selection:bg-[#9fa3fc]/30 selection:text-white overflow-x-hidden font-sans">
        <div className="grain-overlay" aria-hidden="true" />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
