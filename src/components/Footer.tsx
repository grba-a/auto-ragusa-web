import Link from 'next/link'
import Wordmark from './Wordmark'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

/**
 * Podnozje dokumenta.
 *
 * Linkovi su razdvojeni na dvije skupine: sidrišta unutar naloga i vanjska
 * odredista. Prosla verzija je mijesala oboje u jedan red, pa se "Usluge"
 * pojavljivalo dvaput a "Kontakt" je stajao pored "Kontakt i lokacija".
 */
export default function Footer({ c }: { c: SiteContent }) {
  const year = new Date().getFullYear()

  return (
    /* Podnozje nije list nego kolofon: lezi izravno na stolu, bez sjene i bez
       broja stranice, ispod snopa. */
    <footer className="py-16 text-white">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <div>
            <Wordmark tone="light" height={34} />
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-white/60">
              {c.footer.tagline}
            </p>
          </div>

          <nav aria-label={c.nav.cta} className="flex flex-wrap gap-x-8 gap-y-3">
            {c.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label tnum text-white/45">
            {year} {site.name}. {c.footer.rights}
          </p>
          <Link
            href={c.footer.langSwitchHref}
            hrefLang={c.locale === 'hr' ? 'en' : 'hr'}
            className="label text-white/70 transition-colors duration-200 hover:text-white"
          >
            {c.footer.langSwitch}
          </Link>
        </div>
      </div>
    </footer>
  )
}
