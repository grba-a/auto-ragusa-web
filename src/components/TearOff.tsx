'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Phone } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

/**
 * Odrezak uz donji rub obrasca. Onaj perforirani dio koji se otrgne i zadrzi.
 *
 * Postoji zato sto ispod 640px broj telefona nije nigdje vidljiv: u traci je
 * `hidden ... sm:block` (Nav.tsx), pa je jedini put do poziva hamburger meni ili
 * dno sestog lista. Vecina upita lokalnom servisu su pozivi, a ne forme.
 *
 * Tekst gumba je `order.ctaSecondary`, string koji je vec postojao u sadrzaju na
 * oba jezika ali se nigdje nije renderirao.
 *
 * Ponasanje:
 *  - pojavi se tek kad prvi list napusti kadar, da ne pokriva naslovnicu
 *  - nestane kad forma ude u kadar, da ne pokriva ono na sto gura
 *  - ostaje skriven do kraja dokumenta, pa ne prekriva kontakt ni podnozje
 *
 * Oba `IntersectionObserver`a prate elemente koji vec postoje (`#nalog` je
 * peti list), isti obrazac koji `Nav` koristi za `#nav-sentinel`. Scroll
 * listener bi se izvrsavao svaki frame i tjerao layout thrash.
 */
export default function TearOff({ c }: { c: SiteContent }) {
  const [pastHero, setPastHero] = useState(false)
  const [atForm, setAtForm] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('main > *:first-child')
    const form = document.getElementById('nalog')
    if (!hero || !form) return

    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), {
      rootMargin: '-40% 0px 0px 0px',
    })

    // Zasun, ne prekidac: kad se jednom dode do forme, odrezak vise ne izlazi.
    // Bez toga bi se vratio na sestom listu i pokrio kontakt podatke, koji ionako
    // sadrze isti broj telefona.
    const formIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setAtForm(true)
      },
      { rootMargin: '0px 0px -25% 0px' }
    )

    heroIo.observe(hero)
    formIo.observe(form)
    return () => {
      heroIo.disconnect()
      formIo.disconnect()
    }
  }, [])

  const shown = pastHero && !atForm

  return (
    <div
      className={`sheet fixed inset-x-0 bottom-0 z-40 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] sm:hidden ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      // Van toka dok je skriven: inace tabom dolazis do gumba koji se ne vidi.
      inert={!shown || undefined}
    >
      {/* Linija reza */}
      <span className="perforation absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />

      <div className="flex items-stretch gap-3 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <a
          href={site.tel.landline.href}
          className="label flex flex-1 items-center justify-center gap-2 border border-edge py-3.5 text-ink"
        >
          <Phone size={13} weight="bold" aria-hidden="true" />
          {c.order.ctaSecondary}
        </a>
        <a
          href="#nalog"
          className="label flex flex-1 items-center justify-center gap-2 bg-signal py-3.5 text-white"
        >
          {c.order.ctaPrimary}
          <ArrowRight size={13} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
