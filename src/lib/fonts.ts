import { Caveat, Geist_Mono, Instrument_Sans } from 'next/font/google'

/**
 * Ugovor ima dva sloja pisma i to je nosiva ideja cijelog dizajna.
 *
 * OTISNUTO ide u Geist Monu: naslovi clanaka, nazivi polja, brojevi, crte.
 * Mono na velikom formatu se cita kao ispis, i ta jedna odluka nosi pola
 * koncepta. Instrument Sans nosi tekst u duzim blokovima, jer mono na 16px
 * kroz cijeli odlomak umara.
 *
 * UPISANO RUKOM ide u Caveat, u plavoj kemijskoj: vrijednosti polja, kvacice,
 * marginalije, potpis. Obrazac je otisnut jednako za sve, upisano je za tebe.
 *
 * `latin-ext` je obavezan i provjeren na sva tri: bez njega nema c, c, s, z, d.
 * Za Caveat je provjereno da mu latin-ext raspon U+0100-02BA pokriva sve
 * hrvatske znakove (c U+010D, c U+0107, s U+0161, z U+017E, d U+0111).
 */
export const geistMono = Geist_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const instrument = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-instrument',
  display: 'swap',
})

export const caveat = Caveat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-caveat',
  display: 'swap',
})

export const fontClass = `${geistMono.variable} ${instrument.variable} ${caveat.variable}`
