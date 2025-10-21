import React, { useState } from 'react';
const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
      user {
        id
        username
        email
      }
    }
  }
`
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for loading

  const handleLogin = async (e) => { // Made async to simulate network delay
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // 1. Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      setIsSubmitting(false);
      return;
    }

    // 2. Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s delay

    // 3. Example login logic
    if (email === 'user@example.com' && password === 'password') {
      // Use success message instead of alert for better UX
      setError('Login successful! Redirecting...'); 
      
      // In a real app, you would redirect the user here
    } else {
      setError('Invalid email or password. Please try again.');
    }

    setIsSubmitting(false);
  };

  // Determine button text and styling
  const getButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Logging In...
        </>
      );
    }
    return 'Login';
  };
  
  const isSuccess = error.includes('successful');
  const alertClass = isSuccess ? 'alert-success' : 'alert-danger';

  return (
    <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
      
      <div className="card bg-dark text-light border-primary p-5 shadow-lg" style={{ width: '100%', maxWidth: '420px', borderRadius: '15px' }}>
        
        <h3 className="text-center mb-4 text-primary fw-bold">Welcome Back</h3>
        <p className="text-center mb-4 text-muted">Sign in to your dashboard.</p>

        <form onSubmit={handleLogin} noValidate>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email address</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary shadow-none"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label htmlFor="password" className="form-label text-light">Password</label>
              <a href="#" className="text-decoration-none text-muted small">Forgot Password?</a>
            </div>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary shadow-none"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {error && (
            <div className={`alert ${alertClass} py-2 small text-center`} role="alert">
              {error}
            </div>
          )}
          <button 
            type="submit" 
            className="btn btn-primary w-100 mt-3 fw-bold" 
            disabled={isSubmitting}
          >
            {getButtonContent()}
          </button>
          
          <p className="text-center text-muted mt-3 mb-0 small">
            Don't have an account? <a href="#" className="text-primary text-decoration-none fw-bold">Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;