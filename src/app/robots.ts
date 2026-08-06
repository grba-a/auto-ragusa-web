import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  /**
   * Indeksiranje se dopusta samo kad je produkcija stvarno na svojoj domeni.
   *
   * Dva uvjeta, oba nuzna:
   *  - `VERCEL_ENV` je `production` (preview deploy nikad ne ide u trazilicu)
   *  - domena nije `*.vercel.app`
   *
   * Drugi uvjet je vazniji nego sto se cini: dok `auto-ragusa.hr` nije spojen,
   * produkcijski URL JEST vercel.app adresa, pa bi bez ove provjere Google
   * indeksirao nju. Kad bi domena poslije dosla, imali bismo dvije indeksirane
   * kopije istog sadrzaja i kanibalizaciju vlastitog ranga.
   */
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'
  const onOwnDomain = !site.url.includes('.vercel.app')
  const indexable = isProduction && onOwnDomain

  return {
    rules: indexable
      ? [{ userAgent: '*', allow: '/', disallow: '/api/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  }
}
