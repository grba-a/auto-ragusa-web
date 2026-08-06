'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Clip from './ui/Clip'
import Sheet from './Sheet'
import { clipReveal, gsap, MQ, revealIn } from '@/lib/gsap'
import { media } from '@/lib/media'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

/** Slovo priloga: A je na naslovnici, pa ovdje krecemo od B. */
const LETTERS = ['B', 'C', 'D', 'E'] as const

/** Nagib svakog priloga. Snop fotografija prikvacenih uz list nikad nije ravan. */
const TILT = ['sm:-rotate-[1.1deg]', 'sm:rotate-[0.8deg]', 'sm:-rotate-[0.5deg]', 'sm:rotate-[1.3deg]']

/**
 * List 4 - prilozi ugovoru.
 *
 * Fotografije su prikvacene spajalicom, svaka pod svojim kutom. Nagib ide samo
 * od 640px navise: na 390px nakoseni prilozi vire izvan stupca i citaju se kao
 * neporavnati, ne kao montirani. To se u ovom projektu vec jednom dogodilo.
 *
 * Prica o Ragusi je uselila ovamo kao "Napomena" uz rub lista, rukom. Nije
 * clanak ugovora nego biljeska, i tako i izgleda.
 *
 * Ploca je NJIHOVA fotografija sa sluzbenim Peugeot i Citroen znakovima. To je
 * jedini nacin da ti logotipi budu na stranici: rekonstruirati ih kao vektor bi
 * prekrsilo brand pravila.
 */
export default function Attachments({ c }: { c: SiteContent }) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()

    const build = (y: number, clip: boolean) => () => {
      const ctx = gsap.context(() => {
        revealIn(el.querySelectorAll('[data-head]'), { trigger: el, y })
        gsap.utils.toArray<HTMLElement>('[data-attach]').forEach((fig, i) => {
          revealIn(fig, { trigger: fig, y, delay: (i % 2) * 0.05 })
          const frame = fig.querySelector('[data-frame]')
          if (clip && frame) clipReveal(frame, fig)
        })
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, build(22, true))
    mm.add(MQ.mobile, build(12, false))
    return () => mm.revert()
  }, [])

  return (
    <Sheet id="prilozi" page={4} of={6} tilt={-0.3} offset={0.9} pageLabel={c.contract.pageLabel}>
      <div ref={root} className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <header data-head className="border-b border-edge pb-5">
          <h2 className="doc-lg text-[clamp(1.5rem,3.4vw,2.6rem)] text-ink">
            {c.attachments.heading}
          </h2>
        </header>

        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {c.attachments.items.map((item, i) => (
            <figure
              key={item.caption}
              data-attach
              className={`relative ${TILT[i]} ${i % 2 === 1 ? 'sm:mt-10' : ''}`}
            >
              <Clip className={`absolute -top-7 z-10 ${i % 2 === 0 ? 'left-5 -rotate-8' : 'right-8 rotate-6'}`} />
              <div
                data-frame
                className="relative aspect-3/2 overflow-hidden border border-edge bg-white"
              >
                <Image
                  src={media.attachments[i]}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 88vw, 42vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3">
                <span className="label">
                  {c.contract.attachmentPrefix} {LETTERS[i]}
                </span>
                <span className="margin-note">{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Napomena uz rub. Nije clanak, nego biljeska dopisana rukom. */}
        <div
          data-head
          className="mt-20 grid gap-6 border-t border-edge pt-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16"
        >
          <div>
            {/* Recenica, ne naziv polja: `label` bi je stisnuo na 11px verzal. */}
            <h3 className="doc-md mb-5 text-lg text-ink">{c.story.heading}</h3>
            <dl className="grid grid-cols-3 gap-4 lg:block">
              {c.story.notes.map((note) => (
                <div key={note.label} className="lg:border-b lg:border-edge lg:py-3">
                  <dt className="label mb-1">{note.label}</dt>
                  <dd className="hand tnum text-xl">{note.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="margin-note max-w-[52ch] text-xl leading-relaxed sm:-rotate-[0.3deg]">
            {c.story.body}
          </p>
        </div>

        {/* Marke, i ploca kao njihov dokaz. */}
        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-8 border-t border-edge pt-10">
          {site.authorizedBrands.map((brand) => (
            <p key={brand} className="doc-lg text-2xl text-ink sm:text-4xl">
              {brand}
            </p>
          ))}
          <p className="margin-note">{c.attachments.allLabel}</p>

          <figure data-attach className="relative w-full sm:ml-auto sm:w-auto">
            <Clip className="absolute -top-6 left-4 z-10 -rotate-12 scale-75" />
            <Image
              src={media.plaketa}
              alt={c.attachments.plaqueAlt}
              sizes="208px"
              className="h-auto w-52 border border-edge sm:rotate-[1.4deg]"
            />
            <figcaption className="label mt-2">
              {c.contract.attachmentPrefix} {LETTERS[c.attachments.items.length]}
            </figcaption>
          </figure>
        </div>
      </div>
    </Sheet>
  )
}
