'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// registerPlugin je idempotentan, pa visestruki import modula nije problem.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const EASE = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  outStrong: 'cubic-bezier(0.23, 1, 0.32, 1)',
} as const

gsap.registerEase('outExpo', (p) => 1 - Math.pow(1 - p, 4.4))

/** Pin, parallax, karbon i zig idu samo na desktop bez reduced motion. */
export const MQ = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const

/** Standardni reveal na ulazu u viewport. */
export function revealIn(
  targets: gsap.TweenTarget,
  opts: { trigger?: Element; stagger?: number; y?: number; delay?: number } = {}
) {
  const { trigger, stagger = 0.06, y = 22, delay = 0 } = opts
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'outExpo',
    stagger,
    scrollTrigger: trigger ? { trigger, start: 'top 84%', once: true } : undefined,
  })
}

/** clip-path reveal fotke, otkriva se od dna prema gore. */
export function clipReveal(target: gsap.TweenTarget, trigger: Element, delay = 0) {
  return gsap.fromTo(
    target,
    { clipPath: 'inset(0% 0% 100% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      delay,
      ease: 'outExpo',
      scrollTrigger: { trigger, start: 'top 82%', once: true },
    }
  )
}

/** Lagani parallax na unutrasnjoj slici. Samo transform. */
export function imageParallax(target: gsap.TweenTarget, trigger: Element, amount = 7) {
  return gsap.fromTo(
    target,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  )
}

/**
 * Karbon kopija koja kasni. Offset svih ghost slojeva vozi BRZINA scrolla, ne
 * pozicija: skrolate brzo i kopija se odvoji do 5px pa se raspozna kao drugi
 * list, stanete i uleti u registar.
 *
 * Jedan `quickTo` po osi za cijeli sloj, ne po elementu, inace se pravi po
 * jedan tween na svaki naslov na stranici.
 */
export function carbonLag(onScroll: (fn: (v: number) => void) => () => void) {
  const setY = gsap.quickTo('[data-carbon]', 'y', { duration: 0.26, ease: 'power3.out' })
  const setX = gsap.quickTo('[data-carbon]', 'x', { duration: 0.26, ease: 'power3.out' })

  return onScroll((velocity) => {
    const v = gsap.utils.clamp(-5, 5, velocity * 0.06)
    setY(v)
    setX(v * 0.4)
  })
}

/**
 * Zig ODOBRENO. Padne s rotacijom i prebacajem, tinta se razlije, i ISTOVREMENO
 * se kvacice u redovima iznad zacrtaju. Od te tocke dalje polja u dokumentu su
 * ispunjena, prije nje su prazna.
 *
 * Kvacica je SVG path sa strokeDasharray = duzina puta, pa ne treba DrawSVG.
 */
export function stampIn(root: Element) {
  const ticks = root.ownerDocument.querySelectorAll<SVGPathElement>('[data-tick]')
  ticks.forEach((path) => {
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
  })

  return gsap
    .timeline({
      scrollTrigger: { trigger: root, start: 'top 72%', once: true },
    })
    .set('[data-stamp]', { transformOrigin: '52% 58%' })
    .fromTo(
      '[data-stamp]',
      { scale: 1.9, rotate: -13, opacity: 0 },
      { scale: 1, rotate: -6.5, opacity: 1, duration: 0.42, ease: 'expo.out' }
    )
    .to('[data-stamp]', { scale: 0.985, duration: 0.09, ease: 'power2.inOut' })
    .to('[data-stamp]', { scale: 1, duration: 0.14 })
    .fromTo('[data-bleed]', { opacity: 0 }, { opacity: 0.32, duration: 0.5 }, 0.2)
    .to(ticks, { strokeDashoffset: 0, stagger: 0.07, duration: 0.24, ease: 'power2.out' }, 0.15)
}

/**
 * Upis vrijednosti u polje naloga. Nalog se sam ispunjava dok skrolas: tekst
 * se otkriva slijeva nadesno kao da ga netko upisuje.
 *
 * clip-path radi samo na kompozitoru, nula layouta. Pod reduced motion CSS ga
 * gasi (`[data-write] { clip-path: none }`) pa vrijednost stoji odmah, a ne
 * ostaje prazno polje.
 */
export function writeIn(
  targets: gsap.TweenTarget,
  opts: { trigger?: Element; stagger?: number; delay?: number } = {}
) {
  const { trigger, stagger = 0.06, delay = 0 } = opts
  return gsap.fromTo(
    targets,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.5,
      delay,
      ease: 'none',
      stagger,
      scrollTrigger: trigger ? { trigger, start: 'top 85%', once: true } : undefined,
    }
  )
}

export { gsap, ScrollTrigger }
