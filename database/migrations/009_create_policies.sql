-- migrations/009_create_policies.sql (For RLS if using Supabase)
-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public read access for cities and buses
CREATE POLICY "Cities are viewable by everyone" ON cities FOR SELECT USING (true);
CREATE POLICY "Buses are viewable by everyone" ON buses FOR SELECT USING (is_active = true);

-- Users can only see their own bookings and payments
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid()::text = passenger_phone OR auth.role() = 'admin');
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own bookings" ON bookings FOR UPDATE USING (auth.uid()::text = passenger_phone OR auth.role() = 'admin');

CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (
    booking_id IN (SELECT id FROM bookings WHERE passenger_phone = auth.uid()::text) OR auth.role() = 'admin'
);

-- Admin policies
CREATE POLICY "Admins can do everything" ON cities FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage buses" ON buses FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage bookings" ON bookings FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage payments" ON payments FOR ALL USING (auth.role() = 'admin');