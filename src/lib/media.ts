/**
 * Na stranici su ISKLJUCIVO fotografije Auto Raguse.
 *
 * Unsplash placeholderi su izbaceni. Ne zato sto su bili losi kadrovi, nego
 * zato sto su lagali o mjestu: korak "vracamo vozilo na vasu adresu" je
 * pokazivao bijeli Lexus na izlazu iz americke garaze s LED znakom CAR COMING.
 * Tekst je bio hiperspecifican za Gruz, slika globalno genericka, a posjetitelj
 * vjeruje slici. Koraci koji nemaju vjerodostojnu fotku sada nemaju nikakvu,
 * nose ih tipografija i podaci.
 *
 * Sve prolazi kroz jedan color grade, vidi scripts/fetch-media.mjs. Logo ne.
 */
import fasada from '@/assets/img/ar-fasada.webp'
import boks from '@/assets/img/ar-boks.webp'
import plaketa from '@/assets/img/ar-citroen-peugeot.webp'
import elektrika from '@/assets/img/ar-elektrika.webp'
import vulkanizer from '@/assets/img/ar-vulkanizer.webp'

export const media = {
  /** Prilog uz zaglavlje naloga. Njihova fasada s vlastitim natpisima. */
  hero: fasada,

  /** Ploca "Ovlasteni partner" sa sluzbenim znakovima. Sredisnji prilog. */
  plaketa,

  /** Prilozi, u redu u kojem se pojavljuju. */
  attachments: [fasada, boks, elektrika, vulkanizer],
} as const
