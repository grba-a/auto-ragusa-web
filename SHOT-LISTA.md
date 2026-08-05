# Shot lista za Auto Ragusu

**Na webu su isključivo vaše fotografije.** Stock placeholderi su izbačeni jer
su lagali o mjestu: korak „vraćamo vozilo na vašu adresu" pokazivao je auto na
američkoj ulici. Blokovi koji nemaju vjerodostojnu fotku sada je nemaju uopće,
nose ih tipografija i podaci.

Zato svaki novi kadar koji dostavite ide **odmah na stranicu**, a ne zamjenjuje
placeholder.

Sve što dostavite prolazi kroz `node scripts/fetch-media.mjs`, koji radi
jedinstveni color grade preko cijelog seta pa fotke izgledaju kao jedan snimak,
a ne kao folder skupljan godinama.

## Što je već na stranici

| Datoteka | Gdje | Napomena |
|---|---|---|
| `ar-fasada.webp` | **Prilog 01** u zaglavlju, **Prilog 03** | 1680px, ulaz s vašim natpisima. Najvrjedniji kadar koji imate. |
| `ar-citroen-peugeot.webp` | **Prilog 02**, središnji | Ploča Ovlašteni partner sa službenim Peugeot i Citroën znakovima. Zbog nje te logotipe ne moramo rekonstruirati. 700px, zato stoji u svojoj širini. |
| `ar-boks.webp` | **Prilog 04** | 1920px, boks 1 s vozilom na dizalici |
| `ar-elektrika.webp` | **Prilog 05** | 700px, dijagnostika priključena na vozilo |
| `ar-vulkanizer.webp` | **Prilog 06** | 700px, vulkanizacija |
| `logo-ink` / `logo-light` | traka, podnožje, mobilni meni | Vaš logo s postojećeg weba, 600px transparentni PNG |

## Što treba snimiti

Telefon je dovoljan ako je **dnevno svjetlo i vrata radionice otvorena**. Bez
bljeskalice, bez filtera, bez portretnog moda. Snimajte **vodoravno**.

### Prioritet 1

| # | Kadar | Format | Zašto |
|---|---|---|---|
| 1 | Zaposlenik na telefonu za pultom prijama | 3:2 | Korak 01 „Dogovorite termin" nema fotku |
| 2 | Vaš zaposlenik ulazi u klijentovo vozilo na ulici | 3:2 | Korak 02, i to je glavna prodajna poluga |
| 3 | Ruke mehaničara na motoru, otvorena hauba, alat u kadru | 3:2 | Korak 04 „Radovi u ovlaštenom servisu" |
| 4 | Oprano vozilo pred zgradom, spremno za povrat | 3:2 | Korak 05 „Vraćamo vozilo" |
| 5 | **Zamjensko vozilo s vašom oznakom** | 3:2 | Najjači argument na stranici, a nema fotku |
| 6 | Vaše police s gumama, s oznakama klijenata | 3:2 | Sezonsko skladištenje |
| 7 | Ploča Ovlašteni partner u boljoj rezoluciji | 3:2 | Postojeća je 700px, radi ali je na granici |

### Prioritet 2

| # | Kadar | Format | Zašto |
|---|---|---|---|
| 8 | Cijela ekipa pred zgradom, dnevno svjetlo | 3:2 | Blok o Ragusi nema lica |
| 9 | Dijagnostički uređaj s čitljivim ekranom | 3:2 | Dokazuje ulaganje u opremu |
| 10 | Vozilo spremno za tehnički, s dokumentacijom | 3:2 | Blok „Dodatno na nalogu" |
| 11 | Detalj: uredna tabla s alatom ili pult prijama | 1:1 ili 3:2 | Detalji nose dojam preciznosti |
| 12 | Fasada u zlatnom satu, upaljena svjetla u boksu | 16:9 | Alternativni Prilog 01 |
| 13 | **Vaš logo u vektoru** (`.svg`, `.ai` ili `.eps`) | vektor | Sada koristimo PNG od 600px |

### Ako se snima video

Jedan kadar od 8-12 sekundi: vrata boksa se otvaraju, vozilo ulazi, statična
kamera na stativu. Bez zvuka, bez rezova.

**Kodiranje:** obavezno **H.264/AVC u `.mp4`**, ne HEVC. HEVC se na dijelu
desktop preglednika ne dekodira i kadar ostane crn.

## Kako ubaciti nove fotografije

1. Originale (bez ikakve obrade) stavite u `src/assets/raw/`.
2. U `scripts/fetch-media.mjs`, u listi `OWN`, dodajte red s imenom datoteke,
   ciljnom širinom i `bias` (`warm` ako je kadar hladan, `cool` ako je pod fluo
   svjetlom) da uđe u isti set.
3. Pokrenite `node scripts/fetch-media.mjs`.
4. U `src/lib/media.ts` dodajte slot.
5. Dopunite `attachments.items` u `src/content/hr.ts` i `en.ts` (potpis i alt).

Grade se **uvijek** radi iz `raw/`, nikad iz već izvezenog `.webp`, inače se
slaže sam na sebe i fotke posive.
