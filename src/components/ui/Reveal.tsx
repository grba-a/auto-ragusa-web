'use client'

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, MQ, revealIn } from '@/lib/gsap'

/**
 * Reveal na ulazu u viewport. Djeca s [data-reveal] se staggeraju; ako ih nema,
 * anima se sam wrapper.
 *
 * Pod reduced motion se ne postavlja nista: elementi su vec u finalnom stanju
 * jer ovdje ne diramo initial CSS, sve ide kroz gsap.from.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  stagger = 0.06,
  y = 26,
  delay = 0,
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  stagger?: number
  y?: number
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    const run = (mobileY: number) => () => {
      const ctx = gsap.context(() => {
        const kids = el.querySelectorAll('[data-reveal]')
        revealIn(kids.length ? kids : el, {
          trigger: el,
          stagger,
          y: mobileY,
          delay,
        })
      }, el)
      return () => ctx.revert()
    }

    mm.add(MQ.desktop, run(y))
    mm.add(MQ.mobile, run(Math.min(y, 16)))
    return () => mm.revert()
  }, [stagger, y, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
