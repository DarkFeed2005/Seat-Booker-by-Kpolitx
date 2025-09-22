import os

structure = [
    "seatbooker-frontend/public/index.html",
    "seatbooker-frontend/public/favicon.ico",
    "seatbooker-frontend/public/manifest.json",
    "seatbooker-frontend/src/components/common/Header.jsx",
    "seatbooker-frontend/src/components/common/LanguageSelector.jsx",
    "seatbooker-frontend/src/components/common/LoadingSpinner.jsx",
    "seatbooker-frontend/src/components/pages/HomePage.jsx",
    "seatbooker-frontend/src/components/pages/BusListPage.jsx",
    "seatbooker-frontend/src/components/pages/SeatSelectionPage.jsx",
    "seatbooker-frontend/src/components/pages/PaymentPage.jsx",
    "seatbooker-frontend/src/components/pages/TicketPage.jsx",
    "seatbooker-frontend/src/components/ui/Button.jsx",
    "seatbooker-frontend/src/components/ui/Input.jsx",
    "seatbooker-frontend/src/components/ui/Select.jsx",
    "seatbooker-frontend/src/components/ui/Card.jsx",
    "seatbooker-frontend/src/hooks/useLanguage.js",
    "seatbooker-frontend/src/hooks/useBooking.js",
    "seatbooker-frontend/src/hooks/useAPI.js",
    "seatbooker-frontend/src/services/api.js",
    "seatbooker-frontend/src/services/supabaseClient.js",
    "seatbooker-frontend/src/services/smsService.js",
    "seatbooker-frontend/src/utils/translations.js",
    "seatbooker-frontend/src/utils/constants.js",
    "seatbooker-frontend/src/utils/helpers.js",
    "seatbooker-frontend/src/styles/globals.css",
    "seatbooker-frontend/src/styles/components.css",
    "seatbooker-frontend/src/App.jsx",
    "seatbooker-frontend/src/index.js",
    "seatbooker-frontend/src/App.css",
    "seatbooker-frontend/package.json",
    "seatbooker-frontend/tailwind.config.js",
    "seatbooker-frontend/postcss.config.js",
    "seatbooker-frontend/README.md"
]

for path in structure:
    dir_path = os.path.dirname(path)
    os.makedirs(dir_path, exist_ok=True)
    with open(path, 'w') as f:
        f.write("")  # create empty file

print("Project structure created successfully.")