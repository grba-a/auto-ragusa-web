import Image from 'next/image'
import logoInk from '@/assets/img/logo-ink.webp'
import logoLight from '@/assets/img/logo-light.webp'
import { site } from '@/lib/site'

/**
 * Njihov stvarni logo s postojeceg weba: AR monogram plus wordmark u kojem je
 * RAGUSA masniji od AUTO.
 *
 * Dostavljena datoteka je bijela, za tamnu podlogu. `logo-ink` je ista alpha
 * maska prelivena u ink, za kamen. Oboje nastaje u scripts/fetch-media.mjs.
 *
 * Kad klijent dostavi vektor, ovdje se mijenja samo import.
 */
export default function Wordmark({
  className = '',
  tone = 'ink',
  height = 30,
}: {
  className?: string
  tone?: 'ink' | 'light'
  height?: number
}) {
  const src = tone === 'ink' ? logoInk : logoLight

  // Sirina se izracuna iz omjera pa ne treba CSS override. Kad se dimenzija
  // dira samo u CSS-u, next/image prijavi razbijen omjer.
  return (
    <Image
      src={src}
      alt={site.name}
      height={height}
      width={Math.round((height * src.width) / src.height)}
      priority
      className={className}
    />
  )
}
