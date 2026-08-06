/**
 * Kucica na ugovoru: OTISNUTA prazna, ISPUNJENA rukom.
 *
 * Kvadrat je tanak i pravilan jer ga je otisnula tiskara. X je od dva poteza
 * koji nisu ravni, ne pocinju tocno u kutu i malo prelaze preko ruba, jer ga
 * je netko povukao kemijskom. Ta razlika je cijela ideja stranice u jednom
 * elementu velicine 24px.
 *
 * Potezi se crtaju kroz `tickBox` (src/lib/gsap.ts). Bez JS-a, i pod
 * `prefers-reduced-motion`, X je odmah tu i vidljiv - kucica je odkvacena,
 * ne prazna.
 */
export default function Checkbox({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-6 shrink-0 ${className}`} aria-hidden="true">
      {/* Otisnuto */}
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        fill="none"
        stroke="var(--color-edge)"
        strokeWidth="1.25"
      />

      {/* Upisano rukom. Blago zakrivljeni potezi, s prelazom preko ruba. */}
      <path
        data-mark
        d="M5.4 6.2 C 10 10.5, 14.5 15.2, 19.2 19.4"
        fill="none"
        stroke="var(--color-pen)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        data-mark
        d="M19.4 5.6 C 15 10.2, 10.2 14.8, 5.2 19.1"
        fill="none"
        stroke="var(--color-pen)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
