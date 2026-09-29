/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LanguageCode, 
  PassengerDetails, 
  TransportType, 
  TripPurpose,
  EmergencyContact,
  DestinationData,
  BookedTicket,
  VehicleSchedule,
  AccommodationOption
} from './types/travel';
import { DESTINATIONS } from './data/destinations';
import { 
  calculateTransportOptions, 
  calculateCompleteBudget, 
  generateSampleItinerary 
} from './utils/aiBudgetEngine';

import { Navbar } from './components/Navbar';
import { StepProgressBar } from './components/StepProgressBar';
import { LandingHero } from './components/LandingHero';
import { TopAiAssistant } from './components/TopAiAssistant';

// 8 Individual Steps as requested by the user
import { Step0Language } from './components/Step0Language';
import { Step1PassengerDetails } from './components/Step1PassengerDetails';
import { Step2Transport } from './components/Step2Transport';
import { Step3AvailableTransport } from './components/Step3AvailableTransport';
import { Step6Accommodation } from './components/Step6Accommodation'; // Step 4: Book Hotel
import { Step5StationToHotelTransit } from './components/Step5StationToHotelTransit'; // Step 5: Station-to-Hotel Transit & Cabs
import { Step4Destinations } from './components/Step4Destinations'; // Step 6: Best Places & Budget Check
import { Step7Food } from './components/Step7Food'; // Step 7: Food & Restaurants
import { Step14FinalPlan } from './components/Step14FinalPlan'; // Step 8: Complete Plan, Itinerary & Passes

import { SmartAffordSimulator } from './components/SmartAffordSimulator';
import { AiLoadingScreen } from './components/AiLoadingScreen';
import { TicketBookingModal } from './components/TicketBookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AiChatAssistant } from './components/AiChatAssistant';

export default function App() {
  // Navigation State: -1 = Home Landing, 0 = Language, 1..8 = 8 Individual Steps
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  // Modal / Drawer states
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [pendingNextStep, setPendingNextStep] = useState<number | null>(null);

  // Booking states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [targetBookingItem, setTargetBookingItem] = useState<{
    id: string;
    name: string;
    type: string;
    costPerPerson: number;
    totalCost: number;
  } | undefined>(undefined);
  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>([]);

  // Trip Configuration State
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    passengerName: 'Rahul Sharma',
    totalTravellers: 2,
    adults: 2,
    children: 0,
    seniors: 0,
    fromLocation: 'Mumbai',
    toDestination: 'goa',
    travelDate: '2026-10-15',
    returnDate: '2026-10-19',
    tripType: 'round_trip',
    budgetTier: 'medium',
    totalBudget: 15000,
    tripPurpose: 'chilling'
  });

  const [selectedTransports, setSelectedTransports] = useState<TransportType[]>([
    'bus'
  ]);
  const [chosenTransportId, setChosenTransportId] = useState<string>('bus');
  const [selectedVehicleSchedule, setSelectedVehicleSchedule] = useState<VehicleSchedule | null>(null);
  const [chosenStayId, setChosenStayId] = useState<string>('ai-pick-goa');

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
    name: 'Priya Sharma',
    relation: 'Sister',
    phone: '+91 98765 43210'
  });

  // Active Destination Data
  const destinationKey = (passengerDetails.toDestination || 'goa').toLowerCase();
  const currentDestination: DestinationData = DESTINATIONS[destinationKey] || DESTINATIONS.goa;

  // Transport calculation
  const transportOptions = useMemo(() => {
    return calculateTransportOptions(passengerDetails);
  }, [passengerDetails]);

  // Selected Transport & Stay object
  const activeTransport = transportOptions.find(t => t.id === chosenTransportId) || transportOptions[0];
  const activeStay = currentDestination.accommodations.find(s => s.id === chosenStayId) || currentDestination.accommodations[0];

  // Dynamic budget calculation
  const tripBudget = useMemo(() => {
    const transportTotal = selectedVehicleSchedule 
      ? selectedVehicleSchedule.farePerPerson * passengerDetails.totalTravellers * (passengerDetails.tripType === 'round_trip' ? 2 : 1)
      : activeTransport.totalCost;

    return calculateCompleteBudget(
      passengerDetails,
      currentDestination,
      transportTotal,
      activeStay.pricePerNight * currentDestination.recommendedDays
    );
  }, [passengerDetails, currentDestination, activeTransport, activeStay, selectedVehicleSchedule]);

  // Handlers for transport selection (FIXES USER BUG IMMEDIATELY)
  const handleSelectTransportMode = (type: TransportType) => {
    if (type === 'ai_decide') {
      setSelectedTransports(['ai_decide']);
      const within = transportOptions.find(o => o.budgetStatus === 'within_budget');
      setChosenTransportId(within?.id || 'bus');
    } else {
      setSelectedTransports([type]);
      setChosenTransportId(type); // Directly switches chosen transport id!
    }
  };

  const handleSelectTripPurpose = (purpose: TripPurpose) => {
    setPassengerDetails(prev => ({ ...prev, tripPurpose: purpose }));
  };

  const triggerNextWithAiLoader = (nextStepNum: number) => {
    setPendingNextStep(nextStepNum);
    setIsLoadingScreen(true);
  };

  const handleOpenBookingModalForVehicle = (schedule: VehicleSchedule) => {
    setSelectedVehicleSchedule(schedule);
    const totalFare = schedule.farePerPerson * passengerDetails.totalTravellers * (passengerDetails.tripType === 'round_trip' ? 2 : 1);
    setTargetBookingItem({
      id: schedule.id,
      name: schedule.operatorName,
      type: schedule.vehicleType,
      costPerPerson: schedule.farePerPerson,
      totalCost: totalFare
    });
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingModalForStay = (stay?: AccommodationOption) => {
    const toBook = stay || activeStay;
    const totalStayCost = toBook.pricePerNight * currentDestination.recommendedDays;
    setTargetBookingItem({
      id: toBook.id,
      name: toBook.name,
      type: 'hotel',
      costPerPerson: Math.round(totalStayCost / passengerDetails.totalTravellers),
      totalCost: totalStayCost
    });
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirmed = (ticket: BookedTicket) => {
    setBookedTickets(prev => [ticket, ...prev]);
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={bookedTickets.length}
        currentStep={currentStep}
        totalSteps={8}
        onNavigateHome={() => setCurrentStep(-1)}
        userBudget={passengerDetails.totalBudget}
      />

      {/* Prominent Top-Right Sticky AI Chatbot Trigger (Always Visible on Top Right) */}
      <div className="fixed top-18 right-3 sm:right-6 z-40">
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="px-3.5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-black font-extrabold text-xs transition-all cyan-glow shadow-[0_0_22px_rgba(6,182,212,0.7)] flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/80"
          title="Open AI Chatbot"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
          <span className="font-extrabold text-black">🤖 AI Chatbot</span>
        </button>
      </div>

      {/* 8-Step Progress Bar (visible in steps 1..8) */}
      {currentStep >= 1 && (
        <StepProgressBar
          currentStep={currentStep}
          totalSteps={8}
          onStepClick={(s) => setCurrentStep(s)}
          lang={currentLanguage}
        />
      )}

      {/* TOP AI ASSISTANT (Stationed at top, NOT bottom, as requested by user) */}
      {currentStep >= 1 && (
        <TopAiAssistant
          details={passengerDetails}
          destination={currentDestination}
          budget={tripBudget}
          lang={currentLanguage}
          selectedStayName={activeStay.name}
        />
      )}

      {/* Main Content Area */}
      <main className="relative">
        {/* LANDING PAGE HERO */}
        {currentStep === -1 && (
          <LandingHero
            onStartPlanning={() => setCurrentStep(0)}
            onExploreDestinations={() => setCurrentStep(6)}
            lang={currentLanguage}
          />
        )}

        {/* STEP 0: LANGUAGE SELECTION */}
        {currentStep === 0 && (
          <Step0Language
            selectedLanguage={currentLanguage}
            onSelectLanguage={(lang) => {
              setCurrentLanguage(lang);
              setCurrentStep(1);
            }}
            onContinue={() => setCurrentStep(1)}
          />
        )}

        {/* STEP 1: PASSENGER & JOURNEY DETAILS */}
        {currentStep === 1 && (
          <Step1PassengerDetails
            details={passengerDetails}
            onChange={setPassengerDetails}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
            lang={currentLanguage}
          />
        )}

        {/* STEP 2: TRIP PURPOSE (DEVOTIONAL, CHILLING, FAMILY) & TRANSPORT PREFERENCE */}
        {currentStep === 2 && (
          <Step2Transport
            tripPurpose={passengerDetails.tripPurpose || 'chilling'}
            onSelectTripPurpose={handleSelectTripPurpose}
            selectedTransports={selectedTransports}
            onToggleTransport={handleSelectTransportMode}
            onSelectAiDecide={() => handleSelectTransportMode('ai_decide')}
            onNext={() => triggerNextWithAiLoader(3)}
            onBack={() => setCurrentStep(1)}
            lang={currentLanguage}
          />
        )}

        {/* STEP 3: AVAILABLE TRANSPORTATION (KAVERI TRAVELS, SUPERFAST, VRL, TRAINS) & TICKET BOOKING */}
        {currentStep === 3 && (
          <Step3AvailableTransport
            details={passengerDetails}
            selectedTransportType={selectedTransports[0] || 'bus'}
            selectedVehicleId={selectedVehicleSchedule?.id || 'bus-kaveri-1'}
            onSelectVehicle={(veh) => {
              setSelectedVehicleSchedule(veh);
            }}
            onBookTicketNow={(veh) => handleOpenBookingModalForVehicle(veh)}
            onSwitchMode={(mode) => {
              handleSelectTransportMode(mode);
            }}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {/* STEP 4: HOTEL TO BOOK (ORDER-WISE AS REQUESTED: AFTER TRANSPORTATION, ASK ABOUT HOTEL) */}
        {currentStep === 4 && (
          <Step6Accommodation
            accommodations={currentDestination.accommodations}
            selectedStayId={chosenStayId}
            onSelectStayId={setChosenStayId}
            onBookStayNow={(stay) => handleOpenBookingModalForStay(stay)}
            nights={currentDestination.recommendedDays}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
            lang={currentLanguage}
          />
        )}

        {/* STEP 5: STATION-TO-HOTEL TRANSIT & PRE-BOOKING CABS / METROS / BUSES */}
        {currentStep === 5 && (
          <Step5StationToHotelTransit
            hotelName={activeStay.name}
            hotelAddress={activeStay.address}
            destinationName={currentDestination.name}
            arrivalStation=""
            transportMode={selectedTransports[0] || 'bus'}
            travellers={passengerDetails.totalTravellers}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
            lang={currentLanguage}
          />
        )}

        {/* STEP 6: BEST PLACES TO TRAVEL & PRICES (IS IT UNDER BUDGET?) */}
        {currentStep === 6 && (
          <Step4Destinations
            places={currentDestination.places}
            destinationName={currentDestination.name}
            onNext={() => setCurrentStep(7)}
            onBack={() => setCurrentStep(5)}
            lang={currentLanguage}
          />
        )}

        {/* STEP 7: BEST FOODS & RESTAURANTS */}
        {currentStep === 7 && (
          <Step7Food
            foods={currentDestination.foods}
            days={currentDestination.recommendedDays}
            travellers={passengerDetails.totalTravellers}
            onNext={() => setCurrentStep(8)}
            onBack={() => setCurrentStep(6)}
            lang={currentLanguage}
          />
        )}

        {/* STEP 8: COMPLETE TRIP BUDGET, DAY-BY-DAY ITINERARY & FINAL PASS */}
        {currentStep === 8 && (
          <Step14FinalPlan
            details={passengerDetails}
            destination={currentDestination}
            budget={tripBudget}
            emergencyContact={emergencyContact}
            selectedTransportName={selectedVehicleSchedule ? selectedVehicleSchedule.operatorName : activeTransport.name}
            selectedStayName={activeStay.name}
            onOpenBookingModal={() => handleOpenBookingModalForStay()}
            onOpenMyBookings={() => setIsMyBookingsOpen(true)}
            bookingsCount={bookedTickets.length}
            onReset={() => setCurrentStep(-1)}
            onBack={() => setCurrentStep(7)}
            lang={currentLanguage}
          />
        )}
      </main>

      {/* Animated AI Loading Interstitial */}
      {isLoadingScreen && (
        <AiLoadingScreen
          destinationName={currentDestination.name}
          onComplete={() => {
            setIsLoadingScreen(false);
            if (pendingNextStep !== null) {
              setCurrentStep(pendingNextStep);
              setPendingNextStep(null);
            }
          }}
        />
      )}

      {/* Smart Affordability & Cost Simulator Modal */}
      <SmartAffordSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        destination={currentDestination}
      />

      {/* Interactive Ticket Booking Modal */}
      <TicketBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        details={passengerDetails}
        transportItem={targetBookingItem}
        onBookingSuccess={handleBookingConfirmed}
      />

      {/* My Bookings & Boarding Passes Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookedTickets}
        onOpenBookingModal={() => handleOpenBookingModalForStay()}
      />

      {/* Interactive AI Chatbot Drawer / Modal (Triggered from Top Right) */}
      <AiChatAssistant
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        details={passengerDetails}
        destination={currentDestination}
        budget={tripBudget}
        lang={currentLanguage}
      />
    </div>
  );
}
