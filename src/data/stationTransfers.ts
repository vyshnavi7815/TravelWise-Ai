import { StationToHotelTransfer } from '../types/travel';

export const getStationToHotelTransfers = (
  stationName: string = 'Central Railway Station / Airport Terminal',
  hotelName: string = 'Booked Hotel / Resort'
): StationToHotelTransfer[] => {
  return [
    {
      id: 'transfer-cab',
      mode: 'cab',
      title: 'Prepaid Digital AC Cab',
      vehicleName: 'Govt Regulated Sedan / Taxi Stand',
      pickupLocation: `${stationName} (Prepaid Taxi Bay)`,
      dropoffLocation: hotelName,
      estimatedFare: 450,
      durationMinutes: 30,
      frequency: 'Instant Departure (Available 24x7)',
      isPreBookable: true,
      prebookStatus: 'Pre-book Available',
      note: 'Fixed government meter rates with zero surge pricing. Direct luggage assistance.'
    },
    {
      id: 'transfer-auto',
      mode: 'auto',
      title: 'Station Auto-Rickshaw',
      vehicleName: 'Verified City Auto Rickshaw',
      pickupLocation: `${stationName} (Official Auto Bay)`,
      dropoffLocation: hotelName,
      estimatedFare: 160,
      durationMinutes: 25,
      frequency: 'Every 2 minutes',
      isPreBookable: false,
      prebookStatus: 'On-Spot Ticket',
      note: 'Direct ride to hotel gates. Ideal for 1-3 passengers with regular luggage.'
    },
    {
      id: 'transfer-bus',
      mode: 'bus',
      title: 'Direct AC Station Shuttle Bus',
      vehicleName: 'Electric City Express Shuttle',
      pickupLocation: `${stationName} (Bus Bay #3)`,
      dropoffLocation: `${hotelName} (Walking distance bus stop)`,
      estimatedFare: 35,
      durationMinutes: 45,
      frequency: 'Runs every 15 minutes',
      isPreBookable: true,
      prebookStatus: 'Pre-book Available',
      note: 'Ultra budget-friendly clean electric bus with spacious luggage racks.'
    },
    {
      id: 'transfer-metro',
      mode: 'metro',
      title: 'Rapid Metro Link',
      vehicleName: 'City Metro Rapid Transit',
      pickupLocation: `${stationName} (Metro Concourse)`,
      dropoffLocation: `Station near ${hotelName}`,
      estimatedFare: 20,
      durationMinutes: 18,
      frequency: 'Runs every 6 minutes',
      isPreBookable: false,
      prebookStatus: 'On-Spot Ticket',
      note: 'Fastest, air-conditioned and bypasses peak city road traffic.'
    }
  ];
};
