import React, { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const sidebarBg = '#121212';
  const primaryColor = '#00bcd4'; // Match color from HomePage

  // Navigation Items
  const navItems = [
    { name: 'Home', icon: 'bi-house-door-fill', active: true,redirect:'/dashboard' },
    { name: 'Analytics', icon: 'bi-speedometer2', active: false,redirect:'/analytics'  },
    { name: 'Users', icon: 'bi-people-fill', active: false,redirect:'/users'  },
    { name: 'Reports', icon: 'bi-file-earmark-bar-graph-fill', active: false,redirect:'/report'  },
  ];

  return (
    // Only the sidebar navigation, no main content placeholder
    <nav
      className={`text-white vh-100 d-flex flex-column p-3 position-sticky top-0 shadow-lg`}
      style={{
        backgroundColor: sidebarBg,
        width: collapsed ? "70px" : "250px",
        transition: "width 0.3s ease-in-out",
        minHeight: "100vh",
        zIndex: 1000,
      }}
    >
      {/* Toggle Button */}
      <button
        className="btn btn-sm mb-4 align-self-end text-white"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        style={{ width: "40px", height: "40px" }}
      >
        <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"} fs-5`}></i>
      </button>

      {/* Main Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item, index) => (
          <li className="nav-item mb-2" key={index}>
            <a 
              href="#" 
              className={`nav-link d-flex align-items-center ${item.active ? 'active' : 'text-secondary'}`}
              style={{
                backgroundColor: item.active ? primaryColor : 'transparent',
                color: item.active ? sidebarBg : '#e0e0e0', // Dark text on active background
                fontWeight: item.active ? 'bold' : 'normal',
                borderRadius: '8px'
              }}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              {!collapsed && <span className="ms-3">{item.name}</span>}
            </a>
          </li>
        ))}
      </ul>

      <hr className="border-secondary opacity-25" />

      {/* Footer Links (Logout/Settings) */}
      <ul className="nav nav-pills flex-column mt-auto">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-secondary d-flex align-items-center">
            <i className="bi bi-gear-fill fs-5"></i>
            {!collapsed && <span className="ms-3">Settings</span>}
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-danger d-flex align-items-center">
            <i className="bi bi-box-arrow-right fs-5"></i>
            {!collapsed && <span className="ms-3">Logout</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;