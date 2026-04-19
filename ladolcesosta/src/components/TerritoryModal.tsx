import { useState, useEffect, useRef } from 'preact/hooks';
import type { Place } from '../data/territory';
import { places } from '../data/territory';

const BOOKING_URL = 'https://www.booking.com/hotel/it/la-dolce-sosta-castellana-grotte.it.html';

export default function TerritoryModal() {
  const [selected, setSelected] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
      style={{ backgroundColor: 'rgba(60,46,30,0.7)' }}
      onClick={(e) => {
        if (e.target === overlayRef.current) setSelected(null);
      }}
      role="dialog"
      aria-modal="true"
      aria-label={place.name}
    >
      <div class="relative bg-cream rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl">
        {/* Photo header */}
        <div class="relative h-52 sm:h-64 overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
          <div class="absolute bottom-0 left-0 p-6">
            <h3 class="font-serif text-2xl sm:text-3xl text-cream drop-shadow-lg">{place.name}</h3>
            <span class="font-sans text-sm text-cream/80">{place.distance} da La Dolce Sosta</span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelected(null)}
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/90 flex items-center justify-center text-earth hover:text-dark transition-colors cursor-pointer shadow-md"
          aria-label="Chiudi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Body */}
        <div class="p-6 space-y-5">
          <p class="font-sans text-earth/80 leading-relaxed text-[15px]">{place.longDescription}</p>

          {/* Tips */}
          <div>
            <h4 class="font-serif text-lg text-dark mb-3">Consigli pratici</h4>
            <ul class="space-y-2">
              {place.tips.map((tip) => (
                <li class="flex items-start gap-2 font-sans text-sm text-earth/75">
                  <span class="text-accent mt-0.5 shrink-0">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA buttons */}
          <div class="flex flex-wrap gap-3 pt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-cream font-sans text-sm font-semibold hover:bg-earth transition-colors shadow-md"
            >
              Prenota ora
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-accent/40 text-accent font-sans text-sm font-medium hover:bg-accent/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
              </svg>
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
