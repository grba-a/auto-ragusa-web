# Auto Ragusa

Web za Auto Ragusu, ovlašteni servis Peugeot i Citroën u Dubrovniku.
Next.js 16 (App Router) · Tailwind v4 · GSAP + ScrollTrigger · Lenis.

```bash
npm run dev     # http://localhost:3500
npm run build
```

## Koncept: RADNI NALOG 001, tiha verzija

Cijela stranica je **jedan radni nalog za vaše vozilo i ispunjava se dok ga
čitate**.

To nije kostim. Njihova prodajna poluga *jest* papir: ponuda prije radova, upis
u servisnu knjigu, račun i popis radova uz vraćeni ključ. To su tri dokumenta i
sva tri su obećanje da nema iznenađenja. Dokument je i najteži jezik za
falsificirati, jer traži stvarne podatke u stvarnoj hijerarhiji, a ovaj klijent
ih ima.

Forma na kraju nije zalijepljeni kontakt nego poanta: pročitate ispunjeni nalog,
na dnu dobijete prazan i potpišete ga. Koncept i konverzija su isti predmet.

**Jedna stranica po jeziku.** Podstranice su obrisane. `/usluge` i `/kontakt`
su imale ukupno četiri nove rečenice, a sve ostalo reciklirale s početne.

## Dizajnerski sustav

Tokeni su u `src/app/globals.css`, u `@theme` bloku.

| Token | Hex | Uloga |
|---|---|---|
| `paper` | `#f6f3ec` | jedini list |
| `ink` | `#14171a` | tekst, karbon blok |
| `ink-2` | `#585d63` | sekundarni tekst, 6.0:1 na papiru |
| `rule` | `#b9c4cf` | crtkana linija za upis |
| `edge` | `#cfc8ba` | obrub polja, podjela redova |
| `signal` | `#c10f1b` | **njihova stvarna crvena**: CTA, žig, živo „otvoreno" |

**Jedan list, ne tri.** Prva izvedba koncepta imala je tri nijanse papira,
trake, rotacije, perforaciju i ticker. Skeuomorfni dokument i minimalizam vuku
na suprotne strane, pa dokument sada ide kao švicarski tehnički obrazac.
Ritam nose layout i prazan prostor, ne nijanse.

**Crvena točno tri puta:** CTA, žig, živo „otvoreno". Nigdje drugdje.

Jedini tamni blok je **karbon**, kopija koja ostaje kod vas, i namjerno pada na
potpis, a ne na dekorativnu sekciju.

**Blok je polje, ne kartica.** Obrub 1px, a naziv polja sjedi *na* gornjoj
liniji i prekida je bojom lista, kao `legend` u stvarnom formularu.

**Oznaka smije postojati samo ako imenuje podatak.** Vrijednost u monu ide kroz
`spec` (bez verzala, bez širokog trackinga), jer `ulje, filteri, remenje` je
podatak a ne naziv polja.

**Radius 0 svugdje, nula sjena, nula tekstura papira kao slika.** Ako se ubaci
`paper.jpg`, smjer je mrtav.

**Tipografija.** `Geist Mono` nosi sve strukturalno: nazive polja, brojeve,
indeks i naslove. Mono na velikom formatu se čita kao ispis i ta jedna odluka
nosi pola koncepta. `Instrument Sans` nosi tekst u dužim blokovima. Oba imaju
`latin-ext`, provjereno. Klase: `doc-xl`, `doc-lg`, `doc-md`, `label`, `spec`, `tnum`.

## Struktura naloga

Sedam blokova, sedam različitih layout familija.

| # | Blok | Layout familija |
|---|---|---|
| 01 | Zaglavlje | mreža polja koja se ispunjavaju + prilog |
| 02 | Koraci | tabela, pet redova, žig |
| 03 | Opseg radova | ledger, devet pozicija |
| 04 | Prilozi | ploča i četiri fotografije, ravno |
| 05 | Ragusa | marginalije uz jedan odlomak |
| 06 | Potpis | prazan nalog, karbon |
| 07 | Kontakt | podaci, radno vrijeme, shematska karta |

Ugašeno: ticker (nula novih činjenica, a 32 od 112 oznaka) · blok „Dodatno"
(ušao u ledger) · blok klauzula (svaka je već bila u traci polja u zaglavlju) ·
zaseban blok radnog vremena (ušao u kontakt) · traka perforacije · trake i
rotacije na prilozima · satne oznake · zaglavlje tablice.

## Potpisni momenti

**Karbon kopija koja kasni.** Svaki veliki naslov ima duplikat u toniranoj
crvenoj, u `mix-blend-mode: multiply`. Offset duplikata vozi **brzina scrolla**,
ne pozicija: skrolate brzo i kopija se odvoji do 5px pa se raspozna kao drugi
list, stanete i uleti u registar u 260ms. Stranica se ne animira, stranica su
dva lista koja se međusobno ne stignu.

Ghost **mora** koristiti isti markup kao pravi tekst (`ui/SplitLines.tsx`).
Ako ghost renderira čist string a pravi tekst riječi u wrapperima, dvije verzije
se lome na različitim mjestima i kopija odleti stotinu piksela u stranu.

**Žig ODOBRENO.** Padne s rotacijom i prebačajem, tinta se razlije, i
istovremeno se kvačice u pet redova iznad zacrtaju. Od te točke polja u
dokumentu su ispunjena, prije nje su prazna. Kvačica je SVG `path` sa
`strokeDasharray = duljina puta`, pa ne treba `DrawSVG`.

Žig je tvrdnja **o dokumentu**. Nikad brojka, nikad ocjena, nikad recenzija.

## Animacije

Sve ide kroz `gsap.matchMedia()` u `src/lib/gsap.ts`:

- **≥768px, bez reduced motion:** karbon, upis vrijednosti, clip reveal
- **<768px:** samo fade i y. Karbon na 60Hz mobitelu titra
- **`prefers-reduced-motion: reduce`:** Lenis se ne pali uopće, karbon nestaje,
  upis se gasi pa vrijednost stoji odmah, sve je u finalnom stanju

Lenis vozi scroll, GSAP ticker vozi Lenis, `ScrollTrigger.update()` visi na
Lenisovom scroll eventu. Karbon se vozi odande jer je Lenisova `velocity` jedini
izvor brzine scrolla.

`window.__lenis` je izložen **samo u devu**, da vizualna provjera vodi scroll
kroz Lenis. Native `window.scrollTo` raspara Lenis i ScrollTrigger.

## Struktura koda

```
src/
  app/
    (hr)/  /        (en)/  /en        dvije route grupe samo zbog <html lang>
    api/termin/     ruta za formu
    sitemap.ts  robots.ts
  components/       blokovi + ui/ primitivi
  content/          hr.ts, en.ts, oboje tipizirano protiv types.ts
  lib/              site.ts (NAP) · gsap.ts · media.ts · routes.ts · schema.ts
  assets/raw/       netaknuti originali
  assets/img/       .webp koji se importaju
scripts/
  fetch-media.mjs   grade + webp pipeline
  shots.mjs         vizualna provjera
```

**Svi činjenični podaci su u `src/lib/site.ts`.** Adresa, telefoni, radno
vrijeme, marke, osiguravatelji. Mijenja se samo tamo; JSON-LD, podnožje, traka i
radno vrijeme čitaju odatle.

## Fotografije

**Na stranici su isključivo fotografije Auto Raguse.** Unsplash placeholderi su
izbačeni, ne zato što su bili loši kadrovi nego zato što su lagali o mjestu:
korak „vraćamo vozilo na vašu adresu" pokazivao je bijeli Lexus na izlazu iz
američke garaže s LED znakom `CAR COMING`. Tekst je bio hiperspecifičan za Gruž,
slika globalno generička, a posjetitelj vjeruje slici.

Koraci koji nemaju vjerodostojnu fotku sada nemaju nikakvu. Nose ih tipografija
i podaci, i to je poštenije.

Svih pet preostalih prolazi jedan color grade (`scripts/fetch-media.mjs`) pa
izgledaju kao jedan snimak. Logo ne prolazi grade.

## Provjera

```bash
node scripts/shots.mjs
```

Snima u `.shots/` na 1440 i 390. Cilj se **mjeri, ne procjenjuje okom**, pa
skripta ruši izvještaj ako se prekorači prag:

| Provjera | Prag | Sad |
|---|---|---|
| vidljivih riječi | 460 | **306** (prije 757) |
| riječnih `.label` oznaka | 40 | **36** (prije 112) |

Prag broji samo oznake koje su **riječ**. `08:00 - 16:00` i `03` su podatak u
monu, ne mikro-tag. Uz to: horizontalni scroll, broj redova u `h1`, em dashevi
(0), elementi zaglavljeni na `opacity: 0`, konzola.

Varijante: `--reduced`, `--url /en`.

## Što još treba klijent

1. **Vektorski logo** (`.svg`/`.ai`/`.eps`). Sada koristimo njihov PNG od 600px
   s postojećeg weba, dovoljan za traku i podnožje ali ne za veće formate.
   Zamjena ide u `src/components/Wordmark.tsx`.
2. **Ploču Ovlašteni partner u boljoj rezoluciji.** Njihova fotografija te ploče
   nosi službene Peugeot i Citroën znakove i zato je središnji prilog, ali je
   700px pa stoji u svojoj širini a ne preko cijelog pojasa. Te logotipe
   namjerno ne rekonstruiramo kao vektor, jer bi to prekršilo brand pravila.
3. **Fotografije po `SHOT-LISTA.md`.**
4. **Mail pristup** za formu. `src/app/api/termin/route.ts` sada validira i
   logira; slanje se pali dodavanjem `RESEND_API_KEY` u `.env.local` i pozivom
   na mjestu označenom `TODO(klijent)`.
5. **Potvrda točnih koordinata** ulaza. `site.address.lat/lon` su približna
   točka ulice Ćira Carića s OpenStreetMapa.
6. **Odluka o cijenama.** Nigdje nema cjenika, jer nemam potvrđene cijene i ne
   izmišljam ih.

## Napomene

- Ako `npm install` padne s `Invalid Version:`, obriši `package-lock.json`
  **pa** instaliraj s `--cache` u drugi dir. U tom redu.
- Ako se ikad vraća Unsplash: pipeline puca na `meta.plus === true`, jer se
  Unsplash+ fotke serviraju s vodenim žigom koji se vidi tek na renderu.
