import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { getAllOrders, deleteOrder } from '../services/tailoringOrderService';

const ViewOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Delete modal state
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  const fetchOrders = useCallback(() => {
    setLoading(true);
    setFetchError('');
    getAllOrders()
      .then((res) => setOrders(res.data || []))
      .catch((err) => {
        if (err.request && !err.response) {
          setFetchError(
            'Cannot connect to the backend server. Please ensure Spring Boot is running on port 8081.'
          );
        } else {
          setFetchError('Failed to load orders. Please try again.');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /* ── Delete handlers ─────────────────────────────────── */
  const handleDeleteClick = (order) => {
    setDeleteTarget(order);
    setDeleteError('');
    setDeleteSuccess('');
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    setDeleteError('');
    try {
      await deleteOrder(deleteTarget.id);
      setDeleteSuccess(`Order #${deleteTarget.id} deleted successfully.`);
      setShowModal(false);
      setDeleteTarget(null);
      fetchOrders();
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setDeleteError(`Order #${deleteTarget.id} was not found.`);
      } else if (err.request && !err.response) {
        setDeleteError('Cannot connect to backend server.');
      } else {
        setDeleteError('Failed to delete the order. Please try again.');
      }
      setShowModal(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setDeleteTarget(null);
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2>📋 View All Orders</h2>
            <p>Manage and monitor all tailoring orders</p>
          </div>
          <button
            id="btn-add-from-list"
            className="btn-accent-custom"
            onClick={() => navigate('/add')}
          >
            ➕ Add Order
          </button>
        </div>
      </div>

      <div className="container mb-5">
        {/* Alerts */}
        {deleteSuccess && (
          <div className="alert-custom alert-success-custom" role="alert">
            <span>✅</span> {deleteSuccess}
          </div>
        )}
        {deleteError && (
          <div className="alert-custom alert-danger-custom" role="alert">
            <span>⚠️</span> {deleteError}
          </div>
        )}
        {fetchError && (
          <div className="alert-custom alert-danger-custom" role="alert">
            <span>⚠️</span> {fetchError}
          </div>
        )}

        {/* Table Card */}
        <div className="card-custom">
          <div className="card-header-custom d-flex justify-content-between align-items-center">
            <h5>All Tailoring Orders</h5>
            <span
              style={{
                background: 'rgba(201,168,76,0.2)',
                color: 'var(--accent-light)',
                padding: '3px 12px',
                borderRadius: '50px',
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              {loading ? '...' : `${orders.length} record${orders.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching orders from server…" />
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h5>No Orders Found</h5>
              <p>There are no tailoring orders in the system yet.</p>
              <button
                id="btn-add-empty"
                className="btn-primary-custom"
                onClick={() => navigate('/add')}
              >
                ➕ Add First Order
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table-custom" id="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Garment Type</th>
                    <th>Price (₹)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className="id-badge">#{order.id}</span>
                      </td>
                      <td>
                        <strong>{order.customerName}</strong>
                      </td>
                      <td>{order.garmentType}</td>
                      <td>
                        <strong>₹{Number(order.price).toFixed(2)}</strong>
                      </td>
                      <td>
                        {order.delivered ? (
                          <span className="badge-delivered">✅ Delivered</span>
                        ) : (
                          <span className="badge-pending">⏳ Pending</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            id={`btn-view-${order.id}`}
                            className="btn-action view"
                            onClick={() => navigate(`/search?id=${order.id}`)}
                            title="View details"
                          >
                            👁 View
                          </button>
                          <button
                            id={`btn-edit-${order.id}`}
                            className="btn-action edit"
                            onClick={() => navigate(`/edit/${order.id}`)}
                            title="Edit order"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            id={`btn-delete-${order.id}`}
                            className="btn-action del"
                            onClick={() => handleDeleteClick(order)}
                            title="Delete order"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Refresh */}
        {!loading && (
          <div className="text-end mt-3">
            <button
              id="btn-refresh"
              onClick={fetchOrders}
              style={{
                background: 'transparent',
                border: '1.5px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.45rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              🔄 Refresh List
            </button>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        show={showModal}
        orderId={deleteTarget?.id}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleteLoading}
      />
    </>
  );
};

export default ViewOrders;
