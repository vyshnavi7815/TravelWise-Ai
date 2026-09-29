import { LanguageCode, LanguageOption } from '../types/travel';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
];

export interface TranslationDictionary {
  appTitle: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  planMyTrip: string;
  exploreDestinations: string;
  chooseLanguage: string;
  chooseLanguageSubtitle: string;
  moreLanguages: string;
  passengerDetails: string;
  tellUsTrip: string;
  fullName: string;
  travellers: string;
  adults: string;
  children: string;
  seniors: string;
  fromLocation: string;
  toDestination: string;
  travelDate: string;
  returnDate: string;
  oneWay: string;
  roundTrip: string;
  totalBudget: string;
  budgetPrompt: string;
  lowBudget: string;
  mediumBudget: string;
  flexibleBudget: string;
  customBudget: string;
  transportPreference: string;
  howToTravel: string;
  letAiDecide: string;
  aiBudgetAnalysis: string;
  transportComparison: string;
  estimatedCost: string;
  travelTime: string;
  comfort: string;
  budgetStatus: string;
  withinBudget: string;
  slightlyExpensive: string;
  overBudget: string;
  aiRecommendation: string;
  placesToVisit: string;
  viewPlace: string;
  aiRecommendedPlace: string;
  whyAiSelected: string;
  completeTripBudget: string;
  accommodation: string;
  foodRecommendations: string;
  shopping: string;
  localTransport: string;
  fromMyLocation: string;
  aiDailyItinerary: string;
  budgetOptimizer: string;
  travelSafety: string;
  finalTravelPlan: string;
  back: string;
  continue: string;
  originalCost: string;
  optimizedCost: string;
  youSave: string;
  askAi: string;
  close: string;
  step: string;
  of: string;
  whatCanIAfford: string;
  simulate: string;
  recalculate: string;
}

const en: TranslationDictionary = {
  appTitle: 'TravelWise AI',
  tagline: 'Tell us your trip details and budget — TravelWise AI plans the best possible journey for you without exceeding your budget.',
  heroHeadline: 'Travel Smarter. Spend Better.',
  heroSubheadline: 'Your AI-powered travel planner that builds the best trip according to your budget.',
  planMyTrip: 'Plan My Trip',
  exploreDestinations: 'Explore Destinations',
  chooseLanguage: 'Choose Your Language',
  chooseLanguageSubtitle: 'Select your preferred language. The entire AI trip planner will adapt to your language.',
  moreLanguages: 'More Languages',
  passengerDetails: 'Passenger Details',
  tellUsTrip: 'Tell Us About Your Trip',
  fullName: 'Passenger Name',
  travellers: 'Number of Travellers',
  adults: 'Adults (12+ yrs)',
  children: 'Children (2-11 yrs)',
  seniors: 'Senior Citizens (60+ yrs)',
  fromLocation: 'From / Starting Location',
  toDestination: 'Destination / To',
  travelDate: 'Travel Date',
  returnDate: 'Return Date',
  oneWay: 'One-way',
  roundTrip: 'Round Trip',
  totalBudget: 'What is your total travel budget?',
  budgetPrompt: 'Enter your total trip budget in ₹',
  lowBudget: 'Low Budget (₹5,000)',
  mediumBudget: 'Medium Budget (₹15,000)',
  flexibleBudget: 'Flexible (₹35,000+)',
  customBudget: 'Custom Amount',
  transportPreference: 'Transport Preference',
  howToTravel: 'How Would You Like To Travel?',
  letAiDecide: 'Let AI Decide (Best Value)',
  aiBudgetAnalysis: 'AI Budget Analysis',
  transportComparison: 'Transport Comparison',
  estimatedCost: 'Estimated Cost',
  travelTime: 'Travel Time',
  comfort: 'Comfort Level',
  budgetStatus: 'Budget Status',
  withinBudget: 'Within Budget',
  slightlyExpensive: 'Slightly Expensive',
  overBudget: 'Over Budget',
  aiRecommendation: 'AI Recommendation',
  placesToVisit: 'Your Best Places To Visit',
  viewPlace: 'View Place Details',
  aiRecommendedPlace: 'AI Recommended Spot',
  whyAiSelected: 'Why AI selected this place',
  completeTripBudget: 'Your Complete Trip Budget',
  accommodation: 'Budget Stays & Hotels',
  foodRecommendations: 'Best Food To Try',
  shopping: 'Best Shopping & Accessories',
  localTransport: 'Getting Around Your Destination',
  fromMyLocation: 'From My Location to the Best Places',
  aiDailyItinerary: 'AI Daily Itinerary',
  budgetOptimizer: 'AI Budget Optimizer',
  travelSafety: 'Travel Safety & Emergency',
  finalTravelPlan: 'Your Personalized Travel Plan',
  back: 'Back',
  continue: 'Continue',
  originalCost: 'Original Estimated Cost',
  optimizedCost: 'Optimized Cost',
  youSave: 'You Save',
  askAi: 'Ask TravelWise AI',
  close: 'Close',
  step: 'STEP',
  of: '/',
  whatCanIAfford: 'What Can I Afford?',
  simulate: 'Cost Simulator',
  recalculate: 'Instant Recalculate',
};

const hi: TranslationDictionary = {
  ...en,
  chooseLanguage: 'अपनी भाषा चुनें',
  chooseLanguageSubtitle: 'अपनी पसंदीदा भाषा चुनें। पूरा AI ट्रैवल प्लानर आपकी भाषा में चलेगा।',
  passengerDetails: 'यात्री विवरण',
  tellUsTrip: 'अपनी यात्रा के बारे में बताएं',
  fullName: 'यात्री का नाम',
  travellers: 'कुल यात्री',
  fromLocation: 'शुरुआती स्थान (कहाँ से)',
  toDestination: 'गंतव्य (कहाँ जाना है)',
  travelDate: 'यात्रा तिथि',
  returnDate: 'वापसी तिथि',
  totalBudget: 'आपका कुल यात्रा बजट कितना है?',
  budgetPrompt: '₹ में अपना कुल यात्रा बजट दर्ज करें',
  howToTravel: 'आप कैसे यात्रा करना चाहेंगे?',
  letAiDecide: 'AI को तय करने दें (सर्वश्रेष्ठ विकल्प)',
  aiBudgetAnalysis: 'AI बजट विश्लेषण',
  transportComparison: 'परिवहन तुलना',
  withinBudget: 'बजट के भीतर',
  slightlyExpensive: 'थोड़ा महंगा',
  overBudget: 'बजट से अधिक',
  aiRecommendation: 'AI की सिफारिश',
  placesToVisit: 'घूमने के लिए सर्वोत्तम स्थान',
  completeTripBudget: 'आपकी यात्रा का पूरा बजट',
  accommodation: 'होटल और ठहरने के विकल्प',
  foodRecommendations: 'प्रसिद्ध स्थानीय भोजन',
  shopping: 'खरीदारी और स्मृति चिन्ह',
  localTransport: 'स्थानीय परिवहन और कैब',
  fromMyLocation: 'मेरे स्थान से प्रमुख स्थानों तक',
  aiDailyItinerary: 'AI दैनिक यात्रा कार्यक्रम',
  budgetOptimizer: 'AI बजट अनुकूलक',
  travelSafety: 'यात्रा सुरक्षा एवं आपातकालीन सहायता',
  finalTravelPlan: 'आपकी व्यक्तिगत यात्रा योजना',
  back: 'पीछे जाएं',
  continue: 'आगे बढ़ें',
  youSave: 'आपकी बचत',
  askAi: 'TravelWise AI से पूछें',
  whatCanIAfford: 'मैं क्या खर्च कर सकता हूँ?',
};

const te: TranslationDictionary = {
  ...en,
  chooseLanguage: 'మీ భాషను ఎంచుకోండి',
  chooseLanguageSubtitle: 'మీకు అనుకూలమైన భాషను ఎంచుకోండి. ట్రావెల్‌వైజ్ AI మీ భాషలోనే మార్గనిర్దేశం చేస్తుంది.',
  passengerDetails: 'ప్రయాణీకుల వివరాలు',
  tellUsTrip: 'మీ ప్రయాణం గురించి వివరాలు చెప్పండి',
  fullName: 'ప్రయాణీకుడి పేరు',
  travellers: 'ప్రయాణీకుల సంఖ్య',
  fromLocation: 'ప్రారంభ స్థానం',
  toDestination: 'చేరుకోవాల్సిన గమ్యం',
  travelDate: 'ప్రయాణ తేదీ',
  returnDate: 'తిరుగు ప్రయాణ తేదీ',
  totalBudget: 'మీ మొత్తం ప్రయాణ బడ్జెట్ ఎంత?',
  budgetPrompt: 'మీ బడ్జెట్ మొత్తాన్ని ₹ లో నమోదు చేయండి',
  howToTravel: 'మీరు ఎలా ప్రయాణించాలనుకుంటున్నారు?',
  letAiDecide: 'AI నిర్ణయించనివ్వండి (ఉత్తమ ఎంపిక)',
  aiBudgetAnalysis: 'AI బడ్జెట్ విశ్లేషణ',
  transportComparison: 'రవాణా సౌకర్యాల పోలిక',
  withinBudget: 'బడ్జెట్ లోపల',
  slightlyExpensive: 'కాస్త ఖరీదైనది',
  overBudget: 'బడ్జెట్ మించిపోయింది',
  aiRecommendation: 'AI సిఫార్సు',
  placesToVisit: 'సందర్శించాల్సిన ఉత్తమ ప్రదేశాలు',
  completeTripBudget: 'మీ సంపూర్ణ ప్రయాణ బడ్జెట్',
  accommodation: 'వసతి గృహాలు & హోటళ్ళు',
  foodRecommendations: 'రుచికరమైన స్థానిక ఆహారం',
  shopping: 'షాపింగ్ & ప్రత్యేక వస్తువులు',
  localTransport: 'స్థానిక ప్రయాణ సాధనాలు',
  fromMyLocation: 'నా లొకేషన్ నుండి పర్యాటక ప్రదేశాలకు',
  aiDailyItinerary: 'రోజువారీ AI ప్రణాళిక',
  budgetOptimizer: 'AI బడ్జెట్ ఆప్టిమైజర్',
  travelSafety: 'ప్రయాణ భద్రత & ఎమర్జెన్సీ',
  finalTravelPlan: 'మీ వ్యక్తిగతీకరించిన ప్రయాణ ప్లాన్',
  back: 'వెనుకకు',
  continue: 'కొనసాగించండి',
  youSave: 'మీ ఆదా',
  askAi: 'TravelWise AI ని అడగండి',
  whatCanIAfford: 'నా బడ్జెట్‌లో ఏం చేయగలను?',
};

const ta: TranslationDictionary = {
  ...en,
  chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
  chooseLanguageSubtitle: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும். AI உங்கள் மொழியில் வழிகாட்டும்.',
  passengerDetails: 'பயணிகள் விவரங்கள்',
  tellUsTrip: 'உங்கள் பயணத்தைப் பற்றி எங்களிடம் கூறுங்கள்',
  fullName: 'பயணியின் பெயர்',
  travellers: 'பயணிகள் எண்ணிக்கை',
  fromLocation: 'புறப்படும் இடம்',
  toDestination: 'செல்லுமிடம்',
  travelDate: 'பயண தேதி',
  returnDate: 'திரும்பும் தேதி',
  totalBudget: 'உங்கள் மொத்த பயண பட்ஜெட் என்ன?',
  howToTravel: 'நீங்கள் எவ்வாறு பயணிக்க விரும்புகிறீர்கள்?',
  letAiDecide: 'AI தீர்மானிக்கட்டும் (சிறந்த தேர்வு)',
  aiBudgetAnalysis: 'AI பட்ஜெட் பகுப்பாய்வு',
  withinBudget: 'பட்ஜெட்டுக்குள்',
  slightlyExpensive: 'சற்று விலை உயர்ந்தது',
  overBudget: 'பட்ஜெட்டை தாண்டியது',
  aiRecommendation: 'AI பரிந்துரை',
  placesToVisit: 'பார்க்க வேண்டிய சிறந்த இடங்கள்',
  completeTripBudget: 'உங்கள் முழு பயண பட்ஜெட்',
  accommodation: 'தங்குமிடங்கள் & விடுதிகள்',
  foodRecommendations: 'சிறந்த பாரம்பரிய உணவு',
  shopping: 'ஷாப்பிங் & பொருட்கள்',
  localTransport: 'உள்ளூர் போக்குவரத்து',
  fromMyLocation: 'என் இடத்திலிருந்து சுற்றுலா இடங்களுக்கு',
  aiDailyItinerary: 'AI தினசரி பயண திட்டம்',
  budgetOptimizer: 'AI பட்ஜெட் சேமிப்பு',
  travelSafety: 'பயண பாதுகாப்பு & அவசர உதவி',
  finalTravelPlan: 'உங்கள் தனிப்பயனாக்கப்பட்ட பயண திட்டம்',
  back: 'பின்னால்',
  continue: 'தொடரவும்',
  youSave: 'நீங்கள் சேமிப்பது',
  askAi: 'TravelWise AI யிடம் கேட்கவும்',
};

const kn: TranslationDictionary = {
  ...en,
  chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  passengerDetails: 'ಪ್ರಯಾಣಿಕರ ವಿವರಗಳು',
  tellUsTrip: 'ನಿಮ್ಮ ಪ್ರವಾಸದ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿಸಿ',
  totalBudget: 'ನಿಮ್ಮ ಒಟ್ಟು ಪ್ರಯಾಣದ ಬಜೆಟ್ ಎಷ್ಟು?',
  howToTravel: 'ನೀವು ಹೇಗೆ ಪ್ರಯಾಣಿಸಲು ಬಯಸುತ್ತೀರಿ?',
  letAiDecide: 'AI ನಿರ್ಧರಿಸಲಿ (ಉತ್ತಮ ಆಯ್ಕೆ)',
  aiBudgetAnalysis: 'AI ಬಜೆಟ್ ವಿಶ್ಲೇಷಣೆ',
  withinBudget: 'ಬಜೆಟ್ ಒಳಗೆ',
  placesToVisit: 'ಭೇಟಿ ನೀಡಲು ಅತ್ಯುತ್ತಮ ಸ್ಥಳಗಳು',
  completeTripBudget: 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಪ್ರವಾಸ ಬಜೆಟ್',
  finalTravelPlan: 'ನಿಮ್ಮ ಪ್ರವಾಸ ಯೋಜನೆ',
  back: 'ಹಿಂದೆ',
  continue: 'ಮುಂದುವರಿಯಿರಿ',
  askAi: 'TravelWise AI ಕೇಳಿ',
};

const ml: TranslationDictionary = {
  ...en,
  chooseLanguage: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
  passengerDetails: 'യാത്രക്കാരുടെ വിവരങ്ങൾ',
  tellUsTrip: 'നിങ്ങളുടെ യാത്രയെക്കുറിച്ച് പറയുക',
  totalBudget: 'നിങ്ങളുടെ മൊത്തം യാത്രാ ബജറ്റ് എത്രയാണ്?',
  howToTravel: 'നിങ്ങൾ എങ്ങനെ യാത്ര ചെയ്യാൻ ആഗ്രഹിക്കുന്നു?',
  withinBudget: 'ബജറ്റിനുള്ളിൽ',
  placesToVisit: 'സന്ദർശിക്കാൻ മികച്ച സ്ഥലങ്ങൾ',
  finalTravelPlan: 'നിങ്ങളുടെ വ്യക്തിഗത യാത്രാ പദ്ധതി',
  back: 'തിരികെ',
  continue: 'തുടരുക',
  askAi: 'TravelWise AI-യോട് ചോദിക്കുക',
};

const mr: TranslationDictionary = {
  ...en,
  chooseLanguage: 'तुमची भाषा निवडा',
  passengerDetails: 'प्रवाशांचे तपशील',
  tellUsTrip: 'तुमच्या प्रवासाबद्दल सांगा',
  totalBudget: 'तुमचे एकूण प्रवास बजेट किती आहे?',
  howToTravel: 'तुम्हाला कसा प्रवास करायला आवडेल?',
  withinBudget: 'बजेटमध्ये',
  placesToVisit: 'भेट देण्यासाठी सर्वोत्तम ठिकाणे',
  finalTravelPlan: 'तुमचे प्रवास नियोजन',
  back: 'मागे',
  continue: 'पुढे जा',
  askAi: 'TravelWise AI ला विचारा',
};

const bn: TranslationDictionary = {
  ...en,
  chooseLanguage: 'আপনার ভাষা নির্বাচন করুন',
  passengerDetails: 'যাত্রীর বিবরণ',
  tellUsTrip: 'আপনার ভ্রমণের বিবরণ জানান',
  totalBudget: 'আপনার মোট ভ্রমণ বাজেট কত?',
  howToTravel: 'আপনি কিভাবে ভ্রমণ করতে চান?',
  withinBudget: 'বাজেটের মধ্যে',
  placesToVisit: 'পরিদর্শন করার সেরা জায়গা',
  finalTravelPlan: 'আপনার ভ্রমণ পরিকল্পনা',
  back: 'ফিরে যান',
  continue: 'এগিয়ে যান',
  askAi: 'TravelWise AI কে জিজ্ঞাসা করুন',
};

const gu: TranslationDictionary = {
  ...en,
  chooseLanguage: 'તમારી ભાષા પસંદ કરો',
  passengerDetails: 'મુસાફરોની વિગતો',
  tellUsTrip: 'તમારા પ્રવાસ વિશે જણાવો',
  totalBudget: 'તમારું કુલ પ્રવાસ બજેટ કેટલું છે?',
  withinBudget: 'બજેટમાં',
  placesToVisit: 'મુલાકાત લેવા માટે શ્રેષ્ઠ સ્થળો',
  finalTravelPlan: 'તમારી પ્રવાસ યોજના',
  back: 'પાછા જાઓ',
  continue: 'આગળ વધો',
  askAi: 'TravelWise AI ને પૂછો',
};

const pa: TranslationDictionary = {
  ...en,
  chooseLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
  passengerDetails: 'ਯਾਤਰੀ ਵੇਰਵੇ',
  tellUsTrip: 'ਆਪਣੀ ਯਾਤਰਾ ਬਾਰੇ ਦੱਸੋ',
  totalBudget: 'ਤੁਹਾਡਾ ਕੁੱਲ ਯਾਤਰਾ ਬਜਟ ਕਿੰਨਾ ਹੈ?',
  withinBudget: 'ਬਜਟ ਦੇ ਅੰਦਰ',
  placesToVisit: 'ਘੁੰਮਣ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਥਾਵਾਂ',
  finalTravelPlan: 'ਤੁਹਾਡੀ ਨਿੱਜੀ ਯਾਤਰਾ ਯੋਜਨਾ',
  back: 'ਪਿੱਛੇ',
  continue: 'ਅੱਗੇ ਵਧੋ',
  askAi: 'TravelWise AI ਨੂੰ ਪੁੱਛੋ',
};

const ur: TranslationDictionary = {
  ...en,
  chooseLanguage: 'اپنی زبان منتخب کریں',
  passengerDetails: 'مسافر کی تفصیلات',
  tellUsTrip: 'اپنے سفر کے بارے میں بتائیں',
  totalBudget: 'آپ کا کل سفری بجٹ کتنا ہے؟',
  withinBudget: 'بجٹ کے اندر',
  placesToVisit: 'دیکھنے کے لیے بہترین مقامات',
  finalTravelPlan: 'آپ کا سفری منصوبہ',
  back: 'واپس',
  continue: 'آگے بڑھیں',
  askAi: 'TravelWise AI سے پوچھیں',
};

const translations: Record<LanguageCode, TranslationDictionary> = {
  en,
  hi,
  te,
  ta,
  kn,
  ml,
  mr,
  bn,
  gu,
  pa,
  ur,
  fr: { ...en, chooseLanguage: 'Choisissez votre langue', planMyTrip: 'Planifier mon voyage', back: 'Retour', continue: 'Continuer' },
  es: { ...en, chooseLanguage: 'Elige tu idioma', planMyTrip: 'Planificar mi viaje', back: 'Atrás', continue: 'Continuar' },
  de: { ...en, chooseLanguage: 'Wählen Sie Ihre Sprache', planMyTrip: 'Reise planen', back: 'Zurück', continue: 'Weiter' },
  ja: { ...en, chooseLanguage: '言語を選択してください', planMyTrip: '旅行を計画する', back: '戻る', continue: '次へ' },
};

export const getTranslation = (lang: LanguageCode): TranslationDictionary => {
  return translations[lang] || translations.en;
};
