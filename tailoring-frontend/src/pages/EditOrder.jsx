import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { getOrderById, updateOrder } from '../services/tailoringOrderService';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({});
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(null);
  const [countdown, setCountdown] = useState(2);
  const timerRef = useRef(null);

  // Load existing order data
  useEffect(() => {
    setFetchLoading(true);
    setFetchError('');
    getOrderById(id)
      .then((res) => {
        setInitialValues(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setFetchError(`Order #${id} not found. It may have been deleted.`);
        } else if (err.request && !err.response) {
          setFetchError(
            'Cannot connect to the backend server. Please ensure Spring Boot is running on port 8081.'
          );
        } else {
          setFetchError('Failed to load order data. Please try again.');
        }
      })
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitLoading(true);
    setSubmitError('');
    setSuccess(null);

    try {
      const res = await updateOrder(id, data);
      setSuccess(res.data);
      // Refresh initialValues with updated data
      setInitialValues(res.data);

      // Auto-navigate to View Orders after 2 seconds
      setCountdown(2);
      let count = 2;
      timerRef.current = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(timerRef.current);
          navigate('/orders');
        }
      }, 1000);
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 404) {
          setSubmitError(`Order #${id} was not found. It may have been deleted.`);
        } else if (status === 400) {
          const detail = err.response.data;
          const messages =
            typeof detail === 'object'
              ? Object.values(detail).join(', ')
              : 'Invalid data submitted.';
          setSubmitError(`Validation error: ${messages}`);
        } else if (status === 500) {
          setSubmitError('Server error. Please try again later.');
        } else {
          setSubmitError(`Unexpected error (HTTP ${status}).`);
        }
      } else if (err.request && !err.response) {
        setSubmitError(
          'Cannot connect to the backend server. Please ensure Spring Boot is running on port 8081.'
        );
      } else {
        setSubmitError('An unexpected error occurred.');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h2>✏️ Edit Order</h2>
          <p>
            Updating Order&nbsp;
            <span className="id-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }}>
              #{id}
            </span>
          </p>
        </div>
      </div>

      <div className="container">
        <div className="form-section">
          {/* Loading fetch */}
          {fetchLoading && <LoadingSpinner message="Loading order details…" />}

          {/* Fetch error */}
          {fetchError && (
            <div className="alert-custom alert-danger-custom" role="alert">
              <span>⚠️</span>
              <div>
                {fetchError}
                <br />
                <button
                  id="btn-edit-back"
                  onClick={() => navigate('/orders')}
                  style={{
                    marginTop: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-light)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    padding: 0,
                    textDecoration: 'underline',
                  }}
                >
                  ← Back to All Orders
                </button>
              </div>
            </div>
          )}

          {/* Success banner */}
          {success && (
            <div className="alert-custom alert-success-custom" role="alert">
              <span>✅</span>
              <div style={{ flex: 1 }}>
                <strong>Order #{id} updated successfully!</strong>
                <br />
                <small>
                  Customer: <strong>{success.customerName}</strong> &nbsp;|&nbsp;
                  Garment: <strong>{success.garmentType}</strong> &nbsp;|&nbsp;
                  Price: <strong>₹{Number(success.price).toFixed(2)}</strong> &nbsp;|&nbsp;
                  Status:{' '}
                  <strong>{success.delivered ? '✅ Delivered' : '⏳ Not Delivered'}</strong>
                </small>
                <br />
                <small style={{ color: 'var(--success)', fontStyle: 'italic' }}>
                  Redirecting to View Orders in {countdown} second{countdown !== 1 ? 's' : ''}…
                </small>
              </div>
              <button
                onClick={() => { clearInterval(timerRef.current); navigate('/orders'); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#155724', fontWeight: 700, fontSize: '0.88rem',
                  padding: '0 0.5rem', textDecoration: 'underline', flexShrink: 0,
                }}
              >
                Go now →
              </button>
            </div>
          )}

          {/* Form */}
          {!fetchLoading && !fetchError && (
            <div className="card-custom">
              <div className="card-header-custom d-flex justify-content-between align-items-center">
                <h5>✂️ Update Order Details</h5>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>
                  ID is read-only and cannot be changed
                </span>
              </div>
              <div className="p-4">
                {/* Read-only ID display */}
                <div className="mb-3">
                  <label className="form-label-custom">🔢 Order ID (Read Only)</label>
                  <input
                    type="text"
                    value={`#${id}`}
                    readOnly
                    className="form-control form-control-custom"
                    style={{ background: '#f5f6fa', color: 'var(--text-muted)', cursor: 'not-allowed' }}
                    id="edit-id-readonly"
                  />
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    The Order ID is assigned by the system and cannot be modified.
                  </small>
                </div>

                <hr style={{ borderColor: 'var(--border-color)', margin: '1.2rem 0' }} />

                <OrderForm
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  loading={submitLoading}
                  submitLabel="💾 Save Changes"
                  serverError={submitError}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          {!fetchLoading && !fetchError && (
            <div className="mt-3 text-end">
              <button
                id="btn-cancel-edit"
                onClick={() => navigate('/orders')}
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.55rem 1.4rem',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
              >
                ← Cancel & Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditOrder;
