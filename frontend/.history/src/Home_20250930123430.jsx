import React from 'react';
import Sidebar from './Sidebar';

function HomePage() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, backgroundColor: '#121212', color: 'white', padding: '2rem' }}>
        <h1>Welcome to Your Dashboard</h1>
        <p>This is a dummy home page. Replace this content with your real dashboard or landing page.</p>

        {/* More content here */}
      </main>
    </div>
  );
}

export default HomePage;
