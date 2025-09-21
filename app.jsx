import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, CreditCard, QrCode, MapPin, User, Phone, Bus, CheckCircle } from 'lucide-react';

const SeatBookerApp = () => {
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    time: ''
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  // Mock data for Sri Lankan bus routes
  const sriLankanCities = [
    'Colombo', 'Kandy', 'Galle', 'Matara', 'Hambantota', 'Ratnapura', 
    'Negombo', 'Kalutara', 'Panadura', 'Ambalangoda', 'Hikkaduwa', 
    'Unawatuna', 'Mirissa', 'Tangalle', 'Badulla', 'Nuwara Eliya',
    'Ella', 'Bandarawela', 'Polonnaruwa', 'Sigiriya', 'Dambulla',
    'Anuradhapura', 'Trincomalee', 'Batticaloa', 'Jaffna'
  ];

  const mockBuses = [
    {
      id: 1,
      number: 'NB-1234',
      route: 'Colombo - Galle',
      departure: '08:00',
      arrival: '11:30',
      price: 250,
      conductor: 'Kamal Perera',
      conductorPhone: '+94771234567',
      availableSeats: [1, 2, 5, 8, 12, 15, 18, 22, 25, 28]
    },
    {
      id: 2, 
      number: 'NC-5678',
      route: 'Colombo - Kandy',
      departure: '09:15',
      arrival: '12:45',
      price: 180,
      conductor: 'Sunil Silva',
      conductorPhone: '+94771234568',
      availableSeats: [3, 6, 9, 11, 14, 17, 20, 23, 26, 29]
    }
  ];

  // Translations
  const translations = {
    en: {
      appName: 'SeatBooker',
      findBus: 'Find Your Bus',
      from: 'From',
      to: 'To',
      date: 'Date',
      time: 'Time',
      search: 'Find Bus',
      selectSeat: 'Select Your Seat',
      available: 'Available',
      selected: 'Selected',
      occupied: 'Occupied',
      payment: 'Payment',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      cardHolder: 'Card Holder Name',
      payNow: 'Pay Now',
      ticket: 'Your Ticket',
      busNumber: 'Bus Number',
      conductor: 'Conductor',
      phone: 'Phone',
      seatNumber: 'Seat Number',
      route: 'Route',
      departure: 'Departure',
      price: 'Price',
      bookAnother: 'Book Another Ticket',
      processing: 'Processing...'
    },
    si: {
      appName: 'ආසන වෙන්කරනය',
      findBus: 'ඔබේ බස් සොයන්න',
      from: 'සිට',
      to: 'දක්වා',
      date: 'දිනය',
      time: 'වේලාව',
      search: 'බස් සොයන්න',
      selectSeat: 'ඔබේ ආසනය තෝරන්න',
      available: 'ලබා ගත හැකි',
      selected: 'තෝරාගත්',
      occupied: 'වාඩි වී ඇති',
      payment: 'ගෙවීම',
      cardNumber: 'කාඩ් අංකය',
      expiryDate: 'කල් ඉකුත් දිනය',
      cvv: 'CVV',
      cardHolder: 'කාඩ් හිමිකරුගේ නම',
      payNow: 'දැන් ගෙවන්න',
      ticket: 'ඔබේ ටිකට්පත',
      busNumber: 'බස් අංකය',
      conductor: 'කන්ඩක්ටර්',
      phone: 'දුරකථන',
      seatNumber: 'ආසන අංකය',
      route: 'මාර්ගය',
      departure: 'පිටත්වීම',
      price: 'මිල',
      bookAnother: 'තවත් ටිකට්පතක් වෙන්කරන්න',
      processing: 'සැකසෙමින්...'
    },
    ta: {
      appName: 'இருக்கை முன்பதிவு',
      findBus: 'உங்கள் பேருந்தை கண்டுபிடியுங்கள்',
      from: 'இருந்து',
      to: 'வரை',
      date: 'தேதி',
      time: 'நேரம்',
      search: 'பேருந்தை கண்டுபிடி',
      selectSeat: 'உங்கள் இருக்கையை தேர்ந்தெடுக்கவும்',
      available: 'கிடைக்கும்',
      selected: 'தேர்ந்தெடுக்கப்பட்டது',
      occupied: 'ஆக்கிரமிக்கப்பட்டது',
      payment: 'கட்டணம்',
      cardNumber: 'அட்டை எண்',
      expiryDate: 'காலாவதி தேதி',
      cvv: 'CVV',
      cardHolder: 'அட்டை வைத்திருப்பவர் பெயர்',
      payNow: 'இப்போது செலுத்துங்கள்',
      ticket: 'உங்கள் டிக்கெட்',
      busNumber: 'பேருந்து எண்',
      conductor: 'நடத்துனர்',
      phone: 'தொலைபேசி',
      seatNumber: 'இருக்கை எண்',
      route: 'வழி',
      departure: 'புறப்பாடு',
      price: 'விலை',
      bookAnother: 'மற்றொரு டிக்கெட் முன்பதிவு செய்யுங்கள்',
      processing: 'செயலாக்கம்...'
    }
  };

  const t = translations[language];

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-pulse transform rotate-45"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full opacity-25 animate-ping"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Bus className="w-8 h-8 text-blue-400" />
            {t.appName}
          </h1>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 backdrop-blur-sm"
          >
            <option value="en">English</option>
            <option value="si">සිංහල</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white text-center mb-8">{t.findBus}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* From */}
            <div className="relative">
              <label className="block text-white/80 mb-2">{t.from}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <select 
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="text-gray-800">Select departure city</option>
                  {sriLankanCities.map(city => (
                    <option key={city} value={city} className="text-gray-800">{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* To */}
            <div className="relative">
              <label className="block text-white/80 mb-2">{t.to}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-400" />
                <select 
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="text-gray-800">Select destination</option>
                  {sriLankanCities.map(city => (
                    <option key={city} value={city} className="text-gray-800">{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-white/80 mb-2">{t.date}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <input 
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Time */}
            <div className="relative">
              <label className="block text-white/80 mb-2">{t.time}</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
                <input 
                  type="time"
                  value={searchData.time}
                  onChange={(e) => setSearchData({...searchData, time: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => setCurrentPage('buses')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Search className="w-5 h-5" />
            {t.search}
          </button>
        </div>
      </div>
    </div>
  );

  const BusListPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setCurrentPage('home')}
          className="mb-6 text-white hover:text-blue-300 transition-colors flex items-center gap-2"
        >
          ← Back to Search
        </button>

        <h2 className="text-2xl font-bold text-white mb-8">Available Buses</h2>
        
        <div className="space-y-4">
          {mockBuses.map(bus => (
            <div key={bus.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{bus.number}</h3>
                  <p className="text-blue-300 mb-1">{bus.route}</p>
                  <p className="text-white/80">{t.departure}: {bus.departure}</p>
                  <p className="text-white/80">{t.conductor}: {bus.conductor}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400 mb-2">LKR {bus.price}</p>
                  <button 
                    onClick={() => {
                      setSelectedBus(bus);
                      setCurrentPage('seats');
                    }}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
                  >
                    Select Bus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SeatSelectionPage = () => {
    const renderSeat = (seatNumber) => {
      const isAvailable = selectedBus?.availableSeats.includes(seatNumber);
      const isSelected = selectedSeat === seatNumber;
      
      return (
        <button
          key={seatNumber}
          onClick={() => isAvailable && setSelectedSeat(seatNumber)}
          disabled={!isAvailable}
          className={`w-12 h-12 rounded-lg m-1 font-bold text-sm transition-all duration-300 transform hover:scale-110 ${
            isSelected 
              ? 'bg-blue-500 text-white shadow-lg' 
              : isAvailable 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-red-400 text-white cursor-not-allowed opacity-50'
          }`}
        >
          {seatNumber}
        </button>
      );
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentPage('buses')}
            className="mb-6 text-white hover:text-blue-300 transition-colors flex items-center gap-2"
          >
            ← Back to Buses
          </button>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white text-center mb-8">{t.selectSeat}</h2>
            
            {/* Bus Info */}
            <div className="text-center text-white mb-8">
              <h3 className="text-xl font-bold">{selectedBus?.number}</h3>
              <p>{selectedBus?.route}</p>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mb-8 text-white">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>{t.available}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>{t.selected}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span>{t.occupied}</span>
              </div>
            </div>

            {/* Bus Layout */}
            <div className="bg-white/5 rounded-2xl p-8 mb-8">
              <div className="max-w-md mx-auto">
                {/* Driver section */}
                <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg mb-4">
                  Driver
                </div>
                
                {/* Seats layout (2-2 configuration) */}
                <div className="space-y-2">
                  {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="flex justify-center gap-8">
                      <div className="flex gap-1">
                        {renderSeat(i * 4 + 1)}
                        {renderSeat(i * 4 + 2)}
                      </div>
                      <div className="flex gap-1">
                        {renderSeat(i * 4 + 3)}
                        {renderSeat(i * 4 + 4)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedSeat && (
              <div className="text-center">
                <p className="text-white mb-4">Selected Seat: {selectedSeat}</p>
                <button 
                  onClick={() => setShowPayment(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                >
                  Continue to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PaymentPage = () => {
    const [paymentData, setPaymentData] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: ''
    });
    const [processing, setProcessing] = useState(false);

    const handlePayment = async () => {
      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        const newTicket = {
          id: Date.now(),
          busNumber: selectedBus.number,
          conductor: selectedBus.conductor,
          conductorPhone: selectedBus.conductorPhone,
          seatNumber: selectedSeat,
          route: selectedBus.route,
          departure: selectedBus.departure,
          price: selectedBus.price,
          date: new Date().toLocaleDateString(),
          qrCode: `TICKET-${Date.now()}`,
          passengerName: paymentData.cardHolder
        };
        
        setTicket(newTicket);
        setCurrentPage('ticket');
        setProcessing(false);
        
        // Simulate SMS to conductor
        console.log(`SMS sent to ${selectedBus.conductorPhone}: Seat ${selectedSeat} booked for ${paymentData.cardHolder}`);
      }, 2000);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setShowPayment(false)}
            className="mb-6 text-white hover:text-blue-300 transition-colors flex items-center gap-2"
          >
            ← Back to Seat Selection
          </button>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
              <CreditCard className="w-8 h-8" />
              {t.payment}
            </h2>

            {/* Booking Summary */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 text-white">
              <h3 className="font-bold mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <p>Bus: {selectedBus.number}</p>
                <p>Route: {selectedBus.route}</p>
                <p>Seat: {selectedSeat}</p>
                <p>Price: LKR {selectedBus.price}</p>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">{t.cardNumber}</label>
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2">{t.expiryDate}</label>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">{t.cvv}</label>
                  <input
                    type="text"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                    placeholder="123"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">{t.cardHolder}</label>
                <input
                  type="text"
                  value={paymentData.cardHolder}
                  onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              <button 
                onClick={handlePayment}
                disabled={processing || !paymentData.cardNumber || !paymentData.cardHolder}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {t.processing}
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    {t.payNow} - LKR {selectedBus?.price}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TicketPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
        </div>

        {/* Digital Ticket */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.ticket}</h3>
            <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-600 text-sm">{t.busNumber}</p>
              <p className="font-bold text-lg text-gray-800">{ticket?.busNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t.seatNumber}</p>
              <p className="font-bold text-lg text-gray-800">{ticket?.seatNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t.conductor}</p>
              <p className="font-bold text-gray-800">{ticket?.conductor}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t.phone}</p>
              <p className="font-bold text-gray-800">{ticket?.conductorPhone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600 text-sm">{t.route}</p>
              <p className="font-bold text-lg text-gray-800">{ticket?.route}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t.departure}</p>
              <p className="font-bold text-gray-800">{ticket?.departure}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t.price}</p>
              <p className="font-bold text-lg text-green-600">LKR {ticket?.price}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mt-2">Ticket ID: {ticket?.qrCode}</p>
          </div>

          <div className="text-center">
            <button 
              onClick={() => {
                setCurrentPage('home');
                setSelectedBus(null);
                setSelectedSeat(null);
                setTicket(null);
                setShowPayment(false);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
            >
              {t.bookAnother}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  return (
    <div className="font-sans">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'buses' && <BusListPage />}
      {currentPage === 'seats' && <SeatSelectionPage />}
      {showPayment && <PaymentPage />}
      {currentPage === 'ticket' && <TicketPage />}
    </div>
  );
};

export default SeatBookerApp;