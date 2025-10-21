import React, { useState } from 'react';
import './LoginPage.css'; // Optional CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Example login logic (replace with real API)
    if (email === 'user@example.com' && password === 'password') {
      alert('Login successful!');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
   <div className="d-flex w-100 justify-content-center bg-dark">
     <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
   </div>
  );
}

export default LoginPage;
