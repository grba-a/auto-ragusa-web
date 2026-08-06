import type { Metadata, Viewport } from 'next'
import '../globals.css'
import Shell from '@/components/Shell'
import { hr } from '@/content/hr'
import { alternates } from '@/lib/routes'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: hr.meta.title,
  description: hr.meta.description,
  applicationName: site.name,
  alternates: { canonical: '/', ...alternates },
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    alternateLocale: ['en_GB'],
    siteName: site.name,
    title: hr.meta.title,
    description: hr.meta.description,
    url: '/',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#221e1a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return <Shell lang="hr">{children}</Shell>
}
