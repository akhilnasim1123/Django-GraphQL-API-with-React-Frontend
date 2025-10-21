import React from 'react';
import Sidebar from './Sidebar';



function HomePage() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#121212' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, color: '#eee', padding: '2rem' }}>
        <h1 className="mb-4 fw-bold" style={{ color: '#0d6efd' }}>
          Welcome to Your Dashboard
        </h1>
        <p className="lead text-muted mb-5">
          Here’s a quick overview of your account and activities. 
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card bg-secondary text-white shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Active Users</h5>
                <p className="display-6 fw-bold">1,234</p>
                <p className="card-text text-muted">Number of users currently active on your platform.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-secondary text-white shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">New Signups</h5>
                <p className="display-6 fw-bold">56</p>
                <p className="card-text text-muted">Users registered in the last 24 hours.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-secondary text-white shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Server Uptime</h5>
                <p className="display-6 fw-bold">99.99%</p>
                <p className="card-text text-muted">Your server’s operational time in the last month.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-5">
          <h2 className="mb-3" style={{ color: '#0d6efd' }}>Recent Activity</h2>
          <ul className="list-group list-group-flush text-white">
            <li className="list-group-item bg-dark border-secondary">User JohnDoe signed up</li>
            <li className="list-group-item bg-dark border-secondary">New comment posted on Blog #5</li>
            <li className="list-group-item bg-dark border-secondary">Backup completed successfully</li>
            <li className="list-group-item bg-dark border-secondary">Payment received from user JaneSmith</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
