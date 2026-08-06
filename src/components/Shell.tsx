import type { ReactNode } from 'react'
import SmoothScroll from './SmoothScroll'
import { fontClass } from '@/lib/fonts'

/**
 * Zajednicki root layout za oba jezika. HR i EN imaju vlastite root layoute
 * (dvije route grupe) samo zato da <html lang> bude ispravan, sve ostalo je
 * ovdje na jednom mjestu.
 *
 * Zrno je maknuto s ovog mjesta. Bilo je `position: fixed` preko cijelog
 * ekrana, sto je znacilo da i stol ima zrno papira. Sada ga nosi svaki list
 * zasebno, kroz `Sheet`.
 */
export default function Shell({ lang, children }: { lang: 'hr' | 'en'; children: ReactNode }) {
  return (
    <html lang={lang} className={fontClass}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
