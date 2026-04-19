export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export const amenities: Amenity[] = [
  {
    icon: "M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z",
    title: "WiFi gratuito",
    description: "Connessione veloce in tutto l'alloggio",
  },
  {
    icon: "M12 3v2m0 14v2M5.636 5.636l1.414 1.414m9.9 9.9l1.414 1.414M3 12h2m14 0h2M5.636 18.364l1.414-1.414m9.9-9.9l1.414-1.414M9 12a3 3 0 1 0 6 0M9 12a3 3 0 0 1 6 0M9 12H4.5m15 0H15m-3-4.5L9.75 9m4.5-1.5L16.5 9M12 7.5V3.75",
    title: "Aria condizionata",
    description: "In ogni stanza, per il massimo comfort",
  },
  {
    icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m18-4.5l-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0L3 12",
    title: "Cucina attrezzata",
    description: "Piano cottura, forno, frigo, utensili, macchina caffè Nespresso",
  },
  {
    icon: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.25 9.75h7.5M8.25 12h7.5m-7.5 2.25h4.5",
    title: "Lavatrice",
    description: "Per soggiorni lunghi senza pensieri",
  },
  {
    icon: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z",
    title: "TV a schermo piatto",
    description: "Nel soggiorno, per le serate in relax",
  },
  {
    icon: "M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm6-3.375a.375.375 0 1 1 .75 0c0 1.036.84 1.875 1.875 1.875.207 0 .375.168.375.375s-.168.375-.375.375A2.625 2.625 0 0 1 8.25 7.125Z",
    title: "Animali ammessi",
    description: "I vostri amici a quattro zampe sono i benvenuti",
  },
];
