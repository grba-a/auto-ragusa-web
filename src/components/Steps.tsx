'use client'

import { useLayoutEffect, useRef } from 'react'
import DocTitle from './ui/DocTitle'
import { gsap, MQ, revealIn, stampIn, writeIn } from '@/lib/gsap'
import type { SiteContent } from '@/content/types'

/**
 * Pet koraka kao tabela naloga.
 *
 * Izbaceno u odnosu na prvu izvedbu koncepta:
 *  - satne oznake 08:15 do 15:40. Obecavale su raspored po minuti koji servis
 *    ne moze drzati, a argument koji su podupirale stoji u leadu iznad.
 *  - zaglavlje tablice KORAK / CIJI / STO SE RADI / OK. Bilo je `aria-hidden`,
 *    sto je sam kod priznavao da ne nosi informaciju.
 *  - kvadratni okviri oko kvacica. Ostaje samo kvacica.
 *  - opisi ispod tri od pet koraka. Naslov ih je vec govorio.
 *
 * Dvije kolone umjesto cetiri, dvostruko zraka po redu.
 */
export default function Steps({ c }: { c: SiteContent }) {
  const root = useRef<HTMLElement>(null)

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
        })
        stampIn(el)
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, build(20))
    mm.add(MQ.mobile, build(12))
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="koraci" className="sheet py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:items-end md:gap-16">
          <DocTitle
            as="h2"
            data-head
            className="doc-lg max-w-[18ch] text-[clamp(1.7rem,4vw,3rem)] text-ink"
          >
            {c.steps.heading}
          </DocTitle>
          <p data-head className="text-base leading-relaxed text-ink-2">
            {c.steps.lead}
          </p>
        </div>

        <ol className="mt-20 border-t border-edge">
          {c.steps.items.map((step, i) => (
            <li
              key={step.title}
              data-row
              className="grid grid-cols-[2.5rem_1fr_1.75rem] items-baseline gap-x-5 border-b border-edge py-8 md:grid-cols-[4rem_5rem_1fr_2rem] md:gap-x-8 md:py-12"
            >
              <span className="label tnum text-ink">{String(i + 1).padStart(2, '0')}</span>

              {/* Oznaka stoji samo na vasa dva koraka. Obiljeziti i ostala tri
                  s "Nas" ne dodaje nista, a trostruko je oznaka na ekranu. */}
              <span className="label text-signal">{step.yours ? c.steps.yours : ''}</span>

              {/* Naslov se upisuje kad red ude u viewport. */}
              <div className="col-span-3 mt-3 md:col-span-1 md:mt-0">
                <h3 className="doc-md text-xl text-ink sm:text-2xl">
                  <span data-write className="inline-block">
                    {step.title}
                  </span>
                </h3>
                {step.note && (
                  <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-2 sm:text-base">
                    {step.note}
                  </p>
                )}
              </div>

              {/* Kvacica bez okvira. Zacrta se kad zig padne, ne prije. */}
              <svg
                viewBox="0 0 24 24"
                className="col-start-3 row-start-1 size-5 justify-self-end md:col-start-4"
                aria-hidden="true"
              >
                <path
                  data-tick
                  d="M3 13 L9 19 L21 5"
                  fill="none"
                  stroke="var(--color-signal)"
                  strokeWidth="2.4"
                  strokeLinecap="square"
                />
              </svg>
            </li>
          ))}
        </ol>

        {/* Zig. Jedini figurativni trenutak na stranici, pa dobiva prostor.
            Tvrdnja je o dokumentu, nikad brojka i nikad ocjena. */}
        <div className="mt-28 flex justify-center pb-8 md:mt-36 md:pb-16">
          <div className="relative">
            <span
              data-bleed
              aria-hidden="true"
              className="absolute -inset-3 bg-signal/25 blur-[6px]"
              style={{ opacity: 0 }}
            />
            <p
              data-stamp
              className="doc-lg relative border-[3px] border-signal px-6 py-3 text-signal"
              style={{
                opacity: 0,
                fontSize: 'clamp(1.5rem,3.6vw,2.4rem)',
                letterSpacing: '0.05em',
              }}
            >
              {c.stamp.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
