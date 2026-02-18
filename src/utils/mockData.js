export const initialListings = [
  {
    id: 1,
    image: '/images/apartment1.jpg', // Upewnij się, że masz to zdjęcie w public/images
    price: '2 800 zł',
    priceValue: 2800,
    extra: '+ 400 zł czynsz',
    location: 'Warszawa, Ursus',
    title: 'Nowoczesna kawalerka',
    area: '36 m²',
    rooms: '1 pokój',
    coordinates: { lat: 52.1896, lng: 20.8818 },
    description: 'Piękne mieszkanie w nowym budownictwie.',
    type: 'Mieszkanie'
  },
  {
    id: 2,
    image: '/images/apartment1.jpg',
    price: '3 500 zł',
    priceValue: 3500,
    extra: '+ 500 zł czynsz',
    location: 'Warszawa, Mokotów',
    title: 'Apartament z widokiem',
    area: '48 m²',
    rooms: '2 pokoje',
    coordinates: { lat: 52.1920, lng: 21.0350 },
    description: 'Blisko metra, cicha okolica.',
    type: 'Mieszkanie'
  },
  {
    id: 3,
    image: '/images/apartment1.jpg',
    price: '1 900 zł',
    priceValue: 1900,
    extra: '+ 300 zł media',
    location: 'Warszawa, Wola',
    title: 'Przytulny pokój',
    area: '15 m²',
    rooms: '1 pokój',
    coordinates: { lat: 52.2297, lng: 20.9822 },
    description: 'Dla studenta, blisko centrum.',
    type: 'Pokój'
  }
];

export const initialChats = [
  {
    id: 1,
    name: "Maja Wiśniewska",
    avatar: "/images/avatar.jpg",
    messages: [{ text: "Dzień dobry, czy oferta aktualna?", time: "10:30", from: "user" }]
  }
];


