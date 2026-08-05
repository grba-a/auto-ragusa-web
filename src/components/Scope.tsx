'use client'

import { useLayoutEffect, useRef } from 'react'
import DocTitle from './ui/DocTitle'
import { gsap, MQ, revealIn, writeIn } from '@/lib/gsap'
import type { SiteContent } from '@/content/types'

/**
 * Opseg radova: devet pozicija u jednom ledgeru.
 *
 * Blok "Dodatno na nalogu" je ugasen i njegove tri stavke su usle ovdje kao
 * pozicije 07 do 09. To su usluge, isti raspored, i nalog ima JEDAN popis
 * opsega, ne dva. Time nestaje i H2 i lead i tri field-labela koji su tri puta
 * ponavljali naslov svoje sekcije.
 *
 * Numeracija je obicna, 01 do 09. Prije je bila `05.1` do `05.6`, sto se nije
 * slagalo ni s vlastitim redoslijedom blokova: broj koji lazi je ornament koji
 * glumi podatak.
 *
 * Opisne recenice su van. Gdje naziv nije dovoljan, stoji spec linija od
 * cetiri rijeci. Puni opisi zive u JSON-LD katalogu (`content.seo`).
 */
export default function Scope({ c }: { c: SiteContent }) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()

    const build = (y: number) => () => {
      const ctx = gsap.context(() => {
        revealIn(el.querySelectorAll('[data-head]'), { trigger: el, y })
        gsap.utils.toArray<HTMLElement>('[data-entry]').forEach((entry) => {
          revealIn(entry, { trigger: entry, y })
          const title = entry.querySelector('[data-write]')
          if (title) writeIn(title, { trigger: entry })
        })
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, build(20))
    mm.add(MQ.mobile, build(12))
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="opseg" className="sheet py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <DocTitle
          as="h2"
          data-head
          className="doc-lg text-[clamp(1.7rem,4vw,3rem)] text-ink"
        >
          {c.scope.heading}
        </DocTitle>

        <ol className="mt-24 border-t border-edge md:mt-32">
          {c.scope.items.map((item, i) => (
            <li
              key={item.id}
              data-entry
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 gap-y-2 border-b border-edge py-7 md:grid-cols-[4rem_minmax(0,30rem)_1fr] md:gap-x-8 md:py-9"
            >
              <span className="label tnum text-ink">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="doc-md text-lg text-ink sm:text-xl">
                <span data-write className="inline-block">
                  {item.title}
                </span>
              </h3>
              {item.spec ? (
                <p className="spec col-start-2 md:col-start-3">{item.spec}</p>
              ) : (
                <span aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
