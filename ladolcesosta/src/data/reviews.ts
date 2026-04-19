export interface Review {
  text: string;
  author: string;
  source: 'Booking.com' | 'Google';
  rating: number;
  date: string;
}

export const reviews: Review[] = [
  { text: "Casa bellissima, pulitissima e arredata con gusto. Posizione perfetta per visitare le grotte e tutta la Valle d'Itria. Torneremo sicuramente!", author: "Marco R.", source: "Booking.com", rating: 5, date: "Agosto 2024" },
  { text: "Alloggio spazioso e confortevole, perfetto per la nostra famiglia. La cucina attrezzata ci ha permesso di cucinare i prodotti locali. Proprietari disponibilissimi.", author: "Elena M.", source: "Booking.com", rating: 5, date: "Luglio 2024" },
  { text: "Posizione strategica per esplorare la Puglia. Casa curata nei minimi dettagli, si vede l'amore dei proprietari. Il coffee corner è un tocco in più!", author: "François D.", source: "Booking.com", rating: 5, date: "Settembre 2024" },
  { text: "Ottima esperienza. Casa pulita, ben fornita e in posizione centrale. Le grotte di Castellana a due passi. Consigliato!", author: "Anna L.", source: "Google", rating: 5, date: "Giugno 2024" },
  { text: "Abbiamo trascorso una settimana meravigliosa. L'arredamento è caldo e accogliente, la pietra a vista dà carattere. Torneremo con gli amici!", author: "Luca B.", source: "Booking.com", rating: 4, date: "Maggio 2024" },
  { text: "Perfetta per una coppia. Tranquilla, pulita e con tutto il necessario. La posizione è ideale per visitare Alberobello e Polignano.", author: "Sarah K.", source: "Booking.com", rating: 5, date: "Aprile 2024" },
  { text: "Casa accogliente con dettagli curati. Ottima la macchina del caffè! Zona comoda per raggiungere le principali attrazioni pugliesi.", author: "Giuseppe T.", source: "Google", rating: 5, date: "Ottobre 2024" },
  { text: "Soggiorno perfetto. La casa è esattamente come nelle foto, anzi meglio! Proprietari gentili e premurosi. Super consigliato per famiglie.", author: "Maria C.", source: "Booking.com", rating: 5, date: "Agosto 2024" },
];
