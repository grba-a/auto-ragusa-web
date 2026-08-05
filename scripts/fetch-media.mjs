/**
 * Media pipeline za Auto Ragusa.
 *
 *   raw (netaknuti original)  ->  color grade (puna velicina)  ->  resize  ->  .webp
 *
 * Originali se cacheiraju u src/assets/raw/ i grade se UVIJEK iz njih, nikad iz
 * vec izvezenog .webp, inace se grade slaze sam na sebe.
 *
 *   node scripts/fetch-media.mjs
 *
 * Na stranici su iskljucivo fotografije Auto Raguse. Unsplash placeholderi su
 * izbaceni: lagali su o mjestu (korak "vracamo vozilo na vasu adresu" je
 * pokazivao americku ulicu), a tekst je bio hiperspecifican za Gruz.
 */
import sharp from 'sharp'
import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const RAW = path.join(ROOT, 'src/assets/raw')
const OUT = path.join(ROOT, 'src/assets/img')

/* ---------------------------------------------------------------- grade ---
 * Jedan look preko cijelog seta: hladno-neutralno, blago desaturirano, matte.
 * Fotke tako sjede naspram tople podloge lista i ne otimaju se crvenoj.
 * `bias` je balans bijele po fotki, ne drugi look: fotka snimljena u drugom
 * svjetlu treba drugi bias da bi USLA u isti set.
 */
const COOL = [
  [0.94, 0.03, 0.03],
  [0.02, 0.96, 0.02],
  [0.02, 0.03, 1.0],
]
const WARM = [
  [1.0, 0.03, 0.02],
  [0.02, 0.96, 0.02],
  [0.03, 0.03, 0.94],
]

async function grade(buf, { bias = 'cool', saturation = 0.78, brightness = 1.01, linear = [0.94, 8] } = {}) {
  // Zrno ujednacuje fotke snimane razlicitim rukama. Composite trazi iste
  // dimenzije, pa grain nastaje na punoj velicini prije ikakvog resizea.
  const { data, info } = await sharp(buf)
    .modulate({ saturation, brightness })
    .linear(linear[0], linear[1])
    .recomb(bias === 'warm' ? WARM : COOL)
    .raw()
    .toBuffer({ resolveWithObject: true })

  const grain = await sharp({
    create: {
      width: info.width,
      height: info.height,
      channels: 3,
      background: '#808080',
      noise: { type: 'gaussian', mean: 128, sigma: 5 },
    },
  })
    .png()
    .toBuffer()

  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .composite([{ input: grain, blend: 'overlay' }])
    .png()
    .toBuffer()
}

/* ------------------------------------------------------------------ set --- */
// Vlastite fotografije Auto Raguse. Fasada je hladna i plosnata -> warm bias.
// Interijer je snimljen pod fluo svjetlom -> cool bias da bi usao u isti set.
const OWN = [
  { src: 'auto-ragusa-servis.jpg', file: 'ar-fasada', w: 1680, bias: 'warm', linear: [0.97, 4] },
  { src: 'brzi-servis-dubrovnik-autoragusa.jpg', file: 'ar-boks', w: 1920, bias: 'cool', saturation: 0.7 },
  { src: 'peugeot-autoragusa.jpg', file: 'ar-peugeot', w: 800 },
  { src: 'auto-elektrika-dubrovnik.jpg', file: 'ar-elektrika', w: 700 },
  { src: 'Citroen-Peugeot-AutoRagusa.jpg', file: 'ar-citroen-peugeot', w: 700 },
  { src: 'vulkanizer-auto-ragusa.jpg', file: 'ar-vulkanizer', w: 700 },
  { src: 'Servis-za-sve-marke-auta-800-x-480-px.jpg', file: 'ar-sve-marke', w: 700 },
  { src: 'car_repair_shop-07.jpg', file: 'ar-radionica', w: 800 },
]

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  )

await mkdir(RAW, { recursive: true })
await mkdir(OUT, { recursive: true })

const credits = []

for (const p of OWN) {
  const src = path.join(RAW, p.src)
  if (!(await exists(src))) {
    console.log(`SKIP (nema originala) ${p.src}`)
    continue
  }
  const graded = await grade(await readFile(src), {
    bias: p.bias,
    saturation: p.saturation,
    linear: p.linear,
  })
  const info = await sharp(graded)
    .resize({ width: p.w, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(path.join(OUT, `${p.file}.webp`))

  credits.push({ file: `${p.file}.webp`, kadar: p.src, izvor: 'Auto Ragusa (vlastita)' })
  console.log(`vlastita  ${p.file}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kB`)
}

await writeFile(path.join(OUT, 'CREDITS.json'), JSON.stringify(credits, null, 2))
console.log(`\n${credits.length} datoteka, sve vlastite. Vidi SHOT-LISTA.md.`)

/* ------------------------------------------------------------------ logo ---
 * Njihov stvarni logo s postojeceg weba (600x360, transparentan). Dostavljena
 * verzija je BIJELA, za tamnu podlogu. Za kamen se ista alpha maska prelije u
 * ink, pa se logo ne mijenja, samo boja.
 *
 * Logo NE prolazi kroz photo grade. Grade je za fotografije.
 */
const LOGO_SRC = path.join(RAW, 'autoragusa-dubrovnik-logo.png')

if (await exists(LOGO_SRC)) {
  const trimmed = await sharp(LOGO_SRC).trim({ threshold: 1 }).toBuffer()
  const { width, height } = await sharp(trimmed).metadata()

  await sharp(trimmed).webp({ quality: 92, effort: 6 }).toFile(path.join(OUT, 'logo-light.webp'))

  // Alpha kanal kao maska, ispod njega puna ink povrsina.
  const alpha = await sharp(trimmed).extractChannel('alpha').toBuffer()
  await sharp({ create: { width, height, channels: 3, background: '#16181a' } })
    .joinChannel(alpha)
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(OUT, 'logo-ink.webp'))

  console.log(`logo      logo-light.webp / logo-ink.webp  ${width}x${height}`)
} else {
  console.log('SKIP logo (nema autoragusa-dubrovnik-logo.png u raw/)')
}
