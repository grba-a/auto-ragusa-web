'use client'

import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import DocTitle from './ui/DocTitle'
import Reveal from './ui/Reveal'
import Sheet from './Sheet'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

const ORDER = [1, 2, 3, 4, 5, 6, 0] as const

const query = encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.postal} ${site.address.city}`
)

/**
 * Podnozje dokumenta: gdje se nalog predaje i kada.
 *
 * Tablica radnog vremena je uselila ovamo. Prije je imala vlastiti blok, i to
 * s vlastitim "otvoreno sada" indikatorom koji je bio doslovni duplikat onog u
 * zaglavlju stranice. Adresa i sati pripadaju zajedno.
 *
 * Google embed je izbacen jos u proslom krugu: njegovi POI pinovi za okolne
 * restorane bili su najzasiceniji element na stranici.
 */
export default function Contact({ c }: { c: SiteContent }) {
  const today = new Date().getDay()

  return (
    <Sheet id="kontakt" page={6} of={6} tilt={-0.4} offset={1} pageLabel={c.contract.pageLabel}>
      <div className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <header className="border-b border-edge pb-5">
          <p className="label mb-3">{c.contract.contractorLabel}</p>
          <DocTitle as="h2" className="doc-lg text-[clamp(1.5rem,3.4vw,2.6rem)] text-ink">
            {c.contact.heading}
          </DocTitle>
        </header>

        <Reveal className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)_minmax(0,24rem)] lg:gap-16">
          {/* Podaci */}
          <dl data-reveal className="grid gap-8">
            <div>
              <dt className="label mb-2">{c.contact.addressLabel}</dt>
              <dd className="text-base leading-relaxed text-ink">
                {site.address.street}
                <br />
                {site.address.postal} {site.address.city}
              </dd>
              <p className="mt-3 text-sm text-ink-2">{c.contact.approach}</p>
            </div>
            <div>
              <dt className="label mb-2">{c.contact.phoneLabel}</dt>
              <dd className="flex flex-col gap-1">
                <a
                  href={site.tel.landline.href}
                  className="tnum text-base text-ink underline decoration-edge underline-offset-4 transition-colors hover:decoration-signal"
                >
                  {site.tel.landline.label}
                </a>
                <a
                  href={site.tel.mobile.href}
                  className="tnum text-base text-ink underline decoration-edge underline-offset-4 transition-colors hover:decoration-signal"
                >
                  {site.tel.mobile.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label mb-2">{c.contact.emailLabel}</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="text-base break-all text-ink underline decoration-edge underline-offset-4 transition-colors hover:decoration-signal"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noreferrer noopener"
              className="label inline-flex w-fit items-center gap-2 border-b border-edge pb-1 text-ink transition-colors hover:border-signal hover:text-signal"
            >
              {c.contact.directions}
              <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
            </a>
          </dl>

          {/* Radno vrijeme */}
          <div data-reveal>
            <h3 className="label mb-5">{c.hours.heading}</h3>
            <dl className="border-t border-edge">
              {ORDER.map((day) => {
                const row = site.hours.find((h) => h.day === day)
                const isToday = day === today
                return (
                  <div
                    key={day}
                    className={`flex items-baseline justify-between gap-4 border-b border-edge py-3 ${
                      isToday ? 'text-ink' : 'text-ink-2'
                    }`}
                  >
                    <dt className={`text-sm ${isToday ? 'font-medium' : ''}`}>
                      {c.hours.days[day]}
                    </dt>
                    <dd className="label tnum">
                      {row?.open ? `${row.open} - ${row.close}` : c.hours.closed}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>

          {/* Shematska karta. Gruski rotor, njihova ulica, jedna tocka. */}
          <figure data-reveal className="border border-edge">
            <svg viewBox="0 0 320 240" role="img" aria-label={c.contact.mapAlt} className="w-full">
              <rect width="320" height="240" fill="var(--color-paper)" />

              <path
                d="M0 176 C 60 168, 110 190, 168 196 S 268 214, 320 206 L320 240 L0 240 Z"
                fill="var(--color-rule)"
                opacity="0.35"
              />

              <g stroke="var(--color-edge)" strokeWidth="7" fill="none" strokeLinecap="round">
                <path d="M0 96 H108" />
                <path d="M212 96 H320" />
                <path d="M160 0 V52" />
                <path d="M160 140 V186" />
                <path d="M212 96 C 248 96, 262 126, 268 158" />
              </g>

              <circle cx="160" cy="96" r="44" fill="none" stroke="var(--color-edge)" strokeWidth="7" />
              <circle cx="160" cy="96" r="18" fill="var(--color-paper)" />

              <path
                d="M160 140 V186 H244"
                stroke="var(--color-signal)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="6 5"
              />
              <circle cx="244" cy="186" r="7" fill="var(--color-signal)" />

              <text
                x="244"
                y="208"
                textAnchor="middle"
                fill="var(--color-ink)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="1"
              >
                AUTO RAGUSA
              </text>
            </svg>
          </figure>
        </Reveal>
      </div>
    </Sheet>
  )
}
