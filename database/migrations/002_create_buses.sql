-- migrations/002_create_buses.sql
CREATE TABLE buses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bus_number VARCHAR(20) UNIQUE NOT NULL,
    route VARCHAR(200) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    conductor_name VARCHAR(100) NOT NULL,
    conductor_phone VARCHAR(15) NOT NULL,
    price INTEGER NOT NULL CHECK (price > 0),
    total_seats INTEGER DEFAULT 60 CHECK (total_seats > 0),
    bus_type VARCHAR(50) DEFAULT 'Standard',
    amenities TEXT[] DEFAULT '{}',
    rating DECIMAL(3,2) DEFAULT 4.0 CHECK (rating >= 0 AND rating <= 5),
    is_active BOOLEAN DEFAULT true,
    from_city_id UUID REFERENCES cities(id),
    to_city_id UUID REFERENCES cities(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample buses
INSERT INTO buses (bus_number, route, departure_time, arrival_time, conductor_name, conductor_phone, price, bus_type, amenities, rating, from_city_id, to_city_id) VALUES
('NB-1234', 'Colombo - Galle', '08:00', '11:30', 'Kamal Perera', '+94771234567', 250, 'AC Luxury', '{"WiFi", "Charging Points", "Entertainment"}', 4.2, 
 (SELECT id FROM cities WHERE code = 'CMB'), (SELECT id FROM cities WHERE code = 'GLE')),
('NC-5678', 'Colombo - Kandy', '09:15', '12:45', 'Sunil Silva', '+94771234568', 180, 'Semi Luxury', '{"Charging Points", "AC"}', 4.0,
 (SELECT id FROM cities WHERE code = 'CMB'), (SELECT id FROM cities WHERE code = 'KDY')),
('ND-9012', 'Colombo - Matara', '10:30', '14:00', 'Nimal Fernando', '+94771234569', 300, 'Super Luxury', '{"WiFi", "Charging Points", "Entertainment", "Refreshments"}', 4.5,
 (SELECT id FROM cities WHERE code = 'CMB'), (SELECT id FROM cities WHERE code = 'MTR')),
('NE-3456', 'Kandy - Nuwara Eliya', '14:00', '17:30', 'Chaminda Rajapaksa', '+94771234570', 220, 'AC Luxury', '{"AC", "Charging Points"}', 3.8,
 (SELECT id FROM cities WHERE code = 'KDY'), (SELECT id FROM cities WHERE code = 'NWE')),
('NF-7890', 'Galle - Matara', '16:45', '18:15', 'Ajith Kumara', '+94771234571', 150, 'Standard', '{"Basic Seating"}', 3.5,
 (SELECT id FROM cities WHERE code = 'GLE'), (SELECT id FROM cities WHERE code = 'MTR'));
