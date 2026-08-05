'use client'

import { useEffect, useState } from 'react'
import { openState } from '@/lib/site'
import type { SiteContent } from '@/content/types'

/**
 * Zivo stanje "otvoreno / zatvoreno sada". Servis se bira po tome je li otvoren
 * sada, ne po linku "O nama", pa ovo stoji u zaglavlju dokumenta.
 *
 * Racuna se na klijentu nakon montiranja: staticki HTML se cachira, pa bi
 * izracun na serveru zamrznuo pogresan sat. Do tada se ne renderira nista, da
 * ne bljesne pogresna vrijednost.
 */
export default function OpenState({
  c,
  tone = 'ink',
}: {
  c: SiteContent
  tone?: 'ink' | 'light'
}) {
  const [state, setState] = useState<{ open: boolean; nextChange: string } | null>(null)

  useEffect(() => {
    const tick = () => setState(openState(new Date()))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  if (!state) return <span className="label tnum" aria-hidden="true" />

  const dim = tone === 'ink' ? 'text-ink-2' : 'text-ink-dim'

  return (
    <p className="label tnum flex items-center gap-2 whitespace-nowrap">
      <span
        aria-hidden="true"
        className={`size-2 ${state.open ? 'bg-signal' : 'bg-edge'}`}
      />
      <span className={state.open ? 'text-signal' : dim}>
        {state.open
          ? `${c.hours.openNow} ${c.hours.untilLabel} ${state.nextChange}`
          : `${c.hours.closedNow}, ${c.hours.opensLabel} ${state.nextChange}`}
      </span>
    </p>
  )
}
