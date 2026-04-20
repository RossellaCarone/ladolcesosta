import { useState, useCallback } from 'preact/hooks';

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

export default function BookingWidget() {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');

  const minCheckin = tomorrow();
  const minCheckout = checkin ? addDays(checkin, 1) : addDays(minCheckin, 1);

  const handleCheckinChange = useCallback((e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    if (val && val < minCheckin) return;
    setCheckin(val);
    setError('');
    if (checkout && val >= checkout) setCheckout('');
  }, [checkout, minCheckin]);

  const handleCheckoutChange = useCallback((e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    if (val && checkin && val <= checkin) {
      setCheckout('');
      return;
    }
    if (val && val < minCheckout) return;
    setCheckout(val);
    setError('');
  }, [checkin, minCheckout]);

  const bookOnBooking = useCallback(() => {
    if (!checkin || !checkout) {
      setError('Seleziona le date di check-in e check-out');
      return;
    }
    const url = `https://www.booking.com/hotel/it/la-dolce-sosta-castellana-grotte.it.html?checkin=${checkin}&checkout=${checkout}&group_adults=${guests}&no_rooms=1`;
    window.open(url, '_blank');
  }, [checkin, checkout, guests]);

  const searchAirbnb = useCallback(() => {
    window.open('https://www.airbnb.it/s/Castellana-Grotte--BA/homes', '_blank');
  }, []);

  const inputClass = 'w-full box-border px-3 py-3 rounded-xl border border-sand/50 bg-cream/60 text-dark font-sans text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';
  const labelClass = 'block font-sans text-sm text-earth mb-1.5';

  return (
    <div class="w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 w-full min-w-0">
        <div class="w-full">
          <label class={labelClass}>Check-in</label>
          <input
            type="date"
            min={minCheckin}
            value={checkin}
            onInput={handleCheckinChange}
            class={`${inputClass} w-full`}
          />
        </div>
        <div class="w-full">
          <label class={labelClass}>Check-out</label>
          <input
            type="date"
            min={minCheckout}
            value={checkout}
            onInput={handleCheckoutChange}
            class={inputClass}
          />
        </div>
      </div>

      <div class="mb-6">
        <label class={labelClass}>Ospiti</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number((e.target as HTMLSelectElement).value))}
          class={inputClass}
        >
          {[1, 2, 3, 4, 5, 6].map(n => (
            <option key={n} value={n}>{n} {n === 1 ? 'ospite' : 'ospiti'}</option>
          ))}
        </select>
      </div>

      {error && (
        <p class="text-red-600 text-sm font-sans mb-4 text-center">{error}</p>
      )}

      <button
          onClick={bookOnBooking}
          class="w-full px-6 py-3.5 bg-accent text-cream font-sans font-medium rounded-xl hover:bg-earth transition-colors text-sm tracking-wide cursor-pointer"
        >
          Prenota su Booking.com
        </button>
    </div>
  );
}
