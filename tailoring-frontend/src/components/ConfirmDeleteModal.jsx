import React from 'react';

/**
 * ConfirmDeleteModal
 * Props:
 *   show      {boolean}  – whether the modal is visible
 *   orderId   {number}   – the ID of the order to delete
 *   onConfirm {function} – called when user confirms deletion
 *   onCancel  {function} – called when user cancels
 *   loading   {boolean}  – disables the button while API is in-flight
 */
const ConfirmDeleteModal = ({ show, orderId, onConfirm, onCancel, loading }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmDeleteTitle"
    >
      <div className="modal-dialog modal-dialog-centered modal-custom">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmDeleteTitle">
              🗑️ Confirm Delete
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label="Close"
              disabled={loading}
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="text-center">
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>⚠️</div>
              <h6 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                Are you sure you want to delete this order?
              </h6>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem' }}>
                Order ID: <strong className="id-badge">#{orderId}</strong> will be
                permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="modal-footer gap-2">
            <button
              id="btn-cancel-delete"
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
              disabled={loading}
              style={{ borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}
            >
              Cancel
            </button>
            <button
              id="btn-confirm-delete"
              type="button"
              onClick={onConfirm}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg,#c0392b,#e74c3c)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Deleting…
                </>
              ) : (
                '🗑️ Yes, Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
