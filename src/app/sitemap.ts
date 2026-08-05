import type { MetadataRoute } from 'next'
import { routeMap } from '@/lib/routes'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const languages = {
    'hr-HR': new URL(routeMap.hr.home, site.url).toString(),
    en: new URL(routeMap.en.home, site.url).toString(),
  }

  return (['hr', 'en'] as const).map((locale) => ({
    url: new URL(routeMap[locale].home, site.url).toString(),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: locale === 'hr' ? 1 : 0.8,
    alternates: { languages },
  }))
}
