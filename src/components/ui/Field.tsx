import type { ComponentProps, ReactNode } from 'react'

/**
 * Polje za upis na karbon kopiji. Label je UVIJEK iznad, nikad placeholder
 * umjesto labela. Greska ide ispod polja i najavljuje se citacima ekrana.
 *
 * Input nema okvir sa svih strana nego samo LINIJU ZA UPIS, kao na formularu.
 * To je jedina razlika prema obicnom inputu i nosi cijeli dojam.
 */
const control =
  'w-full rounded-none border-0 border-b bg-transparent px-0 py-2.5 text-base text-white ' +
  'placeholder:text-white/35 transition-colors duration-200 focus:outline-none'

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label flex items-baseline gap-2 text-white/55">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-signal-hot">
            *
          </span>
        ) : hint ? (
          <span className="tracking-normal normal-case opacity-70">({hint})</span>
        ) : null}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-xs leading-snug text-signal-hot">
          {error}
        </p>
      )}
    </div>
  )
}

export function Input({
  invalid,
  className = '',
  ...rest
}: ComponentProps<'input'> & { invalid?: boolean }) {
  return (
    <input
      className={`${control} ${invalid ? 'border-signal-hot' : 'border-white/25 focus:border-white'} ${className}`}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export function Textarea({
  invalid,
  className = '',
  ...rest
}: ComponentProps<'textarea'> & { invalid?: boolean }) {
  return (
    <textarea
      className={`${control} min-h-24 resize-y ${invalid ? 'border-signal-hot' : 'border-white/25 focus:border-white'} ${className}`}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export function Select({ className = '', ...rest }: ComponentProps<'select'>) {
  return (
    <select
      className={`${control} border-white/25 focus:border-white [&>option]:bg-ink [&>option]:text-white ${className}`}
      {...rest}
    />
  )
}
