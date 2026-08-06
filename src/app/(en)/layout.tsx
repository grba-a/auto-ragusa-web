import type { Metadata, Viewport } from 'next'
import '../globals.css'
import Shell from '@/components/Shell'
import { en } from '@/content/en'
import { alternates } from '@/lib/routes'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: en.meta.title,
  description: en.meta.description,
  applicationName: site.name,
  alternates: { canonical: '/en', ...alternates },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['hr_HR'],
    siteName: site.name,
    title: en.meta.title,
    description: en.meta.description,
    url: '/en',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#221e1a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>
}
