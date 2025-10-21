import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LoginPage from './LoginPage';
import HomePage from './Home';  // your dashboard or home page component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const { isAuthenticated, loading } = useSelector((state) => state.authority);
  const dispatch = useDispatch();
  useEffect(()=>{

    
  })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
