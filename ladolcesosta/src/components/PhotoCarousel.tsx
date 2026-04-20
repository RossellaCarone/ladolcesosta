import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { createPortal } from 'preact/compat';
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
  const closeFn = useRef(onClose);
  const prevFn = useRef(onPrev);
  const nextFn = useRef(onNext);
  closeFn.current = onClose;
  prevFn.current = onPrev;
  nextFn.current = onNext;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFn.current();
      if (e.key === 'ArrowLeft') prevFn.current();
      if (e.key === 'ArrowRight') nextFn.current();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      class="fixed inset-0 z-[80]"
      style="background: rgba(30,20,12,0.92)"
    >
      {/* Clickable backdrop */}
      <div class="absolute inset-0" onClick={onClose} />

      {/* Close */}
      <button
        onClick={onClose}
        class="absolute top-4 right-4 z-[100] w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer select-none"
        aria-label="Chiudi"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      {/* Desktop arrows */}
      <button
        onClick={onPrev}
        class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-[90] w-12 h-12 rounded-full bg-white/10 items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer select-none"
        aria-label="Precedente"
      >
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button
        onClick={onNext}
        class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-[90] w-12 h-12 rounded-full bg-white/10 items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer select-none"
        aria-label="Successiva"
      >
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>

      {/* Image — centered, no event blocking */}
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none p-4 md:px-20 overflow-hidden" style={{ touchAction: 'pan-y pinch-zoom' }}>
        <img
          src={photo.src}
          alt={photo.alt}
          class="max-w-full max-h-[85vh] object-contain rounded-lg select-none pointer-events-auto"
          draggable={false}
        />
      </div>

      {/* Counter + mobile arrows */}
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-4">
        <button
          onClick={onPrev}
          class="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer select-none"
          aria-label="Precedente"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <span class="px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-sans tabular-nums">
          {index + 1} / {total}
        </span>
        <button
          onClick={onNext}
          class="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer select-none"
          aria-label="Successiva"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
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
      loop: true,
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

            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && createPortal(
        <Lightbox
          photo={photos[lightboxIndex]}
          index={lightboxIndex}
          total={photos.length}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />,
        document.body
      )}
    </div>
  );
};

export default PhotoCarousel;
