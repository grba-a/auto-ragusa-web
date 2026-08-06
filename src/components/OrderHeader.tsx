'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { ButtonLink } from './ui/Button'
import Clip from './ui/Clip'
import SplitLines from './ui/SplitLines'
import Sheet from './Sheet'
import OpenState from './OpenState'
import { gsap, MQ, writeIn } from '@/lib/gsap'
import { media } from '@/lib/media'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

/**
 * List 1 - naslovnica ugovora.
 *
 * Redoslijed je onaj s pravog ugovora: naslov, broj i datum, ugovorne strane,
 * pa tek onda predmet. Sve sto je otisnuto stoji u monu i crnom; sve sto je
 * netko rukom upisao stoji u Caveatu i plavoj kemijskoj.
 *
 * NARUCITELJ je namjerno prazan i ispisuje se kao "vase ime". To je jedini
 * trenutak na stranici gdje se posjetitelj vidi u dokumentu, i cijeli koncept
 * "ugovor koji treba popuniti" stoji ili pada na toj jednoj crti.
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
          // Sve rukom upisano se ispisuje na kraju, kao da netko sjeda i
          // popunjava obrazac koji je vec bio otisnut.
          .add(writeIn('[data-write]', { stagger: 0.07 }), '-=0.2')
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, build(0.055))
    mm.add(MQ.mobile, build(0.04))
    return () => mm.revert()
  }, [])

  return (
    <Sheet page={1} of={6} tilt={0.35} offset={-0.75} pageLabel={c.contract.pageLabel}>
      <div ref={root as React.RefObject<HTMLDivElement>} className="px-5 pt-16 pb-20 sm:px-10 sm:pt-20 lg:px-16 lg:pb-24">
        {/* Zaglavlje dokumenta */}
        <div data-strip className="flex flex-wrap items-start justify-between gap-6 border-b border-edge pb-6">
          <div>
            {/* Naslov dokumenta, ali NE `h1`. `h1` ostaje na poruci ("Vi
                predate kljuc"), jer nju ljudi traze, a ne rijec "ugovor". */}
            <p className="doc-lg text-[clamp(1.15rem,2.4vw,1.9rem)] text-ink">
              {c.contract.title}
            </p>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <p className="flex items-baseline gap-2">
                <span className="label">{c.contract.noLabel}</span>
                <span className="hand" data-write>
                  {c.order.no}
                </span>
              </p>
              <p className="flex items-baseline gap-2">
                <span className="label">{c.contract.dateLabel}</span>
                <span className="write-rule inline-block w-24" aria-hidden="true" />
              </p>
            </div>
          </div>

          <OpenState c={c} />
        </div>

        {/* Ugovorne strane */}
        <dl className="mt-8 grid gap-6 border-b border-edge pb-8 sm:grid-cols-2 sm:gap-12">
          <div>
            <dt className="label mb-2">{c.contract.contractorLabel}</dt>
            <dd className="doc-md text-lg text-ink">
              {site.name}
              <span className="mt-1 block text-sm font-normal tracking-normal text-ink-2">
                {site.address.street}, {site.address.city}
              </span>
            </dd>
          </div>
          <div>
            <dt className="label mb-2">{c.contract.clientLabel}</dt>
            {/* Jedina prazna crta na cijelom listu. Namjerno. */}
            <dd className="write-rule pb-1">
              <span data-write className="hand inline-block opacity-55">
                {c.contract.clientBlank}
              </span>
            </dd>
          </div>
        </dl>

        {/* Predmet ugovora */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div>
            <h1 className="doc-xl relative text-[clamp(1.8rem,4vw,3.6rem)] text-ink">
              {/* Ghost nosi identican markup, inace se dvije verzije lome na
                  razlicitim mjestima i kopija odleti u stranu. */}
              <span data-carbon aria-hidden="true" className="carbon-ghost">
                <SplitLines lines={c.order.headline} />
              </span>
              <span className="relative block">
                <SplitLines lines={c.order.headline} animate />
              </span>
            </h1>

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

          {/* Prilog A, prikvacen spajalicom uz gornji rub. */}
          <figure data-attach className="relative w-full">
            <Clip className="absolute -top-7 left-6 z-10 -rotate-6" />
            <div className="relative aspect-3/2 overflow-hidden border border-edge bg-white">
              <Image
                src={media.hero}
                alt={c.order.heroAlt}
                fill
                priority
                sizes="(max-width: 1023px) 88vw, 42vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline gap-3">
              <span className="label">
                {c.contract.attachmentPrefix} A
              </span>
              <span className="margin-note">{c.order.heroCaption}</span>
            </figcaption>
          </figure>
        </div>

        {/* Kljucni uvjeti. Sest argumenata u jednom pogledu, sve upisano rukom. */}
        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-edge pt-8 sm:grid-cols-3 lg:grid-cols-6">
          {c.order.fields.map((f) => (
            <div key={f.label}>
              <dt data-field-label className="label">
                {f.label}
              </dt>
              <dd className="write-rule mt-2 pb-0.5">
                <span data-write className="hand inline-block">
                  {f.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Sheet>
  )
}
