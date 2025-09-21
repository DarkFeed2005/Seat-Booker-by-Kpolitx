-- migrations/001_create_cities.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) NOT NULL,
    name_si VARCHAR(100),
    name_ta VARCHAR(100),
    code VARCHAR(10) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sri Lankan cities
INSERT INTO cities (name_en, name_si, name_ta, code) VALUES
('Colombo', 'කොළඹ', 'கொழும்பு', 'CMB'),
('Kandy', 'මහනුවර', 'கண்டி', 'KDY'),
('Galle', 'ගාල්ල', 'காலி', 'GLE'),
('Matara', 'මාතර', 'மாத்தறை', 'MTR'),
('Hambantota', 'හම්බන්තොට', 'அம்பாந்தோட்டை', 'HBT'),
('Ratnapura', 'රත්නපුර', 'இரத்தினபுரி', 'RTP'),
('Negombo', 'මීගමුව', 'நீர்கொழும்பு', 'NGB'),
('Kalutara', 'කළුතර', 'களுத்துறை', 'KLT'),
('Panadura', 'පානදුර', 'பாணදுறை', 'PND'),
('Ambalangoda', 'අම්බලන්ගොඩ', 'அம்பலங்கொடை', 'AGL'),
('Hikkaduwa', 'හික්කඩුව', 'இக්கட்டுவை', 'HKD'),
('Unawatuna', 'උණවටුන', 'உணவත்துනை', 'UWT'),
('Mirissa', 'මිරිස්ස', 'மිරිස்ஸ', 'MRS'),
('Tangalle', 'තංගල්ල', 'தங்காலை', 'TGL'),
('Badulla', 'බදුල්ල', 'பதுளை', 'BDL'),
('Nuwara Eliya', 'නුවරඑළිය', 'நுவரேலியா', 'NWE'),
('Ella', 'ඇල්ල', 'எல்லா', 'ELA'),
('Bandarawela', 'බන්ඩාරවේල', 'பண்டாரவेला', 'BWL'),
('Polonnaruwa', 'පොළොන්නරුව', 'பொலன்னறுவை', 'PLN'),
('Sigiriya', 'සීගිරිය', 'சீகிரியா', 'SGR'),
('Dambulla', 'දඹුල්ල', 'தம்புள்ளை', 'DMB'),
('Anuradhapura', 'අනුරාධපුර', 'அனுராதபுரம்', 'ARP'),
('Trincomalee', 'ත්‍රිකුණාමලය', 'திருகோணமலை', 'TCO'),
('Batticaloa', 'මඩකලපුව', 'மட்டக்களப்பு', 'BTC'),
('Jaffna', 'යාපනය', 'யாழ்ப்பாணம்', 'JAF');










