/**
 * Spajalica koja drzi prilog uz list.
 *
 * Jedini komad pribora na cijeloj stranici osim ziga. Namjerno: granica izmedu
 * "ugovor na stolu" i kica je kolicina rekvizita, ne njihovo postojanje. Nema
 * traga salice, gumice za papir ni olovke.
 *
 * Crta se kao jedna neprekinuta zica: vanjska petlja, pa unutarnja koja se
 * vraca. Sjena je jedna, mekana, jer zica lezi na papiru a ne iznad njega.
 */
export default function Clip({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 96"
      className={`h-20 w-8 ${className}`}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.28))' }}
    >
      <path
        d="M27 20 L27 68 C 27 78, 20 84, 14 84 C 8 84, 3 79, 3 71 L3 22 C 3 12, 10 5, 18 5 C 27 5, 34 12, 34 22 L34 70"
        fill="none"
        stroke="#9aa3ab"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
