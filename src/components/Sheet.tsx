import type { CSSProperties, ReactNode } from 'react'

/**
 * Jedan list ugovora polozen na stol.
 *
 * Sva fizikalnost je ovdje na jednom mjestu, da je sedam sekcija ne ponavlja i
 * ne rasprsi: sjena, nagib, zrno papira, rupice, broj stranice, inicijali.
 *
 * ASIMETRIJA JE NAMJERNA. Listovi nisu iste sirine, nisu jednako centrirani i
 * nemaju isti nagib. Snop papira na stolu nikad nije poravnat, a klijent je
 * izricito rekao da ne mora biti simetricno. Vrijednosti su male (nagib do
 * 0.8 stupnja, pomak do 2rem): dovoljno da se osjeti, premalo da se primijeti
 * kao efekt.
 *
 * NAGIB IDE SAMO OD 768px NAVISE. Na 390px su nakoseni elementi vec jednom
 * srusili ovaj projekt - virili su izvan stupca i citali se kao neporavnati, a
 * ne kao montirani. Ispod 768px nagib je nula, a `overflow-x: clip` na body
 * hvata ostatak.
 */
type SheetProps = {
  children: ReactNode
  /** Broj stranice, kako pise na listu. */
  page: number
  /** Ukupan broj stranica ugovora. */
  of: number
  /** Nagib u stupnjevima, samo >= 768px. Drzati unutar +-0.8. */
  tilt?: number
  /** Vodoravni pomak u rem, samo >= 768px. Drzati unutar +-2. */
  offset?: number
  /** Karbon kopija: jedini tamni list, sjedi na potpisu. */
  carbon?: boolean
  /** "str." odnosno "p.", iz sadrzaja jer se prevodi. */
  pageLabel: string
  /**
   * Suhi tisak preko lista, npr. "PRIMJERAK ZA NARUCITELJA".
   *
   * Namjerno je prop a ne ugradeni dio karbon lista: uklanjanje je brisanje
   * jednog atributa na pozivu, bez diranja ove komponente.
   */
  watermark?: string
  id?: string
  className?: string
}

const WIDTH = 'w-full max-w-[min(92rem,calc(100vw-2.5rem))]'

export default function Sheet({
  children,
  page,
  of,
  tilt = 0,
  offset = 0,
  carbon = false,
  pageLabel,
  watermark,
  id,
  className = '',
}: SheetProps) {
  // Nagib i pomak idu kroz custom property, pa ih media query u CSS-u moze
  // ugasiti bez da komponenta zna za breakpoint.
  const style = {
    '--tilt': `${tilt}deg`,
    '--offset': `${offset}rem`,
  } as CSSProperties

  return (
    <section
      id={id}
      data-sheet
      style={style}
      className={`sheet-paper relative mx-auto ${WIDTH} rotate-[var(--tilt)] translate-x-[var(--offset)] max-md:!translate-x-0 max-md:!rotate-0 ${
        carbon ? 'sheet-carbon text-white' : ''
      } ${className}`}
    >
      {/* Rupice registratora. Ostaju izvan tamnog lista: karbon kopija se ne
          uvezuje, ona se otkida i nosi sa sobom. */}
      {!carbon && (
        <>
          <span className="punch top-[18%] max-sm:hidden" aria-hidden="true" />
          <span className="punch top-[62%] max-sm:hidden" aria-hidden="true" />
        </>
      )}

      {/* Suhi tisak. `overflow-hidden` je na OVOM omotacu, nikad na listu:
          spajalice na listovima 1 i 4 namjerno vire iznad fotografija i list ih
          ne smije rezati. Rotacija samo od 768px, isto pravilo kao nagib. */}
      {watermark && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-hidden pt-[18%]"
        >
          <span className="drypress text-[clamp(1.6rem,6vw,4.5rem)] md:-rotate-[28deg]">
            {watermark}
          </span>
        </span>
      )}

      {/* Sadrzaj iznad suhog tiska. */}
      <div className="relative z-10">{children}</div>

      {/* Oznaka stranice. U pravom visestranicnom ugovoru svaka stranica mora
          biti prepoznatljiva sama za sebe, pa nosi i broj i inicijale. */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-4 flex items-end justify-between px-5 sm:bottom-6 sm:px-8 lg:px-12 ${
          carbon ? 'text-white/35' : ''
        }`}
        aria-hidden="true"
      >
        <span className={`hand text-base ${carbon ? 'text-white/40' : 'opacity-70'}`}>AR</span>
        <span className={`page-mark tnum ${carbon ? 'text-white/35' : ''}`}>
          {pageLabel} {page}/{of}
        </span>
      </div>

      {/* Zrno. Iznad sadrzaja jer papir ima teksturu i preko tiska. */}
      {!carbon && <span className="sheet-grain" aria-hidden="true" />}
    </section>
  )
}
