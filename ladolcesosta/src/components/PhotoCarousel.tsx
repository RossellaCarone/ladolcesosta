import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { photos } from '../data/photos';
import type { Photo } from '../data/photos';

/* ── Lightbox ── */
const Lightbox: FunctionalComponent<{
  photo: Photo;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ photo, index, total, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        class="absolute top-4 right-4 text-white/80 hover:text-white text-4xl leading-none cursor-pointer z-10"
        aria-label="Chiudi"
      >
        &times;
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none cursor-pointer z-10"
        aria-label="Precedente"
      >
        &#8249;
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none cursor-pointer z-10"
        aria-label="Successiva"
      >
        &#8250;
      </button>

      <div class="max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.src}
          alt={photo.alt}
          class="max-w-full max-h-[75vh] object-contain rounded-lg"
        />
        <p class="text-white/80 text-sm mt-3 text-center font-sans">
          {photo.alt} <span class="text-white/50 ml-2">{index + 1}/{total}</span>
        </p>
      </div>
    </div>
  );
};

/* ── LazyImage ── */
const LazyImage: FunctionalComponent<{
  photo: Photo;
  inView: boolean;
  onClick: () => void;
}> = ({ photo, inView, onClick }) => {
  return (
    <div
      class="relative aspect-[4/3] bg-sand/30 rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {inView ? (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div class="w-full h-full bg-sand/20 animate-pulse" />
      )}
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

/* ── Main Carousel ── */
const PhotoCarousel: FunctionalComponent = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleSlides, setVisibleSlides] = useState<Set<number>>(new Set([0, 1, 2, 3]));
  const emblaRef = useRef<ReturnType<typeof EmblaCarousel> | null>(null);

  useEffect(() => {
    if (!viewportRef.current) return;

    const autoplay = Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true });

    const embla = EmblaCarousel(viewportRef.current, {
      align: 'start',
      loop: false,
      dragFree: false,
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
    }, [autoplay]);

    emblaRef.current = embla;

    const updateState = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());

      // Lazy load: visible + 2 adjacent
      const inView = embla.slidesInView();
      const newVisible = new Set<number>();
      inView.forEach(i => {
        for (let offset = -2; offset <= 2; offset++) {
          const idx = i + offset;
          if (idx >= 0 && idx < photos.length) newVisible.add(idx);
        }
      });
      setVisibleSlides(prev => {
        const merged = new Set(prev);
        newVisible.forEach(i => merged.add(i));
        return merged;
      });
    };

    embla.on('select', updateState);
    embla.on('slidesInView', updateState);
    embla.on('init', updateState);

    return () => { embla.destroy(); };
  }, []);

  const scrollPrev = useCallback(() => emblaRef.current?.scrollPrev(), []);
  const scrollNext = useCallback(() => emblaRef.current?.scrollNext(), []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const lightboxPrev = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
  }, []);
  const lightboxNext = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % photos.length : null);
  }, []);

  // Progress bar
  const progress = photos.length > 1 ? selectedIndex / (photos.length - 1) : 0;

  return (
    <div class="relative">
      {/* Navigation arrows */}
      <div class="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          class="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-earth hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Precedente"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          class="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-earth hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Successiva"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

      {/* Carousel viewport */}
      <div class="overflow-hidden rounded-2xl" ref={viewportRef}>
        <div class="flex gap-4 md:gap-6">
          {photos.map((photo, i) => (
            <div
              key={i}
              class="flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_calc(33.333%-16px)]"
            >
              <LazyImage
                photo={photo}
                inView={visibleSlides.has(i)}
                onClick={() => openLightbox(i)}
              />
              <p class="mt-2 text-sm text-earth/70 font-sans text-center truncate">
                <span class="font-medium text-earth">{photo.category}</span>
                <span class="mx-1">·</span>
                {photo.alt.split('—')[0]?.trim() || photo.alt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div class="mt-6 flex items-center gap-4">
        {/* Mobile arrows */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          class="md:hidden w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-earth disabled:opacity-30 cursor-pointer"
          aria-label="Precedente"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="flex-1 h-1 bg-sand/40 rounded-full overflow-hidden">
          <div
            class="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${Math.max(5, progress * 100)}%` }}
          />
        </div>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          class="md:hidden w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-earth disabled:opacity-30 cursor-pointer"
          aria-label="Successiva"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <span class="text-sm text-earth/50 font-sans whitespace-nowrap">
          {selectedIndex + 1} / {photos.length}
        </span>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={photos[lightboxIndex]}
          index={lightboxIndex}
          total={photos.length}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />
      )}
    </div>
  );
};

export default PhotoCarousel;
