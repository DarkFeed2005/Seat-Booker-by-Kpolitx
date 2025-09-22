-- migrations/007_create_functions_and_triggers.sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_cities_updated_at BEFORE UPDATE ON cities 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buses_updated_at BEFORE UPDATE ON buses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate ticket code
CREATE OR REPLACE FUNCTION generate_ticket_code()
RETURNS TEXT AS $
BEGIN
    RETURN 'SB' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || LPAD(nextval('ticket_code_seq')::TEXT, 4, '0');
END;
$ LANGUAGE plpgsql;

-- Create sequence for ticket codes
CREATE SEQUENCE IF NOT EXISTS ticket_code_seq START 1;

-- Function to generate QR code
CREATE OR REPLACE FUNCTION generate_qr_code()
RETURNS TEXT AS $
BEGIN
    RETURN 'QR-' || EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::BIGINT || '-' || (RANDOM() * 1000)::INT;
END;
$ LANGUAGE plpgsql;

-- Trigger to auto-generate ticket code and QR code for bookings
CREATE OR REPLACE FUNCTION auto_generate_booking_codes()
RETURNS TRIGGER AS $
BEGIN
    IF NEW.ticket_code IS NULL OR NEW.ticket_code = '' THEN
        NEW.ticket_code := generate_ticket_code();
    END IF;
    
    IF NEW.qr_code IS NULL OR NEW.qr_code = '' THEN
        NEW.qr_code := generate_qr_code();
    END IF;
    
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_booking_codes_trigger 
    BEFORE INSERT ON bookings 
    FOR EACH ROW EXECUTE FUNCTION auto_generate_booking_codes();

-- Function to get available seats for a bus on a specific date
CREATE OR REPLACE FUNCTION get_available_seats(bus_uuid UUID, journey_date DATE)
RETURNS INTEGER[] AS $
DECLARE
    total_seats INTEGER;
    occupied_seats INTEGER[];
    available_seats INTEGER[];
    seat_num INTEGER;
BEGIN
    -- Get total seats for the bus
    SELECT b.total_seats INTO total_seats FROM buses b WHERE b.id = bus_uuid;
    
    -- Get occupied seats
    SELECT ARRAY_AGG(seat_number) INTO occupied_seats 
    FROM bookings 
    WHERE bus_id = bus_uuid 
    AND journey_date = journey_date 
    AND status IN ('confirmed', 'pending');
    
    -- If no occupied seats, return all seats
    IF occupied_seats IS NULL THEN
        occupied_seats := '{}';
    END IF;
    
    -- Generate available seats
    available_seats := '{}';
    FOR seat_num IN 1..total_seats LOOP
        IF NOT (seat_num = ANY(occupied_seats)) THEN
            available_seats := array_append(available_seats, seat_num);
        END IF;
    END LOOP;
    
    RETURN available_seats;
END;
$ LANGUAGE plpgsql;
