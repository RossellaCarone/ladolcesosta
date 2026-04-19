# Piano di Restyling: dedonatopsicologa.com → Astro

## Context

Il sito attuale di Monica De Donato (psicologa) è un singolo `index.html` (~36KB) con CSS e JS embedded, hostato su GitHub Pages con dominio custom `dedonatopsicologa.com`. È ben strutturato ma monolitico. L'obiettivo è migrarlo ad **Astro** con architettura a **islands** per ottenere un look moderno e dinamico, mantenendo il deploy statico su GitHub Pages. Tutto il contenuto attuale viene preservato.

---

## Stack Tecnologico

- **Astro** (output statico) — framework principale
- **Preact** (~3KB gzip vs ~40KB di React) — per le islands interattive
- **Tailwind CSS** — styling utility-first + custom properties per brand colors
- **embla-carousel** (~5KB) — carousel testimonial touch-friendly
- **GitHub Actions** — build & deploy automatico su GitHub Pages
- **Formspree** — form handler esistente (preservato)

---

## Struttura Progetto

```
dedonatopsicologa/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── public/
│   ├── CNAME                    # dominio custom preservato
│   └── images/                  # future foto reali
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro     # HTML shell, head, fonts, global styles
│   ├── pages/
│   │   └── index.astro          # compone tutte le sezioni
│   ├── components/
│   │   ├── Nav.astro            # navbar fissa (statica)
│   │   ├── MobileMenu.tsx       # island: hamburger menu (client:media)
│   │   ├── Hero.astro           # hero section (statica)
│   │   ├── Stats.astro          # wrapper stats (statica)
│   │   ├── AnimatedCounter.tsx  # island: contatore animato (client:visible)
│   │   ├── About.astro          # chi sono (statica)
│   │   ├── Services.astro       # griglia servizi (statica)
│   │   ├── ServiceCard.astro    # card singola (statica)
│   │   ├── Approach.astro       # approccio (statica)
│   │   ├── ApproachStep.astro   # step singolo (statica)
│   │   ├── Testimonials.astro   # wrapper testimonial (statica)
│   │   ├── TestimonialCarousel.tsx  # island: carousel (client:visible)
│   │   ├── Contact.astro        # info contatto (statica)
│   │   ├── ContactForm.tsx      # island: form AJAX (client:visible)
│   │   └── Footer.astro         # footer (statica)
│   ├── styles/
│   │   └── global.css           # Tailwind directives + CSS custom properties
│   ├── data/
│   │   ├── services.ts          # dati 6 servizi
│   │   ├── testimonials.ts      # dati 3 testimonial
│   │   ├── stats.ts             # dati 4 statistiche
│   │   └── approach.ts          # dati 4 step approccio
│   └── utils/
│       └── animations.ts        # configurazione animazioni condivisa
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD GitHub Pages
```

---

## Fasi di Implementazione

### Fase 1: Scaffolding Progetto

1. Inizializzare progetto Astro nella directory corrente (nuovo branch `feat/astro-restyling`)
2. Installare dipendenze: `@astrojs/tailwind`, `@astrojs/preact`, `preact`, `embla-carousel`
3. Configurare `astro.config.mjs`:
   - `output: 'static'`, `site: 'https://dedonatopsicologa.com'`
   - Integrazioni: tailwind, preact
4. Configurare `tailwind.config.mjs` con palette brand:
   - Sage: `#8a9e8c`, `#c8d8c9`, `#eef3ee`
   - Warm: `#c4a882`, `#ede5d8`
   - Cream: `#faf8f4`
   - Font families: Cormorant Garamond (serif), DM Sans (sans)
5. Creare `src/styles/global.css` con directives Tailwind + import Google Fonts + base styles
6. Creare `BaseLayout.astro` con `<head>` completo (meta, OG tags, fonts, structured data JSON-LD)
7. Spostare `CNAME` in `public/CNAME`
8. Creare `.github/workflows/deploy.yml` per build & deploy automatico
9. **Verifica**: `npm run dev` mostra pagina vuota con font e colori corretti

### Fase 2: Componenti Statici (estrarre contenuto da index.html)

**File sorgente**: `/home/carone1/dedonatopsicologa/index.html`

1. Estrarre dati in `src/data/`:
   - `services.ts` — 6 card (titolo, descrizione, icona SVG, link)
   - `testimonials.ts` — 3 testimonial (citazione, nome, ruolo, iniziali avatar)
   - `stats.ts` — 4 stat (valore numerico, suffisso, label)
   - `approach.ts` — 4 step (numero, titolo, descrizione)

2. Costruire componenti statici Astro (con Tailwind):
   - `Nav.astro` — posizione fissa, backdrop blur, logo serif, link nav, CTA "Prenota"
   - `Hero.astro` — griglia 2 colonne, eyebrow, titolo con `<em>`, sottotitolo, 2 CTA, placeholder immagine con SVG silhouette, cerchi decorativi, badge esperienza
   - `Stats.astro` — striscia background warm-light, griglia 4 colonne
   - `About.astro` — 2 colonne, immagine + bio + credenziali (5 bullet points)
   - `ServiceCard.astro` + `Services.astro` — header sezione + griglia 3 colonne
   - `ApproachStep.astro` + `Approach.astro` — 2 colonne (testo sx, step dx)
   - `Testimonials.astro` — header centrato + griglia 3 colonne (statica iniziale)
   - `Contact.astro` — sfondo scuro, 2 colonne (info + form placeholder)
   - `Footer.astro` — sfondo scuro, logo, link, copyright

3. Comporre `src/pages/index.astro` importando tutte le sezioni nell'ordine corretto

4. **Verifica**: pagina renderizza identica all'originale su desktop e mobile

### Fase 3: Design Responsivo e Animazioni CSS

1. Implementare breakpoint responsive con prefissi Tailwind (`md:`, `lg:`)
   - Mobile: colonne singole, padding ridotto, nav links nascosti
   - Desktop (>900px): layout multi-colonna originale
2. Aggiungere transizioni CSS per hover su card, bottoni, link
3. Animazioni decorative CSS `@keyframes`:
   - Cerchi hero fluttuanti (float lento e infinito)
   - Grain/noise texture sottile sullo sfondo cream
4. Scroll-triggered fade-up con IntersectionObserver (script inline in BaseLayout):
   - Stagger 80-100ms tra elementi fratelli
   - `prefers-reduced-motion`: disabilitare tutte le animazioni
5. Effetto nav on scroll: background diventa opaco + border-bottom appare
6. `scroll-behavior: smooth` + `scroll-padding-top: 80px`
7. **Verifica**: test su viewport 320px, 768px, 1024px, 1440px

### Fase 4: Islands Interattive (Preact)

1. **`MobileMenu.tsx`** — `client:media="(max-width: 900px)"`
   - Toggle hamburger icon, menu slide-in overlay
   - Chiusura automatica al click su link

2. **`AnimatedCounter.tsx`** — `client:visible`
   - Props: `target` (numero), `suffix` ("+", etc.), `duration` (2s default)
   - `requestAnimationFrame` + easing ease-out
   - Trigger su IntersectionObserver interno
   - Integrare in `Stats.astro` al posto dei numeri statici

3. **`TestimonialCarousel.tsx`** — `client:visible`
   - Basato su `embla-carousel` per swipe touch
   - Desktop: mostra tutte le 3 card con stagger
   - Mobile: carousel orizzontale con dot indicators
   - Autoplay ogni 5s, pausa su interazione utente

4. **`ContactForm.tsx`** — `client:visible`
   - Form state: idle → loading → success → reset (3s)
   - AJAX submit a `https://formspree.io/f/xqegyvre`
   - Focus effect: bordo sage green + glow sottile
   - Errore: stato rosso con "Riprova"

5. **Verifica**: counter anima su scroll, carousel swipe funziona, form invia correttamente

### Fase 5: Enhancement Moderni e SEO

1. JSON-LD structured data: `LocalBusiness` + `PsychologicalService`
2. Meta tags completi: Open Graph, Twitter Card, canonical URL
3. `<link rel="preconnect">` per Google Fonts
4. Micro-interazioni card servizi:
   - Hover: lift -6px, shadow profonda, freccia "Scopri →" scorre 4px
   - Icona: pulse sottile o saturazione maggiore
5. Approach step hover: numero da sage-light a sage, bordo sinistro animato
6. Form floating labels (label anima su/shrink su focus)
7. Scroll-to-top button (apparire dopo scroll di 500px)
8. **Verifica**: Lighthouse audit target 95+ su tutte le categorie

### Fase 6: Test e Deploy

1. `npm run build` → verificare output statico in `dist/`
2. `CNAME` presente in `dist/`
3. `npm run preview` — test locale build produzione
4. Cross-browser: Chrome, Firefox, Safari, mobile
5. Accessibility: navigazione keyboard, screen reader, ARIA labels
6. Performance: bundle size check, no JS superfluo
7. Push su branch `feat/astro-restyling`
8. Verificare GitHub Actions workflow
9. Deploy su GitHub Pages

---

## Design Enhancement Chiave

| Enhancement | Tecnica | Costo JS |
|---|---|---|
| Cerchi hero fluttuanti | CSS `@keyframes float` | 0 |
| Fade-up sezioni su scroll | IntersectionObserver (inline script) | ~20 righe |
| Contatori animati stats | Preact island (`client:visible`) | ~2KB |
| Carousel testimonial swipe | embla-carousel + Preact | ~8KB |
| Card hover lift + shadow | Tailwind `hover:` utilities | 0 |
| Nav scroll effect | Inline script ~10 righe | ~10 righe |
| Form AJAX + stati | Preact island (`client:visible`) | ~3KB |
| Grain texture sfondo | CSS `background-image` | 0 |
| Floating labels form | CSS `:focus-within` + transition | 0 |
| `prefers-reduced-motion` | CSS media query | 0 |

**JS totale stimato**: ~13KB gzip (Preact 3KB + islands ~10KB)

---

## Assegnazione Foto (da `allegati/` → `public/images/`)

Le foto verranno rinominate e posizionate in `public/images/`:

| File originale | Nome nuovo | Sezione | Uso |
|---|---|---|---|
| `PHOTO-...-51_1.jpg` | `monica-hero.jpg` | **Hero** | Ritratto principale sorridente (top marrone, sfondo neutro) |
| `PHOTO-...-51_4.jpg` | `monica-about.jpg` | **Chi Sono** | Ritratto professionale braccia incrociate (camicia azzurra, sfondo bianco) |
| `PHOTO-...-57-30.jpg` | `monica-contact.jpg` | **Contatti** | Ritratto frontale (camicia azzurra, sfondo bianco) |
| `PHOTO-...-51.jpg` | `studio-hero.jpg` | **Hero** decorativo | Poltrona sage green in ambiente studio |
| `PHOTO-...-52.jpg` | `studio-warm.jpg` | **Approccio** o sfondo | Poltrona crema con lampada, ambiente caldo accogliente |
| `PHOTO-...-51_2.jpg` | `concept-growth.jpg` | **Approccio** | Mani con pianta in vaso testa classica (metafora crescita) |
| `PHOTO-...-51_3.jpg` | `concept-nurture.jpg` | **Servizi** decorativo | Innaffiare pianta in vaso testa (metafora cura) |
| `PHOTO-...-59.jpg` | `concept-notes.jpg` | **Chi Sono** decorativo | Scrivere su taccuino con caffè (metafora ascolto/appunti) |
| `PHOTO-...-59_1.jpg` | `concept-reading.jpg` | **Approccio** decorativo | Libro aperto e tazza (metafora riflessione) |
| `PHOTO-...-59_2.jpg` | `concept-therapy.jpg` | **Servizi** o Testimonial | Mani in conversazione terapeutica (terapia di coppia/dialogo) |

Le immagini saranno ottimizzate (resize, WebP con fallback JPG) durante il build con `@astrojs/image` o manualmente.

---

## File Critici

- **Sorgente contenuto**: `/home/carone1/dedonatopsicologa/index.html` — tutto il testo, SVG, struttura da estrarre
- **CNAME**: `/home/carone1/dedonatopsicologa/CNAME` → `public/CNAME`
- **Config Astro**: `astro.config.mjs` (nuovo)
- **CI/CD**: `.github/workflows/deploy.yml` (nuovo)
- **Entry point**: `src/pages/index.astro` (nuovo)
