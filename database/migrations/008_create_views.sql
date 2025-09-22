-- migrations/008_create_views.sql
-- View for bus search with city names
CREATE VIEW bus_search_view AS
SELECT 
    b.*,
    fc.name_en AS from_city_name,
    fc.name_si AS from_city_name_si,
    fc.name_ta AS from_city_name_ta,
    tc.name_en AS to_city_name,
    tc.name_si AS to_city_name_si,
    tc.name_ta AS to_city_name_ta
FROM buses b
LEFT JOIN cities fc ON b.from_city_id = fc.id
LEFT JOIN cities tc ON b.to_city_id = tc.id
WHERE b.is_active = true;

-- View for booking details
CREATE VIEW booking_details_view AS
SELECT 
    b.*,
    bus.bus_number,
    bus.route,
    bus.departure_time,
    bus.arrival_time,
    bus.conductor_name,
    bus.conductor_phone,
    p.status AS payment_status,
    p.transaction_id,
    p.method AS payment_method
FROM bookings b
LEFT JOIN buses bus ON b.bus_id = bus.id
LEFT JOIN payments p ON b.payment_id = p.id;