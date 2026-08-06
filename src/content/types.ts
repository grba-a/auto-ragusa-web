/**
 * Jedan oblik sadrzaja za oba jezika. TypeScript hvata svaki string koji
 * postoji u jednom jeziku a fali u drugom.
 *
 * Nalog je skrt: nazivi polja i kratke vrijednosti, bez proze. Sto se moze
 * zakljuciti iz naziva, ne pise se ispod njega.
 */
export interface SiteContent {
  locale: 'hr' | 'en'
  base: '' | '/en'

  nav: {
    items: { label: string; href: string }[]
    cta: string
    menu: string
    close: string
  }

  /**
   * Okvir ugovora. Struktura, ne proza: naslovi clanaka, oznake stranica i
   * nazivi ugovornih strana. Rijeci unutar clanaka se ne mijenjaju - hladan
   * pravni okvir i topao ljudski tekst unutar njega su namjerni kontrast.
   */
  contract: {
    /** "Ugovor o servisu vozila" */
    title: string
    /** Oznaka broja, koja ostaje prazna: "Br." */
    noLabel: string
    dateLabel: string
    /** "Ugovorne strane" */
    partiesLabel: string
    contractorLabel: string
    clientLabel: string
    /** Crta koju popunjava posjetitelj. */
    clientBlank: string
    /** "str." ispred broja stranice. */
    pageLabel: string
    articleLabel: string
    /** Naslovi clanaka, redom kojim se pojavljuju. */
    articles: { no: string; title: string }[]
    /** "Prilog" ispred slova A, B, C. */
    attachmentPrefix: string
    signatureContractor: string
    signatureClient: string
  }

  order: {
    no: string
    kind: string
    headline: [string, string]
    ctaPrimary: string
    ctaSecondary: string
    /** Sest argumenata u jednom pogledu. Zamjenjuje lead odlomak. */
    fields: { label: string; value: string }[]
    attachmentLabel: string
    heroCaption: string
    heroAlt: string
  }

  steps: {
    heading: string
    lead: string
    yours: string
    ours: string
    /** Opis nose samo koraci koji nose stvarnu prodaju. Ostali su ocigledni. */
    items: { title: string; note?: string; yours: boolean }[]
  }

  stamp: { text: string }

  scope: {
    heading: string
    /** Devet pozicija: sest usluga i tri papira. Nalog ima jedan popis opsega. */
    items: { id: string; title: string; spec?: string }[]
  }

  attachments: {
    heading: string
    plaqueCaption: string
    plaqueAlt: string
    items: { caption: string; alt: string }[]
    allLabel: string
  }

  story: {
    heading: string
    body: string
    notes: { value: string; label: string }[]
  }

  hours: {
    heading: string
    openNow: string
    closedNow: string
    untilLabel: string
    opensLabel: string
    closed: string
    days: [string, string, string, string, string, string, string]
  }

  booking: {
    kind: string
    heading: string
    lead: string
    fields: {
      name: string
      phone: string
      email: string
      vehicle: string
      vehiclePlaceholder: string
      service: string
      servicePlaceholder: string
      message: string
      pickup: string
    }
    optional: string
    more: string
    signatureLine: string
    submit: string
    sending: string
    successHeading: string
    successBody: string
    errorBody: string
    retry: string
    errors: { name: string; phone: string; email: string }
    privacy: string
  }

  contact: {
    heading: string
    addressLabel: string
    phoneLabel: string
    emailLabel: string
    directions: string
    approach: string
    mapAlt: string
  }

  footer: {
    tagline: string
    rights: string
    langSwitch: string
    langSwitchHref: string
  }

  meta: { title: string; description: string }

  /**
   * Puni opisi usluga. NE prikazuju se na stranici, idu iskljucivo u JSON-LD
   * katalog. Tekst je maknut s ekrana zbog citljivosti, ali SEO tezina ostaje.
   */
  seo: { services: { name: string; description: string }[] }
}
