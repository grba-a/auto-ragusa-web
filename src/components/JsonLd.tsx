export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Podaci dolaze iz site.ts i content datoteka, nikad iz unosa korisnika,
      // pa ovdje nema injection vektora.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
