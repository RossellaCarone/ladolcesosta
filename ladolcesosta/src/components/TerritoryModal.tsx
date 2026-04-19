import { useState, useEffect, useRef } from 'preact/hooks';
import type { Place } from '../data/territory';
import { places } from '../data/territory';

export default function TerritoryModal() {
  const [selected, setSelected] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      setSelected(idx);
    };
    window.addEventListener('open-territory', handler);
    return () => window.removeEventListener('open-territory', handler);
  }, []);

  useEffect(() => {
    if (selected !== null) {
      closeRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (selected === null) return null;

  const place: Place = places[selected];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`;

  return (
    <div
      ref={overlayRef}
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) setSelected(null);
      }}
      role="dialog"
      aria-modal="true"
      aria-label={place.name}
    >
      {/* Overlay */}
      <div class="absolute inset-0 bg-dark/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div class="relative bg-cream rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Gradient header */}
        <div class="h-32 rounded-t-2xl bg-gradient-to-br from-accent/40 via-warm/30 to-sand/50 flex items-end p-6">
          <div>
            <h3 class="font-serif text-3xl text-dark">{place.name}</h3>
            <span class="font-sans text-sm text-earth/70">{place.distance} da La Dolce Sosta</span>
          </div>
        </div>

        {/* Close button */}
        <button
          ref={closeRef}
          onClick={() => setSelected(null)}
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/80 backdrop-blur flex items-center justify-center text-earth hover:text-dark transition-colors cursor-pointer"
          aria-label="Chiudi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Body */}
        <div class="p-6 space-y-5">
          <p class="font-sans text-earth/80 leading-relaxed">{place.longDescription}</p>

          {/* Tips */}
          <div>
            <h4 class="font-serif text-lg text-dark mb-2">Consigli</h4>
            <ul class="space-y-2">
              {place.tips.map((tip) => (
                <li class="flex items-start gap-2 font-sans text-sm text-earth/70">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-accent mt-0.5 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Maps link */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-cream font-sans text-sm font-medium hover:bg-earth transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
            </svg>
            Apri in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
