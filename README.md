# SeatBooker 🚌 
## Modern 3D Bus Seat Booking App for Sri Lanka

SeatBooker is a comprehensive, modern bus seat booking application designed specifically for Sri Lanka's transportation needs. Built with React, Go, and Supabase, it features a stunning 3D interface, multi-language support, and complete booking management.

## ✨ Features

### 🎨 Modern UI/UX
- **3D Glassmorphism Design** with animated backgrounds
- **Responsive Design** works on all devices
- **Multi-language Support** (English, Sinhala, Tamil)
- **Interactive Seat Selection** with real-time availability
- **Smooth Animations** and transitions

### 🚌 Bus Management
- **Real-time Bus Search** by route, date, and time
- **Sri Lankan Cities** comprehensive database
- **Conductor Information** with contact details
- **Dynamic Pricing** and seat availability
- **Bus Amenities** and rating system

### 💳 Payment System
- **Credit Card Processing** with validation
- **Multiple Payment Methods** support
- **Secure Payment Gateway** integration
- **Real-time Payment Status** tracking

### 🎫 Digital Ticketing
- **QR Code Generation** for ticket verification
- **Complete Ticket Details** with passenger info
- **SMS Notifications** to conductor and passenger
- **Ticket History** and management

### 🔧 Technical Features
- **RESTful API** with comprehensive endpoints
- **Real-time Data** synchronization
- **Database Optimization** with indexing
- **Security** with JWT authentication
- **Scalable Architecture** with microservices approach

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Go 1.21+
- PostgreSQL 13+
- Redis (optional, for caching)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/seatbooker.git
cd seatbooker
```

### 2. Setup Database (Supabase)
```bash
# Create a new Supabase project
# Copy your project URL and anon key
# Run the migrations from database/migrations/
```

### 3. Backend Setup
```bash
cd seatbooker-backend

# Install dependencies
go mod download

# Copy environment variables
cp .env.example .env
# Edit .env with your database and API keys

# Run database migrations
go run cmd/migrate/main.go

# Start the server
go run cmd/server/main.go
```

### 4. Frontend Setup
```bash
cd seatbooker-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your API endpoints

# Start development server
npm start
```

### 5. Using Docker (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

### Frontend (React + Tailwind)
```
seatbooker-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── pages/           # Page components
│   │   └── ui/              # UI components
│   ├── hooks/               # Custom hooks
│   ├── services/            # API services
│   ├── utils/               # Utilities & constants
│   └── styles/              # CSS files
└── package.json
```

### Backend (Go + Gin)
```
seatbooker-backend/
├── cmd/server/              # Application entry point
├── internal/
│   ├── handlers/            # HTTP handlers
│   ├── models/              # Data models
│   ├── services/            # Business logic
│   ├── database/            # Database connection & queries
│   ├── middleware/          # HTTP middleware
│   └── config/              # Configuration
├── pkg/                     # Shared packages
└── go.mod
```

### Database (PostgreSQL/Supabase)
```
database/
├── migrations/              # SQL migration files
├── seeds/                   # Seed data
└── functions/               # Database functions & triggers
```

## 🛠 API Endpoints

### Cities
- `GET /api/v1/cities` - Get all cities
- `GET /api/v1/cities/:id` - Get city by ID

### Buses
- `POST /api/v1/buses/search` - Search buses
- `GET /api/v1/buses/:id` - Get bus details
- `GET /api/v1/buses/:id/seats` - Get available seats

### Bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings/:id` - Get booking details
- `PUT /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Cancel booking

### Payments
- `POST /api/v1/payments/process` - Process payment
- `GET /api/v1/payments/:id` - Get payment status

### SMS
- `POST /api/v1/sms/send` - Send SMS notification

### Tickets
- `GET /api/v1/tickets/:id` - Get ticket details

## 🌐 Multi-Language Support

The application supports three languages:
- **English** (en)
- **Sinhala** (si) - සිංහල
- **Tamil** (ta) - தமிழ்

Language files are located in `src/utils/translations.js` and can be easily extended.

## 💡 Key Components

### HomePage.jsx
```javascript
// Main search interface with:
// - City selection dropdowns
// - Date and time pickers
// - 3D animated background
// - Form validation
```

### BusListPage.jsx
```javascript
// Bus search results with:
// - Bus cards with details
// - Filtering and sorting
// - Real-time availability
// - Responsive grid layout
```

### SeatSelectionPage.jsx
```javascript
// Interactive seat selection with:
// - Visual bus layout
// - Color-coded seat status
// - Real-time updates
// - Mobile-friendly interface
```

### PaymentPage.jsx
```javascript
// Secure payment processing with:
// - Credit card form validation
// - Multiple payment methods
// - Loading states
// - Error handling
```

### TicketPage.jsx
```javascript
// Digital ticket display with:
// - QR code generation
// - Complete booking details
// - Print-friendly layout
// - Share functionality
```

## 🔧 Backend Services

### Bus Service
```go
// Handles bus operations:
// - Search with filters
// - Availability checking
// - Route management
// - Real-time updates
```

### Booking Service
```go
// Manages bookings:
// - Seat reservation
// - Conflict prevention
// - Status management
// - History tracking
```

### Payment Service
```go
// Payment processing:
// - Gateway integration
// - Transaction management
// - Refund handling
// - Security compliance
```

### SMS Service
```go
// Notification system:
// - Conductor alerts
// - Passenger confirmations
// - Booking reminders
// - Multi-provider support
```

## 🗄 Database Schema

### Key Tables
- **cities** - Sri Lankan cities with translations
- **buses** - Bus information and schedules
- **bookings** - Seat reservations and passenger details
- **payments** - Payment transactions and status
- **sms** - SMS notification logs
- **users** - User accounts and preferences

### Key Features
- **UUID Primary Keys** for security
- **Row Level Security** with Supabase
- **Automated Triggers** for timestamps
- **Optimized Indexes** for performance
- **Data Validation** at database level

## 📱 SMS Integration

### Supported Providers
1. **Dialog SMS** (Sri Lanka)
2. **Twilio** (International)
3. **AWS SNS** (Scalable)

### SMS Templates
- **Conductor Notification**: New booking alerts
- **Passenger Confirmation**: Booking confirmations
- **Reminders**: Journey reminders

## 💳 Payment Integration

### Supported Methods
- Credit/Debit Cards
- Bank Transfers
- Mobile Wallets
- Cash Payments

### Security Features
- PCI DSS Compliance
- Encrypted transactions
- Secure token handling
- Fraud prevention

## 🚀 Deployment

### Development
```bash
# Using Docker Compose
docker-compose up -d

# Manual setup
npm start          # Frontend
go run main.go     # Backend
```

### Production
```bash
# Build containers
docker build -t seatbooker-frontend ./seatbooker-frontend
docker build -t seatbooker-backend ./seatbooker-backend

# Deploy with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
```bash
# Backend
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
JWT_SECRET=...
SMS_PROVIDER=dialog
PAYMENT_GATEWAY=stripe

# Frontend
REACT_APP_API_BASE_URL=https://api.seatbooker.lk
REACT_APP_SUPABASE_URL=https://...
```

## 🧪 Testing

### Frontend Tests
```bash
cd seatbooker-frontend
npm test
npm run test:coverage
```

### Backend Tests
```bash
cd seatbooker-backend
go test ./...
go test -race ./...
go test -cover ./...
```

### Integration Tests
```bash
# API testing with curl/Postman
curl -X POST http://localhost:8080/api/v1/buses/search \
  -H "Content-Type: application/json" \
  -d '{"from":"Colombo","to":"Galle","date":"2024-01-15"}'
```

## 📈 Performance Optimization

### Frontend
- **Code Splitting** with lazy loading
- **Image Optimization** with WebP
- **Bundle Analysis** with webpack-bundle-analyzer
- **Caching Strategies** with service workers

### Backend
- **Database Indexes** for fast queries
- **Connection Pooling** for scalability
- **Redis Caching** for frequent data
- **Horizontal Scaling** with load balancers

### Database
- **Query Optimization** with EXPLAIN
- **Partitioning** for large tables
- **Read Replicas** for read scaling
- **Backup Strategies** with point-in-time recovery

## 🔒 Security

### Authentication
- JWT tokens with expiration
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Encrypted data storage

### Privacy
- GDPR compliance ready
- Data anonymization options
- Audit logging
- User consent management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Go conventions and gofmt
- Use ESLint and Prettier for JavaScript
- Write comprehensive tests
- Update documentation
- Follow semantic versioning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the amazing backend-as-a-service
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Gin** for the high-performance Go web framework
- **React** for the component-based UI library


## 🗺 Roadmap

### Version 2.0
- [ ] Mobile App (React Native)
- [ ] Real-time GPS tracking
- [ ] Advanced analytics dashboard
- [ ] Multi-operator support
- [ ] Loyalty program integration

### Version 2.1
- [ ] AI-powered route optimization
- [ ] Dynamic pricing algorithms
- [ ] Social media integration
- [ ] Offline booking capability
- [ ] Voice booking assistant

---

**Built with ❤️ in Sri Lanka for Sri Lankan travelers**

## 📊 Quick Stats
- **🏙 Cities Supported**: 25+ major cities
- **🚌 Bus Operators**: Scalable for multiple operators
- **🌍 Languages**: 3 languages (English, Sinhala, Tamil)
- **📱 Responsive**: Mobile-first design
- **⚡ Performance**: < 2s page load times
- **🔒 Security**: Enterprise-grade security


---

👨‍💻 Author
 
- Kalana Yasassri  <a href="https://github.com/DarkFeed2005" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=github" alt="github" width="20" height="20"/> </a>
- LinkedIn <a href="https://www.linkedin.com/in/kalana-yasassri-684591251/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg" alt="linkedin" width="20" height="20"/> </a>
- Instagram <a href="https://www.instagram.com/kalana_yasassri/" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=instagram" alt="instagram" width="20" height="20"/> </a> 
  
🎨 License
This project is open-source under the MIT License.

---