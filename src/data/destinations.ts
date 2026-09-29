import { DestinationData } from '../types/travel';

export const DESTINATIONS: Record<string, DestinationData> = {
  goa: {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun, Golden Sands & Portuguese Heritage',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    overview: 'Famous for pristine coastlines, colonial architecture, vibrant shacks, and water sports with options for every budget tier.',
    recommendedDays: 4,
    bestMonths: 'Nov - Feb',
    places: [
      {
        id: 'palolem-beach',
        name: 'Palolem Beach & Butterfly Island',
        category: 'Beach',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        description: 'Crescent-shaped white sand beach lined with swaying palms and tranquil shallow waters.',
        distanceFromCenter: '18 km from Madgaon',
        estimatedVisitingTime: '3 - 4 hours',
        entryFee: 0,
        bestTimeToVisit: '4:00 PM - Sunset',
        localTransportCost: 150,
        aiRating: 4.9,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Zero entry fee fits your budget perfectly',
          'High traveler satisfaction (4.9/5)',
          'Affordable local bus connectivity from Madgaon',
          'Free sunset viewpoint and beach walk'
        ],
        highlights: ['Dolphin sighting boats', 'Sunset kayaking', 'Beach shacks']
      },
      {
        id: 'aguada-fort',
        name: 'Fort Aguada & Lighthouse',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        description: '17th-century Portuguese fort offering panoramic Arabian Sea vistas and preserved battlements.',
        distanceFromCenter: '15 km from Panaji',
        estimatedVisitingTime: '2 hours',
        entryFee: 50,
        bestTimeToVisit: '9:00 AM - 11:00 AM',
        localTransportCost: 80,
        aiRating: 4.7,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Nominal ₹50 entry fee',
          'Historic architecture with great photo ops',
          'Close to Calangute/Candolim transport corridor'
        ],
        highlights: ['1612 lighthouse', 'Sea ramparts', 'Fresh ocean breeze']
      },
      {
        id: 'basilica-bom-jesus',
        name: 'Basilica of Bom Jesus',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        description: 'UNESCO World Heritage baroque cathedral housing the sacred mortal remains of St. Francis Xavier.',
        distanceFromCenter: '9 km from Panaji',
        estimatedVisitingTime: '1.5 hours',
        entryFee: 0,
        bestTimeToVisit: '10:00 AM - 1:00 PM',
        localTransportCost: 60,
        aiRating: 4.8,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Completely free UNESCO World Heritage site',
          'Direct cheap government bus from Panaji KTC',
          'Calm, reflective atmosphere'
        ],
        highlights: ['Baroque gilded altar', 'Historic paintings', 'Museum nearby']
      },
      {
        id: 'dudhsagar-falls',
        name: 'Dudhsagar Waterfalls Trek',
        category: 'Nature',
        image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80',
        description: 'Four-tiered sea of milk waterfall cascading 310 meters through lush Western Ghats jungles.',
        distanceFromCenter: '60 km from Panaji',
        estimatedVisitingTime: '5 hours',
        entryFee: 100,
        bestTimeToVisit: 'Early Morning 7:00 AM',
        localTransportCost: 500,
        aiRating: 4.8,
        budgetSuitability: 'Moderate',
        whyAiSelected: [
          'One of India’s most dramatic natural landmarks',
          'Cost can be shared with pooled jeep booking'
        ],
        highlights: ['Jeep jungle safari', 'Natural rock pool', 'Railway bridge view']
      },
      {
        id: 'chapora-fort',
        name: "Chapora Fort ('Dil Chahta Hai' Cliff Fort)",
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        description: 'Iconic 1617 red-laterite fortress perched on a cliff overlooking Vagator beach and the Chapora river estuary.',
        distanceFromCenter: '18 km from Panaji',
        estimatedVisitingTime: '2 hours',
        entryFee: 0,
        bestTimeToVisit: '4:30 PM - Sunset',
        localTransportCost: 90,
        aiRating: 4.8,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Zero entry fee with world-famous sunset views',
          'Cinematic Bollywood shooting location',
          'Surrounded by affordable cliffside juice bars'
        ],
        highlights: ['Panoramic ocean horizon', 'Ancient Portuguese ramparts', 'Sunset breeze']
      },
      {
        id: 'reis-magos-fort',
        name: 'Reis Magos Fort & Cultural Heritage Centre',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        description: 'Meticulously restored 1551 Portuguese fortress on the Mandovi river bank with historic canons, prison cells, and art galleries.',
        distanceFromCenter: '8 km from Panaji',
        estimatedVisitingTime: '1.5 hours',
        entryFee: 50,
        bestTimeToVisit: '10:00 AM - 3:00 PM',
        localTransportCost: 70,
        aiRating: 4.7,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Nominal ₹50 ticket gives access to preserved military quarters',
          'Less crowded with scenic river delta photos',
          'Curated Mario Miranda historical cartoons gallery'
        ],
        highlights: ['Old Portuguese cannons', 'Mandovi river panorama', 'Heritage exhibition']
      },
      {
        id: 'fontainhas-heritage',
        name: 'Fontainhas Latin Quarter (Colonial Heritage Walk)',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        description: 'Asia’s oldest surviving Latin Quarter, lined with bright yellow, indigo, and terracotta 18th-century Portuguese bungalows with wrought-iron balconies.',
        distanceFromCenter: 'Panaji City Center',
        estimatedVisitingTime: '2 hours',
        entryFee: 0,
        bestTimeToVisit: '8:00 AM - 10:30 AM or 4:00 PM',
        localTransportCost: 40,
        aiRating: 4.9,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          '100% Free walking street tour with royal heritage architecture',
          'Famous handmade azulejos ceramic tile shops',
          'Historic 1880s traditional bakeries right on the lane'
        ],
        highlights: ['Colorful cobblestone alleys', 'St. Sebastian Chapel', 'Vintage Portuguese villas']
      },
      {
        id: 'se-cathedral',
        name: 'Sé Cathedral (Asia’s Largest Historical Cathedral)',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        description: '16th-century grand Portuguese-Manueline cathedral dedicated to St. Catherine, home to the revered "Golden Bell" heard across miles.',
        distanceFromCenter: '10 km from Panaji',
        estimatedVisitingTime: '1.5 hours',
        entryFee: 0,
        bestTimeToVisit: '9:00 AM - 12:00 PM',
        localTransportCost: 50,
        aiRating: 4.75,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Completely free entry to one of India’s grandest monuments',
          'Directly across from Basilica of Bom Jesus for a 2-in-1 visit',
          'Architectural marvel dating back to 1619'
        ],
        highlights: ['Famous Golden Bell tower', 'Tuscan exterior architecture', 'Historic gold-gilded retable']
      },
      {
        id: 'cabo-de-rama-fort',
        name: 'Cabo de Rama Fort & Cliff Ramparts',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        description: 'Ancient fortress where Lord Rama is said to have stayed during exile. Conquered later by the Portuguese, offering sheer cliff views over emerald ocean lagoons.',
        distanceFromCenter: '28 km from Madgaon',
        estimatedVisitingTime: '2.5 hours',
        entryFee: 0,
        bestTimeToVisit: '3:30 PM - 6:00 PM',
        localTransportCost: 160,
        aiRating: 4.85,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Free entry to a legendary mythology & colonial landmark',
          'Far from overcrowded tourist tracks',
          'Dramatic cliff views dropping into turquoise waves'
        ],
        highlights: ['Mythological Ramayana link', 'St. Anthony Church inside ruins', 'Untouched rocky cliffs']
      },
      {
        id: 'mangueshi-temple',
        name: 'Shri Mangueshi Devotional Temple (Priol)',
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        description: '450-year-old sacred temple dedicated to Lord Shiva (Manguesh), renowned for its majestic 7-story octagonal deepstambha lamp pillar and serene temple tank.',
        distanceFromCenter: '21 km from Panaji',
        estimatedVisitingTime: '1.5 hours',
        entryFee: 0,
        bestTimeToVisit: '6:30 AM (Morning Aarti) - 11:00 AM',
        localTransportCost: 90,
        aiRating: 4.9,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Prime devotional pilgrimage site in Goa with zero entry charge',
          'Pure vegetarian eateries and prasad stalls right outside',
          'Exquisite Goan-Hindu architecture with chandelier domes'
        ],
        highlights: ['7-storey Deepstambha lamp tower', 'Holy temple pond', 'Daily morning shankh aarti']
      },
      {
        id: 'shanta-durga-temple',
        name: 'Shri Shanta Durga Temple (Kavlem)',
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        description: 'Revered temple dedicated to the goddess of peace who reconciled Lord Shiva and Lord Vishnu. Features Indo-Portuguese arched windows and golden palanquin.',
        distanceFromCenter: '18 km from Madgaon',
        estimatedVisitingTime: '1.5 hours',
        entryFee: 0,
        bestTimeToVisit: '7:00 AM - 12:00 PM',
        localTransportCost: 80,
        aiRating: 4.85,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Spiritual peace and sacred blessings for families and elders',
          'Free entrance with clean facilities',
          'Architecturally unique terracotta dome'
        ],
        highlights: ['Golden deity palanquin', 'Pyramidal shikhara roofs', 'Spiritual tranquility']
      }
    ],
    accommodations: [
      {
        id: 'hostel-zostel',
        name: 'Ocean Vibe Backpacker Hub',
        category: 'cheapest',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 650,
        totalCost: 1950,
        rating: 4.7,
        reviewsCount: 420,
        distanceFromSights: '400m from Beach',
        amenities: ['Free WiFi', 'Air Conditioned', 'Lockers', 'Community Kitchen', 'Bicycle Rental'],
        budgetStatus: 'within_budget',
        address: 'Near Calangute Circle, North Goa',
        cancellationPolicy: 'Free cancellation up to 24h before'
      },
      {
        id: 'resort-sea-breeze',
        name: 'Palm Grove Heritage Villa',
        category: 'best_value',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 1650,
        totalCost: 4950,
        rating: 4.8,
        reviewsCount: 310,
        distanceFromSights: '800m from Fort Aguada',
        amenities: ['Swimming Pool', 'Breakfast Included', 'Balcony Sea View', '24/7 Front Desk'],
        budgetStatus: 'within_budget',
        address: 'Candolim Main Road, Goa',
        cancellationPolicy: 'Free cancellation up to 48h before'
      },
      {
        id: 'luxury-boutique',
        name: 'The Azure Seaside Boutique Stay',
        category: 'best_comfort',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 3200,
        totalCost: 9600,
        rating: 4.9,
        reviewsCount: 180,
        distanceFromSights: 'Direct Beach Access',
        amenities: ['Infinity Pool', 'Spa', 'Fine Dining', 'Airport Shuttle', 'Private Sunbed'],
        budgetStatus: 'slightly_expensive',
        address: 'Ashwem Beach Road, Morjim',
        cancellationPolicy: 'Non-refundable discount'
      },
      {
        id: 'ai-pick-goa',
        name: 'Casa Sol Coastal Suites',
        category: 'ai_pick',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 1200,
        totalCost: 3600,
        rating: 4.85,
        reviewsCount: 540,
        distanceFromSights: 'Central to Panaji & Beaches',
        amenities: ['Free High-Speed WiFi', 'Complimentary Breakfast', 'Pool Access', 'Tour Desk'],
        budgetStatus: 'within_budget',
        address: 'Nerul - Candolim Road, Goa',
        cancellationPolicy: 'Free cancellation up to 24h before'
      }
    ],
    foods: [
      {
        id: 'goan-fish-curry',
        name: 'Traditional Goan Fish Curry Thali',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        description: 'Fragrant coconut-kokum infused kingfish curry served with boiled red rice, kismoor, and sol kadhi.',
        approxPrice: 180,
        isVegetarian: false,
        famousAt: 'Anand Seafood Shack, Anjuna & Ritz Classic Panaji',
        aiRecommendation: 'Must-try iconic dish, full balanced meal under ₹200',
        mealType: 'lunch'
      },
      {
        id: 'bebinca',
        name: 'Bebinca Layered Dessert',
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional 7-layer Indo-Portuguese pudding baked with coconut milk, egg yolk, and nutmeg.',
        approxPrice: 90,
        isVegetarian: false,
        famousAt: 'Mr. Baker 1922, Fontainhas Panaji',
        aiRecommendation: 'Sweet staple of Goan cuisine, great with afternoon chai',
        mealType: 'snacks'
      },
      {
        id: 'ros-omelette',
        name: 'Goan Street Ros Omelette',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
        description: 'Fresh fluffy masala omelette submerged in spicy piping-hot chicken xacuti or vegetable gravy with warm poi bread.',
        approxPrice: 70,
        isVegetarian: false,
        famousAt: 'Ravi Ros Omelette Stall, Panaji Church Square',
        aiRecommendation: 'Ultra-budget hearty breakfast favorite of locals',
        mealType: 'breakfast'
      },
      {
        id: 'poi-chana',
        name: 'Goan Poi with Spiced Chana Ross',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        description: 'Fresh local sourdough poi bread served with coconut black chickpea curry.',
        approxPrice: 60,
        isVegetarian: true,
        famousAt: 'Local Village Bakeries & Shacks',
        aiRecommendation: 'Top healthy vegetarian budget option',
        mealType: 'breakfast'
      },
      {
        id: 'sol-kadhi',
        name: 'Chilled Kokum Sol Kadhi & Mirchi Fritters',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        description: 'Digestive pink elixir made with fresh coconut milk, tangy kokum fruit, green chillies, and cilantro. Cooling and restorative.',
        approxPrice: 40,
        isVegetarian: true,
        famousAt: 'All local beach thali shacks and heritage restaurants',
        aiRecommendation: 'Must-drink health elixir after sun & sightseeing',
        mealType: 'snacks'
      },
      {
        id: 'veg-khatkhate',
        name: 'Goan Khatkhate Festive Mixed Vegetable Stew',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional Goan Hindu celebration dish cooked with 7 regional vegetables, grated coconut, jaggery, and teppal spice. 100% Sattvic.',
        approxPrice: 120,
        isVegetarian: true,
        famousAt: 'Kamalabai & Shanta Durga Temple Canteen',
        aiRecommendation: 'Pure vegetarian delicacy full of nutrition and heritage flavors',
        mealType: 'lunch'
      },
      {
        id: 'serradura',
        name: 'Serradura (Portuguese Cream & Crumb Pudding)',
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
        description: 'Silky whipped cream and sweetened condensed milk layered with powdered Marie biscuits and chilled to perfection.',
        approxPrice: 95,
        isVegetarian: true,
        famousAt: 'Infantaria Bakery & Caravela Cafe Panaji',
        aiRecommendation: 'Decadent chilled dessert for sweet cravings',
        mealType: 'dinner'
      }
    ],
    shopping: [
      {
        id: 'anjuna-flea-market',
        name: 'Anjuna Flea Market & Night Bazaar',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        category: 'clothing',
        location: 'Anjuna Beach Front',
        distance: '4 km from Baga',
        estimatedPriceRange: '₹150 - ₹800',
        famousFor: 'Bohemian cotton dresses, hand-woven beachwear, shell jewelry & spices',
        budgetSuitability: 'Budget Friendly'
      },
      {
        id: 'mapusa-friday-market',
        name: 'Mapusa Friday Municipal Bazaar',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
        category: 'local_products',
        location: 'Mapusa City Market',
        distance: '12 km from Panaji',
        estimatedPriceRange: '₹100 - ₹500',
        famousFor: 'Homemade spiced chorizo sausages, organic cashews, feni, and pottery',
        budgetSuitability: 'Budget Friendly'
      },
      {
        id: 'fontainhas-handicrafts',
        name: 'Fontainhas Azulejos Tile Studio',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        category: 'souvenirs',
        location: 'Latin Quarter, Panaji',
        distance: 'City center',
        estimatedPriceRange: '₹200 - ₹1200',
        famousFor: 'Hand-painted glazed ceramic Portuguese tiles and custom nameplates',
        budgetSuitability: 'Moderate'
      }
    ],
    localTransports: [
      {
        id: 'scooter-rent',
        mode: 'scooter_rental',
        name: 'Honda Activa Rental',
        icon: '🛵',
        estimatedFare: 350,
        travelTime: 'Full Day Freedom',
        availability: 'High',
        isPreBookable: true,
        providerNote: '₹350 - ₹450 / 24 hours. Helmets provided. Valid DL required.'
      },
      {
        id: 'kadamba-bus',
        mode: 'bus',
        name: 'Kadamba AC & Shuttle Bus',
        icon: '🚌',
        estimatedFare: 35,
        travelTime: 'Regular 20-30 min intervals',
        availability: 'High',
        isPreBookable: false,
        providerNote: 'Connecting Panaji, Margao, Vasco, Mapusa, and Airport directly.'
      },
      {
        id: 'goa-miles-cab',
        mode: 'cab',
        name: 'GoaMiles Govt App Taxi',
        icon: '🚕',
        estimatedFare: 450,
        travelTime: 'Point-to-point',
        availability: 'High',
        isPreBookable: true,
        providerNote: 'Regulated digital meter fares via Goa Govt mobile app.'
      },
      {
        id: 'auto-rickshaw',
        mode: 'auto',
        name: 'Prepaid Auto Rickshaw',
        icon: '🛺',
        estimatedFare: 120,
        travelTime: 'Short distance local',
        availability: 'Moderate',
        isPreBookable: false,
        providerNote: 'Available at railway stations, bus stands and town centers.'
      }
    ],
    safety: {
      generalHelpline: '112',
      policeNumber: '100 / 0832-2428488',
      ambulanceNumber: '108',
      touristHelpline: '1363 (24/7 Multi-lingual)',
      weatherWarning: null,
      nearbyHospitals: [
        { name: 'Goa Medical College & Hospital (GMC)', distance: '4 km from Panaji', contact: '0832-2458700' },
        { name: 'Manipal Hospital Dona Paula', distance: '6 km from Panaji', contact: '0832-3048800' }
      ],
      nearbyPoliceStations: [
        { name: 'Panaji Town Police Station', distance: '1.2 km', contact: '0832-2423450' },
        { name: 'Calangute Tourist Police Outpost', distance: '300m from beach', contact: '0832-2278294' }
      ],
      pharmacies24x7: [
        { name: 'Wellness Forever 24/7 Panaji', distance: '0.8 km', contact: '0832-2420050' },
        { name: 'Apollo Pharmacy Calangute', distance: '1.5 km', contact: '0832-2277112' }
      ],
      safetyTips: [
        'Swim only within flagged lifeguard zones managed by Drishti Marine.',
        'Always wear a helmet when riding rented scooters or bikes.',
        'Keep emergency helpline numbers saved offline.',
        'Use government-regulated GoaMiles app to avoid unofficial taxi surges.'
      ]
    }
  },
  jaipur: {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Royal Pink City of Palaces & Forts',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    overview: 'A royal wonderland featuring majestic hill forts, pink-hued palaces, bustling bazaars, and rich Rajputana heritage.',
    recommendedDays: 3,
    bestMonths: 'Oct - Mar',
    places: [
      {
        id: 'hawa-mahal',
        name: 'Hawa Mahal (Palace of Winds)',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1603288940356-9b044d50cbf1?auto=format&fit=crop&w=800&q=80',
        description: 'Iconic five-story pink sandstone palace with 953 intricately carved jharokhas (casements).',
        distanceFromCenter: '1 km from Badi Chaupar',
        estimatedVisitingTime: '1.5 hours',
        entryFee: 50,
        bestTimeToVisit: '9:30 AM (Morning Sunlight)',
        localTransportCost: 40,
        aiRating: 4.8,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Budget ₹50 entry ticket (or combined composite ticket)',
          'Walking distance from famous Johari Bazaar',
          'Vibrant rooftop cafes across the street for free exterior view'
        ],
        highlights: ['953 latticed windows', 'Rooftop city view', 'Museum inside']
      },
      {
        id: 'amber-fort',
        name: 'Amer Fort & Maota Lake',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        description: 'Sprawling hilltop fortress built with red sandstone and marble featuring the dazzling Sheesh Mahal.',
        distanceFromCenter: '11 km from City Center',
        estimatedVisitingTime: '3 hours',
        entryFee: 100,
        bestTimeToVisit: '8:30 AM - 11:30 AM',
        localTransportCost: 35,
        aiRating: 4.9,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Affordable direct AC bus (Route #29) from Ajmeri Gate for just ₹35',
          'World-famous mirror palace (Sheesh Mahal)',
          'High traveler rating 4.9'
        ],
        highlights: ['Sheesh Mahal mirrorwork', 'Diwan-e-Aam', 'Elephant path']
      },
      {
        id: 'city-palace',
        name: 'City Palace & Jantar Mantar',
        category: 'Historical',
        image: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=800&q=80',
        description: 'Magnificent blend of Rajput, Mughal, and European architecture with astronomical observatory.',
        distanceFromCenter: 'City Center',
        estimatedVisitingTime: '2.5 hours',
        entryFee: 200,
        bestTimeToVisit: '2:00 PM - 5:00 PM',
        localTransportCost: 30,
        aiRating: 4.7,
        budgetSuitability: 'Moderate',
        whyAiSelected: [
          'Central location eliminates need for expensive transit',
          'UNESCO astronomical observatory next door'
        ],
        highlights: ['Peacock Courtyard', 'Royal armory', 'Giant silver urns']
      }
    ],
    accommodations: [
      {
        id: 'jaipur-hostel',
        name: 'Moustache Pink City Heritage Hostel',
        category: 'cheapest',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 550,
        totalCost: 1650,
        rating: 4.8,
        reviewsCount: 650,
        distanceFromSights: '800m from Sindhi Camp Metro',
        amenities: ['Rooftop Fort View', 'High-Speed WiFi', 'AC Dorms', 'Cultural Events'],
        budgetStatus: 'within_budget',
        address: 'Park Street, M.I. Road, Jaipur',
        cancellationPolicy: 'Free cancellation'
      },
      {
        id: 'jaipur-haveli',
        name: 'Kalyan Heritage Haveli & Terrace',
        category: 'best_value',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 1400,
        totalCost: 4200,
        rating: 4.85,
        reviewsCount: 380,
        distanceFromSights: '1.2 km from Hawa Mahal',
        amenities: ['Traditional Decor', 'Rooftop Restaurant', 'Free Breakfast', 'Airport Pickup'],
        budgetStatus: 'within_budget',
        address: 'Hathroi Fort, Ajmer Road, Jaipur',
        cancellationPolicy: 'Free cancellation up to 24h before'
      },
      {
        id: 'ai-pick-jaipur',
        name: 'Royal Heritage Haveli Suites',
        category: 'ai_pick',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 1100,
        totalCost: 3300,
        rating: 4.9,
        reviewsCount: 490,
        distanceFromSights: 'Walking to Metro & Bazaars',
        amenities: ['Free Breakfast', 'Courtyard Garden', 'AC Rooms', 'Travel Desk'],
        budgetStatus: 'within_budget',
        address: 'Bani Park, Jaipur',
        cancellationPolicy: 'Free cancellation up to 48h before'
      }
    ],
    foods: [
      {
        id: 'dal-baati-churma',
        name: 'Authentic Dal Baati Churma Thali',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        description: 'Hard wheat rolls baked over cow dung cakes, dunked in pure desi ghee, served with spicy panchmel dal and sweet churma.',
        approxPrice: 190,
        isVegetarian: true,
        famousAt: 'Rawat Mishthan Bhandar & Chokhi Dhani Thali',
        aiRecommendation: 'Signature state dish, nutritious, heavily filling',
        mealType: 'lunch'
      },
      {
        id: 'pyaaz-kachori',
        name: 'Crispy Pyaaz Kachori with Kadhi',
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
        description: 'Flaky golden pastry stuffed with spicy onion-potato filling, served with tangy tamarind chutney.',
        approxPrice: 50,
        isVegetarian: true,
        famousAt: 'Rawat Mishthan Bhandar, Station Road',
        aiRecommendation: 'Best morning snack under ₹50',
        mealType: 'breakfast'
      }
    ],
    shopping: [
      {
        id: 'johari-bazaar',
        name: 'Johari Bazaar & Bapu Bazaar',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        category: 'clothing',
        location: 'Old Walled City',
        distance: '500m from Hawa Mahal',
        estimatedPriceRange: '₹200 - ₹900',
        famousFor: 'Jaipuri printed bedsheets, Bandhani sarees, block print kurtis, Mojari leather shoes',
        budgetSuitability: 'Budget Friendly'
      }
    ],
    localTransports: [
      {
        id: 'jaipur-metro',
        mode: 'metro',
        name: 'Jaipur Metro Rail (Pink Line)',
        icon: '🚇',
        estimatedFare: 20,
        travelTime: 'Runs every 10 mins',
        availability: 'High',
        isPreBookable: false,
        providerNote: 'Connects Railway Station, Bus Stand, and Chandpole (Old City) for just ₹10-₹20.'
      },
      {
        id: 'jaipur-e-rickshaw',
        mode: 'auto',
        name: 'Eco E-Rickshaws',
        icon: '🛺',
        estimatedFare: 30,
        travelTime: 'Short distance intra-bazaar',
        availability: 'High',
        isPreBookable: false,
        providerNote: 'Best for navigating narrow Old Pink City streets.'
      }
    ],
    safety: {
      generalHelpline: '112',
      policeNumber: '100 / 0141-2601100',
      ambulanceNumber: '108',
      touristHelpline: '1363 / 0141-2822863',
      weatherWarning: null,
      nearbyHospitals: [
        { name: 'SMS Hospital (Sawai Man Singh)', distance: '2 km', contact: '0141-2560291' }
      ],
      nearbyPoliceStations: [
        { name: 'Manak Chowk Police Station (Hawa Mahal)', distance: '400m', contact: '0141-2602330' }
      ],
      pharmacies24x7: [
        { name: 'Apollo Pharmacy M.I. Road', distance: '1 km', contact: '0141-2374411' }
      ],
      safetyTips: [
        'Purchase composite monument tickets at your first fort to save up to 40% on entry fees.',
        'Use the Jaipur Metro for rapid, cool transit between railway hub and the old walled city.',
        'Bargain politely in traditional bazaars; start around 50-60% of initial quotation.'
      ]
    }
  },
  manali: {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Snow Peaks, Pine Valleys & Himalayan Serenity',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    overview: 'High-altitude Himalayan retreat renowned for snow-capped Pir Panjal ranges, pine forests, and adventure sports.',
    recommendedDays: 4,
    bestMonths: 'Nov - Jun',
    places: [
      {
        id: 'solang-valley',
        name: 'Solang Valley & Rohtang Pass View',
        category: 'Adventure',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        description: 'Vibrant alpine valley offering paragliding, snow skiing, zorbing, and breathtaking glacier views.',
        distanceFromCenter: '13 km from Mall Road',
        estimatedVisitingTime: '4 hours',
        entryFee: 0,
        bestTimeToVisit: '9:00 AM - 2:00 PM',
        localTransportCost: 120,
        aiRating: 4.9,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Free valley entry',
          'Direct shared HRTC electric buses from Manali stand for ₹40'
        ],
        highlights: ['Snow activities', 'Cable car ropeway', 'Glacier panoramas']
      },
      {
        id: 'hadimba-temple',
        name: 'Hadimba Wooden Cave Temple',
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        description: '16th-century pagoda-style cedar wood temple nested inside giant deodar pine groves.',
        distanceFromCenter: '2 km from Mall Road',
        estimatedVisitingTime: '1.5 hours',
        entryFee: 20,
        bestTimeToVisit: '8:00 AM or 4:00 PM',
        localTransportCost: 30,
        aiRating: 4.8,
        budgetSuitability: 'Budget Friendly',
        whyAiSelected: [
          'Peaceful pine forest walk right from Old Manali',
          'Token ₹20 entry'
        ],
        highlights: ['Intricate wooden carvings', 'Giant deodars', 'Yak photography']
      }
    ],
    accommodations: [
      {
        id: 'manali-dorm',
        name: 'Himalayan Pine Backpacker Haven',
        category: 'cheapest',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 500,
        totalCost: 1500,
        rating: 4.75,
        reviewsCount: 390,
        distanceFromSights: 'Old Manali Cafe lane',
        amenities: ['Mountain View Balcony', 'High Speed WiFi', 'Bonfire Area', 'Heater Available'],
        budgetStatus: 'within_budget',
        address: 'Old Manali Village, Himachal Pradesh',
        cancellationPolicy: 'Free cancellation'
      },
      {
        id: 'ai-pick-manali',
        name: 'Snow Valley River View Retreat',
        category: 'ai_pick',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 1250,
        totalCost: 3750,
        rating: 4.88,
        reviewsCount: 420,
        distanceFromSights: '1 km from Mall Road',
        amenities: ['Beas River View', 'Breakfast Included', 'Heating', 'Travel Assistance'],
        budgetStatus: 'within_budget',
        address: 'Aleo, New Manali',
        cancellationPolicy: 'Free cancellation up to 48h before'
      }
    ],
    foods: [
      {
        id: 'siddu',
        name: 'Himachali Steamed Siddu with Ghee',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional fermented wheat dough stuffed with spiced walnuts, poppy seeds, and served with melting desi ghee.',
        approxPrice: 100,
        isVegetarian: true,
        famousAt: 'Old Manali Traditional Dhabas',
        aiRecommendation: 'High-energy authentic mountain superfood',
        mealType: 'lunch'
      },
      {
        id: 'trout-fish',
        name: 'Fresh Tirthan River Fried Trout',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        description: 'Locally caught Himalayan rainbow trout delicately seasoned with mountain herbs and butter.',
        approxPrice: 280,
        isVegetarian: false,
        famousAt: 'Johnson Cafe, Circuit House Road',
        aiRecommendation: 'Specialty delicacy of Himachal crystal waters',
        mealType: 'dinner'
      }
    ],
    shopping: [
      {
        id: 'mall-road-manali',
        name: 'Mall Road & Tibetan Monastery Market',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        category: 'souvenirs',
        location: 'City Center Mall Road',
        distance: 'Walking from center',
        estimatedPriceRange: '₹150 - ₹1200',
        famousFor: 'Pure Kullu shawls, wooden handicrafts, dried apricots, Tibetan prayer wheels',
        budgetSuitability: 'Budget Friendly'
      }
    ],
    localTransports: [
      {
        id: 'hrtc-bus',
        mode: 'bus',
        name: 'HRTC Electric Green Buses',
        icon: '🚌',
        estimatedFare: 40,
        travelTime: 'Frequent services',
        availability: 'High',
        isPreBookable: false,
        providerNote: 'Eco-friendly electric buses connecting Manali to Solang, Naggar and Kullu.'
      },
      {
        id: 'manali-auto',
        mode: 'auto',
        name: 'Mountain Auto Rickshaw',
        icon: '🛺',
        estimatedFare: 80,
        travelTime: 'Short uphill rides',
        availability: 'High',
        isPreBookable: false,
        providerNote: 'Handy for traversing steep lanes between Mall Road and Old Manali.'
      }
    ],
    safety: {
      generalHelpline: '112',
      policeNumber: '100 / 01902-252320',
      ambulanceNumber: '108',
      touristHelpline: '1363',
      weatherWarning: 'Check snow chains and pass permits if heading past Atal Tunnel.',
      nearbyHospitals: [
        { name: 'Civil Hospital Manali (Govt)', distance: '1 km from Mall Road', contact: '01902-252243' }
      ],
      nearbyPoliceStations: [
        { name: 'Manali Police Station', distance: '800m', contact: '01902-252320' }
      ],
      pharmacies24x7: [
        { name: 'Sanjivani 24/7 Chemist Mall Road', distance: '200m', contact: '01902-253100' }
      ],
      safetyTips: [
        'Dress in layers: thermal inners + fleece + windproof jacket.',
        'Never hire unregistered river-crossing or paragliding operators without certified pilots.'
      ]
    }
  }
};

export const POPULAR_ORIGIN_CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Kochi'
];

export const POPULAR_DESTINATIONS = [
  { id: 'goa', name: 'Goa', state: 'Goa', emoji: '🏖️' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', emoji: '🏰' },
  { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', emoji: '🏔️' },
  { id: 'kerala', name: 'Munnar / Kerala', state: 'Kerala', emoji: '🌴' },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', emoji: '🪔' },
  { id: 'ooty', name: 'Ooty', state: 'Tamil Nadu', emoji: '🚂' }
];
