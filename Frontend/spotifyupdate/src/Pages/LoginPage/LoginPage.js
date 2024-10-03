import React, { useState } from 'react';
import './loginpage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmitClick = () => {
    navigate('/SpotifyApp');  // Navigates to the /login route
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError('Email and Password are required');
    } else {
      setError('');
      console.log('Login successful');
      // Here you can add the login logic, e.g., API calls
    }
  };

  return (
    <div color='#333'>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 >Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" onClick={handleSubmitClick}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
