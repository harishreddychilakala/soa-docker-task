import React, { useState, useEffect } from 'react';

/**
 * OrderForm – shared Add / Edit form
 * Props:
 *   initialValues  {object}   – pre-populate for edit (pass {} for add)
 *   onSubmit       {function} – receives validated form data object
 *   loading        {boolean}  – disables submit while API is in-flight
 *   submitLabel    {string}   – button label
 *   serverError    {string}   – error message from the API
 */
const INITIAL = {
  customerName: '',
  garmentType: '',
  price: '',
  delivered: '',
};

const OrderForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = 'Submit',
  serverError = '',
}) => {
  const [form, setForm] = useState({ ...INITIAL, ...initialValues });
  const [errors, setErrors] = useState({});

  // Sync when edit values arrive
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setForm({
        customerName: initialValues.customerName || '',
        garmentType: initialValues.garmentType || '',
        price: initialValues.price !== undefined ? initialValues.price : '',
        delivered:
          initialValues.delivered !== undefined
            ? String(initialValues.delivered)
            : '',
      });
    }
  }, [
    initialValues.customerName,
    initialValues.garmentType,
    initialValues.price,
    initialValues.delivered,
  ]);

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Customer name is required.';
    if (!form.garmentType.trim()) e.garmentType = 'Garment type is required.';
    if (form.price === '' || form.price === null) {
      e.price = 'Price is required.';
    } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      e.price = 'Price must be a positive number greater than zero.';
    }
    if (form.delivered === '' || form.delivered === null) {
      e.delivered = 'Delivered status must be selected.';
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      customerName: form.customerName.trim(),
      garmentType: form.garmentType.trim(),
      price: parseFloat(form.price),
      delivered: form.delivered === 'true',
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate id="order-form">
      {/* Server-side error */}
      {serverError && (
        <div className="alert-custom alert-danger-custom mb-3" role="alert">
          <span>⚠️</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Customer Name */}
      <div className="mb-3">
        <label htmlFor="customerName" className="form-label-custom">
          👤 Customer Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          className={`form-control form-control-custom${errors.customerName ? ' is-invalid' : ''}`}
          placeholder="e.g. Harish Reddy"
          autoComplete="off"
          disabled={loading}
          maxLength={100}
        />
        {errors.customerName && (
          <div className="invalid-feedback-custom">
            <span>⚠️</span> {errors.customerName}
          </div>
        )}
      </div>

      {/* Garment Type */}
      <div className="mb-3">
        <label htmlFor="garmentType" className="form-label-custom">
          👔 Garment Type <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="garmentType"
          name="garmentType"
          value={form.garmentType}
          onChange={handleChange}
          className={`form-control form-control-custom${errors.garmentType ? ' is-invalid' : ''}`}
          placeholder="e.g. Formal Shirt, Lehenga, Suit"
          autoComplete="off"
          disabled={loading}
          maxLength={100}
        />
        {errors.garmentType && (
          <div className="invalid-feedback-custom">
            <span>⚠️</span> {errors.garmentType}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label htmlFor="price" className="form-label-custom">
          💰 Price (₹) <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
          className={`form-control form-control-custom${errors.price ? ' is-invalid' : ''}`}
          placeholder="e.g. 850"
          min="0.01"
          step="0.01"
          disabled={loading}
        />
        {errors.price && (
          <div className="invalid-feedback-custom">
            <span>⚠️</span> {errors.price}
          </div>
        )}
      </div>

      {/* Delivered Status */}
      <div className="mb-4">
        <label htmlFor="delivered" className="form-label-custom">
          📦 Delivered Status <span className="text-danger">*</span>
        </label>
        <select
          id="delivered"
          name="delivered"
          value={form.delivered}
          onChange={handleChange}
          className={`form-select form-control-custom${errors.delivered ? ' is-invalid' : ''}`}
          disabled={loading}
        >
          <option value="">-- Select Status --</option>
          <option value="false">❌ Not Delivered</option>
          <option value="true">✅ Delivered</option>
        </select>
        {errors.delivered && (
          <div className="invalid-feedback-custom">
            <span>⚠️</span> {errors.delivered}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        id="btn-submit-order"
        className="btn-primary-custom w-100"
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Processing…
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default OrderForm;
