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

  /**
   * Prilozi, u redu u kojem se pojavljuju: Prilog B, C, D.
   *
   * `fasada` je OVDJE izbacena. Ona je Prilog A na naslovnici, a bila je i prvi
   * prilog u ovom bloku, pa se ista datoteka pojavljivala kao dva razlicito
   * oznacena priloga istog ugovora, s dva razlicita potpisa. Drugog kadra
   * fasade u setu nema, pa je ispravak izbacivanje a ne zamjena. Cetvrti prilog
   * se vraca cim klijent isporuci fotografije po SHOT-LISTA.md.
   */
  attachments: [boks, elektrika, vulkanizer],
} as const
