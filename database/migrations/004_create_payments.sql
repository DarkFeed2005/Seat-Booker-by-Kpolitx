-- migrations/004_create_payments.sql
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'success', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('card', 'bank', 'wallet', 'cash');

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount > 0),
    currency VARCHAR(3) DEFAULT 'LKR',
    method payment_method NOT NULL,
    status payment_status DEFAULT 'pending',
    transaction_id VARCHAR(100) UNIQUE,
    payment_gateway VARCHAR(50),
    gateway_response TEXT,
    failure_reason VARCHAR(500),
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add payment_id foreign key to bookings
ALTER TABLE bookings ADD CONSTRAINT fk_bookings_payment 
FOREIGN KEY (payment_id) REFERENCES payments(id);

-- Create indexes
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);
CREATE INDEX idx_payments_status ON payments(status);
