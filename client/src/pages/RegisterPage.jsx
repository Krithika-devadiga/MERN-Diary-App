import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterLogin.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/register', {
        username: email,
        password,
      });

      alert('Registered successfully! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Try a different email.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Register</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button onClick={handleRegister} className="auth-button">
          Register
        </button>

        <div className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
