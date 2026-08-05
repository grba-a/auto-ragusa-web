'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { ButtonLink } from './ui/Button'
import SplitLines from './ui/SplitLines'
import OpenState from './OpenState'
import { gsap, MQ, writeIn } from '@/lib/gsap'
import { media } from '@/lib/media'
import type { SiteContent } from '@/content/types'

/**
 * Zaglavlje naloga.
 *
 * Lead odlomak je maknut: traka od sest polja ispod njega govorila je isto,
 * samo bolje. Sest argumenata, nijedna recenica.
 *
 * Vrijednosti polja krecu prazne, na crtkanoj liniji za upis, i upisuju se na
 * load. Nalog se doslovno ispunjava dok ga citate.
 */
export default function OrderHeader({ c }: { c: SiteContent }) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const mm = gsap.matchMedia()

    const build = (stagger: number) => () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: 'outExpo' } })
          .from('[data-strip]', { opacity: 0, duration: 0.5 })
          .from('[data-word]', { yPercent: 112, duration: 0.9, stagger })
          .from('[data-cta]', { opacity: 0, y: 12, duration: 0.6 }, '-=0.45')
          .from('[data-attach]', { opacity: 0, y: 14, duration: 0.8 }, 0.35)
          .from('[data-field-label]', { opacity: 0, duration: 0.4, stagger: 0.05 }, '-=0.5')
          .add(writeIn('[data-write]', { stagger: 0.07 }), '-=0.2')
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, build(0.055))
    mm.add(MQ.mobile, build(0.04))
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="sheet flex min-h-[100dvh] flex-col">
      {/* Zivo stanje stoji desno gore, gdje je i bilo. Bez trake i bez linije
          ispod: servis se bira po tome je li otvoren sada, i to je jedini
          podatak kojem treba to mjesto. */}
      <div data-strip className="flex justify-end px-5 pt-24 sm:px-8 lg:px-12 lg:pt-28">
        <OpenState c={c} />
      </div>

      <div className="flex flex-1 items-center px-5 pt-8 pb-12 sm:px-8 lg:px-12 lg:pt-10 lg:pb-14">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <h1 className="doc-xl relative text-[clamp(1.9rem,4.2vw,4rem)] text-ink">
              {/* Ghost nosi identican markup, inace se dvije verzije lome na
                  razlicitim mjestima i kopija odleti u stranu. */}
              <span data-carbon aria-hidden="true" className="carbon-ghost">
                <SplitLines lines={c.order.headline} />
              </span>
              <span className="relative block">
                <SplitLines lines={c.order.headline} animate />
              </span>
            </h1>

            {/* Samo primarni CTA. Broj telefona stoji dvadeset piksela iznad, u
                traci, pa ga sekundarna tipka samo ponavljala. */}
            <div data-cta className="mt-10">
              <ButtonLink href="#nalog" variant="signal" className="group">
                {c.order.ctaPrimary}
                <ArrowRight
                  size={15}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:translate-x-1"
                />
              </ButtonLink>
            </div>
          </div>

          {/* Prilog uz zaglavlje. Bez rotacije i bez trake: na 390px nakosen
              element se ne cita kao montiran nego kao neporavnat. */}
          <figure data-attach className="w-full">
            <div className="border border-edge bg-white p-2">
              <div className="relative aspect-3/2 overflow-hidden">
                <Image
                  src={media.hero}
                  alt={c.order.heroAlt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 92vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <figcaption className="label mt-3">{c.order.heroCaption}</figcaption>
          </figure>
        </div>
      </div>

      {/* Traka polja. Sest argumenata u jednom pogledu, i najbolji blok na
          stranici. Sve sto je drugdje izbaceno vec postoji ovdje, krace. */}
      <dl className="grid grid-cols-2 border-t border-edge sm:grid-cols-3 lg:grid-cols-6">
        {c.order.fields.map((f) => (
          <div
            key={f.label}
            className="border-r border-b border-edge px-5 py-6 last:border-r-0 sm:px-6 lg:border-b-0"
          >
            <dt data-field-label className="label">
              {f.label}
            </dt>
            <dd className="write-rule mt-3 pb-1">
              <span data-write className="doc-md inline-block text-base text-ink sm:text-lg">
                {f.value}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
