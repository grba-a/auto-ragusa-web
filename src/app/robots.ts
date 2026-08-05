import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Preview deploy se ne indeksira. Bez ovoga bi svaki Vercel preview mogao
  // zavrsiti u trazilici kao duplikat produkcije.
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

  return {
    rules: isProduction
      ? [{ userAgent: '*', allow: '/', disallow: '/api/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  }
}
