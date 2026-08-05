import type { ReactNode } from 'react'
import SmoothScroll from './SmoothScroll'
import { fontClass } from '@/lib/fonts'

/**
 * Zajednicki root layout za oba jezika. HR i EN imaju vlastite root layoute
 * (dvije route grupe) samo zato da <html lang> bude ispravan, sve ostalo je
 * ovdje na jednom mjestu.
 */
export default function Shell({ lang, children }: { lang: 'hr' | 'en'; children: ReactNode }) {
  return (
    <html lang={lang} className={fontClass}>
      <body>
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
