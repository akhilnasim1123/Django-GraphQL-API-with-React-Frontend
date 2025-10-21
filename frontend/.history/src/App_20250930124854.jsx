import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './Home';  // your dashboard or home page component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
