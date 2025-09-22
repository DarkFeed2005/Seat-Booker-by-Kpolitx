package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"seatbooker/internal/config"
	"seatbooker/internal/database"
	"seatbooker/internal/handlers"
	"seatbooker/internal/middleware"
	"seatbooker/pkg/logger"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize logger
	logger := logger.NewLogger()

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		logger.Fatal("Failed to load configuration", err)
	}

	// Initialize database connection
	db, err := database.Initialize(cfg.DatabaseURL)
	if err != nil {
		logger.Fatal("Failed to initialize database", err)
	}
	defer db.Close()

	// Run database migrations
	if err := database.RunMigrations(db); err != nil {
		logger.Fatal("Failed to run migrations", err)
	}

	// Initialize Gin router
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()

	// Middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.LoggingMiddleware(logger))

	// CORS configuration
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{
		"http://localhost:3000",
		"http://localhost:3001",
		cfg.FrontendURL,
	}
	corsConfig.AllowHeaders = []string{
		"Origin",
		"Content-Length",
		"Content-Type",
		"Authorization",
	}
	corsConfig.AllowMethods = []string{
		"GET",
		"POST",
		"PUT",
		"DELETE",
		"OPTIONS",
	}
	router.Use(cors.New(corsConfig))

	// Initialize handlers
	busHandler := handlers.NewBusHandler(db, logger)
	bookingHandler := handlers.NewBookingHandler(db, logger, cfg)
	cityHandler := handlers.NewCityHandler(db, logger)
	paymentHandler := handlers.NewPaymentHandler(db, logger, cfg)

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"version": "1.0.0",
			"service": "seatbooker-api",
		})
	})

	// API routes
	api := router.Group("/api/v1")
	{
		// Cities
		cities := api.Group("/cities")
		{
			cities.GET("", cityHandler.GetCities)
			cities.GET("/:id", cityHandler.GetCityByID)
		}

		// Buses
		buses := api.Group("/buses")
		{
			buses.POST("/search", busHandler.SearchBuses)
			buses.GET("/:id", busHandler.GetBusByID)
			buses.GET("/:id/seats", busHandler.GetBusSeats)
		}

		// Bookings
		bookings := api.Group("/bookings")
		{
			bookings.POST("", bookingHandler.CreateBooking)
			bookings.GET("/:id", bookingHandler.GetBooking)
			bookings.PUT("/:id", bookingHandler.UpdateBooking)
			bookings.DELETE("/:id", bookingHandler.CancelBooking)
		}

		// Payments
		payments := api.Group("/payments")
		{
			payments.POST("/process", paymentHandler.ProcessPayment)
			payments.GET("/:id", paymentHandler.GetPayment)
		}

		// SMS
		sms := api.Group("/sms")
		{
			sms.POST("/send", handlers.SendSMS)
		}

		// Tickets
		tickets := api.Group("/tickets")
		{
			tickets.GET("/:id", bookingHandler.GetTicket)
		}
	}

	// Admin routes (if needed)
	admin := router.Group("/admin")
	admin.Use(middleware.AuthMiddleware(cfg.JWTSecret))
	{
		admin.GET("/buses", busHandler.GetAllBuses)
		admin.POST("/buses", busHandler.CreateBus)
		admin.PUT("/buses/:id", busHandler.UpdateBus)
		admin.DELETE("/buses/:id", busHandler.DeleteBus)
		admin.GET("/bookings", bookingHandler.GetAllBookings)
		admin.GET("/stats", handlers.GetStats)
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = cfg.Port
	}

	logger.Info("Starting server on port " + port)
	if err := router.Run(":" + port); err != nil {
		logger.Fatal("Failed to start server", err)
	}
}