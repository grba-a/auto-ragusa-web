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

      {/* Mobilni meni je LIST PAPIRA koji ulijece s lijeva, a na njemu je
          SADRZAJ UGOVORA.
          Visestranicni ugovor ima kazalo: oznaka clanka, puni naslov, tockasta
          vodilica i broj stranice. Prije je ovo bila jedina povrsina na cijeloj
          stranici bez ijednog elementa jezika dokumenta - obicna tamna ploha s
          cetiri gole rijeci koje se nisu podudarale ni s naslovima listova na
          koje vode.

          NE ide preko cijelog ekrana. Desni rub ostaje otvoren da se vidi stol
          ispod: list koji pokriva svaki piksel prestaje biti list i postaje
          zaslon. Zato ima i sjenu u dva sloja, istu kao ostali listovi.

          Podloga je papir, ne karbon: kazalo je dio dokumenta, a karbon je
          rezerviran za jedan list, onaj s potpisom. */}

      {/* Stol iza lista. Klik po njemu zatvara, kao odlaganje papira. */}
      <button
        type="button"
        aria-label={c.nav.close}
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[55] bg-desk/70 transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        className={`sheet-paper fixed inset-y-0 left-0 z-60 w-[min(23rem,88vw)] transition-transform duration-[350ms] ease-[var(--ease-out-strong)] lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        {/* Rupice sada imaju pravu marginu u kojoj stoje: sadrzaj je odmaknut
            `pl-11`, pa se citaju kao trag uveza a ne kao zaostale tocke. Preko
            cijelog ekrana to nije bilo moguce. */}
        <span className="punch top-[22%]" aria-hidden="true" />
        <span className="punch top-[70%]" aria-hidden="true" />

        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between pr-4 pl-11">
            <Wordmark height={28} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.nav.close}
              className="-mr-2 flex size-11 items-center justify-center text-ink"
            >
              <X size={21} weight="bold" aria-hidden="true" />
            </button>
          </div>

          {/* `overflow-y-auto`: na niskim ekranima sest redaka s dugim naslovima
              (engleski "Acceptance and signature" se lomi u tri reda na 320px)
              inace izlazi izvan kadra bez nacina da se dode do njih. */}
          <nav className="flex flex-1 flex-col justify-center overflow-y-auto pr-5 pl-11">
            <p className="label mb-5 border-b border-edge pb-3">{c.contract.indexLabel}</p>

            {c.contract.index.map((row) => (
              <a
                key={row.href}
                href={row.href}
                onClick={() => setOpen(false)}
                className="grid grid-cols-[2.75rem_auto_1fr_auto] items-baseline gap-x-2 border-b border-edge py-3.5"
              >
                {/* Prazno na listovima koji nisu clanak (naslovnica, prilozi).
                    `nowrap`: bez toga se "Cl. 1." lomi u dva reda i udvostruci
                    visinu retka. */}
                <span className="spec tnum whitespace-nowrap text-ink">
                  {row.article ? `Čl. ${row.article}` : ''}
                </span>
                {/* Uvijek 16px: panel je ogranicen na 23rem bez obzira na sirinu
                    ekrana, pa bi `min-[420px]:text-lg` samo lomio naslove na
                    vecim telefonima gdje panel nije nista siri. */}
                <span className="doc-md text-base text-ink">{row.title}</span>
                <span className="leader" aria-hidden="true">
                  &#8203;
                </span>
                <span className="page-mark tnum">
                  {c.contract.pageLabel} {row.page}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pr-5 pb-8 pl-11">
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
              className="tnum flex items-center justify-center gap-2 py-3 text-sm text-ink-2"
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
