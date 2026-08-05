'use client'

import DocTitle from './ui/DocTitle'
import Reveal from './ui/Reveal'
import type { SiteContent } from '@/content/types'

/**
 * "Ragusa je staro ime ovoga grada" je tipografska ideja, ne fotografska, pa
 * ovaj blok nema sliku.
 *
 * Godine i adresa su marginalije, biljeske na margini teksta, a ne stat
 * kartice s velikim brojevima.
 */
export default function Story({ c }: { c: SiteContent }) {
  return (
    <section id="o-nama" className="sheet py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <DocTitle as="h2" className="doc-xl max-w-[22ch] text-[clamp(1.9rem,5vw,4.2rem)] text-ink">
          {c.story.heading}
        </DocTitle>

        <Reveal className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-20">
          <dl data-reveal className="grid grid-cols-3 gap-6 lg:block lg:border-t lg:border-edge">
            {c.story.notes.map((note) => (
              <div key={note.label} className="lg:border-b lg:border-edge lg:py-5">
                <dt className="label mb-2">{note.label}</dt>
                <dd className="doc-md tnum text-lg text-ink">{note.value}</dd>
              </div>
            ))}
          </dl>

          <p
            data-reveal
            className="max-w-[62ch] text-lg leading-relaxed text-ink-2 lg:border-l lg:border-edge lg:pl-20 lg:text-xl"
          >
            {c.story.body}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
