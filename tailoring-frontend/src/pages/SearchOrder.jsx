import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrderById } from '../services/tailoringOrderService';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [inputId, setInputId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // Auto-search if coming from ViewOrders with ?id=N
  useEffect(() => {
    const urlId = searchParams.get('id');
    if (urlId) {
      setInputId(urlId);
      doSearch(urlId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doSearch = async (id) => {
    const trimmed = String(id).trim();
    if (!trimmed || isNaN(Number(trimmed)) || Number(trimmed) <= 0) {
      setError('Please enter a valid positive numeric Order ID.');
      return;
    }
    setLoading(true);
    setError('');
    setOrder(null);
    setSearched(true);

    try {
      const res = await getOrderById(trimmed);
      setOrder(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(`No order found with ID #${trimmed}. It may have been deleted.`);
      } else if (err.request && !err.response) {
        setError(
          'Cannot connect to the backend server. Please ensure Spring Boot is running on port 8081.'
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    doSearch(inputId);
  };

  const handleClear = () => {
    setInputId('');
    setOrder(null);
    setError('');
    setSearched(false);
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h2>🔍 Search Order by ID</h2>
          <p>Enter an Order ID to retrieve its complete details</p>
        </div>
      </div>

      <div className="container">
        <div className="form-section">
          {/* Search Card */}
          <div className="card-custom mb-4">
            <div className="card-header-custom">
              <h5>Enter Order ID</h5>
            </div>
            <div className="p-4">
              <form onSubmit={handleSearch} id="search-form">
                <div className="d-flex gap-2 align-items-start flex-wrap">
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <label htmlFor="searchId" className="form-label-custom">
                      🔢 Order ID
                    </label>
                    <input
                      type="number"
                      id="searchId"
                      value={inputId}
                      onChange={(e) => {
                        setInputId(e.target.value);
                        setError('');
                      }}
                      className="form-control form-control-custom"
                      placeholder="e.g. 1"
                      min="1"
                      disabled={loading}
                    />
                  </div>
                  <div className="d-flex gap-2 align-items-end" style={{ paddingBottom: '2px' }}>
                    <button
                      id="btn-search"
                      type="submit"
                      className="btn-primary-custom"
                      disabled={loading || !inputId}
                      style={{ marginTop: '1.65rem' }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Searching…
                        </>
                      ) : (
                        '🔍 Search'
                      )}
                    </button>
                    {searched && (
                      <button
                        id="btn-clear-search"
                        type="button"
                        onClick={handleClear}
                        style={{
                          marginTop: '1.65rem',
                          background: 'transparent',
                          border: '1.5px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '0.65rem 1.2rem',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          color: 'var(--text-muted)',
                        }}
                      >
                        ✕ Clear
                      </button>
                    )}
                  </div>
                </div>
                {error && (
                  <div className="alert-custom alert-danger-custom mt-3" role="alert">
                    <span>⚠️</span> {error}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Loading */}
          {loading && <LoadingSpinner message="Fetching order details…" />}

          {/* Result */}
          {!loading && order && (
            <div className="card-custom" id="search-result-card">
              <div className="card-header-custom d-flex justify-content-between align-items-center">
                <h5>Order Details</h5>
                <span className="id-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', fontSize: '0.9rem' }}>
                  #{order.id}
                </span>
              </div>
              <div className="p-4">
                <div className="order-detail-grid">
                  <div className="order-detail-item">
                    <div className="order-detail-label">🔢 Order ID</div>
                    <div className="order-detail-value">#{order.id}</div>
                  </div>
                  <div className="order-detail-item">
                    <div className="order-detail-label">👤 Customer Name</div>
                    <div className="order-detail-value">{order.customerName}</div>
                  </div>
                  <div className="order-detail-item">
                    <div className="order-detail-label">👔 Garment Type</div>
                    <div className="order-detail-value">{order.garmentType}</div>
                  </div>
                  <div className="order-detail-item">
                    <div className="order-detail-label">💰 Price</div>
                    <div className="order-detail-value">₹{Number(order.price).toFixed(2)}</div>
                  </div>
                  <div className="order-detail-item" style={{ gridColumn: '1 / -1' }}>
                    <div className="order-detail-label">📦 Delivery Status</div>
                    <div className="order-detail-value mt-1">
                      {order.delivered ? (
                        <span className="badge-delivered">✅ Delivered</span>
                      ) : (
                        <span className="badge-pending">⏳ Not Delivered</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex gap-3 mt-4 flex-wrap">
                  <button
                    id="btn-search-edit"
                    className="btn-accent-custom"
                    onClick={() => navigate(`/edit/${order.id}`)}
                  >
                    ✏️ Edit This Order
                  </button>
                  <button
                    id="btn-search-back"
                    onClick={() => navigate('/orders')}
                    style={{
                      background: 'transparent',
                      border: '1.5px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '0.65rem 1.5rem',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                    }}
                  >
                    ← Back to All Orders
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Not found / prompt */}
          {!loading && !order && searched && !error && (
            <div className="empty-state card-custom p-4">
              <div className="empty-icon">🔎</div>
              <h5>Order Not Found</h5>
              <p>No order matched the ID you entered. Try a different one.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchOrder;
