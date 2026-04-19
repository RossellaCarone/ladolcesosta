import { useState, useCallback } from 'preact/hooks';

const FORMSPREE_URL = 'https://formspree.io/f/xqewbzew';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Nome obbligatorio';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Email non valida';
    if (!message.trim()) errs.message = 'Messaggio obbligatorio';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, email, message]);

  const handleSubmit = useCallback(async (e: Event) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setPhone(''); setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, [name, email, phone, message, validate]);

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 rounded-lg border ${errors[field || ''] ? 'border-red-400' : 'border-warm/30'} bg-white/80 text-dark font-sans text-sm placeholder:text-earth/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`;

  if (status === 'success') {
    return (
      <div class="text-center py-16">
        <div class="w-14 h-14 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h3 class="font-serif text-2xl text-dark mb-2">Messaggio inviato!</h3>
        <p class="font-sans text-earth/70 text-sm">Ti risponderemo al più presto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4" noValidate>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text" name="name" placeholder="Nome *" value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            class={inputClass('name')}
          />
          {errors.name && <p class="text-red-500 text-xs mt-1 font-sans">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email" name="email" placeholder="Email *" value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            class={inputClass('email')}
          />
          {errors.email && <p class="text-red-500 text-xs mt-1 font-sans">{errors.email}</p>}
        </div>
      </div>
      <div>
        <input
          type="tel" name="phone" placeholder="Telefono (opzionale)" value={phone}
          onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
          class={inputClass()}
        />
      </div>
      <div>
        <textarea
          name="message" placeholder="Come possiamo aiutarti? *" value={message} rows={5}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          class={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p class="text-red-500 text-xs mt-1 font-sans">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p class="text-red-500 text-sm font-sans text-center">
          Errore nell'invio. Riprova o scrivici direttamente a info@ladolcesosta.it
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        class="w-full px-6 py-3.5 bg-earth text-cream font-sans font-medium rounded-lg hover:bg-dark transition-colors text-sm tracking-wide cursor-pointer disabled:opacity-50"
      >
        {status === 'loading' ? 'Invio in corso...' : 'Invia messaggio'}
      </button>
    </form>
  );
}
