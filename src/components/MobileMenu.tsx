import { useState, useEffect } from 'preact/hooks';



const links = [
  { label: 'La Casa', href: '#la-casa' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Territorio', href: '#territorio' },
  { label: 'Recensioni', href: '#recensioni' },
  { label: 'Prenota', href: '#prenota' },
  { label: 'Contatti', href: '#contatti' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        class="fixed top-5 right-5 z-[60] flex flex-col justify-center items-center w-10 h-10 gap-[5px] lg:hidden"
        aria-label="Menu"
      >
        <span
          class={`block w-6 h-[2px] bg-dark transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
        />
        <span
          class={`block w-6 h-[2px] bg-dark transition-all duration-300 ${open ? 'opacity-0' : ''}`}
        />
        <span
          class={`block w-6 h-[2px] bg-dark transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
        />
      </button>

      {/* Overlay */}
      <div
        class={`fixed inset-0 z-[55] bg-cream flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav class="flex flex-col items-center gap-8">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              class="font-serif text-3xl text-dark hover:text-accent transition-colors duration-300"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#prenota"
            onClick={() => setOpen(false)}
            class="mt-4 inline-flex items-center gap-2 bg-earth text-white font-sans tracking-wide px-6 py-3 rounded-full hover:bg-dark transition-colors duration-300"
          >
            Prenota ora
          </a>
        </nav>
      </div>
    </>
  );
}
