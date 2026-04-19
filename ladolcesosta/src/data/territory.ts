export interface Place {
  name: string;
  distance: string;
  shortDescription: string;
  longDescription: string;
  coordinates: { lat: number; lng: number };
  tips: string[];
}

export const places: Place[] = [
  {
    name: "Grotte di Castellana",
    distance: "2 km",
    shortDescription: "Grotte carsiche tra le più spettacolari d'Europa",
    longDescription:
      "Tra le grotte carsiche più spettacolari d'Europa. Percorso di 3 km sottoterra, la Grotta Bianca è il gioiello finale. Durata visita: 1-2 ore.",
    coordinates: { lat: 40.8725, lng: 17.1483 },
    tips: [
      "Prenota online per evitare code",
      "Temperatura interna 16°C: porta un maglioncino",
      "Il percorso completo (3 km) include la Grotta Bianca",
    ],
  },
  {
    name: "Alberobello",
    distance: "15 km",
    shortDescription: "Patrimonio UNESCO, trulli e paesaggio fiabesco",
    longDescription:
      "Patrimonio UNESCO. I trulli, costruzioni coniche in pietra a secco, creano un paesaggio fiabesco. Da non perdere il Rione Monti e il Trullo Sovrano.",
    coordinates: { lat: 40.7844, lng: 17.2372 },
    tips: [
      "Visita al mattino presto per evitare la folla",
      "Rione Monti è la zona più caratteristica",
      "Assaggia i tarallini nelle botteghe dei trulli",
    ],
  },
  {
    name: "Polignano a Mare",
    distance: "28 km",
    shortDescription: "Scogliere a picco sull'Adriatico, Lama Monachile",
    longDescription:
      "Scogliere a picco sull'Adriatico, la suggestiva Lama Monachile, terrazze sul mare. Patria di Domenico Modugno.",
    coordinates: { lat: 40.9942, lng: 17.2206 },
    tips: [
      "Tramonto dal ponte di Lama Monachile è imperdibile",
      "Prova il gelato da Supermago del Gelo",
      "Passeggiata panoramica lungo le mura",
    ],
  },
  {
    name: "Ostuni",
    distance: "38 km",
    shortDescription: "La Città Bianca, vicoli candidi e vista sul mare",
    longDescription:
      "La Città Bianca. Vicoli candidi sulla collina, vista sulla piana degli ulivi fino al mare. Centro storico incantevole.",
    coordinates: { lat: 40.7296, lng: 17.5764 },
    tips: [
      "Sali fino alla Cattedrale per la vista panoramica",
      "Il centro storico è pedonale: parcheggia fuori le mura",
      "Olio d'oliva locale tra i migliori al mondo",
    ],
  },
  {
    name: "Locorotondo",
    distance: "12 km",
    shortDescription: "Borgo circolare tra i più belli d'Italia",
    longDescription:
      "Borgo circolare tra i più belli d'Italia. Cummerse, vino DOC, panorama mozzafiato sulla Valle d'Itria.",
    coordinates: { lat: 40.7554, lng: 17.3261 },
    tips: [
      "Assaggia il vino bianco DOC locale",
      "Le cummerse sono le tipiche case con tetto a spiovente",
      "Belvedere panoramico sulla Valle d'Itria",
    ],
  },
  {
    name: "Monopoli",
    distance: "22 km",
    shortDescription: "Porto antico, spiagge bianche e centro vivace",
    longDescription:
      "Porto antico, spiagge bianche, centro storico vivace. Mare cristallino e pesce fresco.",
    coordinates: { lat: 40.9497, lng: 17.2889 },
    tips: [
      "Cala Porta Vecchia è la spiaggia in centro",
      "Cena al porto per pesce freschissimo",
      "Mercato del pesce la mattina presto",
    ],
  },
  {
    name: "Bari",
    distance: "39 km",
    shortDescription: "Basilica di San Nicola, Bari Vecchia, lungomare",
    longDescription:
      "Basilica di San Nicola, Bari Vecchia con le signore delle orecchiette, lungomare spettacolare.",
    coordinates: { lat: 41.1171, lng: 16.8719 },
    tips: [
      "Bari Vecchia: guarda le signore fare le orecchiette",
      "Focaccia barese da Panificio Fiore",
      "Lungomare tra i più lunghi d'Italia",
    ],
  },
  {
    name: "Martina Franca",
    distance: "20 km",
    shortDescription: "Barocco martinese, Festival della Valle d'Itria",
    longDescription:
      "Barocco martinese, Festival della Valle d'Itria, capocollo DOP. Eleganza e tradizione.",
    coordinates: { lat: 40.7014, lng: 17.3372 },
    tips: [
      "Assaggia il capocollo DOP di Martina Franca",
      "Piazza Plebiscito è il cuore del centro",
      "Festival lirico in estate (luglio-agosto)",
    ],
  },
];
