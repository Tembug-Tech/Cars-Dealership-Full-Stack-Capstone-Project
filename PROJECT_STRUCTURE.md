# Project File Structure

## Complete Directory Tree

```
captone project/
│
├── car_dealership_backend/                 # Django REST API
│   ├── car_dealership/                     # Main project config
│   │   ├── __init__.py
│   │   ├── settings.py                     # Django settings (CORS, DRF, apps config)
│   │   ├── urls.py                         # Main URL routing
│   │   ├── wsgi.py                         # WSGI application
│   │   └── asgi.py                         # ASGI application
│   │
│   ├── dealers/                            # Dealers app
│   │   ├── __init__.py
│   │   ├── models.py                       # Dealer model
│   │   ├── serializers.py                  # Dealer serializer
│   │   ├── views.py                        # Dealer viewsets
│   │   ├── apps.py                         # App configuration
│   │   ├── admin.py                        # Django admin config
│   │   ├── tests.py                        # Unit tests
│   │   └── management/
│   │       ├── commands/
│   │       │   ├── __init__.py
│   │       │   └── seed_data.py            # Data seeding command
│   │       └── __init__.py
│   │
│   ├── reviews/                            # Reviews app
│   │   ├── __init__.py
│   │   ├── models.py                       # Review model
│   │   ├── serializers.py                  # Review serializer
│   │   ├── views.py                        # Review viewsets
│   │   ├── apps.py
│   │   ├── admin.py
│   │   └── tests.py
│   │
│   ├── users/                              # Users/Auth app
│   │   ├── __init__.py
│   │   ├── models.py                       # User profile model
│   │   ├── serializers.py                  # Register/Login serializers
│   │   ├── views.py                        # Auth views (register, login, logout)
│   │   ├── apps.py
│   │   ├── admin.py
│   │   └── tests.py
│   │
│   ├── sentiment/                          # Sentiment analysis app
│   │   ├── __init__.py
│   │   ├── models.py                       # Sentiment result model
│   │   ├── serializers.py                  # Sentiment serializer
│   │   ├── views.py                        # Sentiment analysis view
│   │   ├── utils.py                        # Rule-based sentiment analyzer
│   │   ├── apps.py
│   │   ├── admin.py
│   │   └── tests.py
│   │
│   ├── manage.py                           # Django management script
│   ├── requirements.txt                    # Python dependencies
│   ├── Dockerfile                          # Docker config
│   ├── .dockerignore
│   ├── .gitignore
│   └── .env.example                        # Environment variables template
│
├── car_dealership_frontend/                # React Frontend
│   ├── src/
│   │   ├── components/                     # Reusable React components
│   │   │   ├── Navbar.js                   # Navigation bar
│   │   │   ├── DealerCard.js               # Dealer card component
│   │   │   ├── ReviewCard.js               # Review card component
│   │   │   ├── LoginForm.js                # Login form
│   │   │   ├── RegisterForm.js             # Registration form
│   │   │   └── ReviewForm.js               # Review submission form
│   │   │
│   │   ├── pages/                          # Page components
│   │   │   ├── HomePage.js                 # Dealers listing page
│   │   │   ├── DealerDetailsPage.js        # Dealer details & reviews page
│   │   │   ├── LoginPage.js                # Login page
│   │   │   ├── RegisterPage.js             # Registration page
│   │   │   └── ReviewPage.js               # Review submission page
│   │   │
│   │   ├── services/
│   │   │   └── api.js                      # API client (Axios)
│   │   │
│   │   ├── App.js                          # Main app component with routing
│   │   └── index.js                        # React entry point
│   │
│   ├── public/
│   │   └── index.html                      # HTML template
│   │
│   ├── package.json                        # Node.js dependencies
│   ├── Dockerfile                          # Docker config
│   ├── .dockerignore
│   ├── .gitignore
│   └── .env                                # Environment variables (auto-generated)
│
├── docker-compose.yml                      # Multi-container orchestration
├── README.md                               # Complete documentation
├── QUICKSTART.md                           # Quick start guide
└── PROJECT_STRUCTURE.md                    # This file
```

## File Descriptions

### Backend Files

#### Core Configuration
- **car_dealership/settings.py**: Django settings, INSTALLED_APPS, CORS configuration, REST Framework settings
- **car_dealership/urls.py**: Main URL routing, includes DRF router for dealers and reviews
- **car_dealership/wsgi.py**: WSGI application for production
- **manage.py**: Django CLI tool

#### Models (Database Schema)
- **dealers/models.py**: Dealer model with name, city, state, address
- **reviews/models.py**: Review model with FK to Dealer and User, rating 1-5, sentiment field
- **users/models.py**: UserProfile model extending Django's User
- **sentiment/models.py**: SentimentResult model for storing analysis results

#### Serializers (Data Validation & Response Format)
- **dealers/serializers.py**: DealerSerializer with review count and average rating
- **reviews/serializers.py**: ReviewSerializer with user and dealer names
- **users/serializers.py**: RegisterSerializer, UserSerializer
- **sentiment/serializers.py**: SentimentAnalysisSerializer

#### Views (API Endpoints)
- **dealers/views.py**: DealerViewSet with filtering by state
- **reviews/views.py**: ReviewViewSet with automatic sentiment analysis
- **users/views.py**: RegisterView, LoginView, LogoutView
- **sentiment/views.py**: SentimentAnalysisView

#### Utilities
- **sentiment/utils.py**: Rule-based sentiment analysis function
- **dealers/management/commands/seed_data.py**: Populates database with sample data

### Frontend Files

#### Main Application
- **App.js**: Main component, handles routing and authentication state
- **index.js**: React DOM render entry point

#### Components
- **Navbar.js**: Top navigation with login/logout and username display
- **DealerCard.js**: Card component for displaying dealer info in list
- **ReviewCard.js**: Card component for displaying individual reviews
- **LoginForm.js**: Form for user login
- **RegisterForm.js**: Form for user registration
- **ReviewForm.js**: Form for submitting reviews with validation

#### Pages
- **HomePage.js**: Lists all dealers with state filtering
- **DealerDetailsPage.js**: Shows dealer details and all reviews
- **LoginPage.js**: Wraps LoginForm
- **RegisterPage.js**: Wraps RegisterForm
- **ReviewPage.js**: Wraps ReviewForm

#### Services
- **services/api.js**: Axios instance and API helper functions for:
  - dealerService (get dealers, get by id, filter by state)
  - reviewService (get reviews, submit review)
  - authService (register, login, logout)
  - sentimentService (analyze sentiment)

#### Configuration
- **package.json**: Dependencies (React, React Router, Axios)
- **public/index.html**: HTML template with root div and basic CSS

### Docker & Deployment
- **Dockerfile (backend)**: Python 3.11 slim, installs dependencies, runs gunicorn
- **Dockerfile (frontend)**: Node 18 alpine, installs npm packages, runs npm start
- **docker-compose.yml**: Defines 2 services (backend, frontend), networks, volumes
- **.dockerignore**: Files to exclude from Docker build context
- **.gitignore**: Files to exclude from version control

### Documentation
- **README.md**: Complete project documentation with setup instructions
- **QUICKSTART.md**: Quick reference guide for getting started
- **requirements.txt**: Python package dependencies
- **.env.example**: Template for environment variables

## API Endpoint Summary

### Dealers
- GET /api/dealers/ - List all dealers
- GET /api/dealers/{id}/ - Get dealer details
- GET /api/dealers/?state=CA - Filter by state
- POST /api/dealers/ - Create dealer (admin)
- PUT /api/dealers/{id}/ - Update dealer (admin)
- DELETE /api/dealers/{id}/ - Delete dealer (admin)

### Reviews
- GET /api/reviews/?dealer_id={id} - Get dealer reviews
- POST /api/reviews/ - Submit review (authenticated)
- PUT /api/reviews/{id}/ - Update review (owner)
- DELETE /api/reviews/{id}/ - Delete review (owner)

### Authentication
- POST /api/register/ - Register new user
- POST /api/login/ - Login user
- POST /api/logout/ - Logout user (authenticated)

### Sentiment Analysis
- POST /api/sentiment/ - Analyze text sentiment

## Database Schema

### Dealers Table
```
id (PK)
name (CharField)
city (CharField)
state (CharField)
address (TextField)
created_at (DateTimeField)
updated_at (DateTimeField)
```

### Reviews Table
```
id (PK)
dealer_id (FK to Dealers)
user_id (FK to User)
rating (IntegerField, 1-5)
comment (TextField)
purchase (BooleanField)
purchase_date (DateField, nullable)
car_make (CharField)
car_model (CharField)
year (IntegerField)
sentiment (CharField: positive/negative/neutral)
created_at (DateTimeField)
updated_at (DateTimeField)
```

### Users Table (Django built-in)
```
id (PK)
username (CharField, unique)
email (EmailField)
password (CharField, hashed)
first_name (CharField)
last_name (CharField)
is_active (BooleanField)
is_staff (BooleanField)
is_superuser (BooleanField)
date_joined (DateTimeField)
last_login (DateTimeField)
```

## Authentication Flow

1. **Registration**: User POST /api/register/ with username, email, password
2. **Login**: User POST /api/login/ with username, password
3. **Session**: Django creates session, returns User data
4. **Frontend Storage**: React stores user in localStorage
5. **API Requests**: axios includes credentials with requests
6. **Logout**: POST /api/logout/, clear localStorage, redirect to home

## Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── HomePage
│   │   └── DealerCard (multiple)
│   ├── DealerDetailsPage
│   │   └── ReviewCard (multiple)
│   ├── LoginPage
│   │   └── LoginForm
│   ├── RegisterPage
│   │   └── RegisterForm
│   └── ReviewPage
│       └── ReviewForm
```

## Running the Application

### Docker Compose (Recommended)
```bash
docker-compose up --build
```
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

### Local Development
```bash
# Backend terminal
cd car_dealership_backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver

# Frontend terminal
cd car_dealership_frontend
npm install
npm start
```

## Key Dependencies

### Backend (Python)
- Django==4.2.8
- djangorestframework==3.14.0
- django-cors-headers==4.3.1
- django-filter==23.5
- python-decouple==3.8
- gunicorn==21.2.0

### Frontend (JavaScript)
- react==^18.2.0
- react-dom==^18.2.0
- react-router-dom==^6.18.0
- axios==^1.6.2
- react-scripts==5.0.1
