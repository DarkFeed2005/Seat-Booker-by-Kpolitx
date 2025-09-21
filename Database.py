import os

structure = [
    "database/migrations/001_create_cities.sql",
    "database/migrations/002_create_buses.sql",
    "database/migrations/003_create_bookings.sql",
    "database/migrations/004_create_payments.sql",
    "database/migrations/005_create_indexes.sql",
    "database/seeds/cities_data.sql",
    "database/seeds/buses_data.sql",
    "database/functions/booking_triggers.sql",
    "database/functions/sms_functions.sql"
]

for path in structure:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write("")  # create empty file

print("Database structure created successfully.")