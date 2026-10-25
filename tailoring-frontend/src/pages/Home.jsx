import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../services/tailoringOrderService';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    pending: 0,
    loading: true,
  });

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        const orders = res.data || [];
        const delivered = orders.filter((o) => o.delivered).length;
        setStats({
          total: orders.length,
          delivered,
          pending: orders.length - delivered,
          loading: false,
        });
      })
      .catch(() => setStats((s) => ({ ...s, loading: false })));
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="hero-badge">✂️ Professional Tailoring Suite</div>
          <h1 className="hero-title">
            Tailoring Order <span>Management</span>
          </h1>
          <p className="hero-subtitle">
            Track every stitch — from measurement to delivery. A complete order
            management dashboard for your tailoring business.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              id="hero-btn-add"
              className="btn-accent-custom"
              onClick={() => navigate('/add')}
              style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
            >
              ➕ New Order
            </button>
            <button
              id="hero-btn-view"
              className="btn-primary-custom"
              onClick={() => navigate('/orders')}
              style={{
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              📋 View All Orders
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className="container page-wrapper" style={{ paddingTop: '2.5rem' }}>
        <div className="row g-3 mb-5">
          <div className="col-6 col-md-3">
            <div className="stat-card gold">
              <div className="stat-icon gold">📋</div>
              <div>
                <div className="stat-value">
                  {stats.loading ? '—' : stats.total}
                </div>
                <div className="stat-label">Total Orders</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card green">
              <div className="stat-icon green">✅</div>
              <div>
                <div className="stat-value">
                  {stats.loading ? '—' : stats.delivered}
                </div>
                <div className="stat-label">Delivered</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card orange">
              <div className="stat-icon orange">⏳</div>
              <div>
                <div className="stat-value">
                  {stats.loading ? '—' : stats.pending}
                </div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card navy">
              <div className="stat-icon navy">🧵</div>
              <div>
                <div className="stat-value">LIVE</div>
                <div className="stat-label">API Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Action Cards ──────────────────────────── */}
        <h2
          className="mb-4"
          style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-dark)' }}
        >
          Quick Actions
        </h2>
        <div className="row g-4">
          {[
            {
              icon: '➕',
              title: 'Add New Order',
              desc: 'Record a new tailoring order with customer details, garment type, and pricing.',
              action: () => navigate('/add'),
              label: 'Add Order',
              id: 'quick-add',
              color: 'var(--accent)',
            },
            {
              icon: '📋',
              title: 'View All Orders',
              desc: 'Browse your complete order list with edit and delete options for each record.',
              action: () => navigate('/orders'),
              label: 'View Orders',
              id: 'quick-view',
              color: 'var(--primary-light)',
            },
            {
              icon: '🔍',
              title: 'Search by ID',
              desc: 'Quickly locate a specific order by entering its unique order ID.',
              action: () => navigate('/search'),
              label: 'Search Order',
              id: 'quick-search',
              color: '#17a2b8',
            },
          ].map((card) => (
            <div className="col-md-4" key={card.id}>
              <div className="card-custom h-100">
                <div className="p-4 h-100 d-flex flex-column">
                  <div
                    style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      background: `${card.color}18`,
                    }}
                  >
                    {card.icon}
                  </div>
                  <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                    {card.title}
                  </h5>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      flex: 1,
                    }}
                  >
                    {card.desc}
                  </p>
                  <button
                    id={card.id}
                    onClick={card.action}
                    style={{
                      marginTop: '1rem',
                      background: card.color,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.2rem',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {card.label} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Info Banner ─────────────────────────────────── */}
        <div className="mt-5 p-4 card-custom">
          <div className="row align-items-center">
            <div className="col-auto" style={{ fontSize: '2.5rem' }}>
              🌐
            </div>
            <div className="col">
              <h6 style={{ fontWeight: 700, marginBottom: '0.2rem' }}>
                Connected to Spring Boot Backend
              </h6>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                API Base:{' '}
                <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>
                  http://localhost:8081
                </code>
                &nbsp;·&nbsp; All data is fetched live from the PostgreSQL database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
