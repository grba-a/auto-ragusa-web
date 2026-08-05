/**
 * Naslov razlomljen na rijeci, svaka u vlastitoj maski.
 *
 * Karbon ghost MORA koristiti isti markup kao pravi tekst. Ako ghost renderira
 * cist string a pravi tekst rijeci u `inline-block` wrapperima s razmacima,
 * dvije verzije se lome na razlicitim mjestima i kopija odleti stotinu piksela
 * u stranu umjesto da kasni pet.
 */
export default function SplitLines({
  lines,
  animate = false,
}: {
  lines: readonly string[]
  /** Samo prava verzija nosi `data-word`, ghost se ne anima. */
  animate?: boolean
}) {
  return (
    <>
      {lines.map((line, i) => {
        const words = line.split(' ')
        return (
          <span key={i} className="block">
            {words.map((word, j) => (
              <span key={j} className="reveal-mask inline-block">
                <span {...(animate ? { 'data-word': '' } : {})} className="inline-block">
                  {word}
                </span>
                {j < words.length - 1 && (
                  <span className="inline-block w-[0.3em]" aria-hidden="true" />
                )}
              </span>
            ))}
          </span>
        )
      })}
    </>
  )
}
