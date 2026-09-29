import {
  PassengerDetails,
  TransportComparisonItem,
  TransportType,
  BudgetBreakdown,
  OptimizationSuggestion,
  DayItinerary,
  DestinationData
} from '../types/travel';

export const calculateTransportOptions = (
  details: PassengerDetails
): TransportComparisonItem[] => {
  const { totalTravellers, totalBudget, tripType } = details;
  const isRound = tripType === 'round_trip';
  const multiplier = isRound ? 2 : 1;

  // Base costs per person one way
  const baseTrain = 650;
  const baseBus = 750;
  const baseFlight = 3800;
  const baseCab = Math.round(5500 / Math.max(1, totalTravellers)); // shared cab
  const baseRentalCar = Math.round(4200 / Math.max(1, totalTravellers));
  const baseBike = 1200;

  const trainTotal = baseTrain * totalTravellers * multiplier;
  const busTotal = baseBus * totalTravellers * multiplier;
  const flightTotal = baseFlight * totalTravellers * multiplier;
  const cabTotal = 5500 * multiplier;
  const rentalCarTotal = 4200 * multiplier;
  const bikeTotal = baseBike * Math.ceil(totalTravellers / 2) * multiplier;

  const evaluateBudgetStatus = (cost: number) => {
    const transportAllowance = totalBudget * 0.45; // Max 45% of total budget for transit
    if (cost <= transportAllowance) return 'within_budget' as const;
    if (cost <= totalBudget * 0.65) return 'slightly_expensive' as const;
    return 'over_budget' as const;
  };

  return [
    {
      id: 'train',
      type: 'train',
      name: 'Superfast Express / Vande Bharat',
      icon: '🚆',
      costPerPerson: baseTrain * multiplier,
      totalCost: trainTotal,
      travelTime: '7 - 9 hours',
      comfort: 'High',
      budgetStatus: evaluateBudgetStatus(trainTotal),
      co2EcoRating: 'A+ (Lowest Carbon Footprint)',
      features: ['Sleeper / 3AC Berth', 'On-board Catering', 'Scenic route windows', 'Luggage friendly'],
      departureOptions: 'Daily multiple departures from major stations'
    },
    {
      id: 'bus',
      type: 'bus',
      name: 'AC Multi-Axle Sleeper Bus',
      icon: '🚌',
      costPerPerson: baseBus * multiplier,
      totalCost: busTotal,
      travelTime: '9 - 11 hours',
      comfort: 'Moderate',
      budgetStatus: evaluateBudgetStatus(busTotal),
      co2EcoRating: 'B+ (Eco-friendly public transit)',
      features: ['Individual Sleeper Pod', 'Charging points', 'Rest stop meals', 'City center pickup'],
      departureOptions: 'Overnight daily departures'
    },
    {
      id: 'flight',
      type: 'flight',
      name: 'Domestic Airline Economy',
      icon: '✈️',
      costPerPerson: baseFlight * multiplier,
      totalCost: flightTotal,
      travelTime: '1h 20m (Fastest)',
      comfort: 'Luxury',
      budgetStatus: evaluateBudgetStatus(flightTotal),
      co2EcoRating: 'C (High emissions)',
      features: ['Fastest arrival', '15kg check-in luggage', 'Airport lounges'],
      departureOptions: 'Direct & connecting flights'
    },
    {
      id: 'cab',
      type: 'cab',
      name: 'Intercity AC Sedan / SUV Taxi',
      icon: '🚕',
      costPerPerson: Math.round(cabTotal / totalTravellers),
      totalCost: cabTotal,
      travelTime: '8 hours',
      comfort: 'High',
      budgetStatus: evaluateBudgetStatus(cabTotal),
      co2EcoRating: 'C (Private road vehicle)',
      features: ['Door-to-door pickup', 'Unlimited photo breaks', 'Chauffeur driven'],
      departureOptions: 'On-demand anytime'
    },
    {
      id: 'car_rental',
      type: 'car_rental',
      name: 'Self-Drive AC Hatchback / SUV',
      icon: '🚗',
      costPerPerson: Math.round(rentalCarTotal / totalTravellers),
      totalCost: rentalCarTotal,
      travelTime: '8 hours',
      comfort: 'Moderate',
      budgetStatus: evaluateBudgetStatus(rentalCarTotal),
      co2EcoRating: 'C (Road vehicle)',
      features: ['Freedom of stops', 'Zero chauffeur dependency', 'Fuel included plans available'],
      departureOptions: 'Available at airport/city hubs'
    },
    {
      id: 'bike_scooter',
      type: 'bike_scooter',
      name: 'Royal Enfield / Cruiser Touring Bike',
      icon: '🛵',
      costPerPerson: Math.round(bikeTotal / totalTravellers),
      totalCost: bikeTotal,
      travelTime: '9 hours',
      comfort: 'Basic',
      budgetStatus: evaluateBudgetStatus(bikeTotal),
      co2EcoRating: 'B (Moderate fuel use)',
      features: ['Thrilling mountain/coastal ride', 'Immersion in landscapes', 'Quick parking'],
      departureOptions: 'Ideal for solo & duo backpackers'
    }
  ];
};

export const getAiTransportRecommendation = (
  options: TransportComparisonItem[],
  totalBudget: number,
  preferredType?: TransportType
) => {
  // If the user explicitly chose a preference (e.g. flight, bike_scooter, bus, train, cab, rental), honor their choice!
  if (preferredType && preferredType !== 'ai_decide') {
    const userMatch = options.find(o => o.type === preferredType || o.id === preferredType);
    if (userMatch) {
      const remaining = totalBudget - userMatch.totalCost;
      const isOver = userMatch.budgetStatus === 'over_budget';
      return {
        recommended: userMatch,
        headline: `${userMatch.name} (Selected Choice)`,
        explanation: isOver 
          ? `You selected ${userMatch.name} (₹${userMatch.totalCost.toLocaleString()}). While it requires a significant portion of your ₹${totalBudget.toLocaleString()} budget, our smart budget optimizer can balance stay and dining to accommodate it.`
          : `You selected ${userMatch.name}! Total transit cost is ₹${userMatch.totalCost.toLocaleString()}, leaving ₹${Math.max(0, remaining).toLocaleString()} safely for accommodations, local cuisine, and tourist spots.`
      };
    }
  }

  // If "Let AI Decide" or no explicit single preference
  const withinBudgetOptions = options.filter(o => o.budgetStatus === 'within_budget');
  
  if (withinBudgetOptions.length === 0) {
    // Pick the absolute cheapest
    const cheapest = [...options].sort((a, b) => a.totalCost - b.totalCost)[0];
    return {
      recommended: cheapest,
      headline: `${cheapest.name} is the most economical choice`,
      explanation: `To safeguard your ₹${totalBudget.toLocaleString()} budget, ${cheapest.name} keeps overall transit expense at ₹${cheapest.totalCost.toLocaleString()}, leaving critical funds for meals, stays, and activities.`
    };
  }

  // Find optimal balance
  const best = withinBudgetOptions[0];
  return {
    recommended: best,
    headline: `${best.name} fits your budget best`,
    explanation: `Optimal alignment with your ₹${totalBudget.toLocaleString()} budget. Total round transit is ₹${best.totalCost.toLocaleString()}, reserving ample funds for hotel stays and regional experiences.`
  };
};

export const calculateCompleteBudget = (
  details: PassengerDetails,
  destination: DestinationData,
  selectedTransportCost: number,
  selectedStayCost: number
): BudgetBreakdown => {
  const { totalTravellers, totalBudget } = details;
  const days = destination.recommendedDays;

  const transport = selectedTransportCost;
  const accommodation = selectedStayCost;
  const food = 450 * totalTravellers * days; // Average 3 healthy meals/day
  const localTransport = 250 * totalTravellers * days;
  const attractions = 150 * totalTravellers * days;
  const shopping = 400 * totalTravellers;
  const emergencyBuffer = Math.round(totalBudget * 0.08); // 8% safe buffer

  const totalEstimatedCost = transport + accommodation + food + localTransport + attractions + shopping + emergencyBuffer;
  const remainingBudget = totalBudget - totalEstimatedCost;
  const percentageUsed = Math.min(100, Math.round((totalEstimatedCost / Math.max(1, totalBudget)) * 100));

  let status: 'within_budget' | 'close_to_budget' | 'over_budget' = 'within_budget';
  if (totalEstimatedCost > totalBudget) {
    status = 'over_budget';
  } else if (totalEstimatedCost >= totalBudget * 0.90) {
    status = 'close_to_budget';
  }

  return {
    transportation: transport,
    accommodation,
    food,
    localTransport,
    attractions,
    shopping,
    emergencyBuffer,
    totalEstimatedCost,
    userBudget: totalBudget,
    remainingBudget,
    status,
    percentageUsed
  };
};

export const generateBudgetOptimizations = (
  details: PassengerDetails,
  currentTransportCost: number,
  currentStayCost: number
): OptimizationSuggestion[] => {
  const suggestions: OptimizationSuggestion[] = [];

  if (currentTransportCost > 4000) {
    const trainCost = 1300 * details.totalTravellers * (details.tripType === 'round_trip' ? 2 : 1);
    const savings = currentTransportCost - trainCost;
    if (savings > 500) {
      suggestions.push({
        id: 'opt-transport',
        category: 'transport',
        originalChoice: 'Flight / Private Cab',
        originalCost: currentTransportCost,
        recommendedChoice: 'Express Train / Superfast 3AC',
        recommendedCost: trainCost,
        savings,
        reason: 'Saves major transit overhead while offering panoramic countryside views and comfortable overnight berth.',
        applied: false
      });
    }
  }

  if (currentStayCost > 3000) {
    const budgetStayCost = 1200 * 3;
    const savings = currentStayCost - budgetStayCost;
    if (savings > 500) {
      suggestions.push({
        id: 'opt-stay',
        category: 'stay',
        originalChoice: 'Luxury Beach Resort',
        originalCost: currentStayCost,
        recommendedChoice: 'Heritage Boutique Stay / Co-living Suite',
        recommendedCost: budgetStayCost,
        savings,
        reason: 'High 4.8+ rating, walking distance to attractions, free breakfast included.',
        applied: false
      });
    }
  }

  suggestions.push({
    id: 'opt-transit',
    category: 'local_transit',
    originalChoice: 'Point-to-point Private Taxis (₹1,800)',
    originalCost: 1800,
    recommendedChoice: 'Scooter Rental / Smart Tourist Shuttles (₹700)',
    recommendedCost: 700,
    savings: 1100,
    reason: 'Cut local cab surge fees by utilizing convenient two-wheeler rentals or state tourist electric buses.',
    applied: false
  });

  return suggestions;
};

export const generateSampleItinerary = (
  destination: DestinationData,
  days: number = 3
): DayItinerary[] => {
  const itineraries: DayItinerary[] = [];
  const places = destination.places;
  const foods = destination.foods;

  for (let i = 1; i <= Math.min(days, 4); i++) {
    const p1 = places[(i - 1) % places.length];
    const p2 = places[i % places.length];
    const lunchFood = foods[(i - 1) % foods.length] || foods[0];

    const dayItems = [
      {
        time: '08:30 AM',
        activity: 'Local breakfast & morning chai',
        cost: 90,
        category: 'food' as const,
        icon: '☕',
        locationName: 'Heritage Cafe / Bakery',
        tips: 'Try freshly prepared breakfast specials.'
      },
      {
        time: '10:00 AM',
        activity: `Explore ${p1.name}`,
        cost: p1.entryFee,
        category: 'sightseeing' as const,
        icon: '📍',
        locationName: p1.name,
        tips: p1.whyAiSelected[0] || 'Capture morning photography.'
      },
      {
        time: '01:00 PM',
        activity: `Lunch: ${lunchFood.name}`,
        cost: lunchFood.approxPrice,
        category: 'food' as const,
        icon: '🍴',
        locationName: lunchFood.famousAt.split(',')[0],
        tips: 'Authentic local recipe rated 4.9 by travelers.'
      },
      {
        time: '03:30 PM',
        activity: `Visit ${p2.name}`,
        cost: p2.entryFee,
        category: 'sightseeing' as const,
        icon: '🏛️',
        locationName: p2.name,
        tips: 'Best lighting for views and architecture.'
      },
      {
        time: '06:00 PM',
        activity: 'Evening Bazaar walk & souvenir hunting',
        cost: 300,
        category: 'shopping' as const,
        icon: '🛍️',
        locationName: destination.shopping[0]?.name || 'Local Market',
        tips: 'Handcrafted items and local delicacies.'
      },
      {
        time: '08:30 PM',
        activity: 'Dinner & evening return to stay',
        cost: 220,
        category: 'food' as const,
        icon: '🌙',
        locationName: 'Traditional Dinner Spot',
        tips: 'Short walk or shared transit back to your hotel.'
      }
    ];

    const dayTotal = dayItems.reduce((acc, curr) => acc + curr.cost, 0);

    itineraries.push({
      dayNumber: i,
      date: `Day 0${i}`,
      theme: i === 1 ? 'Heritage & Coastal Arrival' : i === 2 ? 'Iconic Landmarks & Local Flavors' : 'Nature & Artisan Bazaars',
      items: dayItems,
      dayTotal
    });
  }

  return itineraries;
};

export const solveWhatCanIAfford = (
  amount: number,
  destination: DestinationData
) => {
  if (amount < 200) {
    return {
      title: 'Quick Local Bite & Public Transit',
      description: `With ₹${amount}, you can enjoy authentic street delicacies like ${destination.foods[1]?.name || 'fresh local snacks'} (₹${destination.foods[1]?.approxPrice || 70}) and take a scenic government bus ride.`,
      activities: ['Local snack tasting', 'City bus transit'],
      savingsTip: 'Ideal for short morning walks and street market exploration.'
    };
  }

  if (amount <= 1000) {
    return {
      title: 'Full Day Sightseeing & Food Pack',
      description: `With ₹${amount}, you can explore ${destination.places[0]?.name} (Entry: ₹${destination.places[0]?.entryFee}), enjoy a hearty ${destination.foods[0]?.name} lunch (₹${destination.foods[0]?.approxPrice}), and rent a two-wheeler for half a day!`,
      activities: [
        `Visit ${destination.places[0]?.name}`,
        `Authentic lunch at ${destination.foods[0]?.famousAt.split(',')[0]}`,
        'Scooter rental / Local transport'
      ],
      savingsTip: 'Walk between adjacent historic sites to save another ₹100 on auto fares.'
    };
  }

  if (amount <= 3000) {
    return {
      title: 'Overnight Stay + Attractions + Full Day Feasting',
      description: `With ₹${amount}, you get 1 night at ${destination.accommodations[0]?.name} (₹${destination.accommodations[0]?.pricePerNight}), all attraction tickets, 3 delicious meals, and souvenir shopping at ${destination.shopping[0]?.name}!`,
      activities: [
        `1 Night Budget Stay at ${destination.accommodations[0]?.name}`,
        'All major monument entries',
        '3 meals: Breakfast, Traditional Lunch & Dinner',
        'Local shopping allowance (₹400)'
      ],
      savingsTip: 'Book stay via AI recommendations for complimentary breakfast.'
    };
  }

  return {
    title: 'Premium All-Inclusive VIP Day',
    description: `With ₹${amount}, experience premium hospitality at ${destination.accommodations[1]?.name}, private chauffeured AC taxi, fine coastal or palace dining, and bespoke shopping tours!`,
    activities: [
      'Boutique resort stay with pool & sea view',
      'Private AC taxi throughout the day',
      'Multi-course signature dining experience',
      'Water sports / Adventure tickets'
    ],
    savingsTip: 'You have ample budget to explore without financial constraints.'
  };
};
