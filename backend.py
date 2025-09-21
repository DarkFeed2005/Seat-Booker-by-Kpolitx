import os

structure = [
    "seatbooker-backend/cmd/server/main.go",
    "seatbooker-backend/internal/handlers/auth.go",
    "seatbooker-backend/internal/handlers/buses.go",
    "seatbooker-backend/internal/handlers/bookings.go",
    "seatbooker-backend/internal/handlers/cities.go",
    "seatbooker-backend/internal/handlers/payments.go",
    "seatbooker-backend/internal/models/bus.go",
    "seatbooker-backend/internal/models/booking.go",
    "seatbooker-backend/internal/models/user.go",
    "seatbooker-backend/internal/models/payment.go",
    "seatbooker-backend/internal/services/bus_service.go",
    "seatbooker-backend/internal/services/booking_service.go",
    "seatbooker-backend/internal/services/payment_service.go",
    "seatbooker-backend/internal/services/sms_service.go",
    "seatbooker-backend/internal/database/connection.go",
    "seatbooker-backend/internal/database/migrations.go",
    "seatbooker-backend/internal/database/queries.go",
    "seatbooker-backend/internal/middleware/auth.go",
    "seatbooker-backend/internal/middleware/cors.go",
    "seatbooker-backend/internal/middleware/logging.go",
    "seatbooker-backend/internal/config/config.go",
    "seatbooker-backend/api/routes.go",
    "seatbooker-backend/pkg/logger/logger.go",
    "seatbooker-backend/pkg/utils/response.go",
    "seatbooker-backend/pkg/utils/validation.go",
    "seatbooker-backend/scripts/migrate.sql",
    "seatbooker-backend/scripts/seed.sql",
    "seatbooker-backend/go.mod",
    "seatbooker-backend/go.sum",
    "seatbooker-backend/.env.example",
    "seatbooker-backend/README.md"
]

for path in structure:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write("")  # create empty file

print("Backend project structure created successfully.")