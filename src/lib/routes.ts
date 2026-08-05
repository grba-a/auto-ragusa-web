import type { SiteContent } from '@/content/types'

/**
 * Jedna stranica po jeziku. Podstranice su obrisane: `/usluge` i `/kontakt` su
 * imale ukupno cetiri nove recenice, a sve ostalo su reciklirali s pocetne. To
 * nisu bile stranice nego sitemap unosi, i radni nalog je jedan dokument.
 */
export const routeMap = {
  hr: { home: '/' },
  en: { home: '/en' },
} as const

export function routes(c: Pick<SiteContent, 'locale'>) {
  return routeMap[c.locale]
}

export const alternates = {
  languages: {
    'hr-HR': routeMap.hr.home,
    en: routeMap.en.home,
  },
} as const
