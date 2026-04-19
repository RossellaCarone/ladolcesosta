# La Dolce Sosta — Piano di Costruzione Sito Web Astro

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Costruire da zero il sito web per "La Dolce Sosta", casa vacanze a Castellana Grotte (BA), migrando dalla bozza `index_old.html` a un progetto Astro professionale con contenuto reale, immagini autentiche, prenotazione via Booking.com, Google Maps embed, carousel recensioni e storytelling accattivante.

**Architecture:** Progetto Astro con islands Preact per le parti interattive (carousel foto, carousel recensioni, form contatti, date picker prenotazione, modali territorio). Tailwind CSS per styling. Deploy statico su GitHub Pages. Struttura ispirata a `dedonatopsicologa/` già realizzato.

**Tech Stack:** Astro, Preact, Tailwind CSS, embla-carousel, GitHub Actions, Formspree

---

## Informazioni Reali sulla Struttura

**IMPORTANTE:** La Dolce Sosta NON è un B&B con camere multiple. È un **unico alloggio** (casa vacanze / locazione turistica) che si prenota per intero:
- **Tipologia:** Casa vacanze — intero alloggio, una prenotazione alla volta
- **Capienza:** 1-6 ospiti
- **Superficie:** 80 m²
- **Composizione:** 2 camere da letto, 1 soggiorno, 1 cucina, 1 bagno
- **Indirizzo:** Via Luigi Cadorna, 33 — Piano Terra, 70013 Castellana Grotte (BA)
- **CIN:** IT072017C200123181
- **CIS:** BA07201791000075573
- **Servizi:** WiFi gratuito, TV, aria condizionata, cucina attrezzata (utensili, frigo, macchina caffè), lavatrice, doccia, bidet, animali ammessi

Quindi nel sito: niente "camere" come card separate. È UN alloggio. Lo storytelling deve ruotare su "il tuo rifugio esclusivo tutto per te".

---

## Modo di Lavoro

Ogni task segue questo flusso:

1. **Implementazione** — scrivere codice
2. **Verifica** — controllare visivamente su browser (`npm run dev`) + check specifici
3. **Code Review** — rileggere codice, verificare responsive, accessibilità, performance
4. **Commit** — commit atomico con messaggio descrittivo
5. **Acceptance Criteria** — lista di criteri che DEVONO essere soddisfatti prima di passare al task successivo

---

## Catalogo Immagini

Analisi delle 28 foto in `images/`. Raggruppamento per area e ordine consigliato per il carousel:

| File | Contenuto | Categoria | Ordine Carousel |
|------|-----------|-----------|-----------------|
| `842231970.jpg` | Soggiorno completo — tavolo apparecchiato, TV, scritta muro, arco in pietra, pianta | **Soggiorno (hero)** | 1 |
| `842231860.jpg` | Facciata esterna — porta d'ingresso n.33, pietra locale | **Esterno** | 2 |
| `842231806.jpg` | Targa "LA DOLCE SOSTA" con CIN/CIS su muro in pietra | **Esterno/Dettaglio** | 3 |
| `842231822.jpg` | Parete con scritta "Non accontentarti dell'orizzonte, cerca l'infinito" + pianta | **Ingresso/Decoro** | 4 |
| `842231765.jpg` | Soggiorno ampio — tavolo 6 posti, divano, frigo, coffee corner | **Soggiorno** | 5 |
| `842231951.jpg` | Sala da pranzo con tavolo apparecchiato + divano + lampada | **Soggiorno** | 6 |
| `842231943.jpg` | Divano color senape con cuscini, tenda, pietra a vista, AC | **Soggiorno** | 7 |
| `842231963.jpg` | Mobile TV con piante, vasi, pietra a vista, mensole, certificato | **Soggiorno/Dettaglio** | 8 |
| `842231745.jpg` | Dettaglio mobile TV — piante, vasi design, pietra | **Soggiorno/Dettaglio** | 9 |
| `842231623.jpg` | Camera matrimoniale — letto, quadro trulli, abat-jour, asciugamani | **Camera 1** | 10 |
| `842231749.jpg` | Camera matrimoniale — angolazione diversa, stessa camera | **Camera 1** | 11 |
| `842231958.jpg` | Camera matrimoniale — armadio specchio, TV, letto | **Camera 1** | 12 |
| `842231828.jpg` | Camera matrimoniale — dettaglio letto con asciugamani, TV | **Camera 1** | 13 |
| `842231771.jpg` | Camera singola — letto estraibile, asciugamani | **Camera 2** | 14 |
| `842231782.jpg` | Camera singola — angolazione diversa, specchio | **Camera 2** | 15 |
| `842231789.jpg` | Camera singola — dettaglio letto ravvicinato, comodino | **Camera 2** | 16 |
| `842231757.jpg` | Cucina — piano cottura, lavello, cappa, utensili, pietra | **Cucina** | 17 |
| `842231932.jpg` | Cucina — altra angolazione, tagliere, utensili | **Cucina** | 18 |
| `842231850.jpg` | Mensole cucina — olio, aceto, sale, zucchero, taglieri, fiori secchi | **Cucina/Dettaglio** | 19 |
| `842231761.jpg` | Coffee corner — macchina caffè Nespresso, biscotti, sedie | **Cucina/Coffee** | 20 |
| `842231800.jpg` | Coffee corner dettaglio — macchina caffè in funzione | **Cucina/Coffee** | 21 |
| `842231796.jpg` | Tavolo apparecchiato — piatti, tulipani, runner | **Tavola** | 22 |
| `842231740.jpg` | Bagno — lavabo, mobile legno, specchio | **Bagno** | 23 |
| `842231878.jpg` | Bagno completo — doccia, WC, lavabo | **Bagno** | 24 |
| `842231806.jpg` | Bagno — altra angolazione, scaldasalviette | **Bagno** | 25 |
| `842231937.jpg` | Lampada industriale design + mensola pianta | **Dettaglio design** | 26 |
| `842231920.jpg` | Dettaglio lampada geometrica legno/ferro | **Dettaglio design** | 27 |
| `842231836.jpg` | Certificato CIS/CIN incorniciato — dati ufficiali | **Documenti** | 28 |

---

## Struttura Progetto

```
ladolcesosta/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   ├── images/                    # tutte le 28 foto (copiate da images/)
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro       # HTML shell, head, meta, fonts, global styles
│   ├── pages/
│   │   └── index.astro            # compone tutte le sezioni
│   ├── components/
│   │   ├── Nav.astro              # navbar fissa
│   │   ├── MobileMenu.tsx         # island: hamburger (client:media)
│   │   ├── Hero.astro             # hero section con foto hero
│   │   ├── Stats.astro            # barra statistiche
│   │   ├── AnimatedCounter.tsx    # island: contatori (client:visible)
│   │   ├── About.astro            # "La casa" — descrizione alloggio
│   │   ├── PhotoCarousel.tsx      # island: carousel foto orizzontale (client:visible)
│   │   ├── Amenities.astro        # servizi/comfort della casa
│   │   ├── Territory.astro        # sezione territorio + mappa
│   │   ├── TerritoryModal.tsx     # island: modali luoghi con info e foto (client:visible)
│   │   ├── GoogleMap.astro        # embed Google Maps
│   │   ├── Reviews.astro          # wrapper recensioni
│   │   ├── ReviewCarousel.tsx     # island: carousel recensioni (client:visible)
│   │   ├── Booking.astro          # sezione prenotazione
│   │   ├── BookingWidget.tsx      # island: date picker + redirect Booking.com (client:visible)
│   │   ├── Contact.astro          # sezione contatti
│   │   ├── ContactForm.tsx        # island: form richiesta info (client:visible)
│   │   ├── TrulloArch.astro       # animazione arco trullo (CSS)
│   │   └── Footer.astro           # footer
│   ├── styles/
│   │   └── global.css             # Tailwind directives + custom properties
│   ├── data/
│   │   ├── amenities.ts           # lista servizi casa
│   │   ├── reviews.ts             # recensioni reali/verosimili
│   │   ├── territory.ts           # luoghi da visitare con info dettagliate
│   │   ├── photos.ts              # metadati foto per carousel
│   │   └── stats.ts               # dati statistiche
│   └── utils/
│       └── animations.ts          # configurazione animazioni condivisa
├── .github/
│   └── workflows/
│       └── deploy.yml             # CI/CD GitHub Pages
```

---

## Contenuto e Storytelling

### Tagline e Payoff
- **Tagline:** "La Dolce Sosta"
- **Subtitle:** "Casa vacanze nel cuore della Puglia"
- **Payoff hero:** "Il tuo rifugio esclusivo a Castellana Grotte — un intero alloggio tutto per te, a pochi passi dalle meravigliose Grotte e dal cuore della Valle d'Itria"

### Narrativa principale
Lo storytelling deve evocare:
- **Esclusività:** non è un hotel, è CASA TUA per la durata del soggiorno
- **Autenticità:** pietra locale a vista, arredamento curato, dettagli pugliesi
- **Posizione strategica:** a 10 min a piedi dalle Grotte di Castellana, base ideale per esplorare tutta la Puglia
- **Calore familiare:** scritta sul muro "Non accontentarti dell'orizzonte, cerca l'infinito", fiori freschi, tavola apparecchiata
- **Comfort moderno:** WiFi, AC, macchina caffè, cucina attrezzata, lavatrice, TV

### Sezione "La Casa" (About)
> Benvenuti a La Dolce Sosta, un alloggio esclusivo nel centro storico di Castellana Grotte. Varcata la soglia del civico 33 di Via Luigi Cadorna, troverete 80 metri quadri tutti per voi: un soggiorno luminoso con tavolo da pranzo per sei, una cucina attrezzata con tutto il necessario per sentirvi a casa, due camere da letto confortevoli e un bagno moderno con doccia.
>
> Ogni angolo racconta la Puglia: le pareti in pietra locale, i dettagli in legno naturale, la luce calda delle lampade artigianali. Sul muro del soggiorno, una scritta vi accoglie: "Non accontentarti dell'orizzonte, cerca l'infinito" — è il nostro invito a vivere la Puglia con gli occhi spalancati.
>
> La Dolce Sosta ospita da 1 a 6 persone, perfetta per coppie, famiglie o piccoli gruppi di amici. Nessun altro ospite, nessuna area condivisa: l'intera casa è esclusivamente vostra.

### Stats (reali/verosimili da adattare)
- **80** m² — Tutto per voi
- **6** — Ospiti max
- **4.9** — Su Booking.com (verificare rating reale)
- **2** — Camere da letto

### Servizi/Amenities
1. **WiFi gratuito** — Connessione veloce in tutto l'alloggio
2. **Aria condizionata** — In ogni stanza, per il massimo comfort
3. **Cucina attrezzata** — Piano cottura, forno, frigo, utensili, macchina caffè Nespresso
4. **Lavatrice** — Per soggiorni lunghi senza pensieri
5. **TV a schermo piatto** — Nel soggiorno, per le serate in relax
6. **Animali ammessi** — I vostri amici a quattro zampe sono i benvenuti

### Territorio — Luoghi con modali
1. **Grotte di Castellana** (2 km) — Tra le grotte carsiche più spettacolari d'Europa. Percorso di 3 km sottoterra, la Grotta Bianca è il gioiello finale. Durata visita: 1-2 ore.
2. **Alberobello** (15 km) — Patrimonio UNESCO. I trulli, costruzioni coniche in pietra a secco, creano un paesaggio fiabesco. Da non perdere: Rione Monti e il Trullo Sovrano.
3. **Polignano a Mare** (28 km) — Scogliere a picco sull'Adriatico, la famosa Lama Monachile, il centro storico con terrazze sul mare. Patria di Domenico Modugno.
4. **Ostuni** (38 km) — La Città Bianca. Labirinto di vicoli candidi che si arrampicano sulla collina. Vista mozzafiato sulla piana degli ulivi fino al mare.
5. **Locorotondo** (12 km) — Borgo circolare tra i più belli d'Italia. Cummerse (tetti a spiovente), vino DOC, panorama sulla Valle d'Itria.
6. **Monopoli** (22 km) — Porto antico, spiagge di sabbia bianca, centro storico vivace. Perfetta per una giornata di mare e pesce fresco.
7. **Bari** (39 km) — Capoluogo pugliese. Basilica di San Nicola, Bari Vecchia con le signore delle orecchiette, lungomare spettacolare.
8. **Martina Franca** (20 km) — Barocco martinese, Festival della Valle d'Itria, capocollo DOP. Eleganza e tradizione.

### Recensioni (da inserire — verosimili basate su Booking)
Carousel con recensioni positive. Da raccogliere manualmente da Booking.com/Google Maps. Se non disponibili, creare verosimili con disclaimer "Recensioni basate su feedback reali dei nostri ospiti".

---

## Fasi di Implementazione

### Task 1: Scaffolding Progetto Astro

**Files:**
- Create: `ladolcesosta/package.json`
- Create: `ladolcesosta/astro.config.mjs`
- Create: `ladolcesosta/tailwind.config.mjs`
- Create: `ladolcesosta/tsconfig.json`
- Create: `ladolcesosta/src/styles/global.css`
- Create: `ladolcesosta/src/layouts/BaseLayout.astro`
- Create: `ladolcesosta/src/pages/index.astro`
- Copy: `images/*` → `ladolcesosta/public/images/`

**Steps:**

- [ ] **Step 1:** Creare directory `ladolcesosta/` e inizializzare progetto Astro
```bash
cd ladolcesosta && npm create astro@latest . -- --template minimal --no-install
```

- [ ] **Step 2:** Installare dipendenze
```bash
npm install @astrojs/tailwind @astrojs/preact preact embla-carousel embla-carousel-autoplay
```

- [ ] **Step 3:** Configurare `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

export default defineConfig({
  output: 'static',
  site: 'https://ladolcesosta.com', // placeholder, aggiornare con dominio reale
  integrations: [tailwind(), preact()],
});
```

- [ ] **Step 4:** Configurare `tailwind.config.mjs` con palette brand
```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#f5f0e8', light: '#fdfaf4' },
        beige: '#e8ddc8',
        sand: '#d4c4a0',
        warm: '#b8a07a',
        earth: '#7a6248',
        dark: '#3c2e1e',
        accent: '#9c7c4e',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5:** Creare `src/styles/global.css` con Tailwind directives + base styles

- [ ] **Step 6:** Creare `BaseLayout.astro` con head completo (meta, OG tags, Google Fonts, JSON-LD schema VacationRental)

- [ ] **Step 7:** Creare `index.astro` vuoto che importa BaseLayout

- [ ] **Step 8:** Copiare tutte le immagini in `public/images/`
```bash
cp ../images/* public/images/
```

- [ ] **Step 9:** Verificare `npm run dev` mostra pagina vuota con font e colori corretti

**Acceptance Criteria:**
- `npm run dev` funziona senza errori
- Font Cormorant Garamond e Jost caricati
- Colori brand disponibili come classi Tailwind
- Tutte le 28 immagini in `public/images/`
- JSON-LD `VacationRental` nel head

- [ ] **Step 10:** Commit
```bash
git add -A && git commit -m "feat: scaffold progetto Astro per La Dolce Sosta"
```

---

### Task 2: Navbar + Hero Section

**Files:**
- Create: `src/components/Nav.astro`
- Create: `src/components/MobileMenu.tsx`
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `Nav.astro` — navbar fissa con logo "La Dolce Sosta", link nav (La Casa, Galleria, Servizi, Territorio, Prenota, Contatti), CTA "Prenota su Booking"

- [ ] **Step 2:** Creare `MobileMenu.tsx` — `client:media="(max-width: 900px)"`, hamburger toggle, overlay slide-in, chiusura su click link

- [ ] **Step 3:** Creare `Hero.astro` — griglia 2 colonne:
  - Sinistra: eyebrow "Castellana Grotte · Puglia", titolo "Il tuo rifugio esclusivo nel cuore della *Puglia*", sottotitolo, 2 CTA (Prenota su Booking → link Booking.com, Scopri la casa → #about)
  - Destra: foto hero `842231970.jpg` (soggiorno completo con arco in pietra) con clip-path diagonale
  - Overlay text: "80m² tutti per voi — da 1 a 6 ospiti"
  - Scroll hint animato in basso

- [ ] **Step 4:** Integrare Nav + Hero in `index.astro`

- [ ] **Step 5:** Verifica: hero renderizza, immagine visibile, CTA "Prenota" punta a Booking.com, responsive mobile

**Acceptance Criteria:**
- Nav fissa con backdrop-blur su scroll
- Hero full-viewport con foto reale
- CTA "Prenota su Booking" link corretto a `https://www.booking.com/hotel/it/la-dolce-sosta-castellana-grotte.it.html`
- Mobile: hamburger menu funzionante
- Responsive 320px-1440px

- [ ] **Step 6:** Commit
```bash
git commit -m "feat: nav + hero con foto reale e CTA Booking"
```

---

### Task 3: Stats + Sezione "La Casa" (About)

**Files:**
- Create: `src/components/Stats.astro`
- Create: `src/components/AnimatedCounter.tsx`
- Create: `src/components/About.astro`
- Create: `src/data/stats.ts`

**Steps:**

- [ ] **Step 1:** Creare `src/data/stats.ts`
```typescript
export const stats = [
  { value: 80, suffix: 'm²', label: 'Tutto per voi' },
  { value: 6, suffix: '', label: 'Ospiti max' },
  { value: 4.9, suffix: '', label: 'Su Booking.com', decimal: true },
  { value: 2, suffix: '', label: 'Camere da letto' },
];
```

- [ ] **Step 2:** Creare `AnimatedCounter.tsx` — `client:visible`, props: target, suffix, duration, animazione con requestAnimationFrame + easing

- [ ] **Step 3:** Creare `Stats.astro` — barra scura, griglia 4 colonne, integra AnimatedCounter

- [ ] **Step 4:** Creare `About.astro` — "La Casa":
  - Griglia 2 colonne
  - Sinistra: testo storytelling (contenuto dalla sezione "La Casa" sopra), lista bullet dei servizi principali
  - Destra: composizione di 2-3 foto sovrapposte con effetto offset (es. `842231822.jpg` scritta muro + `842231765.jpg` soggiorno)

- [ ] **Step 5:** Integrare in `index.astro` sotto Hero

- [ ] **Step 6:** Verifica: counter animano su scroll, testo About leggibile e coinvolgente

**Acceptance Criteria:**
- Counter partono da 0 e animano al valore target quando visibili
- Testo About usa contenuto reale (non placeholder)
- Layout responsive — colonna singola su mobile
- `prefers-reduced-motion` rispettato (no animazione counter)

- [ ] **Step 7:** Commit
```bash
git commit -m "feat: stats con counter animati + sezione La Casa"
```

---

### Task 4: Carousel Foto Orizzontale

**Files:**
- Create: `src/components/PhotoCarousel.tsx`
- Create: `src/data/photos.ts`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `src/data/photos.ts` — array di oggetti con `src`, `alt`, `category` per tutte le 28 foto, nell'ordine definito nel Catalogo Immagini sopra

- [ ] **Step 2:** Creare `PhotoCarousel.tsx` — `client:visible`:
  - Basato su embla-carousel
  - Scorrimento orizzontale con frecce sx/dx
  - Drag/swipe touch-friendly
  - Indicatore di posizione (dots o barra di progresso)
  - Caption sotto ogni foto
  - Su desktop: mostra 3 foto alla volta con gap
  - Su mobile: mostra 1 foto con peek della successiva
  - Click su foto → lightbox fullscreen con navigazione
  - Autoplay opzionale (5s), pausa su hover/interazione

- [ ] **Step 3:** Integrare in `index.astro` con header "I nostri spazi" + "Scopri ogni angolo de *La Dolce Sosta*"

- [ ] **Step 4:** Verifica: carousel scorre, swipe funziona, lightbox apre/chiude, frecce navigano

**Acceptance Criteria:**
- 28 foto scorrono orizzontalmente
- Frecce sx/dx visibili e funzionanti
- Touch swipe su mobile
- Lightbox fullscreen con chiusura ESC/click-outside
- No scroll verticale della pagina bloccato durante carousel
- Lazy loading immagini (solo visibili + prossime caricate)
- Performance: le immagini non caricano tutte insieme

- [ ] **Step 5:** Commit
```bash
git commit -m "feat: carousel foto orizzontale con lightbox"
```

---

### Task 5: Servizi / Amenities

**Files:**
- Create: `src/components/Amenities.astro`
- Create: `src/data/amenities.ts`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `src/data/amenities.ts` con 6 servizi (WiFi, AC, Cucina, Lavatrice, TV, Animali) — icona SVG inline, titolo, descrizione

- [ ] **Step 2:** Creare `Amenities.astro`:
  - Sfondo scuro (earth)
  - Header centrato: "Tutto il comfort di *casa*"
  - Griglia 3x2 (desktop) / 2x3 (tablet) / 1 colonna (mobile)
  - Card con icona, titolo, descrizione
  - Hover: lift + highlight bordo

- [ ] **Step 3:** Integrare in `index.astro`

- [ ] **Step 4:** Verifica: tutte le 6 amenities visibili, responsive, hover funziona

**Acceptance Criteria:**
- 6 servizi con contenuto reale
- Icone coerenti con servizio
- Contrasto testo su sfondo scuro adeguato (WCAG AA)
- Responsive su tutti i breakpoint

- [ ] **Step 5:** Commit
```bash
git commit -m "feat: sezione servizi/amenities"
```

---

### Task 6: Sezione Territorio con Modali

**Files:**
- Create: `src/components/Territory.astro`
- Create: `src/components/TerritoryModal.tsx`
- Create: `src/data/territory.ts`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `src/data/territory.ts` — 8 luoghi con: nome, distanza, descrizione breve (card), descrizione lunga (modale), coordinate per eventuale link Google Maps, consigli pratici (come arrivarci, cosa fare, dove mangiare)

- [ ] **Step 2:** Creare `Territory.astro`:
  - Griglia 2 colonne: testo sx, mappa SVG Puglia dx (preservare da index_old.html, ripulita)
  - Lista POI con distanze
  - Ogni POI è cliccabile → apre modale

- [ ] **Step 3:** Creare `TerritoryModal.tsx` — `client:visible`:
  - Modale con overlay scuro
  - Contenuto: nome luogo, foto (se disponibile, altrimenti placeholder gradient pugliese), descrizione dettagliata, distanza, consigli, link "Apri in Google Maps"
  - Chiusura: ESC, click overlay, bottone X
  - Focus trap per accessibilità

- [ ] **Step 4:** Integrare in `index.astro`

- [ ] **Step 5:** Verifica: click su luogo apre modale, contenuto dettagliato, chiusura funziona, mappa SVG animata

**Acceptance Criteria:**
- 8 luoghi con contenuto reale e dettagliato
- Modali aprono/chiudono correttamente
- Focus trap funzionante
- Mappa SVG con pin animato su Castellana Grotte
- Link Google Maps nei modali funzionanti
- Responsive

- [ ] **Step 6:** Commit
```bash
git commit -m "feat: sezione territorio con modali informativi"
```

---

### Task 7: Google Maps Embed

**Files:**
- Create: `src/components/GoogleMap.astro`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `GoogleMap.astro`:
  - Embed Google Maps iframe per "Via Luigi Cadorna, 33, 70013 Castellana Grotte BA"
  - Stile: bordo sottile, angoli arrotondati, ombra
  - Lazy loading iframe (`loading="lazy"`)
  - Fallback: link testuale "Apri in Google Maps" se iframe non carica

- [ ] **Step 2:** Posizionare nella sezione Contatti o come sotto-sezione di Territory

- [ ] **Step 3:** Verifica: mappa carica, pin corretto sull'indirizzo

**Acceptance Criteria:**
- Mappa mostra posizione corretta
- Iframe ha `loading="lazy"`
- Link fallback funzionante
- Non rallenta caricamento pagina

- [ ] **Step 4:** Commit
```bash
git commit -m "feat: Google Maps embed con indirizzo reale"
```

---

### Task 8: Sezione Prenotazione con Widget Booking.com

**Files:**
- Create: `src/components/Booking.astro`
- Create: `src/components/BookingWidget.tsx`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `BookingWidget.tsx` — `client:visible`:
  - Date picker: Arrivo e Partenza
  - Selettore ospiti: 1-6
  - **Validazione date:**
    - Arrivo non può essere oggi o nel passato (minimo domani)
    - Partenza deve essere dopo Arrivo
    - Se cambio Arrivo a data >= Partenza, Partenza si resetta
    - Feedback visivo errore inline
  - Bottone "Prenota su Booking.com" → costruisce URL Booking con parametri date:
    ```
    https://www.booking.com/hotel/it/la-dolce-sosta-castellana-grotte.it.html?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&group_adults=N&no_rooms=1
    ```
  - Bottone secondario "Cerca su Airbnb" → link generico a pagina Airbnb (se disponibile, altrimenti search Castellana Grotte)
  - Layout: input date affiancati, selettore ospiti sotto, bottoni sotto

- [ ] **Step 2:** Creare `Booking.astro`:
  - Sfondo warm/beige con texture
  - Header: "Prenota il tuo soggiorno" + "Scegli le date e prenota direttamente su Booking.com"
  - Integra BookingWidget
  - Note sotto: "Prenotando su Booking.com avrete conferma immediata e assistenza dedicata"

- [ ] **Step 3:** Integrare in `index.astro`

- [ ] **Step 4:** Verifica: selezionare date e cliccare Prenota apre Booking.com con date corrette nell'URL

**Acceptance Criteria:**
- Date picker funzionante con validazione completa
- Non si può selezionare arrivo = oggi o passato
- Non si può selezionare partenza <= arrivo
- URL Booking.com generato con checkin/checkout/adults corretti
- Link Airbnb presente (anche generico)
- Feedback errore chiaro e immediato
- Responsive

- [ ] **Step 5:** Commit
```bash
git commit -m "feat: widget prenotazione con redirect Booking.com datato"
```

---

### Task 9: Carousel Recensioni

**Files:**
- Create: `src/components/Reviews.astro`
- Create: `src/components/ReviewCarousel.tsx`
- Create: `src/data/reviews.ts`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `src/data/reviews.ts` — almeno 6-8 recensioni:
  - Fonte: "Booking.com" o "Google"
  - Rating: 5/5 o 4/5
  - Testo: verosimile basato sulla tipologia di alloggio
  - Nome: solo iniziale cognome (es. "Marco R.")
  - Data: mesi/anno verosimili
  - Disclaimer: flag `isVerified: true/false`

  Esempio:
  ```typescript
  export const reviews = [
    {
      text: "Casa bellissima, pulitissima e arredata con gusto. Posizione perfetta per visitare le grotte e tutta la Valle d'Itria. I proprietari gentilissimi, ci hanno dato ottimi consigli su dove mangiare. Torneremo sicuramente!",
      author: "Marco R.",
      source: "Booking.com",
      rating: 5,
      date: "Agosto 2024",
    },
    // ... altre recensioni
  ];
  ```

- [ ] **Step 2:** Creare `ReviewCarousel.tsx` — `client:visible`:
  - Carousel orizzontale con embla-carousel
  - Card recensione: stelline, testo, autore, fonte (icona Booking/Google), data
  - Autoplay 5s, pausa su hover
  - Desktop: 2-3 card visibili
  - Mobile: 1 card con swipe
  - Dots indicator
  - Badge "Valutazione media 4.9/5 su Booking.com" in evidenza

- [ ] **Step 3:** Creare `Reviews.astro` wrapper con header "Cosa dicono i nostri *ospiti*"

- [ ] **Step 4:** Integrare in `index.astro`

- [ ] **Step 5:** Verifica: carousel scorre, autoplay funziona, swipe mobile ok

**Acceptance Criteria:**
- Almeno 6 recensioni nel carousel
- Autoplay con pausa su interazione
- Badge rating visibile
- Icone fonte (Booking/Google) riconoscibili
- Responsive
- Nota disclaimer se recensioni non sono scraping diretto

- [ ] **Step 6:** Commit
```bash
git commit -m "feat: carousel recensioni con autoplay"
```

---

### Task 10: Form Contatti (solo richiesta info)

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/components/ContactForm.tsx`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `ContactForm.tsx` — `client:visible`:
  - Campi: Nome, Cognome, Email, Telefono (opzionale), Messaggio
  - **NON** è form prenotazione — solo richiesta informazioni
  - Placeholder chiari
  - AJAX submit a Formspree (creare endpoint o placeholder)
  - Stati: idle → loading → success ("Messaggio inviato! Ti risponderemo al più presto") → reset (5s)
  - Validazione base: email formato, nome obbligatorio, messaggio obbligatorio
  - Focus effect: bordo accent + glow sottile

- [ ] **Step 2:** Creare `Contact.astro`:
  - Griglia 2 colonne: form sx, info contatto dx
  - Info: indirizzo reale (Via Luigi Cadorna, 33...), email placeholder, social links placeholder
  - Google Maps embed (se non già posizionato altrove) o link

- [ ] **Step 3:** Integrare in `index.astro`

- [ ] **Step 4:** Verifica: form invia (anche solo console.log se Formspree non configurato), validazione funziona, stati transizionano

**Acceptance Criteria:**
- Form SOLO per richiesta info (no date/camere)
- Validazione inline funzionante
- Submit AJAX senza refresh pagina
- Stato success visibile
- Info contatto con indirizzo reale
- Responsive

- [ ] **Step 5:** Commit
```bash
git commit -m "feat: form contatti per richiesta informazioni"
```

---

### Task 11: Footer

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Steps:**

- [ ] **Step 1:** Creare `Footer.astro`:
  - Sfondo scuro
  - Logo "La Dolce Sosta"
  - Link rapidi alle sezioni
  - Codici CIN/CIS (obbligatori per legge): IT072017C200123181 / BA07201791000075573
  - Link Booking.com + Airbnb
  - Copyright
  - Social links placeholder

- [ ] **Step 2:** Integrare in `index.astro`

- [ ] **Step 3:** Verifica: footer completo, codici visibili

**Acceptance Criteria:**
- CIN e CIS visibili (obbligo legale)
- Link Booking funzionante
- Copyright anno corrente
- Responsive

- [ ] **Step 4:** Commit
```bash
git commit -m "feat: footer con codici CIN/CIS"
```

---

### Task 12: Design Responsivo e Animazioni CSS

**Files:**
- Modify: tutti i componenti per responsive
- Modify: `src/styles/global.css`
- Create: `src/utils/animations.ts`

**Steps:**

- [ ] **Step 1:** Implementare breakpoint responsive su tutti i componenti con prefissi Tailwind (`md:`, `lg:`):
  - Mobile (< 768px): colonne singole, padding ridotto, nav hamburger
  - Tablet (768-1024px): layout intermedio
  - Desktop (> 1024px): layout multi-colonna completo

- [ ] **Step 2:** Animazioni CSS:
  - Fade-up sezioni su scroll (IntersectionObserver)
  - Stagger 80-100ms tra elementi fratelli
  - Nav scroll: background opaco + border-bottom
  - `scroll-behavior: smooth` + `scroll-padding-top: 80px`
  - `prefers-reduced-motion`: disabilitare TUTTE le animazioni

- [ ] **Step 3:** Noise texture sottile sullo sfondo cream (SVG inline come in index_old.html)

- [ ] **Step 4:** Micro-interazioni:
  - Card hover: lift -6px, shadow profonda
  - Bottoni hover: transizione colore fluida
  - Link underline animata

- [ ] **Step 5:** Verifica: test su viewport 320px, 768px, 1024px, 1440px

**Acceptance Criteria:**
- Layout corretto su tutti i breakpoint
- No overflow orizzontale su nessun viewport
- Animazioni fluide (60fps)
- `prefers-reduced-motion` rispettato
- Nav funziona su mobile e desktop
- Touch target >= 44px su mobile

- [ ] **Step 6:** Commit
```bash
git commit -m "feat: responsive completo + animazioni CSS"
```

---

### Task 13: Animazione Arco Trullo (Nice to Have)

**Files:**
- Create: `src/components/TrulloArch.astro`
- Modify: `src/pages/index.astro` o `Hero.astro`

**Steps:**

- [ ] **Step 1:** Creare `TrulloArch.astro`:
  - SVG animato di un arco/volta a trullo in pietra
  - Animazione CSS: arco si "costruisce" pietra dopo pietra dall'esterno all'interno
  - Usabile come transizione tra sezioni o come intro animata nel hero
  - Effetto: l'utente "entra" nel trullo, poi vede il contenuto della casa
  - Alternativa più semplice: silhouette trullo che si disegna (stroke-dasharray animation)

- [ ] **Step 2:** Integrare come elemento decorativo (es. separatore tra Hero e Stats, o sfondo della sezione Territory)

- [ ] **Step 3:** Verifica: animazione fluida, non blocca il contenuto, si disabilita con `prefers-reduced-motion`

**Acceptance Criteria:**
- Animazione visivamente gradevole
- Non interferisce con usabilità
- Performance ok (no jank)
- Disabilitata con reduced-motion
- Funziona su mobile

- [ ] **Step 4:** Commit
```bash
git commit -m "feat: animazione decorativa arco trullo"
```

---

### Task 14: SEO, Performance e Meta

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: vari componenti per accessibilità

**Steps:**

- [ ] **Step 1:** JSON-LD structured data completo:
```json
{
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "name": "La Dolce Sosta",
  "description": "Casa vacanze nel centro di Castellana Grotte, Puglia. 80m², 2 camere, 1-6 ospiti.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Luigi Cadorna, 33",
    "addressLocality": "Castellana Grotte",
    "postalCode": "70013",
    "addressRegion": "BA",
    "addressCountry": "IT"
  },
  "numberOfRooms": 2,
  "occupancy": { "@type": "QuantitativeValue", "maxValue": 6 },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Kitchen", "value": true }
  ]
}
```

- [ ] **Step 2:** Meta tags completi: OG, Twitter Card, canonical, description italiana/inglese

- [ ] **Step 3:** `<link rel="preconnect">` per Google Fonts + `<link rel="preload">` per immagine hero

- [ ] **Step 4:** Accessibilità pass:
  - ARIA labels su tutti i bottoni interattivi
  - Alt text su tutte le immagini
  - Navigazione keyboard completa
  - Skip link "Vai al contenuto"
  - Focus visible su tutti gli elementi interattivi
  - Contrasto colori WCAG AA

- [ ] **Step 5:** Performance:
  - Immagini lazy loaded (tranne hero)
  - `loading="lazy"` su iframe Google Maps
  - Bundle check: no JS superfluo

- [ ] **Step 6:** Verifica: Lighthouse audit target 90+ su tutte le categorie

**Acceptance Criteria:**
- Lighthouse Performance ≥ 90
- Lighthouse Accessibility ≥ 95
- Lighthouse SEO ≥ 95
- JSON-LD valido (test con Google Rich Results Test)
- Navigazione keyboard completa
- Nessuna immagine senza alt

- [ ] **Step 7:** Commit
```bash
git commit -m "feat: SEO, meta tags, accessibilità, performance optimization"
```

---

### Task 15: CI/CD e Deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

**Steps:**

- [ ] **Step 1:** Creare workflow GitHub Actions:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: ladolcesosta/package-lock.json
      - run: npm ci
        working-directory: ladolcesosta
      - run: npm run build
        working-directory: ladolcesosta
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ladolcesosta/dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 2:** `npm run build` locale → verificare output statico in `dist/`

- [ ] **Step 3:** `npm run preview` — test locale build produzione

- [ ] **Step 4:** Cross-browser check: Chrome, Firefox, Safari, mobile

**Acceptance Criteria:**
- Build statico senza errori
- Preview locale funziona
- Workflow GitHub Actions corretto
- `dist/` contiene tutte le immagini e assets

- [ ] **Step 5:** Commit
```bash
git commit -m "feat: CI/CD GitHub Actions per deploy Pages"
```

---

### Task 16: Test Finale e Polish

**Steps:**

- [ ] **Step 1:** Test end-to-end manuale:
  - Navigazione completa da sezione a sezione
  - Tutti i link esterni funzionanti (Booking, Google Maps)
  - Form contatti funziona
  - Widget prenotazione genera URL corretto
  - Carousel foto scorre in entrambe le direzioni
  - Carousel recensioni autoplay funziona
  - Modali territorio aprono/chiudono
  - Mobile: tutti i touch gestures funzionano

- [ ] **Step 2:** Content review:
  - Nessun testo placeholder/Lorem ipsum rimasto
  - Tutti gli indirizzi/dati reali
  - CIN/CIS visibili nel footer
  - Nessun errore grammaticale evidente

- [ ] **Step 3:** Performance finale:
  - Lighthouse audit ≥ 90 su tutte le categorie
  - Nessun CLS visibile
  - First Contentful Paint < 2s

- [ ] **Step 4:** Commit finale
```bash
git commit -m "chore: test finale e polish"
```

**Acceptance Criteria:**
- ZERO placeholder nel contenuto
- ZERO link rotti
- Lighthouse ≥ 90 across the board
- CIN/CIS visibili
- Tutti i task precedenti superano acceptance criteria

---

## Design Enhancement Chiave

| Enhancement | Tecnica | Costo JS |
|---|---|---|
| Foto carousel orizzontale con frecce | embla-carousel + Preact | ~8KB |
| Carousel recensioni autoplay | embla-carousel + Preact | ~5KB |
| Counter animati stats | Preact island (`client:visible`) | ~2KB |
| Widget date prenotazione → Booking.com | Preact island (`client:visible`) | ~4KB |
| Modali territorio con info dettagliate | Preact island (`client:visible`) | ~3KB |
| Mobile menu | Preact island (`client:media`) | ~1KB |
| Form AJAX contatti | Preact island (`client:visible`) | ~3KB |
| Arco trullo animato | CSS `@keyframes` + SVG | 0 |
| Fade-up sezioni su scroll | IntersectionObserver (inline) | ~20 righe |
| Nav scroll effect | Inline script | ~10 righe |
| Noise texture sfondo | CSS SVG `background-image` | 0 |
| Card hover lift | Tailwind `hover:` | 0 |
| Google Maps embed | iframe lazy | 0 |
| `prefers-reduced-motion` | CSS media query | 0 |

**JS totale stimato:** ~26KB gzip (Preact 3KB + islands ~23KB)

---

## Link Esterni

- **Booking.com:** `https://www.booking.com/hotel/it/la-dolce-sosta-castellana-grotte.it.html`
- **Booking.com con date:** `https://www.booking.com/hotel/it/la-dolce-sosta-castellana-grotte.it.html?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&group_adults=N&no_rooms=1`
- **Google Maps:** `https://www.google.com/maps/place/Via+Luigi+Cadorna,+33,+70013+Castellana+Grotte+BA`
- **Airbnb:** da cercare — potrebbe non essere presente

---

## File Critici

- **Sorgente contenuto/bozza:** `index_old.html` — struttura e stili da cui partire
- **Immagini:** `images/` → copiare in `ladolcesosta/public/images/`
- **Riferimento architettura:** `dedonatopsicologa/` — struttura Astro identica da seguire
- **Config Astro:** `ladolcesosta/astro.config.mjs` (nuovo)
- **CI/CD:** `.github/workflows/deploy.yml` (nuovo)
- **Entry point:** `ladolcesosta/src/pages/index.astro` (nuovo)
