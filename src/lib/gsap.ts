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
 * Rucni potez u SVG-u: crta se sam, preko strokeDasharray = duzina puta.
 * Nije potreban DrawSVG plugin.
 */
function strokeIn(paths: SVGPathElement[]) {
  paths.forEach((path) => {
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
  })
}

/**
 * Kucica se kvaci rukom kad njezin redak ude u kadar.
 *
 * Prije su se SVE kvacice na stranici crtale odjednom, kad padne zig, i to
 * preko upita nad cijelim dokumentom. Znacilo je da su stavke ispod preloma
 * bile odkvacene prije nego ih je itko procitao. Kvacica sada pripada svom
 * retku, kao na papiru.
 *
 * Dva poteza X-a se crtaju jedan za drugim, ne istovremeno: ruka ne povlaci
 * obje crte odjednom.
 */
export function tickBox(row: Element, delay = 0) {
  const marks = [...row.querySelectorAll<SVGPathElement>('[data-mark]')]
  if (!marks.length) return null

  strokeIn(marks)

  return gsap.to(marks, {
    strokeDashoffset: 0,
    duration: 0.22,
    delay,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: row, start: 'top 85%', once: true },
  })
}

/**
 * Potpis se ispisuje kao jedan potez pera.
 *
 * Sporije od kvacice i s `power1.inOut`, jer potpis nije oznaka nego gesta.
 */
export function drawSignature(root: Element) {
  const paths = [...root.querySelectorAll<SVGPathElement>('[data-sign]')]
  if (!paths.length) return null

  strokeIn(paths)

  return gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 1.1,
    stagger: 0.18,
    ease: 'power1.inOut',
    scrollTrigger: { trigger: root, start: 'top 80%', once: true },
  })
}

/**
 * Zig ODOBRENO. Padne s rotacijom i prebacajem, tinta se razlije.
 *
 * Okida na SEBI, ne na sekciji. Prije je okidao na vrhu sekcije s
 * `start: 'top 72%'`, pa je zig padao prije nego sto je itko procitao ijednu
 * stavku koju odobrava. Sada je zadnji potez na listu, kako i treba biti.
 *
 * Pocetno stanje postavlja `gsap.set` ovdje, a NE inline `style` u JSX-u.
 * Inline `opacity: 0` je cekao GSAP koji se pod `prefers-reduced-motion:
 * reduce` nikad ne pokrene, pa je zig - jedini figurativni trenutak cijelog
 * koncepta - bio trajno nevidljiv tim korisnicima. Ovako element bez JS-a
 * ostaje vidljiv, a `useLayoutEffect` ga sakrije prije prvog paint-a.
 */
export function stampIn(stamp: Element) {
  gsap.set('[data-stamp]', { opacity: 0, transformOrigin: '52% 58%' })
  gsap.set('[data-bleed]', { opacity: 0 })

  return gsap
    .timeline({
      scrollTrigger: { trigger: stamp, start: 'top 88%', once: true },
    })
    .fromTo(
      '[data-stamp]',
      { scale: 1.9, rotate: -13, opacity: 0 },
      { scale: 1, rotate: -6.5, opacity: 1, duration: 0.42, ease: 'expo.out' }
    )
    .to('[data-stamp]', { scale: 0.985, duration: 0.09, ease: 'power2.inOut' })
    .to('[data-stamp]', { scale: 1, duration: 0.14 })
    .fromTo('[data-bleed]', { opacity: 0 }, { opacity: 0.32, duration: 0.5 }, 0.2)
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
      // Zavrsna vrijednost je -0.18em, ne 0%. Rukopisna pisma imaju privjes
      // zadnjeg slova izvan okvira retka, a `inset(0 0% 0 0)` rezao bi tocno
      // na rubu okvira i skratio rep zadnjeg slova. Na monu je bezopasno.
      clipPath: 'inset(0 -0.18em 0 0)',
      duration: 0.5,
      delay,
      ease: 'none',
      stagger,
      scrollTrigger: trigger ? { trigger, start: 'top 85%', once: true } : undefined,
    }
  )
}

export { gsap, ScrollTrigger }
