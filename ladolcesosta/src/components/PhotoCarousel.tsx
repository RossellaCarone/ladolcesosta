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
  const touchStart = useRef<{ x: number; y: number } | null>(null);

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

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) onPrev(); else onNext();
    }
    touchStart.current = null;
  };

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        class="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-sans hover:bg-white/25 transition-colors cursor-pointer"
        aria-label="Chiudi"
      >
        ✕
      </button>

      {/* Desktop arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Precedente"
      >
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Successiva"
      >
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>

      {/* Image */}
      <div class="w-full h-full flex items-center justify-center p-4 md:px-20" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.src}
          alt={photo.alt}
          class="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
          draggable={false}
        />
      </div>

      {/* Counter + mobile arrows */}
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          class="md:hidden w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Precedente"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <span class="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-sans tabular-nums">
          {index + 1} / {total}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          class="md:hidden w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
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
