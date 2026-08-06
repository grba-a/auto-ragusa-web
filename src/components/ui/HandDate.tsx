'use client'

import { useSyncExternalStore } from 'react'

/** Datum se ne mijenja dok je stranica otvorena, pa nema sto pretplacivati. */
const subscribe = () => () => {}

/**
 * Zona je uvijek `Europe/Zagreb` bez obzira na jezik: nalog se datira po
 * Dubrovniku, ne po tome odakle ga netko cita.
 */
const FORMATTERS = {
  hr: new Intl.DateTimeFormat('hr-HR', {
    timeZone: 'Europe/Zagreb',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
  en: new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zagreb',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }),
} as const

/**
 * Vraca isti string kroz cijeli dan, pa `Object.is` usporedba u
 * `useSyncExternalStore` prolazi i nema beskonacnog rerendera.
 */
const getSnapshot = () => new Date().toDateString()

/** Na serveru datuma nema: staticki HTML se cachira i zamrznuo bi dan builda. */
const getServerSnapshot = () => null

/**
 * Datum ugovora, upisan rukom.
 *
 * Zamijenio je staticni broj naloga `RN-001`. Taj broj je implicirao da je ovo
 * njihov PRVI radni nalog, sto je za servis koji radi od 2019. losa tvrdnja.
 * Datum je jedina brojka koju smijemo napisati bez klijentove potvrde, jer je
 * istinita po definiciji, a usput cini dokument citateljevim: ugovor je datiran
 * na dan kad si ga otvorio.
 *
 * Racuna se na klijentu, preko `useSyncExternalStore` s razlicitim serverskim
 * snapshotom. Nije stilski izbor: stranica je staticki prerenderirana, pa bi
 * izracun na serveru zamrznuo dan builda i izazvao hidracijski mismatch.
 * (`OpenState` isti problem rjesava `useEffect`om; ovdje je `useSyncExternal
 * Store` tocniji jer se vrijednost nikad ne mijenja nakon prvog citanja.)
 *
 * Zona je `Europe/Zagreb`, inace posjetitelj iz drugog pojasa dobije jucerasnji
 * nalog.
 *
 * NEMA `data-write`. GSAP timeline se gradi u `useLayoutEffect`, prije nego
 * `useEffect` postavi datum, pa bi `writeIn` animirao prazan okvir. Umjesto
 * toga datum ulazi kratkim CSS fadeom.
 *
 * Bez JS-a ostaje prazna crta uz "Br." - ispravno stanje neispunjenog obrasca,
 * ne pokvareno.
 */
export default function HandDate({ locale }: { locale: 'hr' | 'en' }) {
  const today = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (!today) return <span className="write-rule inline-block w-28" aria-hidden="true" />

  return (
    <span className="hand tnum animate-[fade-in_400ms_ease-out]">
      {FORMATTERS[locale].format(new Date(today))}
    </span>
  )
}
