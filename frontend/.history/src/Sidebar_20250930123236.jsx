import React, { useState } from 'react';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className={`bg-dark text-white vh-100 p-3 d-flex flex-column ${
          collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
        style={{ width: collapsed ? '60px' : '220px', transition: 'width 0.3s' }}
      >
        <button
          className="btn btn-outline-light mb-3"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white" aria-current="page">
              <i className="bi bi-house-door-fill me-2"></i>
              {!collapsed && 'Home'}
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i>
              {!collapsed && 'Dashboard'}
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-gear-fill me-2"></i>
              {!collapsed && 'Settings'}
            </a>
          </li>
          <li className="nav-item mt-auto">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-box-arrow-right me-2"></i>
              {!collapsed && 'Logout'}
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content placeholder */}
      <main className="p-4" style={{ flexGrow: 1 }}>
        <h1>Content Area</h1>
        <p>This is where your page content goes.</p>
      </main>
    </div>
  );
}

export default Sidebar;
