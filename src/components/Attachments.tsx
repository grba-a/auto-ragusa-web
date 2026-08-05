'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import DocTitle from './ui/DocTitle'
import { clipReveal, gsap, MQ, revealIn } from '@/lib/gsap'
import { media } from '@/lib/media'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

/**
 * Prilozi nalogu.
 *
 * Lead je maknut: govorio je istu recenicu kao korak 04, a blok ispod njega ima
 * plocu sa sluzbenim logotipima koja to pokazuje bolje nego bilo koja recenica.
 *
 * Van su i rotacije i trake. Na 390px nakoseni prilozi su virili izvan stupca i
 * citali se kao neporavnati elementi, a ne kao montirani dokumenti. Ravno je
 * mirnije i na desktopu.
 *
 * Ploca je NJIHOVA fotografija sa sluzbenim Peugeot i Citroen znakovima. To je
 * jedini nacin da ti logotipi budu na stranici: rekonstruirati ih kao vektor bi
 * prekrsilo njihova brand pravila.
 */
export default function Attachments({ c }: { c: SiteContent }) {
  const root = useRef<HTMLElement>(null)

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
    <section ref={root} id="prilozi" className="sheet py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <DocTitle as="h2" data-head className="doc-lg text-[clamp(1.7rem,4vw,3rem)] text-ink">
          {c.attachments.heading}
        </DocTitle>

        <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
          {/* Ploca je 700px original, pa stoji u svojoj sirini. Razvucena preko
              cijelog pojasa rezala je natpis i logotipi su postali mekani. */}
          <figure data-attach className="mx-auto w-full max-w-[40rem] lg:mx-0">
            <div className="border border-edge bg-white p-3">
              <div data-frame className="relative aspect-5/3 overflow-hidden">
                <Image
                  src={media.plaketa}
                  alt={c.attachments.plaqueAlt}
                  fill
                  sizes="(max-width: 1023px) 92vw, 40rem"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="label mt-4 text-ink">{c.attachments.plaqueCaption}</figcaption>
          </figure>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
            {c.attachments.items.map((item, i) => (
              <figure key={item.caption} data-attach className={i % 2 === 1 ? 'sm:mt-12' : ''}>
                <div className="border border-edge bg-white p-2">
                  <div data-frame className="relative aspect-3/2 overflow-hidden">
                    <Image
                      src={media.attachments[i]}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 639px) 92vw, 22rem"
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className="label mt-3">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Tipografska poanta bloka. Dobiva prostor umjesto da bude stisnuta
            uz liniju. */}
        <div className="mt-28 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-edge pt-14 md:mt-36">
          {site.authorizedBrands.map((brand) => (
            <p key={brand} className="doc-lg text-2xl text-ink sm:text-4xl">
              {brand}
            </p>
          ))}
          <p className="label ml-auto">{c.attachments.allLabel}</p>
        </div>
      </div>
    </section>
  )
}
