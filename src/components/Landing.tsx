import Nav from './Nav'
import OrderHeader from './OrderHeader'
import Steps from './Steps'
import Scope from './Scope'
import Attachments from './Attachments'
import Signature from './Signature'
import Contact from './Contact'
import Footer from './Footer'
import JsonLd from './JsonLd'
import { autoRepairSchema } from '@/lib/schema'
import type { SiteContent } from '@/content/types'

/**
 * Ugovor o servisu vozila: sest listova na stolu.
 *
 *   1/6 naslovnica  naslov, broj, ugovorne strane, predmet, Prilog A
 *   2/6 clanak 1.   tijek radova, kucice se kvace rukom, zig
 *   3/6 clanak 2.   opseg radova, devet pozicija
 *   4/6 prilozi     fotografije na spajalicama, Napomena uz rub
 *   5/6 clanak 3.   prihvat i potpis (karbon kopija, tamni list)
 *   6/6 izvodac     adresa, radno vrijeme, karta
 *
 * Podnozje NIJE list: lezi izravno na stolu, kao kolofon ispod snopa.
 *
 * `Story` je prestao biti vlastita sekcija. Prica o Ragusi nije clanak ugovora
 * nego biljeska, pa stoji kao "Napomena" uz rub lista 4.
 *
 * Razmak izmedu listova je namjerno nejednak. Snop papira na stolu nije
 * poravnat, a nagib i pomak svakog lista nose `Sheet` propovi `tilt` i
 * `offset`.
 */
export default function Landing({ c }: { c: SiteContent }) {
  return (
    <>
      <JsonLd data={autoRepairSchema(c)} />
      <Nav c={c} />

      {/* `pt` mora nadici fiksnu traku od 64px, inace prvi list klizi pod nju. */}
      <main className="flex flex-col gap-14 px-3 pt-24 pb-10 sm:gap-20 sm:px-6 sm:pb-16 lg:gap-24 lg:px-10">
        <OrderHeader c={c} />
        <Steps c={c} />
        <Scope c={c} />
        <Attachments c={c} />
        <Signature c={c} />
        <Contact c={c} />
      </main>

      <Footer c={c} />
    </>
  )
}
