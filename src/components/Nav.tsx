'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { List, X, Phone } from '@phosphor-icons/react/dist/ssr'
import Wordmark from './Wordmark'
import { ButtonLink } from './ui/Button'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

/**
 * Traka dokumenta: uska papirnata traka koja lezi na vrhu snopa, kao naljepnica
 * na hrptu registratora.
 *
 * UVIJEK je papir, i to nije ukras nego nuznost. Prije je u mirovanju bila
 * prozirna s tamnim tekstom, sto je radilo dok je cijela stranica bila papir.
 * Otkad listovi leze na tamnom stolu, prozirna traka znaci tamni tekst na
 * tamnoj plohi. Sjena se pojavi tek kad se odlijepimo od vrha.
 */
export default function Nav({ c }: { c: SiteContent }) {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // IntersectionObserver na sentinelu, ne scroll listener: scroll handler se
    // izvrsava svaki frame i tjera layout thrash.
    const sentinel = document.getElementById('nav-sentinel')
    if (!sentinel) return
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      rootMargin: '-8px 0px 0px 0px',
    })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('lenis-stopped')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <div id="nav-sentinel" aria-hidden="true" className="absolute top-0 h-2 w-full" />

      <header
        className={`sheet fixed inset-x-0 top-0 z-50 border-b border-edge transition-shadow duration-300 ${
          stuck ? 'shadow-[0_10px_24px_-14px_rgb(0_0_0/0.55)]' : ''
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link href={c.base || '/'} className="hover-lift shrink-0" aria-label={site.name}>
            <Wordmark height={30} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label={c.nav.cta}>
            {c.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={site.tel.landline.href}
              className="tnum hidden text-sm text-ink transition-colors duration-200 hover:text-signal sm:block"
            >
              {site.tel.landline.label}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={c.nav.menu}
              className="-mr-2 flex size-11 items-center justify-center text-ink lg:hidden"
            >
              <List size={21} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobilni meni. Skala pocinje od 0.98, ne od 0: nista u stvarnom svijetu
          ne nastaje iz nicega. */}
      <div
        className={`sheet-carbon fixed inset-0 z-60 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] lg:hidden ${
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-[0.98] opacity-0'
        }`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <Wordmark tone="light" height={30} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.nav.close}
              className="-mr-2 flex size-11 items-center justify-center text-white"
            >
              <X size={21} weight="bold" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-5 sm:px-8">
            {c.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/15 py-5"
              >
                <span className="doc-md text-2xl text-white">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 px-5 pb-10 sm:px-8">
            <ButtonLink
              href="#nalog"
              variant="signal"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              {c.nav.cta}
            </ButtonLink>
            <a
              href={site.tel.landline.href}
              className="tnum flex items-center justify-center gap-2 py-3 text-sm text-white/70"
            >
              <Phone size={13} weight="bold" aria-hidden="true" />
              {site.tel.landline.label}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
