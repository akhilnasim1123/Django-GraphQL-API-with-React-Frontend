import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { gqluseMutation } from '@apollo/client';


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
`;

function LoginPage() {
  const [username, setUsername] = useState('');   // use username, not email (match backend)
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [login] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await login({
        variables: { username, password }
      });

      if (data?.tokenAuth?.token) {
        localStorage.setItem('token', data.tokenAuth.token);
        localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);
        setSuccess('Login successful! Redirecting...');
        // TODO: redirect to dashboard or homepage after a short delay
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      // GraphQL errors are in err.graphQLErrors
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        setError(err.graphQLErrors[0].message);
      } else {
        setError('Login failed. Please try again.');
      }
    }

    setIsSubmitting(false);
  };

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

  return (
    <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-dark text-light border-primary p-5 shadow-lg" style={{ width: '100%', maxWidth: '420px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Welcome Back</h3>
        <p className="text-center mb-4 text-muted">Sign in to your dashboard.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Username</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary shadow-none"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 small text-center" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2 small text-center" role="alert">
              {success}
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
