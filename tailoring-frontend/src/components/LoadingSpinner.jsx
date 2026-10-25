import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-wrap" aria-live="polite" aria-label={message}>
      <div className="spinner-custom" role="status"></div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem', margin: 0 }}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
