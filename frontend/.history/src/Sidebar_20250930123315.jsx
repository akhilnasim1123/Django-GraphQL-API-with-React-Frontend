import React, { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className={`bg-dark text-white vh-100 d-flex flex-column p-3 ${
          collapsed ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
        style={{
          width: collapsed ? "70px" : "220px",
          transition: "width 0.3s",
          minHeight: "100vh",
        }}
      >
        <button
          className="btn btn-outline-light mb-4 align-self-end"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          style={{ width: "35px", height: "35px" }}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-3">
            <a href="#" className="nav-link text-white d-flex align-items-center">
              <i className="bi bi-house-door-fill fs-5"></i>
              {!collapsed && <span className="ms-3">Home</span>}
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#" className="nav-link text-white d-flex align-items-center">
              <i className="bi bi-speedometer2 fs-5"></i>
              {!collapsed && <span className="ms-3">Dashboard</span>}
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#" className="nav-link text-white d-flex align-items-center">
              <i className="bi bi-gear-fill fs-5"></i>
              {!collapsed && <span className="ms-3">Settings</span>}
            </a>
          </li>
        </ul>

        <hr className="border-secondary" />

        <ul className="nav nav-pills flex-column mt-auto">
          <li className="nav-item">
            <a href="#" className="nav-link text-white d-flex align-items-center">
              <i className="bi bi-box-arrow-right fs-5"></i>
              {!collapsed && <span className="ms-3">Logout</span>}
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="p-4 flex-grow-1 bg-dark text-white">
        <h1>Dashboard</h1>
        <p>Welcome to your dark-themed app!</p>
      </main>
    </div>
  );
}

export default Sidebar;
