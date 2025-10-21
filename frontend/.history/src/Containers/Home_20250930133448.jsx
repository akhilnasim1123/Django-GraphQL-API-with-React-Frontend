import React from 'react';
import Sidebar from '../Sidebar';

function HomePage() {
  const primaryColor = '#00bcd4'; 
  const mainBg = '#0b0b0b'; 
  const cardBg = '#1c1c1c';
  const textColor = '#e0e0e0';
  

  const dashboardMetrics = [
    { 
      title: 'Active Users', 
      value: '1,234', 
      text: 'Number of users currently active on your platform.', 
      icon: 'bi-people-fill' 
    },
    { 
      title: 'New Signups', 
      value: '56', 
      text: 'Users registered in the last 24 hours.', 
      icon: 'bi-person-plus-fill' 
    },
    { 
      title: 'Server Uptime', 
      value: '99.99%', 
      text: 'Your server’s operational time in the last month.', 
      icon: 'bi-graph-up' 
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: mainBg }}>
      <Sidebar />
      
      <main style={{ flexGrow: 1, color: textColor, padding: '2rem' }}>
        
        <h1 className="mb-2 fw-bolder" style={{ color: primaryColor }}>
          Dashboard Overview 🚀
        </h1>
        <p className="lead text-secondary border-bottom pb-3 mb-5">
          A quick glance at your key performance indicators.
        </p>

        <div className="row g-4">
          {dashboardMetrics.map((metric, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div 
                className="card shadow-lg h-100 border-0" 
                style={{ backgroundColor: cardBg, borderLeft: `5px solid ${primaryColor}` }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title text-uppercase mb-0 text-secondary" style={{letterSpacing: '1px'}}>{metric.title}</h5>
                   
                    <i className={`bi ${metric.icon} fs-3`} style={{ color: primaryColor }}></i>
                  </div>
                  <p className="display-4 fw-bold mt-2 mb-3 text-white">{metric.value}</p>
                  <p className="card-text text-muted mt-auto">{metric.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div> 
        
        <section className="mt-5 pt-3">
          <h2 className="mb-4 fw-bold" style={{ color: primaryColor }}>Recent Activity</h2>
          
          <div className="card shadow-lg border-0" style={{ backgroundColor: cardBg }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent border-dark d-flex justify-content-between align-items-center text-white">
                User <span className="fw-semibold" style={{ color: primaryColor }}>JohnDoe</span> signed up
                <span className="badge bg-success rounded-pill">New User</span>
              </li>
              <li className="list-group-item bg-transparent border-dark d-flex justify-content-between align-items-center text-white">
                New comment posted on <span className="fw-semibold">Blog #5</span>
                <span className="badge bg-info text-dark rounded-pill">Engagement</span>
              </li>
              <li className="list-group-item bg-transparent border-dark d-flex justify-content-between align-items-center text-white">
                Backup completed successfully
                <span className="badge bg-primary rounded-pill">System</span>
              </li>
              <li className="list-group-item bg-transparent border-dark d-flex justify-content-between align-items-center text-white">
                Payment received from user <span className="fw-semibold" style={{ color: primaryColor }}>JaneSmith</span>
                <span className="badge bg-warning text-dark rounded-pill">Finance</span>
              </li>
            </ul>
          </div>
        </section>
        
      </main>
    </div>
  );
}

export default HomePage;