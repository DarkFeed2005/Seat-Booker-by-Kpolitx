// Sri Lankan cities for dropdown
export const SRI_LANKAN_CITIES = [
  'Colombo', 'Kandy', 'Galle', 'Matara', 'Hambantota', 'Ratnapura', 
  'Negombo', 'Kalutara', 'Panadura', 'Ambalangoda', 'Hikkaduwa', 
  'Unawatuna', 'Mirissa', 'Tangalle', 'Badulla', 'Nuwara Eliya',
  'Ella', 'Bandarawela', 'Polonnaruwa', 'Sigiriya', 'Dambulla',
  'Anuradhapura', 'Trincomalee', 'Batticaloa', 'Jaffna', 'Vavuniya',
  'Mannar', 'Puttalam', 'Kurunegala', 'Chilaw', 'Kegalle',
  'Avissawella', 'Homagama', 'Maharagama', 'Piliyandala', 'Moratuwa',
  'Mount Lavinia', 'Dehiwala', 'Wellawatte', 'Bambalapitiya', 'Kollupitiya'
];

// API endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  CITIES: '/cities',
  BUSES: '/buses',
  SEARCH_BUSES: '/buses/search',
  SEATS: '/seats',
  BOOKINGS: '/bookings',
  PAYMENTS: '/payments',
  TICKETS: '/tickets',
  SMS: '/sms'
};

// Supabase configuration
export const SUPABASE_CONFIG = {
  URL: process.env.REACT_APP_SUPABASE_URL,
  ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY
};

// Bus seat configuration
export const SEAT_CONFIG = {
  TOTAL_SEATS: 60,
  SEATS_PER_ROW: 4,
  ROWS: 15
};

// Payment card types
export const CARD_TYPES = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  AMEX: 'amex'
};

// Booking status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
};

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Available languages
export const LANGUAGES = {
  EN: 'en',
  SI: 'si',
  TA: 'ta'
};

// SMS Templates
export const SMS_TEMPLATES = {
  CONDUCTOR_NOTIFICATION: (seatNumber, passengerName, passengerPhone) => 
    `New booking: Seat ${seatNumber} reserved for ${passengerName} (${passengerPhone}). SeatBooker App`,
  PASSENGER_CONFIRMATION: (busNumber, seatNumber, route) =>
    `Booking confirmed! Bus: ${busNumber}, Seat: ${seatNumber}, Route: ${route}. SeatBooker App`
};

// Time slots for bus search
export const TIME_SLOTS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30'
];

// Currency
export const CURRENCY = {
  CODE: 'LKR',
  SYMBOL: 'Rs.',
  NAME: 'Sri Lankan Rupee'
};