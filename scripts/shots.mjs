/**
 * Vizualna provjera. Skrola kroz Lenis (ne native window.scrollTo, jer to
 * raspara Lenis i ScrollTrigger) i snima svaku sekciju na desktopu i mobilnom.
 *
 *   node scripts/shots.mjs                     # desktop + mobile
 *   node scripts/shots.mjs --reduced           # prefers-reduced-motion
 *   node scripts/shots.mjs --url /en           # druga ruta
 */
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, '.shots')
const argv = process.argv.slice(2)
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`)
  return i === -1 ? fallback : argv[i + 1]
}
const REDUCED = argv.includes('--reduced')
const ROUTE = arg('url', '/')
const BASE = 'http://localhost:3500'

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

/** Frakcije ukupne visine dokumenta na kojima snimamo. */
const STOPS = [0, 0.08, 0.16, 0.24, 0.33, 0.42, 0.52, 0.62, 0.72, 0.82, 0.92, 1]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const problems = []

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: REDUCED ? 'reduce' : 'no-preference',
  })
  const page = await context.newPage()

  // Konzola se prati SAMO do kraja pocetnog ucitavanja. Nakon toga skripta
  // skace po scrollu, pa Next prijavi da je neka slika ispod preloma postala
  // LCP, sto je artefakt mjerenja a ne greska na stranici.
  const consoleIssues = []
  let watching = true
  page.on('console', (m) => {
    if (watching && (m.type() === 'error' || m.type() === 'warning')) {
      consoleIssues.push(`[${m.type()}] ${m.text()}`)
    }
  })
  page.on('pageerror', (e) => consoleIssues.push(`[pageerror] ${e.message}`))

  await page.goto(BASE + ROUTE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2200) // ulazna animacija plus LCP prozor
  watching = false

  const suffix = `${vp.name}${REDUCED ? '-reduced' : ''}${ROUTE === '/' ? '' : ROUTE.replace(/\//g, '-')}`

  const docH = await page.evaluate(() => document.body.scrollHeight)

  for (const [i, frac] of STOPS.entries()) {
    const target = Math.round((docH - vp.height) * frac)
    await page.evaluate(async (y) => {
      const l = window.__lenis
      if (l) l.scrollTo(y, { immediate: true })
      else window.scrollTo({ top: y, behavior: 'instant' })
      // dva frejma da ScrollTrigger i Lenis stignu
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    }, target)
    await page.waitForTimeout(900)

    const file = path.join(OUT, `${suffix}-${String(i).padStart(2, '0')}-${target}.png`)
    await page.screenshot({ path: file })
  }

  // Automatske provjere koje oko lako promasi
  const checks = await page.evaluate(() => {
    const res = {}
    res.horizontalScroll = document.documentElement.scrollWidth > window.innerWidth + 1
    res.scrollWidth = document.documentElement.scrollWidth
    res.innerWidth = window.innerWidth

    const h1 = document.querySelector('h1')
    if (h1) {
      const lh = parseFloat(getComputedStyle(h1).lineHeight)
      res.h1Lines = Math.round(h1.getBoundingClientRect().height / lh)
      res.h1FontSize = getComputedStyle(h1).fontSize
    }

    // Elementi zaglavljeni na opacity 0 su najcesci gsap.from promasaj
    res.stuckHidden = [...document.querySelectorAll('[data-reveal],[data-cell],[data-head],[data-step]')]
      .filter((el) => {
        const b = el.getBoundingClientRect()
        const onScreen = b.top < window.innerHeight && b.bottom > 0
        return onScreen && parseFloat(getComputedStyle(el).opacity) < 0.05
      })
      .map((el) => el.tagName + '.' + String(el.className).slice(0, 50))

    // Em dash bilo gdje u vidljivom tekstu
    res.emDashes = (document.body.innerText.match(/[—–]/g) || []).length

    // Volumen. Cilj se mjeri, ne procjenjuje okom.
    res.words = document.body.innerText.split(/\s+/).filter((w) => w.length > 1).length
    res.labelsAll = document.querySelectorAll('.label').length
    // Prag se odnosi na oznake koje su RIJEC. Brojke i sati u monu su podatak.
    res.labels = [...document.querySelectorAll('.label')].filter((el) =>
      /[a-z\u00e0-\u017f]{3}/i.test(el.textContent ?? '')
    ).length

    // Crvena smije biti na tri obitelji: CTA, zig, zivo "otvoreno".
    const red = new Set()
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el)
      const hit = [cs.color, cs.backgroundColor, cs.borderTopColor, cs.fill].some((v) =>
        /rgb\(19[0-9], 1[0-9], 2[0-9]\)|rgb\(2[0-2][0-9], 3[0-9], 4[0-9]\)/.test(v)
      )
      if (hit && el.textContent?.trim()) red.add(el.tagName + ':' + el.textContent.trim().slice(0, 18))
    }
    res.redFamilies = [...red].slice(0, 12)

    return res
  })

  await writeFile(
    path.join(OUT, `${suffix}-report.json`),
    JSON.stringify({ checks, consoleIssues }, null, 2)
  )

  console.log(`\n=== ${suffix} ===`)
  console.log('horizontalScroll:', checks.horizontalScroll, `(${checks.scrollWidth} vs ${checks.innerWidth})`)
  console.log('h1:', checks.h1Lines, 'redova @', checks.h1FontSize)
  console.log('em dashes:', checks.emDashes)
  console.log('vidljivih rijeci:', checks.words, '(prag 460)')
  console.log('.label rijecnih:', checks.labels, '(prag 40, ukupno s brojkama ' + checks.labelsAll + ')')
  console.log('stuck opacity 0 na ekranu:', checks.stuckHidden.length, checks.stuckHidden.slice(0, 4))
  console.log('console:', consoleIssues.length ? consoleIssues.slice(0, 6) : 'cisto')

  if (checks.horizontalScroll) problems.push(`${suffix}: horizontalni scroll`)
  if (checks.h1Lines > 2) problems.push(`${suffix}: h1 ima ${checks.h1Lines} redova`)
  if (checks.emDashes) problems.push(`${suffix}: ${checks.emDashes} em dash`)
  if (checks.words > 460) problems.push(`${suffix}: ${checks.words} rijeci, prag je 460`)
  if (checks.labels > 40) problems.push(`${suffix}: ${checks.labels} rijecnih .label oznaka, prag je 40`)
  if (checks.stuckHidden.length) problems.push(`${suffix}: ${checks.stuckHidden.length} elemenata zaglavljeno na opacity 0`)
  if (consoleIssues.length) problems.push(`${suffix}: ${consoleIssues.length} console problema`)

  await context.close()
}

await browser.close()
console.log('\n' + (problems.length ? 'PROBLEMI:\n- ' + problems.join('\n- ') : 'Bez automatski uhvacenih problema.'))
console.log(`Snimke: ${OUT}`)
