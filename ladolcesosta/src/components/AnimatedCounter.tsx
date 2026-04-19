import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  target: number;
  suffix: string;
  duration?: number;
  decimal?: boolean;
}

export default function AnimatedCounter({ target, suffix, duration = 1800, decimal = false }: Props) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // prefers-reduced-motion: show final immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(decimal ? target.toFixed(1) : String(target));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    function animate() {
      const start = performance.now();
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out: 1 - (1 - t)^3
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        setDisplay(decimal ? current.toFixed(1) : String(Math.round(current)));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    return () => observer.disconnect();
  }, [target, duration, decimal]);

  return (
    <span
      ref={ref}
      class="font-serif text-sand"
      style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1 }}
    >
      {display}
      {suffix && <span class="text-[0.6em]">{suffix}</span>}
    </span>
  );
}
