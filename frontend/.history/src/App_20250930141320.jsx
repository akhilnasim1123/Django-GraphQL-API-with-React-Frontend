import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './Containers/LoginPage';
import HomePage from './Containers/Home';
// import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { verifyToken } from './Features/Authority';

function App() {
  const { isAuthenticated } = useSelector((state) => state.authority);
  const dispatch = useDispatch();
  console.log(isAuthenticated)

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      dispatch(verifyToken({ variables: { token } }))
    }
  }, []);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
              <HomePage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
 