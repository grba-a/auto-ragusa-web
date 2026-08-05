import type { SiteContent } from './types'

export const hr: SiteContent = {
  locale: 'hr',
  base: '',

  nav: {
    items: [
      { label: 'Koraci', href: '#koraci' },
      { label: 'Opseg', href: '#opseg' },
      { label: 'Prilozi', href: '#prilozi' },
      { label: 'Kontakt', href: '#kontakt' },
    ],
    cta: 'Zatraži termin',
    menu: 'Otvori meni',
    close: 'Zatvori meni',
  },

  order: {
    no: 'RN-001',
    kind: 'Radni nalog',
    headline: ['Vi predate ključ.', 'Ostalo je naše.'],
    ctaPrimary: 'Zatraži termin',
    ctaSecondary: 'Pozovi 020 418 509',
    // Traka polja zamjenjuje lead odlomak. Sest argumenata, nijedna recenica.
    fields: [
      { label: 'Preuzimanje', value: 'vaša adresa' },
      { label: 'Dostava', value: 'vaša adresa' },
      { label: 'Zamjensko vozilo', value: 'uključeno' },
      { label: 'Ponuda', value: 'prije radova' },
      { label: 'Servisna knjiga', value: 'upis' },
      { label: 'Marke', value: 'sve' },
    ],
    attachmentLabel: 'Prilog',
    heroCaption: 'Ćira Carića 1, Gruž',
    heroAlt:
      'Ulaz u Auto Ragusu u Dubrovniku s natpisima Ovlašteni serviser, Prijam stranaka i Prijam vozila',
  },

  steps: {
    heading: 'Pet koraka. Vi ste u dva.',
    lead: 'Ostala tri se odvijaju dok ste na poslu.',
    yours: 'Vaš',
    ours: 'Naš',
    items: [
      { title: 'Dogovorite termin', yours: true },
      {
        title: 'Dolazimo po vozilo',
        note: 'Ako auto trebate cijeli dan, ostavljamo zamjensko.',
        yours: false,
      },
      {
        title: 'Dijagnostika i ponuda',
        note: 'Nalaz i cijenu vidite prije nego što išta diramo.',
        yours: false,
      },
      { title: 'Radovi u ovlaštenom servisu', yours: false },
      { title: 'Vraćamo vozilo na vašu adresu', yours: true },
    ],
  },

  stamp: { text: 'Odobreno' },

  scope: {
    heading: 'Opseg radova',
    items: [
      { id: 'motor', title: 'Popravci i servis motora', spec: 'ulje, filteri, remenje, kvačila' },
      { id: 'brzi', title: 'Brzi servis', spec: 'jutro dogovor, popodne gotovo' },
      { id: 'ovlasteni', title: 'Ovlašteni servis Peugeot i Citroën' },
      { id: 'elektrika', title: 'Auto elektrika', spec: 'senzori, alternatori, akumulatori' },
      { id: 'gume', title: 'Vulkanizacija', spec: 'montaža, balansiranje, skladištenje' },
      { id: 'prodaja', title: 'Prodaja vozila' },
      { id: 'tehnicki', title: 'Priprema za tehnički', spec: 'preuzmemo, odvezemo, vratimo' },
      { id: 'osiguranje', title: 'Polica osiguranja', spec: 'Adriatic, Euroherc, HOK' },
      { id: 'skladiste', title: 'Sezonsko skladištenje guma' },
    ],
  },

  attachments: {
    heading: 'Prilozi',
    plaqueCaption: 'Ovlašteni partner',
    plaqueAlt: 'Ploča Ovlašteni partner sa službenim znakovima Peugeota i Citroëna u Auto Ragusi',
    items: [
      { caption: 'Prijam vozila', alt: 'Ulaz u servis Auto Ragusa u Gružu' },
      { caption: 'Boks 1', alt: 'Radionica Auto Raguse s vozilom na dizalici' },
      { caption: 'Dijagnostika', alt: 'Računalna dijagnostika priključena na vozilo' },
      { caption: 'Vulkanizacija', alt: 'Montaža gume u vulkanizerskoj radionici' },
    ],
    allLabel: 'I sve ostale marke',
  },

  story: {
    heading: 'Ragusa je staro ime ovoga grada',
    body: 'Radimo od 2019., na tradiciji M&CO Dubrovnika. Ulažemo u dijagnostiku i u obuku mehaničara, jer se u gradu ove veličine sve zna.',
    notes: [
      { value: '2019', label: 'Radimo od' },
      { value: 'M&CO', label: 'Na tradiciji' },
      { value: 'Gruž', label: 'Adresa' },
    ],
  },

  hours: {
    heading: 'Radno vrijeme',
    openNow: 'Otvoreno',
    closedNow: 'Zatvoreno',
    untilLabel: 'do',
    opensLabel: 'otvaramo u',
    closed: 'Zatvoreno',
    days: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
  },

  booking: {
    kind: 'Zahtjev za termin',
    heading: 'Recite nam što auto radi',
    lead: 'Javljamo se isti radni dan.',
    fields: {
      name: 'Ime i prezime',
      phone: 'Telefon',
      email: 'Email',
      vehicle: 'Vozilo',
      vehiclePlaceholder: 'Peugeot 208, 2019.',
      service: 'Usluga',
      servicePlaceholder: 'Odaberite',
      message: 'Što auto radi',
      pickup: 'Preuzmite vozilo na mojoj adresi',
    },
    optional: 'nije obavezno',
    more: 'Dodaj detalje',
    signatureLine: 'Potpis',
    submit: 'Pošalji zahtjev',
    sending: 'Šaljem',
    successHeading: 'Zaprimljeno',
    successBody: 'Javljamo se isti radni dan do 16:00.',
    errorBody: 'Nije poslano. Nazovite 020 418 509 ili pokušajte ponovno.',
    retry: 'Pokušaj ponovno',
    errors: {
      name: 'Upišite ime.',
      phone: 'Upišite broj na koji vas možemo dobiti.',
      email: 'Provjerite email adresu.',
    },
    privacy: 'Podatke koristimo samo za dogovor termina.',
  },

  contact: {
    heading: 'Gdje smo',
    addressLabel: 'Adresa',
    phoneLabel: 'Telefon',
    emailLabel: 'Email',
    directions: 'Otvori u kartama',
    approach: 'Kod gruškog rotora.',
    mapAlt: 'Shematska karta s lokacijom Auto Raguse kod gruškog rotora u Dubrovniku',
  },

  footer: {
    tagline: 'Ovlašteni serviser Peugeot i Citroën, Dubrovnik',
    rights: 'Sva prava zadržana.',
    langSwitch: 'English',
    langSwitchHref: '/en',
  },

  meta: {
    title: 'Auto Ragusa | Ovlašteni servis Peugeot i Citroën, Dubrovnik',
    description:
      'Ovlašteni serviser Peugeot i Citroën u Dubrovniku. Servis svih marki, auto elektrika, vulkanizacija, priprema za tehnički. Dolazimo po vozilo i vraćamo ga na vašu adresu.',
  },

  /**
   * Puni opisi su maknuti s ekrana zbog citljivosti, ali ovdje ostaju i idu u
   * JSON-LD katalog usluga. SEO tezina ne odlazi zajedno s tekstom.
   */
  seo: {
    services: [
      {
        name: 'Popravci i servis motora',
        description:
          'Redovni servisi, zamjena ulja i filtera, remenje, kvačila i glave motora. Od male godišnje kontrole do ozbiljnih motorskih radova, u Dubrovniku.',
      },
      {
        name: 'Brzi servis',
        description:
          'Radovi koji ne traže cijeli dan. Vozilo dogovoreno ujutro gotovo je do popodneva.',
      },
      {
        name: 'Ovlašteni servis Peugeot i Citroën',
        description:
          'Servis po tvorničkom protokolu, originalni dijelovi, upis u servisnu knjigu i priznata garancija na vozilo.',
      },
      {
        name: 'Auto elektrika',
        description:
          'Traženje kvarova na električnoj instalaciji, senzori, alternatori, akumulatori, rasvjeta i elektronika vozila.',
      },
      {
        name: 'Vulkanizacija',
        description:
          'Nabava i montaža guma, balansiranje, popravci, sezonska zamjena i skladištenje guma u Dubrovniku.',
      },
      {
        name: 'Prodaja vozila',
        description:
          'Posredovanje pri kupnji i prodaji rabljenih vozila, uz poznatu servisnu povijest.',
      },
      {
        name: 'Priprema za tehnički pregled',
        description:
          'Preuzimanje vozila, priprema, odvoz na tehnički pregled i povrat vozila s uredno obavljenom registracijom.',
      },
      {
        name: 'Polica osiguranja',
        description:
          'Ugovaranje police osiguranja vozila u uredu Auto Raguse. Adriatic, Euroherc i HOK.',
      },
      {
        name: 'Sezonsko skladištenje guma',
        description:
          'Ljetni set guma ostaje kod nas dok su zimske na vozilu, i obratno. Bez balkona i podruma.',
      },
    ],
  },
}
