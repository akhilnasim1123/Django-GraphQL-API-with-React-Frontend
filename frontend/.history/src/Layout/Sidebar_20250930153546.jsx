import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Features/Authority";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); 
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const sidebarBg = '#121212';
  const primaryColor = '#00bcd4';
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const navItems = [
    { name: 'Home', icon: 'bi-house-door-fill', redirect: '/' },
    { name: 'Departments', icon: 'bi-house-door-fill', redirect: '/Department' },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };


  const handleNavClick = (index, redirect) => {
    setActiveIndex(index); 
    navigate(redirect);     
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

      {showLogoutModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content text-white bg-dark">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowLogoutModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setShowLogoutModal(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <Na
              href="#"
              className={`nav-link d-flex align-items-center ${index === activeIndex ? 'active' : 'text-secondary'}`}
              onClick={e => {
                e.preventDefault();
                handleNavClick(index, item.redirect);
              }}
              style={{
                backgroundColor: index === activeIndex ? primaryColor : 'transparent',
                color: index === activeIndex ? sidebarBg : '#e0e0e0',
                fontWeight: index === activeIndex ? 'bold' : 'normal',
                borderRadius: '8px',
              }}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              {!collapsed && <span className="ms-3">{item.name}</span>}
            </Na>
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
          <a
            href="#"
            className="nav-link text-danger d-flex align-items-center"
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutModal(true);
            }}
          >
            <i className="bi bi-box-arrow-right fs-5"></i>
            {!collapsed && <span className="ms-3">Logout</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
