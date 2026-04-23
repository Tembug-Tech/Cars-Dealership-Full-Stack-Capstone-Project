#!/bin/bash
# Setup script for Cars Dealership application

echo "========================================="
echo "Cars Dealership - Complete Setup"
echo "========================================="
echo ""

# Check if running on Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    echo "Windows detected. Please run setup.bat instead."
    exit 1
fi

# Backend setup
echo "Setting up Backend..."
echo "---"

cd car_dealership_backend

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Seed data
echo "Seeding initial data..."
python manage.py seed_data

echo ""
echo "Backend setup complete!"
echo ""

# Frontend setup
echo "Setting up Frontend..."
echo "---"

cd ../car_dealership_frontend

# Install Node dependencies
echo "Installing Node dependencies..."
npm install

echo ""
echo "Frontend setup complete!"
echo ""

echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "To run the application:"
echo ""
echo "1. Backend (in car_dealership_backend):"
echo "   source venv/bin/activate"
echo "   python manage.py runserver"
echo ""
echo "2. Frontend (in car_dealership_frontend, new terminal):"
echo "   npm start"
echo ""
echo "Then visit:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend API: http://localhost:8000"
echo ""
