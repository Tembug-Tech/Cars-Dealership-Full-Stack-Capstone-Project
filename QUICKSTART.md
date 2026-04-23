# Quick Start Guide

## Option 1: Run with Docker Compose (Easiest)

### Prerequisites
- Docker Desktop installed
- Port 3000 and 8000 available

### Steps
```bash
# Navigate to project root
cd "captone project"

# Build and start all services
docker-compose up --build

# First time only: Open another terminal and run migrations
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py seed_data
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin (username: admin, password: admin)

---

## Option 2: Run Locally (Requires Python & Node.js)

### Backend Setup

```bash
# Navigate to backend directory
cd car_dealership_backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Run migrations
python manage.py migrate

# Load sample data
python manage.py seed_data

# Start development server
python manage.py runserver
```

Backend runs at: http://localhost:8000

### Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd car_dealership_frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at: http://localhost:3000

---

## Sample User Credentials

After seeding data, login with:
- **Username**: testuser
- **Password**: testpass123

---

## Test the Application

1. **View Dealers**: Navigate to home page to see all dealers
2. **Filter by State**: Use the dropdown to filter dealers
3. **View Details**: Click "View Details" on any dealer card
4. **Register New User**: Create a new account
5. **Login**: Sign in with your credentials
6. **Write Review**: Click "Write a Review" on dealer page (requires login)
7. **See Sentiment**: Reviews show sentiment analysis

---

## Common Commands

### Backend
```bash
# Create admin user
python manage.py createsuperuser

# Access admin panel
# Visit http://localhost:8000/admin

# Reset database
rm db.sqlite3
python manage.py migrate
python manage.py seed_data

# Run tests
python manage.py test
```

### Frontend
```bash
# Build for production
npm run build

# Run tests
npm test

# Clear cache
npm cache clean --force
npm install
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
# Kill the process and try again

# Reset database
rm db.sqlite3
python manage.py migrate
```

### Frontend won't start
```bash
# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

### Docker issues
```bash
# Stop all containers
docker-compose down

# Remove all containers/volumes
docker-compose down -v

# Rebuild from scratch
docker-compose up --build --force-recreate
```

---

## API Testing with curl

### Register User
```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"testuser","password":"testpass123"}'
```

### Get All Dealers
```bash
curl http://localhost:8000/api/dealers/
```

### Get Dealer by State
```bash
curl http://localhost:8000/api/dealers/?state=CA
```

### Get Reviews for Dealer
```bash
curl http://localhost:8000/api/reviews/?dealer_id=1
```

### Sentiment Analysis
```bash
curl -X POST http://localhost:8000/api/sentiment/ \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a great car dealership!"}'
```

---

## Next Steps

1. Customize styling (CSS in each component)
2. Add more sentiment analysis features
3. Implement email notifications
4. Add photo uploads
5. Implement two-factor authentication
6. Add admin dashboard
7. Implement pagination
8. Add search functionality
