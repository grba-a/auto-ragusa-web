import { NextResponse } from 'next/server'

/**
 * Zahtjev za termin.
 *
 * Trenutno samo validira i logira. Slanje maila se ukljucuje kad klijent
 * dostavi SMTP ili Resend kljuc: dodaj RESEND_API_KEY u .env.local i posalji
 * na info@auto-ragusa.hr na mjestu oznacenom nize.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const email = String(body.email ?? '').trim()

  if (name.length < 2 || phone.replace(/\D/g, '').length < 6) {
    return NextResponse.json({ error: 'validation' }, { status: 422 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'validation' }, { status: 422 })
  }

  const zahtjev = {
    name,
    phone,
    email: email || null,
    vehicle: String(body.vehicle ?? '').trim() || null,
    service: String(body.service ?? '').trim() || null,
    message: String(body.message ?? '').trim() || null,
    pickup: body.pickup === 'on' || body.pickup === true,
    receivedAt: new Date().toISOString(),
  }

  // TODO(klijent): posalji na info@auto-ragusa.hr kad dobijemo mail pristup.
  console.log('[termin]', zahtjev)

  return NextResponse.json({ ok: true })
}
