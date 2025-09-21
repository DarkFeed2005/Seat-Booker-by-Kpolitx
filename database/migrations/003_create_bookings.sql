-- migrations/003_create_bookings.sql
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
    seat_number INTEGER NOT NULL CHECK (seat_number > 0 AND seat_number <= 60),
    passenger_name VARCHAR(100) NOT NULL,
    passenger_phone VARCHAR(15) NOT NULL,
    booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
    journey_date DATE NOT NULL,
    journey_time TIME NOT NULL,
    status booking_status DEFAULT 'pending',
    ticket_code VARCHAR(20) UNIQUE NOT NULL,
    qr_code VARCHAR(100) UNIQUE NOT NULL,
    total_amount INTEGER NOT NULL CHECK (total_amount > 0),
    payment_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure unique seat per bus per journey
    UNIQUE(bus_id, seat_number, journey_date)
);

-- Create index for performance
CREATE INDEX idx_bookings_bus_journey ON bookings(bus_id, journey_date);
CREATE INDEX idx_bookings_passenger ON bookings(passenger_phone);
CREATE INDEX idx_bookings_ticket ON bookings(ticket_code);
