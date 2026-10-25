import React, { useState } from 'react';
import OrderForm from '../components/OrderForm';
import { addOrder } from '../services/tailoringOrderService';

const AddOrder = () => {
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // used to reset OrderForm

  const handleSubmit = async (data) => {
    setLoading(true);
    setSuccess(null);
    setServerError('');

    try {
      const res = await addOrder(data);
      setSuccess(res.data);
      setFormKey((k) => k + 1); // reset form fields
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 400) {
          const detail = err.response.data;
          if (typeof detail === 'object') {
            const messages = Object.values(detail).join(', ');
            setServerError(`Validation error: ${messages}`);
          } else {
            setServerError('Invalid request data. Please check the form fields.');
          }
        } else if (status === 500) {
          setServerError('Server error. Please try again later.');
        } else {
          setServerError(`Unexpected error (HTTP ${status}).`);
        }
      } else if (err.request) {
        setServerError(
          'Cannot connect to the backend server. Make sure Spring Boot is running on port 8081.'
        );
      } else {
        setServerError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h2>➕ Add New Order</h2>
          <p>Create a new tailoring order record in the system</p>
        </div>
      </div>

      <div className="container">
        <div className="form-section">
          {/* Success */}
          {success && (
            <div className="alert-custom alert-success-custom" role="alert">
              <span>✅</span>
              <div>
                <strong>Order added successfully!</strong>
                <br />
                <small>
                  Customer: {success.customerName} &nbsp;|&nbsp; Garment:{' '}
                  {success.garmentType} &nbsp;|&nbsp; Price: ₹{success.price}
                </small>
              </div>
            </div>
          )}

          {/* Card */}
          <div className="card-custom">
            <div className="card-header-custom">
              <h5>✂️ Order Details</h5>
              <small style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem' }}>
                All fields marked with <span style={{ color: '#ffcf77' }}>*</span> are required
              </small>
            </div>
            <div className="p-4">
              <OrderForm
                key={formKey}
                onSubmit={handleSubmit}
                loading={loading}
                submitLabel="✅ Add Order"
                serverError={serverError}
              />
            </div>
          </div>

          {/* Note */}
          <div className="mt-3 alert-custom alert-info-custom">
            <span>ℹ️</span>
            <small>
              The Order ID is automatically assigned by the database. You do not need to enter it.
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOrder;
