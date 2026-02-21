export const initialListings = [
    {
        id: 1,
        title: "Nowoczesny apartament w centrum",
        price: 3500,
        currency: "PLN",
        location: "Warszawa, Śródmieście",
        type: "Apartament",
        area: 45,
        rooms: 2,
        floor: 5,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 52.2297,
        lng: 21.0122,
        coordinates: { lat: 52.2297, lng: 21.0122 },
        description: "Piękny apartament w samym sercu Warszawy, blisko metra i Starego Miasta.",
        amenities: ['Wifi', 'Klimatyzacja', 'Zmywarka', 'Winda']
    },
    {
        id: 2,
        title: "Przytulna kawalerka na Mokotowie",
        price: 2200,
        currency: "PLN",
        location: "Warszawa, Mokotów",
        type: "Kawalerka",
        area: 28,
        rooms: 1,
        floor: 3,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800",
        isFavorite: true,
        lat: 52.2000,
        lng: 21.0118,
        coordinates: { lat: 52.2000, lng: 21.0118 },
        description: "Cicha i spokojna okolica, blisko parku i komunikacji miejskiej.",
        amenities: ['Balkon', 'Zwierzęta', 'Piwnica']
    },
    {
        id: 3,
        title: "Penthouse z widokiem na Wisłę",
        price: 8000,
        currency: "PLN",
        location: "Warszawa, Powiśle",
        type: "Penthouse",
        area: 120,
        rooms: 4,
        floor: 10,
        image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 52.2390,
        lng: 21.0312,
        coordinates: { lat: 52.2390, lng: 21.0312 },
        description: "Luksusowy apartament z tarasem i niesamowitym widokiem.",
        amenities: ['Klimatyzacja', 'Garaż', 'Smart Home', 'Winda', 'Taras']
    },
    {
        id: 4,
        title: "Rodzinne mieszkanie na Ursynowie",
        price: 4500,
        currency: "PLN",
        location: "Warszawa, Ursynów",
        type: "Mieszkanie",
        area: 75,
        rooms: 3,
        floor: 2,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 52.1480,
        lng: 21.0450,
        coordinates: { lat: 52.1480, lng: 21.0450 },
        description: "Idealne dla rodziny, blisko szkoły i metra.",
        amenities: ['Garaż', 'Balkon', 'Winda', 'Plac zabaw']
    },
    {
        id: 5,
        title: "Loft na Pradze",
        price: 3200,
        currency: "PLN",
        location: "Warszawa, Praga Północ",
        type: "Loft",
        area: 55,
        rooms: 2,
        floor: 1,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 52.2540,
        lng: 21.0360,
        coordinates: { lat: 52.2540, lng: 21.0360 },
        description: "Artystyczny klimat, wysokie sufity, blisko Centrum Koneser.",
        amenities: ['Internet', 'Biurko', 'Ochrona']
    },
    {
        id: 6,
        title: "Studio przy metrze Wola",
        price: 2800,
        currency: "PLN",
        location: "Warszawa, Wola",
        type: "Studio",
        area: 32,
        rooms: 1,
        floor: 4,
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 52.2350,
        lng: 20.9650,
        coordinates: { lat: 52.2350, lng: 20.9650 },
        description: "Nowoczesne studio w nowym budownictwie, świetna lokalizacja.",
        amenities: ['Winda', 'Balkon', 'Internet']
    },
    {
        id: 7,
        title: "Apartament blisko Rynku",
        price: 4200,
        currency: "PLN",
        location: "Kraków, Stare Miasto",
        type: "Apartament",
        area: 60,
        rooms: 3,
        floor: 2,
        image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 50.0614,
        lng: 19.9366,
        coordinates: { lat: 50.0614, lng: 19.9366 },
        description: "Stylowe mieszkanie w kamienicy, 5 min do Rynku Głównego.",
        amenities: ['Wifi', 'Zmywarka', 'Historyczne wnętrze']
    },
    {
        id: 8,
        title: "Mieszkanie na Kazimierzu",
        price: 3100,
        currency: "PLN",
        location: "Kraków, Kazimierz",
        type: "Mieszkanie",
        area: 48,
        rooms: 2,
        floor: 1,
        image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 50.0520,
        lng: 19.9450,
        coordinates: { lat: 50.0520, lng: 19.9450 },
        description: "Klimatyczne mieszkanie w sercu dzielnicy żydowskiej.",
        amenities: ['Balkon', 'Internet', 'Ogrzewanie miejskie']
    },
    {
        id: 9,
        title: "Loft przy Odrze",
        price: 3800,
        currency: "PLN",
        location: "Wrocław, Śródmieście",
        type: "Loft",
        area: 65,
        rooms: 2,
        floor: 3,
        image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 51.1150,
        lng: 17.0350,
        coordinates: { lat: 51.1150, lng: 17.0350 },
        description: "Przestronny loft z widokiem na rzekę.",
        amenities: ['Klimatyzacja', 'Garaż', 'Garderoba']
    },
    {
        id: 10,
        title: "Apartament z widokiem na morze",
        price: 5500,
        currency: "PLN",
        location: "Gdańsk, Przymorze",
        type: "Apartament",
        area: 80,
        rooms: 3,
        floor: 7,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 54.4000,
        lng: 18.5800,
        coordinates: { lat: 54.4000, lng: 18.5800 },
        description: "Luksusowy apartament blisko plaży.",
        amenities: ['Balkon', 'Garaż', 'Winda', 'Sauna']
    },
    {
        id: 11,
        title: "Mieszkanie na Jeżycach",
        price: 2600,
        currency: "PLN",
        location: "Poznań, Jeżyce",
        type: "Mieszkanie",
        area: 40,
        rooms: 2,
        floor: 0,
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 52.4150,
        lng: 16.9050,
        coordinates: { lat: 52.4150, lng: 16.9050 },
        description: "Piękne mieszkanie w modnej dzielnicy.",
        amenities: ['Internet', 'Piwnica', 'Gaz']
    },
    {
        id: 12,
        title: "Kawalerka blisko Politechniki",
        price: 1900,
        currency: "PLN",
        location: "Poznań, Rataje",
        type: "Kawalerka",
        area: 25,
        rooms: 1,
        floor: 4,
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800",
        isFavorite: false,
        lat: 52.3900,
        lng: 16.9500,
        coordinates: { lat: 52.3900, lng: 16.9500 },
        description: "Idealna dla studenta, blisko uczelni i jeziora Malta.",
        amenities: ['Internet', 'Winda', 'Blisko tramwaj']
    }
];

export const initialUsers = [
    {
        id: 1,
        email: "test@example.com",
        password: "password123",
        name: "Jan Kowalski"
    }
];

export const initialChats = [
    {
        id: 1,
        propertyId: 2,
        name: "Monika Nowak",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        messages: [
            { from: 'other', text: 'Witam, ogłoszenie aktualne.', time: '10.02.26' }
        ]
    },
    {
        id: 2,
        propertyId: 4,
        name: "Jan Kowalski",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        messages: [
            { from: 'other', text: 'Witam, czy ogłoszenie aktualne?', time: '10.02.26' }
        ]
    },
    {
        id: 3,
        propertyId: 6,
        name: "Martyna Wójcik",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        messages: [
            { from: 'other', text: 'Witam, czy ogłoszenie aktualne?', time: '10.02.26' }
        ]
    },
    {
        id: 4,
        propertyId: 1,
        name: "Maja Wiśniewska",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        messages: [
            { from: 'other', text: 'Witam, czy ogłoszenie aktualne?', time: '10.02.26' }
        ]
    }
];
