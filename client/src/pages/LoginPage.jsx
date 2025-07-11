import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css'; // CSS for styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/login', {
        username: email,
        password
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate('/diary'); // Redirect to diary page
    } catch (err) {
      alert('Login failed. Check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Login</h1>
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
        <button onClick={handleLogin} className="auth-button">Login</button>

        <div className="auth-link">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
