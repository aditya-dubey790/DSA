import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Fixed login credentials
  const validEmail = "user@example.com"
  const validPassword = "password123"

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    if (email === validEmail && password === validPassword) {
      // Successful login with correct credentials
      navigate("/landing")
    } else {
      setError("Invalid credentials. Try user@example.com / password123")
    }
  }

  return (
    <div className="login-container">
      {/* Animated background bubbles */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="remember-forgot">
          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          
          <a href="login" className="forgot-link">
            Forgot password?
          </a>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Sign In
        </button>

        <div className="signup-link">
          Don't have an account? <a href="login">Sign up</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
