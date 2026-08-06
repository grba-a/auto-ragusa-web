'use client'

import { useLayoutEffect, useRef } from 'react'
import Sheet from './Sheet'
import { gsap, MQ, revealIn, writeIn } from '@/lib/gsap'
import type { SiteContent } from '@/content/types'

/**
 * List 3 - Clanak 2., opseg radova.
 *
 * Devet pozicija numeriranih 2.1 do 2.9, kao stavke clanka. Sest usluga i tri
 * papira: ugovor ima JEDAN popis opsega, ne dva.
 *
 * Specifikacija je upisana RUKOM, jer to nije dio otisnutog obrasca nego ono
 * sto je netko dopisao uz stavku. Pozicije bez specifikacije nemaju nista -
 * linija koja vodi u prazno cita se kao podatak koji nedostaje.
 *
 * Puni opisi zive u JSON-LD katalogu (`content.seo`), ne na ekranu.
 */
export default function Scope({ c }: { c: SiteContent }) {
  const root = useRef<HTMLDivElement>(null)
  const article = c.contract.articles[1]

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
          const spec = entry.querySelector('[data-spec]')
          if (spec) writeIn(spec, { trigger: entry, delay: 0.22 })
        })
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, build(20))
    mm.add(MQ.mobile, build(12))
    return () => mm.revert()
  }, [])

  return (
    <Sheet id="opseg" page={3} of={6} tilt={0.45} offset={-1.5} pageLabel={c.contract.pageLabel}>
      <div ref={root} className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <header data-head className="border-b border-edge pb-5">
          <p className="label mb-3">
            {c.contract.articleLabel} {article.no}
          </p>
          <h2 className="doc-lg text-[clamp(1.5rem,3.4vw,2.6rem)] text-ink">{article.title}</h2>
        </header>

        <ol className="mt-12 border-t border-edge">
          {c.scope.items.map((item, i) => (
            <li
              key={item.id}
              data-entry
              className="grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-edge py-5 sm:grid-cols-[4rem_minmax(0,26rem)_1fr] sm:gap-x-8 sm:py-6"
            >
              <span className="spec tnum text-ink">
                {article.no}
                {i + 1}
              </span>

              <h3 className="doc-md text-lg text-ink sm:text-xl">
                <span data-write className="inline-block">
                  {item.title}
                </span>
              </h3>

              {item.spec && (
                <p className="col-start-2 sm:col-start-3">
                  <span data-spec className="margin-note inline-block">
                    {item.spec}
                  </span>
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Sheet>
  )
}
