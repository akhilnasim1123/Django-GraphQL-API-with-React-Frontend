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
   div.d-flex
  );
}

export default LoginPage;
