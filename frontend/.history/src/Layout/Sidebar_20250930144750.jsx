import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, logoutUser } from "../Features/Authority";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const sidebarBg = '#121212';
  const primaryColor = '#00bcd4';
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navItems = [ 
    { name: 'Home', icon: 'bi-house-door-fill', active: true,redirect:'/' },
  ];

  const handleLogout = async () => {
  await dispatch(logoutUser());
  navigate('/login'); 
};

  return (
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
      <button
        className="btn btn-sm mb-4 align-self-end text-white"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        style={{ width: "40px", height: "40px" }}
      >
        <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"} fs-5`}></i>
      </button>

      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item, index) => (
          <li className="nav-item mb-2" key={index}>
            <a 
              href="#" 
              className={`nav-link d-flex align-items-center ${item.active ? 'active' : 'text-secondary'}`}
              onClick={
                navigate(item.redirect) 
              }
              style={{
                backgroundColor: item.active ? primaryColor : 'transparent',
                color: item.active ? sidebarBg : '#e0e0e0',
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

      <ul className="nav nav-pills flex-column mt-auto">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-secondary d-flex align-items-center">
            <i className="bi bi-gear-fill fs-5"></i>
            {!collapsed && <span className="ms-3">Settings</span>}
          </a>
        </li>
        <li className="nav-item"> 
          <a href="#" className="nav-link text-danger d-flex align-items-center" onClick={() => dispatch(logoutUser)}>
            <i className="bi bi-box-arrow-right fs-5"></i>
            {!collapsed && <span className="ms-3">Logout</span>}  
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;