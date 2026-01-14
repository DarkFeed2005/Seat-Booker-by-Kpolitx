import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { BookingProvider } from './hooks/useBooking';
import HomePage from './components/pages/HomePage';
import BusListPage from './components/pages/BusListPage';
import SeatSelectionPage from './components/pages/SeatSelectionPage';
import PaymentPage from './components/pages/PaymentPage';
import TicketPage from './components/pages/TicketPage';
import Header from './components/common/Header';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buses" element={<BusListPage />} />
              <Route path="/seats" element={<SeatSelectionPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/ticket" element={<TicketPage />} />
            </Routes>
          </div>
        </Router>
      </BookingProvider>
    </LanguageProvider>
  );
}

export default App;