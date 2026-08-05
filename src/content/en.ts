import type { SiteContent } from './types'

export const en: SiteContent = {
  locale: 'en',
  base: '/en',

  nav: {
    items: [
      { label: 'Steps', href: '#koraci' },
      { label: 'Scope', href: '#opseg' },
      { label: 'Attachments', href: '#prilozi' },
      { label: 'Contact', href: '#kontakt' },
    ],
    cta: 'Book a slot',
    menu: 'Open menu',
    close: 'Close menu',
  },

  order: {
    no: 'WO-001',
    kind: 'Work order',
    headline: ['Hand us the key.', 'We do the rest.'],
    ctaPrimary: 'Book a slot',
    ctaSecondary: 'Call +385 20 418 509',
    fields: [
      { label: 'Collection', value: 'your address' },
      { label: 'Delivery', value: 'your address' },
      { label: 'Courtesy vehicle', value: 'included' },
      { label: 'Quote', value: 'before work' },
      { label: 'Service book', value: 'logged' },
      { label: 'Makes', value: 'all' },
    ],
    attachmentLabel: 'Attachment',
    heroCaption: 'Ćira Carića 1, Gruž',
    heroAlt:
      'Entrance to Auto Ragusa in Dubrovnik with authorised service, reception and vehicle intake signage',
  },

  steps: {
    heading: 'Five steps. You are in two.',
    lead: 'The other three happen while you are at work.',
    yours: 'Yours',
    ours: 'Ours',
    items: [
      { title: 'Book a slot', yours: true },
      {
        title: 'We collect the car',
        note: 'Need the car all day? We leave you a courtesy vehicle.',
        yours: false,
      },
      {
        title: 'Diagnostics and quote',
        note: 'You see the findings and the price before we touch anything.',
        yours: false,
      },
      { title: 'Work in an authorised workshop', yours: false },
      { title: 'We return the car to your address', yours: true },
    ],
  },

  stamp: { text: 'Approved' },

  scope: {
    heading: 'Scope of work',
    items: [
      { id: 'motor', title: 'Engine repair and servicing', spec: 'oil, filters, belts, clutches' },
      { id: 'brzi', title: 'Quick service', spec: 'booked morning, ready afternoon' },
      { id: 'ovlasteni', title: 'Authorised Peugeot and Citroën service' },
      { id: 'elektrika', title: 'Auto electrics', spec: 'sensors, alternators, batteries' },
      { id: 'gume', title: 'Tyres', spec: 'fitting, balancing, storage' },
      { id: 'prodaja', title: 'Vehicle sales' },
      { id: 'tehnicki', title: 'Roadworthiness prep', spec: 'we collect, take it, return it' },
      { id: 'osiguranje', title: 'Insurance policy', spec: 'Adriatic, Euroherc, HOK' },
      { id: 'skladiste', title: 'Seasonal tyre storage' },
    ],
  },

  attachments: {
    heading: 'Attachments',
    plaqueCaption: 'Authorised partner',
    plaqueAlt:
      'An authorised partner plaque with the official Peugeot and Citroën marks at Auto Ragusa',
    items: [
      { caption: 'Vehicle intake', alt: 'Entrance to the Auto Ragusa workshop in Gruž' },
      { caption: 'Bay 1', alt: 'The Auto Ragusa workshop with a car on the lift' },
      { caption: 'Diagnostics', alt: 'Computer diagnostics connected to a vehicle' },
      { caption: 'Tyre fitting', alt: 'A tyre being fitted in the workshop' },
    ],
    allLabel: 'And every other make',
  },

  story: {
    heading: 'Ragusa is the old name of this city',
    body: 'Running since 2019, continuing the tradition of M&CO Dubrovnik. We invest in diagnostic equipment and in training our mechanics, because in a city this size everything gets around.',
    notes: [
      { value: '2019', label: 'Since' },
      { value: 'M&CO', label: 'Continuing' },
      { value: 'Gruž', label: 'Address' },
    ],
  },

  hours: {
    heading: 'Opening hours',
    openNow: 'Open',
    closedNow: 'Closed',
    untilLabel: 'until',
    opensLabel: 'opens at',
    closed: 'Closed',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },

  booking: {
    kind: 'Slot request',
    heading: 'Tell us what the car is doing',
    lead: 'We reply the same working day.',
    fields: {
      name: 'Full name',
      phone: 'Phone',
      email: 'Email',
      vehicle: 'Vehicle',
      vehiclePlaceholder: 'Peugeot 208, 2019',
      service: 'Service',
      servicePlaceholder: 'Choose',
      message: 'What the car is doing',
      pickup: 'Collect the car from my address',
    },
    optional: 'optional',
    more: 'Add details',
    signatureLine: 'Signature',
    submit: 'Send request',
    sending: 'Sending',
    successHeading: 'Received',
    successBody: 'We will call you the same working day before 16:00.',
    errorBody: 'Not sent. Call +385 20 418 509 or try again.',
    retry: 'Try again',
    errors: {
      name: 'Please enter your name.',
      phone: 'Please enter a number we can reach you on.',
      email: 'Please check the email address.',
    },
    privacy: 'We use these details only to arrange the appointment.',
  },

  contact: {
    heading: 'Where we are',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    directions: 'Open in maps',
    approach: 'By the Gruž roundabout.',
    mapAlt: 'A schematic map showing Auto Ragusa by the Gruž roundabout in Dubrovnik',
  },

  footer: {
    tagline: 'Authorised Peugeot and Citroën service, Dubrovnik',
    rights: 'All rights reserved.',
    langSwitch: 'Hrvatski',
    langSwitchHref: '/',
  },

  meta: {
    title: 'Auto Ragusa | Authorised Peugeot and Citroën service, Dubrovnik',
    description:
      'Authorised Peugeot and Citroën service in Dubrovnik. All makes serviced, auto electrics, tyres, roadworthiness test preparation. We collect your car and return it to your address.',
  },

  seo: {
    services: [
      {
        name: 'Engine repair and servicing',
        description:
          'Routine servicing, oil and filter changes, belts, clutches and cylinder heads. From the annual check to serious engine work, in Dubrovnik.',
      },
      {
        name: 'Quick service',
        description:
          'Work that does not need a whole day. A car booked in the morning is ready by the afternoon.',
      },
      {
        name: 'Authorised Peugeot and Citroën service',
        description:
          'Servicing to factory protocol, original parts, entry in the service book and the vehicle warranty kept intact.',
      },
      {
        name: 'Auto electrics',
        description:
          'Fault finding on the electrical system, sensors, alternators, batteries, lighting and vehicle electronics.',
      },
      {
        name: 'Tyres',
        description:
          'Sourcing and fitting, balancing, repairs, seasonal changeover and tyre storage in Dubrovnik.',
      },
      {
        name: 'Vehicle sales',
        description: 'Brokering the purchase and sale of used vehicles with a known service history.',
      },
      {
        name: 'Roadworthiness test preparation',
        description:
          'Vehicle collection, preparation, the inspection itself, and return of the vehicle with the registration completed.',
      },
      {
        name: 'Insurance policy',
        description:
          'Vehicle insurance arranged in the Auto Ragusa office. Adriatic, Euroherc and HOK.',
      },
      {
        name: 'Seasonal tyre storage',
        description:
          'Your summer set stays with us while the winter set is on the car, and the other way round.',
      },
    ],
  },
}
