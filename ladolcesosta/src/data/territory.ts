export interface Place {
  name: string;
  distance: string;
  shortDescription: string;
  longDescription: string;
  coordinates: { lat: number; lng: number };
  tips: string[];
  icon: string;
  image: string;
}

export const places: Place[] = [
  {
    name: "Grotte di Castellana",
    distance: "2 km",
    shortDescription: "Grotte carsiche tra le più spettacolari d'Europa",
    longDescription:
      "Scoperte nel 1938 dallo speleologo Franco Anelli, le Grotte di Castellana si estendono per oltre 3 km a 70 metri di profondità. Il percorso completo vi porta attraverso caverne dai nomi evocativi — la Grave, il Corridoio del Serpente, la Caverna della Civetta — fino alla Grotta Bianca, considerata la grotta più splendente al mondo per la purezza delle sue stalattiti di calcite. La temperatura è costante a 16°C tutto l'anno: perfetta d'estate, portatevi una felpa d'inverno. Il percorso breve (1 km, 50 min) vi dà un assaggio; quello completo (3 km, 2 ore) è l'esperienza vera.",
    coordinates: { lat: 40.8725, lng: 17.1483 },
    icon: "🕳️",
    image: "/ladolcesosta/images/grotte.avif",
    tips: [
      "Prenotate online su grottedicastellana.it per saltare la coda, soprattutto in agosto",
      "Temperatura interna costante a 16°C: portatevi una felpa anche in piena estate",
      "Il percorso completo (3 km, 2h) include la Grotta Bianca — non accontentatevi di quello breve",
      "Orari estivi: ultima visita completa alle 18:00, arrivate almeno 20 minuti prima",
      "Per pranzo dopo la visita: Osteria del Viandante in centro Castellana, cucina casalinga eccellente",
      "Punto foto migliore: la Grave, la prima enorme caverna subito dopo l'ingresso",
    ],
  },
  {
    name: "Locorotondo",
    distance: "12 km",
    shortDescription: "Borgo circolare tra i più belli d'Italia",
    longDescription:
      "Il nome dice tutto: Locorotondo è un borgo perfettamente circolare, arroccato su un colle che domina la Valle d'Itria. Le 'cummerse' — case con tetti a spiovente coperti di chiancarelle — sono uniche di questo paese e creano un profilo inconfondibile. Il centro storico è un gioiello silenzioso: niente folla turistica, solo anziani seduti davanti casa, gatti sulle scale e il profumo di ragù la domenica. Il vino bianco DOC di Locorotondo, da uve Verdeca e Bianco d'Alessano, è il compagno perfetto per il pesce crudo pugliese.",
    coordinates: { lat: 40.7554, lng: 17.3261 },
    icon: "🍷",
    image: "/ladolcesosta/images/locorotondo.webp",
    tips: [
      "Assaggiate il vino bianco DOC locale alla Cantina del Locorotondo (visite con degustazione)",
      "Belvedere di Via Nardelli: il panorama più bello sulla Valle d'Itria e i trulli sparsi",
      "Per cena: La Taverna del Duca — orecchiette fatte a mano e bombette di capocollo",
      "Le cummerse sono le tipiche case con tetto a spiovente — le più belle in Via Giannone",
      "D'estate il festival 'Locus' porta jazz di livello internazionale nel centro storico",
      "Passeggiate la sera: il borgo illuminato è magico e praticamente deserto",
    ],
  },
  {
    name: "Alberobello",
    distance: "15 km",
    shortDescription: "Patrimonio UNESCO, trulli e paesaggio fiabesco",
    longDescription:
      "Patrimonio UNESCO dal 1996, Alberobello custodisce oltre 1.500 trulli — costruzioni coniche in pietra a secco che risalgono al XVII secolo, nate da un trucco fiscale: i conti di Conversano facevano costruire case senza malta così potevano smontarle velocemente prima delle ispezioni del Re di Napoli sui nuovi insediamenti. Il Rione Monti è la zona turistica, ma per vivere i trulli senza folla attraversate verso Rione Aia Piccola, dove abitano ancora famiglie locali. Il Trullo Sovrano, l'unico a due piani, merita la visita.",
    coordinates: { lat: 40.7844, lng: 17.2372 },
    icon: "🏠",
    image: "/ladolcesosta/images/alberobello.jpg",
    tips: [
      "Visitate al mattino presto (prima delle 9:30) o dopo le 18 per evitare la folla dei bus turistici",
      "Rione Aia Piccola è la zona autentica: trulli abitati, nessun negozio di souvenir",
      "Per mangiare: Trattoria Terra Madre in via Monte San Marco — orecchiette con cime di rapa perfette",
      "Salite sulla terrazza del Trullo Sovrano per la vista panoramica sui tetti conici",
      "Evitate i trulli-negozio del Rione Monti: prezzi turistici. Comprate olio e taralli in centro paese",
      "La sera i trulli si illuminano ed è tutta un'altra atmosfera — tornate per una passeggiata serale",
    ],
  },
  {
    name: "Martina Franca",
    distance: "20 km",
    shortDescription: "Barocco martinese, Festival della Valle d'Itria",
    longDescription:
      "Martina Franca è l'elegante signora della Valle d'Itria: palazzi barocchi dalle facciate ricamate, portali monumentali e balconi in ferro battuto che raccontano secoli di nobiltà terriera. Il Palazzo Ducale, oggi sede del Municipio, ha saloni affrescati visitabili gratuitamente. Ma il vero tesoro di Martina è il capocollo DOP — stagionato nelle grotte naturali con una tecnica che risale al 1600, è considerato uno dei migliori salumi d'Italia. In estate (luglio-agosto) il Festival della Valle d'Itria trasforma il centro in un palcoscenico di opera lirica e musica classica.",
    coordinates: { lat: 40.7014, lng: 17.3372 },
    icon: "🎭",
    image: "/ladolcesosta/images/martinafranca.jpg",
    tips: [
      "Capocollo DOP: compratelo alla Macelleria Ricci in Via Cavour — il migliore della zona",
      "Palazzo Ducale: visita gratuita ai saloni affrescati, chiedete al portiere del Municipio",
      "Per cena: Garibaldi Ristorante, piatti della tradizione rivisitati con gusto contemporaneo",
      "Piazza Plebiscito è il cuore del centro — caffè al Bar Tripoli per un espresso come si deve",
      "Festival della Valle d'Itria (luglio-agosto): prenotate i biglietti con anticipo su festivaldellavalleditria.it",
      "Passeggiata: dalla Villa Comunale il panorama sulla Valle d'Itria è spettacolare al tramonto",
    ],
  },
  {
    name: "Monopoli",
    distance: "22 km",
    shortDescription: "Porto antico, spiagge bianche e centro vivace",
    longDescription:
      "Monopoli è la sorpresa della Puglia: un centro storico vivacissimo affacciato su un porto peschereccio ancora attivo, circondato da oltre 25 calette e spiagge. A differenza delle vicine località turistiche, qui la vita locale non si è fermata: al mattino presto i pescatori vendono il pescato al porto, le massaie stendono la pasta fresca sui tavoli di marmo, e la sera il centro si anima con aperitivi e cena. Il Castello di Carlo V domina il porto, e la Cattedrale barocca custodisce l'icona della Madonna della Madia, patrona della città.",
    coordinates: { lat: 40.9497, lng: 17.2889 },
    icon: "⚓",
    image: "/ladolcesosta/images/monopoli.jpg",
    tips: [
      "Cala Porta Vecchia: la spiaggetta in centro storico, piccola ma scenografica",
      "Mercato del pesce al porto la mattina presto (6:30-9:00) — spettacolo autentico",
      "Per cena: Ristorante La Locanda sul porto — crudo di pesce eccezionale, prenotate",
      "Spiagge migliori: Porto Ghiacciolo (acqua cristallina, scogliera) e Capitolo (sabbia, stabilimenti)",
      "Passeggiata serale: dal Castello lungo le mura fino al faro — vista sul mare aperto",
      "Il 16 dicembre la festa della Madonna della Madia: fuochi d'artificio sul porto, emozionante",
    ],
  },
  {
    name: "Polignano a Mare",
    distance: "28 km",
    shortDescription: "Scogliere a picco sull'Adriatico, Lama Monachile",
    longDescription:
      "Arroccata su scogliere a picco sull'Adriatico, Polignano è molto più della famosa Lama Monachile. Fondata dai Greci col nome di Neapolis, il centro storico è un dedalo di vicoli con affacci improvvisi sul mare e poesie scritte sui muri dal progetto 'Guido il Flaneur'. Patria di Domenico Modugno — la sua statua a braccia aperte sul lungomare è diventata iconica. D'estate il Red Bull Cliff Diving porta tuffatori da tutto il mondo dal ponte della Lama. Ma il segreto vero è la costa a sud: calette raggiungibili solo a piedi come Cala Paura e Cala San Vito.",
    coordinates: { lat: 40.9942, lng: 17.2206 },
    icon: "🌊",
    image: "/ladolcesosta/images/polignano.jpg",
    tips: [
      "Tramonto dal ponte di Lama Monachile è imperdibile — arrivate 30 minuti prima per prendere posto",
      "Gelato da Supermago del Gelo (via Marchese di Conversano): cremini e pistacchio i migliori",
      "Per la cena: Pescaria (street food di pesce gourmet) o Il Bastione per la vista",
      "Passeggiata panoramica: partite da Piazza dell'Orologio, seguite la costa verso sud",
      "Parcheggio: usate quello di Via Conversano (gratuito), 5 minuti a piedi dal centro",
      "Le spiagge libere sono piccole: arrivate prima delle 9 in estate o preferite settembre",
    ],
  },
  {
    name: "Ostuni",
    distance: "38 km",
    shortDescription: "La Città Bianca, vicoli candidi e vista sul mare",
    longDescription:
      "La Città Bianca deve il suo soprannome alla tradizione di imbiancare le case a calce, iniziata nel Medioevo durante le pestilenze per le proprietà disinfettanti della calce viva. Arrampicata su tre colli, Ostuni domina la piana degli ulivi millenari fino al mare — alcuni di questi ulivi hanno oltre 3.000 anni e producono ancora. Il centro storico è un labirinto di scalinate, archi e piazzette dove perdersi è il modo migliore per esplorare. La Cattedrale in cima, con la sua facciata gotica e il rosone a 24 raggi, è tra le più belle della Puglia.",
    coordinates: { lat: 40.7296, lng: 17.5764 },
    icon: "🏛️",
    image: "/ladolcesosta/images/ostuni.jpg",
    tips: [
      "Salite fino alla Cattedrale per la vista panoramica a 360° — arrivate al tramonto",
      "Parcheggio fuori le mura (Piazzale Santissima Trinità), poi salite a piedi",
      "Olio d'oliva: compratelo direttamente al Frantoio Ferrara sulla strada per la marina",
      "Per pranzo: Osteria Piazzetta Cattedrale, bombette pugliesi e fave e cicorie imperdibili",
      "La Marina di Ostuni ha spiagge Bandiera Blu — Costa Merlata è la più suggestiva",
      "Mercato del sabato mattina: bancarelle lungo Corso Mazzini, prodotti locali autentici",
    ],
  },
  {
    name: "Bari",
    distance: "39 km",
    shortDescription: "Basilica di San Nicola, Bari Vecchia, lungomare",
    longDescription:
      "Bari Vecchia è il cuore pulsante del capoluogo pugliese: un dedalo di 120 vicoli dove le signore impastano orecchiette davanti alle porte di casa (la scena più famosa è in Strada Arco Basso), dove la Basilica di San Nicola attira pellegrini ortodossi da tutta Europa, e dove la focaccia barese si compra ancora calda dal forno alle 7 di mattina. Il lungomare Nazario Sauro, lungo 12 km, è perfetto per una passeggiata al tramonto. Il Teatro Petruzzelli, ricostruito dopo l'incendio del 1991, è il quarto teatro d'Italia per grandezza.",
    coordinates: { lat: 41.1171, lng: 16.8719 },
    icon: "🏰",
    image: "/ladolcesosta/images/barivecchia.jpg",
    tips: [
      "Bari Vecchia: Strada Arco Basso per vedere le signore fare le orecchiette (mattina, non domenica)",
      "Focaccia barese: Panificio Fiore in Strada Palazzo di Città — prendete quella con pomodorini",
      "Pranzo: Terranima in Via Putignani — cucina barese autentica, menù che cambia ogni giorno",
      "Lungomare al tramonto: partite dal Fortino di Sant'Antonio, camminate verso il faro",
      "Per il pesce crudo: andate al Mercato Coperto di Santa Scolastica la mattina",
      "Parcheggio: Lungomare Starita (parcheggio coperto), poi tutto a piedi — Bari Vecchia è piccola",
    ],
  },
];
