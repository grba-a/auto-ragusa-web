import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Oblici su ostri po cijeloj stranici: radius 0, bez pilula, bez sjena. Ovo je
 * dokument, ne aplikacija. `:active` daje scale(0.98) da tipka odgovara na
 * pritisak.
 */
const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none px-6 py-3.5 ' +
  'font-mono text-[0.8125rem] tracking-tight uppercase transition-[transform,background-color,color,border-color] ' +
  'duration-200 ease-[var(--ease-out-strong)] active:scale-[0.98] select-none'

const variants = {
  signal: 'bg-signal text-white hover:bg-signal-hot',
  ink: 'bg-ink text-sheet-1 hover:bg-ink-soft',
  outline: 'border border-edge text-ink hover:border-ink hover:bg-ink hover:text-sheet-1',
  outlineLight:
    'border border-white/25 text-sheet-1 hover:border-white hover:bg-white hover:text-ink',
} as const

type Variant = keyof typeof variants

export function Button({
  variant = 'signal',
  className = '',
  children,
  ...rest
}: ComponentProps<'button'> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'signal',
  className = '',
  href,
  children,
  ...rest
}: Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  variant?: Variant
  children: ReactNode
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  )
}
