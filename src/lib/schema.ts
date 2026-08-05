import { site } from './site'
import type { SiteContent } from '@/content/types'

const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * AutoRepair je podtip LocalBusinessa i tocno opisuje sto Auto Ragusa jest.
 * Postojeci web nema nikakve strukturirane podatke, sto je najveci pojedinacni
 * gubitak u lokalnom SEO-u.
 */
export function autoRepairSchema(c: SiteContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${site.url}/#organizacija`,
    name: site.name,
    description: c.meta.description,
    url: site.url,
    telephone: '+385 20 418 509',
    email: site.email,
    foundingDate: String(site.founded),
    priceRange: '$$',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postal,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.lat,
      longitude: site.address.lon,
    },
    areaServed: [
      { '@type': 'City', name: 'Dubrovnik' },
      { '@type': 'AdministrativeArea', name: site.address.region },
    ],
    openingHoursSpecification: site.hours
      .filter((h) => h.open)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${DAY[h.day]}`,
        opens: h.open,
        closes: h.close,
      })),
    brand: site.authorizedBrands.map((name) => ({ '@type': 'Brand', name })),
    sameAs: [site.social.facebook, site.social.instagram, site.social.peugeot],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: c.scope.heading,
      // Puni opisi dolaze iz `seo` bloka, ne s ekrana. Tekst je maknut zbog
      // citljivosti, ali SEO tezina ne odlazi zajedno s njim.
      itemListElement: c.seo.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          serviceType: s.name,
        },
      })),
    },
  }
}
