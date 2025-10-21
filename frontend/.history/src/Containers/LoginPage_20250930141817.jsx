import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '../Mutation';
import { useNavigate } from 'react-router-dom'; 
import { c } from '@apollo/client/react/internal/compiler-runtime';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Features/Authority';

 


function LoginPage() {
  const [username, setUsername] = useState('');   
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();  
  const { isAuthenticated } = useSelector((state) => state.authority);

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    
      e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    console.log(result)
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
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

  useEffect(()=>{
    isAuthenticated?navigate('/')
  })

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



          <button
            type="submit"
            className="btn btn-primary w-100 mt-3 fw-bold"
            disabled={isSubmitting}
          >
            {getButtonContent()}
          </button>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
