export interface Review {
  text: string;
  author: string;
  source: 'Booking.com' | 'Google' | 'Airbnb';
  rating: number;
  date: string;
}

export const reviews: Review[] = [
  {
    text: "Casa bellissima e pulitissima posto strategico proprietario gentilissimo e disponibile.. consigliata vivamente.. tutto perfetto",
    author: "Francesco",
    source: "Booking.com",
    rating: 10,
    date: "2025"
  },
  {
    text: "Alloggio perfetto, pulitissimo e dotato di tutti i comfort, facilità di parcheggio nelle vicinanze e host molto disponibile e cordiale.",
    author: "Marco",
    source: "Airbnb",
    rating: 5,
    date: "2025"
  },
  {
    text: "Posto molto bello e pulito. Ottima comunicazione con l'host. Consigliatissimo.",
    author: "Griselda",
    source: "Airbnb",
    rating: 5,
    date: "2025"
  },
];
