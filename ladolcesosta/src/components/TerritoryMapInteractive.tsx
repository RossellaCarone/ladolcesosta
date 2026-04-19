import { useState, useEffect } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { places } from '../data/territory';

/*
 * Approximate bounding box for puglia.svg (visual area):
 * lat: 39.78 (bottom) to 41.92 (top)
 * lng: 15.30 (left) to 18.52 (right)
 *
 * Each marker is positioned as % of the SVG image dimensions.
 * These were hand-tuned to match the SVG outline.
 */
const markerPositions: { x: number; y: number }[] = [
  { x: 55.0, y: 45.0 },   // Grotte di Castellana
  { x: 60.0, y: 51.0 },   // Locorotondo
  { x: 56.5, y: 49.5 },   // Alberobello
  { x: 58.0, y: 53.5 },   // Martina Franca
  { x: 65.0, y: 45.5 },   // Monopoli
  { x: 62.0, y: 43.0 },   // Polignano a Mare
  { x: 72.0, y: 55.0 },   // Ostuni
  { x: 46.8, y: 35.5 },   // Bari
];

// Castellana Grotte (La Dolce Sosta)
const home = { x: 55.0, y: 45.0 };

const TerritoryMapInteractive: FunctionalComponent = () => {
  const [active, setActive] = useState<number | null>(null);

  // Listen for hover from list buttons
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      setActive(idx);
    };
    window.addEventListener('territory-hover', handler);
    return () => window.removeEventListener('territory-hover', handler);
  }, []);

  const handleMarkerClick = (i: number) => {
    window.dispatchEvent(new CustomEvent('open-territory', { detail: i }));
  };

  const handleMarkerEnter = (i: number) => {
    setActive(i);
    window.dispatchEvent(new CustomEvent('territory-marker-hover', { detail: i }));
  };

  const handleMarkerLeave = () => {
    setActive(null);
    window.dispatchEvent(new CustomEvent('territory-marker-hover', { detail: null }));
  };

  return (
    <div class="relative w-full" style="aspect-ratio: 324.58 / 259.98;">
      {/* SVG map background */}
      <img
        src="/images/puglia.svg"
        alt="Mappa della Puglia"
        class="w-full h-full"
        draggable={false}
      />

      {/* Place markers — small teardrops, tooltip on hover/click */}
      {places.map((place, i) => {
        const pos = markerPositions[i];
        const isActive = active === i;
        return (
          <button
            key={i}
            class="absolute cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -100%)',
              zIndex: isActive ? 20 : 10,
            }}
            onClick={() => handleMarkerClick(i)}
            onMouseEnter={() => handleMarkerEnter(i)}
            onMouseLeave={() => handleMarkerLeave()}
            aria-label={place.name}
          >
            <svg
              width={isActive ? 20 : 16}
              height={isActive ? 26 : 21}
              viewBox="0 0 28 36"
              fill="none"
              style={{ transition: 'width 0.2s ease, height 0.2s ease', filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
            >
              <path
                d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z"
                fill={isActive ? '#7a6248' : '#9c7c4e'}
                stroke="#f5f0e8"
                stroke-width="2"
              />
              <circle cx="14" cy="12" r="4.5" fill="#f5f0e8" />
            </svg>
            {/* Tooltip on hover */}
            {isActive && (
              <span
                class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[11px] font-semibold px-2 py-1 rounded-md bg-dark/90 text-cream pointer-events-none"
                style={{ bottom: '105%' }}
              >
                {place.name}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TerritoryMapInteractive;
