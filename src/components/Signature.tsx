'use client'

import { useRef, useState } from 'react'
import { ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr'
import { Button } from './ui/Button'
import { Field, Input, Select, Textarea } from './ui/Field'
import { site } from '@/lib/site'
import type { SiteContent } from '@/content/types'

type Errors = Partial<Record<'name' | 'phone' | 'email', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Potpis naloga. Ovo je poanta koncepta, ne zalijepljena kontakt forma:
 * procitali ste ispunjeni nalog, na dnu dobijete prazan i potpisete ga.
 *
 * Jedini tamni blok na stranici, jer je ovo KARBON kopija, ona koja ostaje kod
 * vas. Tamna tema tako pada na najvazniji korak, a ne na dekorativnu sekciju.
 *
 * Dvije obavezne linije su vidljive odmah, ostalo je pod "dodaj detalje". Prosla
 * verzija je imala sest polja od kojih su cetiri nosila "(nije obavezno)", pa je
 * forma izgledala kao da se sama sebi izvinjava.
 */
export default function Signature({ c }: { c: SiteContent }) {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [expanded, setExpanded] = useState(false)

  function validateField(name: string, value: string): string | undefined {
    if (name === 'name') return value.trim().length < 2 ? c.booking.errors.name : undefined
    if (name === 'phone')
      return value.replace(/\D/g, '').length < 6 ? c.booking.errors.phone : undefined
    if (name === 'email' && value.trim()) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? undefined : c.booking.errors.email
    }
    return undefined
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const message = validateField(e.target.name, e.target.value)
    setErrors((prev) => ({ ...prev, [e.target.name]: message }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const next: Errors = {}
    for (const key of ['name', 'phone', 'email'] as const) {
      const message = validateField(key, String(data.get(key) ?? ''))
      if (message) next[key] = message
    }
    setErrors(next)

    if (Object.keys(next).length) {
      // Fokus na prvo nevalidno polje, ne samo crvena linija.
      const first = Object.keys(next)[0]
      if (first === 'email') setExpanded(true)
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/termin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="nalog" className="sheet-carbon py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <p className="label border-b border-white/20 pb-3 text-white/55">{c.booking.kind}</p>

        {status === 'sent' ? (
          <div className="py-16 text-center sm:py-24">
            <CheckCircle size={38} weight="light" aria-hidden="true" className="mx-auto text-signal-hot" />
            <h2 className="doc-lg mt-6 text-2xl text-white sm:text-3xl">
              {c.booking.successHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-base leading-relaxed text-white/70">
              {c.booking.successBody}
            </p>
            <a
              href={site.tel.landline.href}
              className="label tnum mt-8 inline-block border-b border-white/30 pb-1 text-white transition-colors hover:border-signal-hot"
            >
              {site.tel.landline.label}
            </a>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 className="doc-lg max-w-[18ch] text-[clamp(1.7rem,3.8vw,2.8rem)] text-white">
                {c.booking.heading}
              </h2>
              <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-white/70">
                {c.booking.lead}
              </p>

              <div className="mt-10 border-t border-white/20 pt-7">
                <p className="label mb-3 text-white/55">{c.contact.phoneLabel}</p>
                <a
                  href={site.tel.landline.href}
                  className="doc-md tnum block text-xl text-white transition-colors hover:text-signal-hot sm:text-2xl"
                >
                  {site.tel.landline.label}
                </a>
                <a
                  href={site.tel.mobile.href}
                  className="doc-md tnum mt-1 block text-xl text-white transition-colors hover:text-signal-hot sm:text-2xl"
                >
                  {site.tel.mobile.label}
                </a>
              </div>
            </div>

            <form ref={form} onSubmit={onSubmit} noValidate className="grid gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field id="name" label={c.booking.fields.name} required error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    onBlur={onBlur}
                    invalid={!!errors.name}
                  />
                </Field>

                <Field id="phone" label={c.booking.fields.phone} required error={errors.phone}>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    onBlur={onBlur}
                    invalid={!!errors.phone}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field id="message" label={c.booking.fields.message}>
                  <Textarea id="message" name="message" rows={3} />
                </Field>
              </div>

              {/* Detalji su skupljeni, jer forma s cetiri opcionalna polja
                  izgleda kao da se izvinjava. */}
              {expanded ? (
                <div className="grid gap-7 border-t border-white/15 pt-7 sm:grid-cols-2">
                  <Field
                    id="email"
                    label={c.booking.fields.email}
                    hint={c.booking.optional}
                    error={errors.email}
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      onBlur={onBlur}
                      invalid={!!errors.email}
                    />
                  </Field>

                  <Field id="vehicle" label={c.booking.fields.vehicle} hint={c.booking.optional}>
                    <Input
                      id="vehicle"
                      name="vehicle"
                      placeholder={c.booking.fields.vehiclePlaceholder}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field id="service" label={c.booking.fields.service} hint={c.booking.optional}>
                      <Select id="service" name="service" defaultValue="">
                        <option value="" disabled>
                          {c.booking.fields.servicePlaceholder}
                        </option>
                        {c.scope.items.map((item) => (
                          <option key={item.id} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="label w-fit border-b border-white/30 pb-1 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  + {c.booking.more}
                </button>
              )}

              <label className="flex cursor-pointer items-start gap-3 py-1">
                <input
                  type="checkbox"
                  name="pickup"
                  className="mt-0.5 size-4 shrink-0 accent-[var(--color-signal-hot)]"
                />
                <span className="text-sm leading-snug text-white/85">
                  {c.booking.fields.pickup}
                </span>
              </label>

              {status === 'error' && (
                <p
                  role="alert"
                  className="flex items-start gap-2 border border-signal-hot/45 bg-signal/15 p-4 text-sm leading-snug text-white"
                >
                  <WarningCircle
                    size={17}
                    weight="bold"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-signal-hot"
                  />
                  {c.booking.errorBody}
                </p>
              )}

              {/* Potpisna crta iznad tipke. */}
              <div className="mt-2">
                <div className="h-10 border-b border-white/30" aria-hidden="true" />
                <p className="label mt-2 text-white/55">{c.booking.signatureLine}</p>
              </div>

              <Button
                type="submit"
                variant="signal"
                disabled={status === 'sending'}
                className="group mt-2 w-full sm:w-fit"
              >
                {status === 'sending'
                  ? c.booking.sending
                  : status === 'error'
                    ? c.booking.retry
                    : c.booking.submit}
                {status !== 'sending' && (
                  <ArrowRight
                    size={15}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:translate-x-1"
                  />
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
