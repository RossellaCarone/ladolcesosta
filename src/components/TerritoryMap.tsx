import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { places } from '../data/territory';

// Puglia bounding box for coordinate mapping
const LAT_MIN = 39.8;
const LAT_MAX = 42.2;
const LNG_MIN = 15.3;
const LNG_MAX = 18.5;

// SVG viewBox dimensions
const SVG_W = 300;
const SVG_H = 520;
const PAD = 15;

function latLngToSvg(lat: number, lng: number): { x: number; y: number } {
  const x = PAD + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (SVG_W - 2 * PAD);
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (SVG_H - 2 * PAD);
  return { x, y };
}

// Realistic simplified Puglia outline path
const PUGLIA_PATH = `
M 108,48 
C 112,46 118,44 124,42
L 132,38 C 136,36 140,35 145,34
L 155,30 C 162,28 168,27 172,28
L 180,32 C 186,35 190,38 192,42
C 195,48 196,52 194,56
C 192,60 188,62 184,63
C 178,65 174,66 170,68
L 166,72 C 164,76 163,80 162,85
L 160,92 C 159,98 158,104 158,110
L 157,120 C 156,128 156,136 157,144
L 158,152 C 159,158 160,164 162,170
L 164,178 C 166,184 168,190 170,196
L 173,204 C 176,212 178,218 180,224
L 183,232 C 185,238 188,244 191,250
L 195,258 C 198,264 201,270 204,276
L 208,284 C 211,290 214,296 216,302
L 219,310 C 221,318 222,324 222,330
C 222,338 220,344 216,350
C 212,356 208,360 203,362
C 198,364 193,364 188,362
C 183,360 179,356 176,352
C 172,346 169,340 167,334
L 164,326 C 162,320 160,314 157,308
L 153,300 C 150,294 147,288 144,282
L 140,274 C 137,268 134,262 131,256
L 127,248 C 124,242 121,236 118,230
L 114,222 C 111,216 108,210 106,204
L 103,196 C 100,188 98,180 96,172
L 94,162 C 92,154 91,146 90,138
L 89,128 C 88,120 88,112 88,104
L 89,94 C 90,86 91,78 93,70
L 96,60 C 99,54 103,50 108,48
Z
`;

// Gargano spur
const GARGANO_PATH = `
M 89,94
C 86,90 82,86 78,84
C 72,80 66,78 60,76
C 54,74 48,74 42,76
C 36,78 32,82 30,88
C 28,94 30,100 34,104
C 38,108 44,110 50,112
C 56,113 62,112 68,110
C 74,108 80,104 84,100
L 89,94
Z
`;

const TerritoryMap: FunctionalComponent = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (index: number) => {
    window.dispatchEvent(new CustomEvent('open-territory', { detail: index }));
  };

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-auto max-h-[520px]"
      role="img"
      aria-label="Mappa interattiva della Puglia"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Puglia outline */}
      <path
        d={PUGLIA_PATH}
        fill="#9c7c4e"
        fill-opacity="0.08"
        stroke="#9c7c4e"
        stroke-width="1.2"
        stroke-opacity="0.35"
      />
      <path
        d={GARGANO_PATH}
        fill="#9c7c4e"
        fill-opacity="0.08"
        stroke="#9c7c4e"
        stroke-width="1.2"
        stroke-opacity="0.35"
      />

      {/* Place points */}
      {places.map((place, i) => {
        const { x, y } = latLngToSvg(place.coordinates.lat, place.coordinates.lng);
        const isHome = i === 0;
        const isHovered = hovered === i;
        const color = isHome ? '#9c7c4e' : '#b8a07a';
        const activeColor = '#9c7c4e';

        if (isHome) {
          return (
            <g
              key={i}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(i)}
            >
              {/* Pulse ring */}
              <circle cx={x} cy={y} r="8" fill="none" stroke="#9c7c4e" stroke-width="1" opacity="0.4">
                <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
              {/* Pin marker */}
              <path
                d={`M${x},${y - 22} C${x - 8},${y - 22} ${x - 13},${y - 16} ${x - 13},${y - 10} C${x - 13},${y - 1} ${x},${y + 4} ${x},${y + 4} C${x},${y + 4} ${x + 13},${y - 1} ${x + 13},${y - 10} C${x + 13},${y - 16} ${x + 8},${y - 22} ${x},${y - 22} Z`}
                fill="#9c7c4e"
                filter={isHovered ? 'url(#glow-strong)' : undefined}
              />
              <circle cx={x} cy={y - 10} r="4" fill="#f5f0e8" />
              {/* Always-visible label */}
              <text
                x={x}
                y={y + 16}
                text-anchor="middle"
                fill="#3c2e1e"
                font-size="9"
                font-weight="700"
                class="font-serif"
              >
                Castellana Grotte
              </text>
              <text
                x={x}
                y={y + 26}
                text-anchor="middle"
                fill="#9c7c4e"
                font-size="7"
                font-weight="600"
                class="font-sans"
              >
                BASE
              </text>
            </g>
          );
        }

        return (
          <g
            key={i}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(i)}
          >
            <circle
              cx={x}
              cy={y}
              r={isHovered ? 8 : 5}
              fill={isHovered ? activeColor : color}
              opacity={isHovered ? 1 : 0.75}
              filter={isHovered ? 'url(#glow)' : undefined}
              style={{ transition: 'r 0.25s ease, fill 0.25s ease, opacity 0.25s ease' }}
            />
            {/* Hover label */}
            {isHovered && (
              <g>
                <rect
                  x={x + 12}
                  y={y - 16}
                  width={place.name.length * 5.5 + 16}
                  height="28"
                  rx="4"
                  fill="#f5f0e8"
                  stroke="#9c7c4e"
                  stroke-width="0.5"
                  opacity="0.95"
                />
                <text
                  x={x + 20}
                  y={y - 3}
                  fill="#3c2e1e"
                  font-size="8.5"
                  font-weight="600"
                  class="font-serif"
                >
                  {place.name}
                </text>
                <text
                  x={x + 20}
                  y={y + 7}
                  fill="#9c7c4e"
                  font-size="7"
                  class="font-sans"
                >
                  {place.distance}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default TerritoryMap;
