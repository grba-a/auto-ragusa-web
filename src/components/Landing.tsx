import Nav from './Nav'
import OrderHeader from './OrderHeader'
import Steps from './Steps'
import Scope from './Scope'
import Attachments from './Attachments'
import Story from './Story'
import Signature from './Signature'
import Contact from './Contact'
import Footer from './Footer'
import JsonLd from './JsonLd'
import { autoRepairSchema } from '@/lib/schema'
import type { SiteContent } from '@/content/types'

/**
 * Jedan dokument, sedam blokova.
 *
 *   01 zaglavlje   mreza polja koja se ispunjavaju + prilog
 *   02 koraci      tabela s kvacicama i zigom
 *   03 opseg       ledger, devet pozicija
 *   04 prilozi     ploca i cetiri fotografije, ravno
 *   05 Ragusa      marginalije uz jedan odlomak
 *   06 potpis      prazan nalog na karbonu
 *   07 kontakt     podaci, radno vrijeme, shematska karta
 *
 * Ugaseno u odnosu na prvu izvedbu koncepta: ticker (nula novih cinjenica),
 * blok "Dodatno" (usao u ledger), blok klauzula (svaka je vec bila u traci
 * polja u zaglavlju), zaseban blok radnog vremena (usao u kontakt).
 *
 * Vertikalni ritam je namjerno nejednak: koraci i prilozi dobivaju `py-36`,
 * ostali `py-32` ili manje. Jednak razmak na svim sekcijama je bio jedini
 * razlog zasto se stranica citala kao niz jednakih kutija.
 */
export default function Landing({ c }: { c: SiteContent }) {
  return (
    <>
      <JsonLd data={autoRepairSchema(c)} />
      <Nav c={c} />

      <main>
        <OrderHeader c={c} />
        <Steps c={c} />
        <Scope c={c} />
        <Attachments c={c} />
        <Story c={c} />
        <Signature c={c} />
        <Contact c={c} />
      </main>

      <Footer c={c} />
    </>
  )
}
