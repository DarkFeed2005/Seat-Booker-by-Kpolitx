// models/bus.go
package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type Bus struct {
	ID              uuid.UUID      `json:"id" db:"id"`
	Number          string         `json:"number" db:"bus_number"`
	Route           string         `json:"route" db:"route"`
	DepartureTime   string         `json:"departure" db:"departure_time"`
	ArrivalTime     string         `json:"arrival" db:"arrival_time"`
	ConductorName   string         `json:"conductor" db:"conductor_name"`
	ConductorPhone  string         `json:"conductorPhone" db:"conductor_phone"`
	Price           int            `json:"price" db:"price"`
	TotalSeats      int            `json:"totalSeats" db:"total_seats"`
	BusType         string         `json:"busType" db:"bus_type"`
	Amenities       pq.StringArray `json:"amenities" db:"amenities"`
	Rating          float64        `json:"rating" db:"rating"`
	IsActive        bool           `json:"isActive" db:"is_active"`
	AvailableSeats  []int          `json:"availableSeats,omitempty"`
	CreatedAt       time.Time      `json:"createdAt" db:"created_at"`
	UpdatedAt       time.Time      `json:"updatedAt" db:"updated_at"`
}

type BusSearchRequest struct {
	From string `json:"from" binding:"required"`
	To   string `json:"to" binding:"required"`
	Date string `json:"date" binding:"required"`
	Time string `json:"time"`
}

// booking.go
package models

import (
	"time"

	"github.com/google/uuid"
)

type BookingStatus string

const (
	BookingStatusPending   BookingStatus = "pending"
	BookingStatusConfirmed BookingStatus = "confirmed"
	BookingStatusCancelled BookingStatus = "cancelled"
	BookingStatusCompleted BookingStatus = "completed"
)

type Booking struct {
	ID             uuid.UUID     `json:"id" db:"id"`
	BusID          uuid.UUID     `json:"busId" db:"bus_id"`
	SeatNumber     int           `json:"seatNumber" db:"seat_number"`
	PassengerName  string        `json:"passengerName" db:"passenger_name"`
	PassengerPhone string        `json:"passengerPhone" db:"passenger_phone"`
	BookingDate    time.Time     `json:"bookingDate" db:"booking_date"`
	JourneyDate    time.Time     `json:"journeyDate" db:"journey_date"`
	JourneyTime    string        `json:"journeyTime" db:"journey_time"`
	Status         BookingStatus `json:"status" db:"status"`
	TicketCode     string        `json:"ticketCode" db:"ticket_code"`
	QRCode         string        `json:"qrCode" db:"qr_code"`
	TotalAmount    int           `json:"totalAmount" db:"total_amount"`
	PaymentID      *uuid.UUID    `json:"paymentId,omitempty" db:"payment_id"`
	CreatedAt      time.Time     `json:"createdAt" db:"created_at"`
	UpdatedAt      time.Time     `json:"updatedAt" db:"updated_at"`

	// Related data (populated via joins)
	Bus     *Bus     `json:"bus,omitempty"`
	Payment *Payment `json:"payment,omitempty"`
}

type CreateBookingRequest struct {
	BusID          uuid.UUID `json:"busId" binding:"required"`
	SeatNumber     int       `json:"seatNumber" binding:"required"`
	PassengerName  string    `json:"passengerName" binding:"required"`
	PassengerPhone string    `json:"passengerPhone" binding:"required"`
	JourneyDate    string    `json:"journeyDate" binding:"required"`
	JourneyTime    string    `json:"journeyTime" binding:"required"`
}

// user.go
package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID          uuid.UUID `json:"id" db:"id"`
	Name        string    `json:"name" db:"name"`
	Email       string    `json:"email" db:"email"`
	Phone       string    `json:"phone" db:"phone"`
	Password    string    `json:"-" db:"password_hash"`
	IsActive    bool      `json:"isActive" db:"is_active"`
	Role        string    `json:"role" db:"role"`
	PreferredLang string  `json:"preferredLang" db:"preferred_lang"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt   time.Time `json:"updatedAt" db:"updated_at"`
}

type UserRegistrationRequest struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Phone    string `json:"phone" binding:"required"`
	Password string `json:"password" binding:"required,min=6"`
	Language string `json:"language"`
}

type UserLoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// payment.go
package models

import (
	"time"

	"github.com/google/uuid"
)

type PaymentStatus string

const (
	PaymentStatusPending    PaymentStatus = "pending"
	PaymentStatusProcessing PaymentStatus = "processing"
	PaymentStatusSuccess    PaymentStatus = "success"
	PaymentStatusFailed     PaymentStatus = "failed"
	PaymentStatusRefunded   PaymentStatus = "refunded"
)

type PaymentMethod string

const (
	PaymentMethodCard   PaymentMethod = "card"
	PaymentMethodBank   PaymentMethod = "bank"
	PaymentMethodWallet PaymentMethod = "wallet"
)

type Payment struct {
	ID              uuid.UUID     `json:"id" db:"id"`
	BookingID       uuid.UUID     `json:"bookingId" db:"booking_id"`
	Amount          int           `json:"amount" db:"amount"`
	Currency        string        `json:"currency" db:"currency"`
	Method          PaymentMethod `json:"method" db:"method"`
	Status          PaymentStatus `json:"status" db:"status"`
	TransactionID   string        `json:"transactionId" db:"transaction_id"`
	PaymentGateway  string        `json:"paymentGateway" db:"payment_gateway"`
	GatewayResponse string        `json:"gatewayResponse,omitempty" db:"gateway_response"`
	FailureReason   string        `json:"failureReason,omitempty" db:"failure_reason"`
	ProcessedAt     *time.Time    `json:"processedAt,omitempty" db:"processed_at"`
	CreatedAt       time.Time     `json:"createdAt" db:"created_at"`
	UpdatedAt       time.Time     `json:"updatedAt" db:"updated_at"`
}

type PaymentRequest struct {
	BookingID    uuid.UUID `json:"bookingId" binding:"required"`
	Amount       int       `json:"amount" binding:"required"`
	Method       string    `json:"method" binding:"required"`
	CardNumber   string    `json:"cardNumber,omitempty"`
	CardExpiry   string    `json:"cardExpiry,omitempty"`
	CardCVV      string    `json:"cardCvv,omitempty"`
	CardHolder   string    `json:"cardHolder,omitempty"`
}

// city.go
package models

import (
	"github.com/google/uuid"
)

type City struct {
	ID     uuid.UUID `json:"id" db:"id"`
	NameEN string    `json:"nameEn" db:"name_en"`
	NameSI string    `json:"nameSi" db:"name_si"`
	NameTA string    `json:"nameTa" db:"name_ta"`
	Code   string    `json:"code" db:"code"`
	IsActive bool    `json:"isActive" db:"is_active"`
}

// sms.go
package models

import (
	"time"

	"github.com/google/uuid"
)

type SMSType string

const (
	SMSTypeConductorNotification SMSType = "conductor_notification"
	SMSTypePassengerConfirmation SMSType = "passenger_confirmation"
	SMSTypeBookingReminder       SMSType = "booking_reminder"
)

type SMSStatus string

const (
	SMSStatusPending SMSStatus = "pending"
	SMSStatusSent    SMSStatus = "sent"
	SMSStatusFailed  SMSStatus = "failed"
)

type SMS struct {
	ID        uuid.UUID `json:"id" db:"id"`
	To        string    `json:"to" db:"to_number"`
	Message   string    `json:"message" db:"message"`
	Type      SMSType   `json:"type" db:"type"`
	Status    SMSStatus `json:"status" db:"status"`
	Provider  string    `json:"provider" db:"provider"`
	MessageID string    `json:"messageId,omitempty" db:"message_id"`
	Error     string    `json:"error,omitempty" db:"error"`
	SentAt    *time.Time `json:"sentAt,omitempty" db:"sent_at"`
	CreatedAt time.Time `json:"createdAt" db:"created_at"`
}

type SMSRequest struct {
	To      string  `json:"to" binding:"required"`
	Message string  `json:"message" binding:"required"`
	Type    SMSType `json:"type"`
}

// ticket.go
package models

type Ticket struct {
	ID             string    `json:"id"`
	BusNumber      string    `json:"busNumber"`
	Conductor      string    `json:"conductor"`
	ConductorPhone string    `json:"conductorPhone"`
	SeatNumber     int       `json:"seatNumber"`
	Route          string    `json:"route"`
	Departure      string    `json:"departure"`
	Arrival        string    `json:"arrival"`
	Price          int       `json:"price"`
	Date           string    `json:"date"`
	Time           string    `json:"time"`
	PassengerName  string    `json:"passengerName"`
	PassengerPhone string    `json:"passengerPhone"`
	BookingDate    time.Time `json:"bookingDate"`
	QRCode         string    `json:"qrCode"`
	TicketCode     string    `json:"ticketCode"`
	Status         string    `json:"status"`
}

// response.go
package models

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

type PaginatedResponse struct {
	APIResponse
	Pagination Pagination `json:"pagination,omitempty"`
}

type Pagination struct {
	Page       int   `json:"page"`
	Limit      int   `json:"limit"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"totalPages"`
}

// validation.go
package models

type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type ValidationErrors struct {
	Errors []ValidationError `json:"errors"`
}