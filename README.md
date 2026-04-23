# Cars Dealership Web Application

A full-stack web application for managing car dealers and reviews with sentiment analysis.

## Tech Stack

- **Frontend**: React 18 with React Router v6 and Axios
- **Backend**: Django 4.2 with Django REST Framework
- **Database**: SQLite (development)
- **Authentication**: Session-based login system
- **Deployment**: Docker & Docker Compose ready

## Project Structure

```
captone project/
├── car_dealership_backend/
│   ├── car_dealership/          # Project configuration
│   ├── dealers/                 # Dealers app
│   ├── reviews/                 # Reviews app
│   ├── users/                   # Users/Authentication app
│   ├── sentiment/               # Sentiment analysis app
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── car_dealership_frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
├── docker-compose.yml
└── README.md
```

## Backend Setup

### Prerequisites
- Python 3.11+
- pip
- virtualenv (recommended)

### Installation

1. Navigate to backend directory:
```bash
cd car_dealership_backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create .env file from example:
```bash
cp .env.example .env
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Seed sample data:
```bash
python manage.py seed_data
```

7. Create superuser (optional):
```bash
python manage.py createsuperuser
```

8. Run development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### API Documentation

#### Dealer Endpoints
- `GET /api/dealers/` - Get all dealers
- `GET /api/dealers/<id>/` - Get dealer details
- `GET /api/dealers/?state=CA` - Filter dealers by state
- `POST /api/dealers/` - Create dealer (admin only)
- `PUT /api/dealers/<id>/` - Update dealer (admin only)
- `DELETE /api/dealers/<id>/` - Delete dealer (admin only)

#### Review Endpoints
- `GET /api/reviews/?dealer_id=<id>` - Get reviews for a dealer
- `POST /api/reviews/` - Submit a review (authenticated users)
- `PUT /api/reviews/<id>/` - Update review (owner only)
- `DELETE /api/reviews/<id>/` - Delete review (owner only)

#### Authentication Endpoints
- `POST /api/register/` - Register new user
  ```json
  {"username": "user", "email": "user@example.com", "password": "pass123"}
  ```
- `POST /api/login/` - Login user
  ```json
  {"username": "user", "password": "pass123"}
  ```
- `POST /api/logout/` - Logout user (authenticated)

#### Sentiment Analysis
- `POST /api/sentiment/` - Analyze text sentiment
  ```json
  {"text": "This is a great car!"}
  ```
  Response: `{"text": "...", "sentiment": "positive"}`

## Frontend Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Navigate to frontend directory:
```bash
cd car_dealership_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file (optional):
```bash
echo "REACT_APP_API_URL=http://localhost:8000" > .env
```

4. Start development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Pages & Features

#### Home Page
- View all car dealers
- Filter dealers by state
- See average rating and review count for each dealer

#### Dealer Details Page
- View complete dealer information
- Read all reviews for a dealer
- View sentiment analysis of reviews
- Write a review (if logged in)

#### Authentication Pages
- **Login**: Sign in with username and password
- **Register**: Create new user account

#### Review Submission
- Submit detailed reviews with ratings (1-5 stars)
- Add car purchase details (make, model, year, date)
- Automatic sentiment analysis

## Docker Deployment

### Using Docker Compose (Recommended)

1. Make sure Docker and Docker Compose are installed

2. From project root:
```bash
docker-compose up --build
```

This will:
- Build and start the Django backend (port 8000)
- Build and start the React frontend (port 3000)
- Run database migrations
- Seed sample data
- Create network for inter-service communication

3. Access the application:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Admin Panel: `http://localhost:8000/admin`

### Individual Docker Builds

**Backend:**
```bash
cd car_dealership_backend
docker build -t car-dealership-backend .
docker run -p 8000:8000 car-dealership-backend
```

**Frontend:**
```bash
cd car_dealership_frontend
docker build -t car-dealership-frontend .
docker run -p 3000:3000 car-dealership-frontend
```

## Features

### User Authentication
- User registration and login
- Session-based authentication
- Logout functionality
- Protected review submission (login required)

### Dealer Management
- Browse all car dealers
- Filter by state
- View dealer details and ratings
- See dealer information (address, city, state)

### Review System
- Submit detailed reviews with ratings
- Track car purchase information
- Automatic sentiment analysis
- View all reviews for a dealer
- See review sentiment indicators

### Sentiment Analysis
- Rule-based sentiment analysis
- Automatic analysis of review comments
- Positive, negative, and neutral classifications
- Visual sentiment indicators on reviews

## Development

### Running Tests

Backend:
```bash
cd car_dealership_backend
python manage.py test
```

Frontend:
```bash
cd car_dealership_frontend
npm test
```

### Database Reset

```bash
cd car_dealership_backend
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

## Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## API Response Examples

### Get All Dealers
```json
[
  {
    "id": 1,
    "name": "Downtown Auto Sales",
    "city": "New York",
    "state": "NY",
    "address": "123 Main St, New York, NY 10001",
    "reviews_count": 5,
    "average_rating": 4.6,
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Get Reviews for Dealer
```json
[
  {
    "id": 1,
    "dealer": 1,
    "dealer_name": "Downtown Auto Sales",
    "user": 2,
    "user_name": "johndoe",
    "rating": 5,
    "comment": "Great service!",
    "purchase": true,
    "purchase_date": "2023-12-01",
    "car_make": "Toyota",
    "car_model": "Camry",
    "year": 2023,
    "sentiment": "positive",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Linux/Mac
lsof -i :8000
kill -9 <PID>

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Database locked:**
```bash
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

### Frontend Issues

**Dependencies conflicts:**
```bash
rm package-lock.json node_modules
npm install
```

**Port 3000 already in use:**
```bash
PORT=3001 npm start
```

## Production Checklist

- [ ] Set DEBUG=False in .env
- [ ] Change SECRET_KEY to a secure random value
- [ ] Update ALLOWED_HOSTS with production domain
- [ ] Update CORS_ALLOWED_ORIGINS with production frontend URL
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set up proper logging
- [ ] Configure email backend
- [ ] Run `npm run build` for frontend
- [ ] Set up HTTPS/SSL
- [ ] Configure static file serving
- [ ] Set up database backups
- [ ] Configure environment variables securely

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please create an issue on the project repository.
