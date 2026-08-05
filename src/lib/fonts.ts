import { Geist_Mono, Instrument_Sans } from 'next/font/google'

/**
 * Geist Mono nosi sve strukturalno: nazive polja, brojeve, indeks i naslove.
 * Mono na velikom formatu se cita kao ispis, i ta jedna odluka nosi pola
 * koncepta radnog naloga.
 *
 * Instrument Sans nosi tekst koji se cita u duzim blokovima, jer mono na 16px
 * kroz cijeli odlomak umara.
 *
 * `latin-ext` je obavezan i provjeren na oba: bez njega nema c, c, s, z, d.
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

export const fontClass = `${geistMono.variable} ${instrument.variable}`
