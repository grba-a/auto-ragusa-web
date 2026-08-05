/**
 * Jedini izvor istine za sve cinjenicne podatke o Auto Ragusi.
 *
 * Sve u ovoj datoteci je provjereno na auto-ragusa.hr, auto-ragusa.peugeot.hr,
 * njihovom Instagramu i u DuList clancima iz 2020. i 2023. Nista nije izmisljeno.
 * Ako se broj, sat ili adresa mijenja, mijenja se SAMO ovdje.
 */

/**
 * Bazni URL. Na Vercelu preview deploy mora pokazivati na svoju domenu, inace
 * bi kanonske adrese, sitemap i OG kartice pokazivale na produkciju koja jos ne
 * postoji.
 *
 *   NEXT_PUBLIC_SITE_URL           rucni override, ima prednost
 *   VERCEL_PROJECT_PRODUCTION_URL  produkcijska domena projekta na Vercelu
 *   VERCEL_URL                     adresa pojedinog deploya
 */
function resolveUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'https://auto-ragusa.hr'
}

export const site = {
  name: 'Auto Ragusa',
  legal: 'Auto Ragusa',
  founded: 2019,
  predecessor: 'M&CO Dubrovnik',

  url: resolveUrl(),

  tel: {
    landline: { label: '020 418 509', href: 'tel:+38520418509' },
    mobile: { label: '099 4418 509', href: 'tel:+385994418509' },
  },
  email: 'info@auto-ragusa.hr',

  address: {
    street: 'Ćira Carića 1',
    postal: '20000',
    city: 'Dubrovnik',
    country: 'HR',
    region: 'Dubrovačko-neretvanska županija',
    // Priblizne koordinate ulice Cira Carica (OpenStreetMap). Klijent treba
    // potvrditi tocnu tocku ulaza prije objave.
    lat: 42.6592,
    lon: 18.0768,
  },

  /** 0 = nedjelja, kako vraca Date#getDay. null = zatvoreno. */
  hours: [
    { day: 0, open: null, close: null },
    { day: 1, open: '08:00', close: '16:00' },
    { day: 2, open: '08:00', close: '16:00' },
    { day: 3, open: '08:00', close: '16:00' },
    { day: 4, open: '08:00', close: '16:00' },
    { day: 5, open: '08:00', close: '16:00' },
    { day: 6, open: '08:00', close: '13:00' },
  ] as const,

  social: {
    facebook: 'https://www.facebook.com/autoragusa/',
    instagram: 'https://www.instagram.com/auto_ragusa/',
    peugeot: 'https://auto-ragusa.peugeot.hr/',
  },

  /** Marke za koje su ovlasteni serviser. */
  authorizedBrands: ['Peugeot', 'Citroën'] as const,

  /** Partneri za police osiguranja, s njihove stranice i DuList clanka. */
  insurers: ['Adriatic', 'Euroherc', 'HOK'] as const,

  /** Doslovno s natpisa na njihovoj zgradi u Gruzu. */
  signage: [
    'Mehanika',
    'Dijagnostika',
    'Auto elektrika',
    'Vulkanizacija',
    'Limarija',
    'Rezervni dijelovi',
    'Dodatna oprema',
    'Postprodaja',
  ] as const,
} as const

export type ServiceId =
  | 'motor'
  | 'brzi'
  | 'ovlasteni'
  | 'elektrika'
  | 'gume'
  | 'prodaja'

/** Trenutno stanje radnog vremena, u lokalnoj zoni Dubrovnika. */
export function openState(now: Date): { open: boolean; nextChange: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zagreb',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))

  const today = site.hours.find((h) => h.day === dayIndex)
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5))

  if (today?.open && today.close) {
    const from = toMin(today.open)
    const to = toMin(today.close)
    if (minutes >= from && minutes < to) return { open: true, nextChange: today.close }
    if (minutes < from) return { open: false, nextChange: today.open }
  }

  for (let i = 1; i <= 7; i++) {
    const next = site.hours.find((h) => h.day === (dayIndex + i) % 7)
    if (next?.open) return { open: false, nextChange: next.open }
  }
  return { open: false, nextChange: '08:00' }
}
