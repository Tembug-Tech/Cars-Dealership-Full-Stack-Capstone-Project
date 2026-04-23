import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default LoginPage;
