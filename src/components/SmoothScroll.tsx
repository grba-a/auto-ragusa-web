'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { carbonLag, gsap, MQ, ScrollTrigger } from '@/lib/gsap'

declare global {
  interface Window {
    /** Samo u devu, za vizualnu provjeru kroz scripts/shots.mjs. */
    __lenis?: Lenis
  }
}

/**
 * Lenis vozi scroll, GSAP ticker vozi Lenis, ScrollTrigger se azurira iz
 * Lenisovog scroll eventa. Bez tog spoja pinnane sekcije kaskaju za scrollom.
 *
 * Ovdje se vozi i karbon kopija, jer je Lenisova `velocity` jedini izvor
 * brzine scrolla, a offset kopije je funkcija brzine a ne pozicije.
 *
 * Pod prefers-reduced-motion Lenis se ne pali uopce: native scroll je tada
 * ispravno ponasanje, ne degradacija.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia(MQ.reduced).matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      // Touch uredaji imaju vlastiti momentum, dupli smoothing se bori s njim.
      syncTouch: false,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    if (process.env.NODE_ENV !== 'production') {
      window.__lenis = lenis
    }

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Karbon samo na desktopu. Na mobitelu titra na 60Hz.
    const mm = gsap.matchMedia()
    mm.add(MQ.desktop, () => {
      const stop = carbonLag((fn) => {
        const handler = ({ velocity }: { velocity: number }) => fn(velocity)
        lenis.on('scroll', handler)
        return () => lenis.off('scroll', handler)
      })

      return () => {
        stop()
        gsap.set('[data-carbon]', { clearProps: 'x,y' })
      }
    })

    // Anchor linkovi moraju ici kroz Lenis, inace native jump preskoci
    // ScrollTrigger poziciju.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -64 })
    }
    document.addEventListener('click', onClick)

    // Slike i fontovi mijenjaju visinu dokumenta pa se izracunate scroll
    // pozicije pomaknu.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    document.fonts?.ready.then(onLoad)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', onLoad)
      mm.revert()
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])

  return null
}
