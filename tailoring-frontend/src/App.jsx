import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddOrder from './pages/AddOrder';
import ViewOrders from './pages/ViewOrders';
import SearchOrder from './pages/SearchOrder';
import EditOrder from './pages/EditOrder';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🧵</div>
    <h3 style={{ fontWeight: 800, color: 'var(--primary)' }}>404 — Page Not Found</h3>
    <p style={{ color: 'var(--text-muted)' }}>
      The page you're looking for doesn't exist.
    </p>
    <a
      href="/"
      style={{
        display: 'inline-block',
        marginTop: '1rem',
        background: 'var(--primary)',
        color: '#fff',
        padding: '0.6rem 1.8rem',
        borderRadius: '8px',
        fontWeight: 600,
        textDecoration: 'none',
      }}
    >
      ← Go Home
    </a>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/add"       element={<AddOrder />} />
            <Route path="/orders"    element={<ViewOrders />} />
            <Route path="/search"    element={<SearchOrder />} />
            <Route path="/edit/:id"  element={<EditOrder />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer-custom">
          <div className="container">
            TailorPro © 2024 · Tailoring Order Management System ·{' '}
            <span>com.klef.soa.docker</span> · Port{' '}
            <span>8081</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
