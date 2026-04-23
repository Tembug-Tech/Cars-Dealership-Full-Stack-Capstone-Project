import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DealerDetailsPage from './pages/DealerDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReviewPage from './pages/ReviewPage';
import { authService } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/dealer/:id" element={<DealerDetailsPage user={user} />} />
        <Route path="/review/:dealerId" element={user ? <ReviewPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
