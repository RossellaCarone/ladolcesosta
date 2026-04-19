import { useEffect, useCallback, useState } from 'preact/hooks';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { reviews } from '../data/reviews';
import type { Review } from '../data/reviews';

function Stars({ count }: { count: number }) {
  return (
    <div class="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} class={`text-lg ${i < count ? 'text-amber-400' : 'text-sand/40'}`}>★</span>
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  const isBooking = source === 'Booking.com';
  return (
    <span class={`inline-flex items-center gap-1 text-xs font-sans font-medium px-2 py-0.5 rounded-full ${isBooking ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
      {isBooking ? 'B' : 'G'} {source}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div class="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-3">
      <div class="bg-cream/80 border border-sand/30 rounded-2xl p-6 md:p-8 h-full flex flex-col">
        <Stars count={review.rating} />
        <blockquote class="font-sans text-dark/80 text-sm md:text-base leading-relaxed flex-1 mb-4">
          "{review.text}"
        </blockquote>
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-sand/20">
          <div>
            <p class="font-sans font-medium text-dark text-sm">{review.author}</p>
            <p class="font-sans text-earth/50 text-xs">{review.date}</p>
          </div>
          <SourceBadge source={review.source} />
        </div>
      </div>
    </div>
  );
}

export default function ReviewCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const init = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true });
    const embla = EmblaCarousel(node, {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    }, [autoplay]);

    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    setScrollSnaps(embla.scrollSnapList());
    onSelect();

    // Store for dot clicks
    (node as any).__embla = embla;

    return () => embla.destroy();
  }, []);

  const onDotClick = useCallback((index: number) => {
    const container = document.querySelector('[data-embla]') as any;
    container?.__embla?.scrollTo(index);
  }, []);

  return (
    <div>
      {/* Badge */}
      <div class="text-center mb-8">
        <span class="inline-flex items-center gap-2 bg-cream border border-sand/40 rounded-full px-5 py-2 font-sans text-sm text-dark">
          <span class="text-amber-400 text-lg">★</span>
          Valutazione media <strong>4.9/5</strong> su Booking.com
        </span>
      </div>

      {/* Carousel */}
      <div class="overflow-hidden" ref={init} data-embla>
        <div class="flex -mx-3">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div class="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            class={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              i === selectedIndex ? 'bg-accent w-6' : 'bg-sand/50 hover:bg-sand'
            }`}
            aria-label={`Vai alla recensione ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
