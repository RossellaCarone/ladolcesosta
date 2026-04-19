/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';

type Status = 'idle' | 'loading' | 'success';

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

  const handleSubmit = useCallback((e: Event) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    // Formspree placeholder
    console.log('Form submission:', { name, email, phone, message });
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setName(''); setEmail(''); setPhone(''); setMessage('');
      }, 5000);
    }, 1000);
  }, [name, email, phone, message, validate]);

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field || ''] ? 'border-red-400' : 'border-sand/50'} bg-cream/60 text-dark font-sans text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`;

  if (status === 'success') {
    return (
      <div class="text-center py-12">
        <div class="text-4xl mb-4">✓</div>
        <h3 class="font-serif text-2xl text-dark mb-2">Messaggio inviato!</h3>
        <p class="font-sans text-earth/70">Ti risponderemo al più presto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4" noValidate>
      <div>
        <input
          type="text" placeholder="Nome *" value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
          class={inputClass('name')}
        />
        {errors.name && <p class="text-red-500 text-xs mt-1 font-sans">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email" placeholder="Email *" value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          class={inputClass('email')}
        />
        {errors.email && <p class="text-red-500 text-xs mt-1 font-sans">{errors.email}</p>}
      </div>
      <div>
        <input
          type="tel" placeholder="Telefono (opzionale)" value={phone}
          onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
          class={inputClass()}
        />
      </div>
      <div>
        <textarea
          placeholder="Messaggio *" value={message} rows={4}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          class={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p class="text-red-500 text-xs mt-1 font-sans">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        class="w-full px-6 py-3.5 bg-accent text-cream font-sans font-medium rounded-xl hover:bg-earth transition-colors text-sm tracking-wide cursor-pointer disabled:opacity-50"
      >
        {status === 'loading' ? 'Invio in corso...' : 'Invia richiesta'}
      </button>
    </form>
  );
}
