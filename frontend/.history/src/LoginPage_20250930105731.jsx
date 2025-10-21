import React, { useState } from 'react';
import './LoginPage.css'; // Optional CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading

  const handleLogin = async (e) => { // Made the function async for potential API calls
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsSubmitting(true);

    // 1. Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      setIsSubmitting(false);
      return;
    }

    // 2. Example login logic (Simulate an API call with a delay)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      if (email === 'user@example.com' && password === 'password') {
        alert('Login successful! Redirecting...');
        // In a real app, you would redirect the user here (e.g., using React Router)
      } else {
        setError('The email or password you entered is incorrect. Please try again.');
      }
    } catch (apiError) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Login API error:', apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to continue to your account.</p>

        <form className="login-form" onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label htmlFor="email-input">Email</label>
            <input
              id="email-input"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>

          {error && <p className="error-message" role="alert">{error}</p>}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging In...' : 'Login'}
          </button>
          
          <div className="extra-links">
            <a href="/forgot-password">Forgot Password?</a>
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;