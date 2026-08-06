'use client'

import { useLayoutEffect, useRef } from 'react'
import Checkbox from './ui/Checkbox'
import Sheet from './Sheet'
import { gsap, MQ, revealIn, stampIn, tickBox, writeIn } from '@/lib/gsap'
import type { SiteContent } from '@/content/types'

/**
 * List 2 - Clanak 1., tijek radova.
 *
 * Pet tocaka numeriranih 1.1 do 1.5, kao stavke clanka. Svaka ima OTISNUTU
 * praznu kucicu koja se ISPUNJAVA RUKOM kad njezin redak ude u kadar: obrazac
 * je vec bio tiskan, a netko ga ispunjava dok ga citate.
 *
 * "Vas" stoji samo na vasa dva koraka, i to kao marginalija uz rub, rukom.
 * Oznaciti i ostala tri s "Nas" ne dodaje nista.
 *
 * Zig ODOBRENO je zadnji potez na listu i okida na sebi, ne na sekciji.
 */
export default function Steps({ c }: { c: SiteContent }) {
  const root = useRef<HTMLDivElement>(null)
  const article = c.contract.articles[0]

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()

    const build = (y: number) => () => {
      const ctx = gsap.context(() => {
        revealIn(el.querySelectorAll('[data-head]'), { trigger: el, stagger: 0.07, y })

        gsap.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
          revealIn(row, { trigger: row, y })
          const title = row.querySelector('[data-write]')
          if (title) writeIn(title, { trigger: row })
          // Kvacica ide zamalo iza upisa, kao da ju je ista ruka povukla.
          tickBox(row, 0.28)
        })

        const stamp = el.querySelector('[data-stamp-zone]')
        if (stamp) stampIn(stamp)
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, build(20))
    mm.add(MQ.mobile, build(12))
    return () => mm.revert()
  }, [])

  return (
    <Sheet id="koraci" page={2} of={6} tilt={-0.5} offset={1.25} pageLabel={c.contract.pageLabel}>
      <div ref={root} className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <header data-head className="border-b border-edge pb-5">
          <p className="label mb-3">
            {c.contract.articleLabel} {article.no}
          </p>
          <h2 className="doc-lg text-[clamp(1.5rem,3.4vw,2.6rem)] text-ink">{article.title}</h2>
        </header>

        <p data-head className="margin-note mt-6 max-w-[46ch] sm:-rotate-[0.4deg]">
          {c.steps.lead}
        </p>

        <ol className="mt-12 border-t border-edge">
          {c.steps.items.map((step, i) => (
            <li
              key={step.title}
              data-row
              className="grid grid-cols-[auto_1fr] items-start gap-x-4 border-b border-edge py-7 sm:grid-cols-[auto_3.5rem_1fr] sm:gap-x-6 sm:py-8"
            >
              <Checkbox className="mt-0.5" />

              {/* Broj stavke unutar clanka: 1.1, 1.2 ... */}
              <span className="spec tnum col-start-2 row-start-1 hidden pt-1 text-ink sm:block">
                {article.no}
                {i + 1}
              </span>

              <div className="col-start-2 row-start-1 sm:col-start-3">
                <h3 className="doc-md flex flex-wrap items-baseline gap-x-4 text-lg text-ink sm:text-2xl">
                  <span data-write className="inline-block">
                    {step.title}
                  </span>
                  {/* Dopisano uz samu stavku, ne na drugom kraju lista. Prije
                      je stajalo u zasebnom stupcu na 1100px od naslova koji
                      opisuje, pa se nije citalo kao biljeska uz njega. */}
                  {step.yours && (
                    <span className="margin-note -rotate-[3deg] whitespace-nowrap">
                      {c.steps.yours}
                    </span>
                  )}
                </h3>
                {step.note && (
                  <p className="mt-2.5 max-w-[54ch] text-sm leading-relaxed text-ink-2 sm:text-base">
                    {step.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Zig. Ne centriran: peckat se ne udara po sredini crte. */}
        <div data-stamp-zone className="mt-16 flex justify-center pb-2 sm:mt-20 sm:justify-end sm:pr-16">
          <div className="relative">
            <span
              data-bleed
              aria-hidden="true"
              className="absolute -inset-3 bg-signal/25 opacity-[0.32] blur-[6px]"
            />
            <p
              data-stamp
              className="doc-lg relative border-[3px] border-signal px-6 py-3 text-signal"
              style={{ fontSize: 'clamp(1.4rem,3.2vw,2.2rem)', letterSpacing: '0.05em' }}
            >
              {c.stamp.text}
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  )
}
