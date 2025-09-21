-- migrations/005_create_sms.sql
CREATE TYPE sms_status AS ENUM ('pending', 'sent', 'failed');
CREATE TYPE sms_type AS ENUM ('conductor_notification', 'passenger_confirmation', 'booking_reminder');

CREATE TABLE sms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    to_number VARCHAR(15) NOT NULL,
    message TEXT NOT NULL,
    type sms_type NOT NULL,
    status sms_status DEFAULT 'pending',
    provider VARCHAR(50),
    message_id VARCHAR(100),
    error TEXT,
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_sms_status ON sms(status);
CREATE INDEX idx_sms_type ON sms(type);
CREATE INDEX idx_sms_to_number ON sms(to_number);
