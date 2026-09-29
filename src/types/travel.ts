export type LanguageCode = 
  | 'en' // English
  | 'hi' // Hindi
  | 'te' // Telugu
  | 'ta' // Tamil
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'mr' // Marathi
  | 'bn' // Bengali
  | 'gu' // Gujarati
  | 'pa' // Punjabi
  | 'ur' // Urdu
  | 'fr' // French
  | 'es' // Spanish
  | 'de' // German
  | 'ja'; // Japanese

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export type BudgetTier = 'low' | 'medium' | 'flexible' | 'custom';

export type TripPurpose = 
  | 'devotional' // Temples, pilgrimage, spiritual, peaceful
  | 'chilling'   // Beaches, sunsets, shacks, relaxation
  | 'family'     // Kid-friendly, elderly-friendly, comfortable
  | 'adventure'  // Water sports, trekking, thrills
  | 'heritage'   // Forts, palaces, museums, culture
  | 'solo';      // Backpacking, hostel, flexibility

export type TransportType = 
  | 'flight'
  | 'train'
  | 'bus'
  | 'cab'
  | 'car_rental'
  | 'bike_scooter'
  | 'ai_decide';

export interface BookedTicket {
  id: string;
  bookingRef: string;
  pnrNumber: string;
  type: 'transport' | 'hotel' | 'attraction' | 'package';
  title: string;
  subtitle: string;
  passengerNames: string[];
  travelDate: string;
  seatsOrRooms: string;
  totalPaid: number;
  paymentMethod: string;
  status: 'CONFIRMED' | 'PAID';
  issuedAt: string;
  departureTime?: string;
  arrivalTime?: string;
  origin?: string;
  destination?: string;
  gateOrPlatform?: string;
  qrCodeData: string;
}

export interface PassengerDetails {
  passengerName: string;
  totalTravellers: number;
  adults: number;
  children: number;
  seniors: number;
  fromLocation: string;
  toDestination: string;
  travelDate: string;
  returnDate: string;
  tripType: 'round_trip' | 'one_way';
  budgetTier: BudgetTier;
  totalBudget: number; // in ₹
  tripPurpose?: TripPurpose;
}

export interface VehicleSchedule {
  id: string;
  operatorName: string; // e.g. "Kaveri Travels Volvo Multi-Axle", "VRL Travels AC Sleeper", "Superfast Express"
  vehicleType: 'bus' | 'train' | 'flight' | 'cab';
  vehicleNumber: string; // e.g. "KA-01-F-9821" or "12133" or "6E-204"
  departureTime: string; // e.g. "08:30 PM"
  arrivalTime: string;   // e.g. "06:45 AM"
  duration: string;      // e.g. "10h 15m"
  boardingPoint: string; // e.g. "Borivali / Dadar Central"
  droppingPoint: string; // e.g. "Panaji / Madgaon Stand"
  farePerPerson: number;
  availableSeats: number;
  rating: number;
  amenities: string[];
  liveStatus: 'Filling Fast' | 'Available' | 'Few Seats Left';
}

export interface StationToHotelTransfer {
  id: string;
  mode: 'cab' | 'auto' | 'metro' | 'bus';
  title: string;
  vehicleName: string; // e.g. "Prepaid AC Sedan Cab", "Metro Pink Line", "Kadamba Shuttle"
  pickupLocation: string; // Station or Airport terminal
  dropoffLocation: string; // Selected hotel
  estimatedFare: number;
  durationMinutes: number;
  frequency: string;
  isPreBookable: boolean;
  prebookStatus: 'Pre-book Available' | 'On-Spot Ticket' | 'Meter Fare';
  note: string;
}

export interface TransportComparisonItem {
  id: string;
  type: TransportType;
  name: string;
  icon: string;
  costPerPerson: number;
  totalCost: number;
  travelTime: string;
  comfort: 'Basic' | 'Moderate' | 'High' | 'Luxury';
  budgetStatus: 'within_budget' | 'slightly_expensive' | 'over_budget';
  co2EcoRating: string;
  features: string[];
  departureOptions: string;
}

export interface TouristPlace {
  id: string;
  name: string;
  category: 'Beach' | 'Temple' | 'Museum' | 'Historical' | 'Nature' | 'Adventure' | 'Viewpoint';
  image: string;
  description: string;
  distanceFromCenter: string;
  estimatedVisitingTime: string;
  entryFee: number;
  bestTimeToVisit: string;
  localTransportCost: number;
  aiRating: number; // e.g. 4.9
  budgetSuitability: 'Budget Friendly' | 'Moderate' | 'Premium';
  whyAiSelected: string[];
  highlights: string[];
  latitude?: number;
  longitude?: number;
}

export interface AccommodationOption {
  id: string;
  name: string;
  category: 'cheapest' | 'best_value' | 'best_comfort' | 'ai_pick';
  image: string;
  pricePerNight: number;
  totalCost: number;
  rating: number;
  reviewsCount: number;
  distanceFromSights: string;
  amenities: string[];
  budgetStatus: 'within_budget' | 'slightly_expensive' | 'over_budget';
  address: string;
  cancellationPolicy: string;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  description: string;
  approxPrice: number;
  isVegetarian: boolean;
  famousAt: string;
  aiRecommendation: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

export interface ShoppingPlace {
  id: string;
  name: string;
  image: string;
  category: 'clothing' | 'accessories' | 'souvenirs' | 'local_products' | 'traditional_items';
  location: string;
  distance: string;
  estimatedPriceRange: string;
  famousFor: string;
  budgetSuitability: 'Budget Friendly' | 'Moderate' | 'Handmade Premium';
}

export interface LocalTransportOption {
  id: string;
  mode: 'cab' | 'auto' | 'bus' | 'metro' | 'bike_rental' | 'scooter_rental' | 'walking';
  name: string;
  icon: string;
  estimatedFare: number;
  travelTime: string;
  availability: 'High' | 'Moderate' | 'Limited';
  isPreBookable: boolean;
  providerNote: string;
}

export interface LocationTransitEstimate {
  placeId: string;
  placeName: string;
  options: {
    mode: 'cab' | 'bus' | 'metro' | 'walking' | 'auto';
    fare: number;
    timeMinutes: number;
    distanceKm: number;
    comfortScore: number;
  }[];
  bestOption: 'cab' | 'bus' | 'metro' | 'walking' | 'auto';
  reason: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  cost: number;
  category: 'transport' | 'food' | 'sightseeing' | 'shopping' | 'stay' | 'leisure';
  icon: string;
  locationName: string;
  tips: string;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  theme: string;
  items: ItineraryItem[];
  dayTotal: number;
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  localTransport: number;
  attractions: number;
  shopping: number;
  emergencyBuffer: number;
  totalEstimatedCost: number;
  userBudget: number;
  remainingBudget: number;
  status: 'within_budget' | 'close_to_budget' | 'over_budget';
  percentageUsed: number;
}

export interface OptimizationSuggestion {
  id: string;
  category: 'transport' | 'stay' | 'local_transit' | 'activities';
  originalChoice: string;
  originalCost: number;
  recommendedChoice: string;
  recommendedCost: number;
  savings: number;
  reason: string;
  applied: boolean;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface SafetyInfo {
  generalHelpline: string;
  policeNumber: string;
  ambulanceNumber: string;
  touristHelpline: string;
  weatherWarning: string | null;
  nearbyHospitals: { name: string; distance: string; contact: string }[];
  nearbyPoliceStations: { name: string; distance: string; contact: string }[];
  pharmacies24x7: { name: string; distance: string; contact: string }[];
  safetyTips: string[];
}

export interface DestinationData {
  id: string;
  name: string;
  state: string;
  tagline: string;
  heroImage: string;
  overview: string;
  recommendedDays: number;
  bestMonths: string;
  places: TouristPlace[];
  accommodations: AccommodationOption[];
  foods: FoodItem[];
  shopping: ShoppingPlace[];
  localTransports: LocalTransportOption[];
  safety: SafetyInfo;
}
