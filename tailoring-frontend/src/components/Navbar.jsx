import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand-custom me-4">
          <div className="brand-icon">✂️</div>
          <div>
            <div className="brand-text">TailorPro</div>
            <div className="brand-sub">Order Management</div>
          </div>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          <span style={{ fontSize: '1.4rem' }}>☰</span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link-custom${isActive ? ' active' : ''}`
                }
                id="nav-home"
              >
                🏠 Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `nav-link-custom${isActive ? ' active' : ''}`
                }
                id="nav-add-order"
              >
                ➕ Add Order
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `nav-link-custom${isActive ? ' active' : ''}`
                }
                id="nav-view-orders"
              >
                📋 View Orders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `nav-link-custom${isActive ? ' active' : ''}`
                }
                id="nav-search"
              >
                🔍 Search Order
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
