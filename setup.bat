@echo off
REM Setup script for Cars Dealership application on Windows

echo =========================================
echo Cars Dealership - Complete Setup (Windows)
echo =========================================
echo.

REM Backend setup
echo Setting up Backend...
echo ---

cd car_dealership_backend

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

REM Run migrations
echo Running database migrations...
python manage.py migrate

REM Seed data
echo Seeding initial data...
python manage.py seed_data

echo.
echo Backend setup complete!
echo.

REM Frontend setup
echo Setting up Frontend...
echo ---

cd ..\car_dealership_frontend

REM Install Node dependencies
echo Installing Node dependencies...
call npm install

echo.
echo Frontend setup complete!
echo.

echo =========================================
echo Setup Complete!
echo =========================================
echo.
echo To run the application:
echo.
echo 1. Backend (in car_dealership_backend):
echo    venv\Scripts\activate.bat
echo    python manage.py runserver
echo.
echo 2. Frontend (in car_dealership_frontend, new terminal):
echo    npm start
echo.
echo Then visit:
echo   - Frontend: http://localhost:3000
echo   - Backend API: http://localhost:8000
echo.
pause
