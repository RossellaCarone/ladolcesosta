export interface Review {
  text: string;
  author: string;
  source: 'Booking.com' | 'Google';
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
];
