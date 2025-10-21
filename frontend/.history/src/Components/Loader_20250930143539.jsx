import React from 'react';

// Define the colors for reusability
const ACCENT_COLOR = '#00bcd4';
const OVERLAY_BG = 'rgba(18, 18, 18, 0.9)'; // Slightly transparent dark gray

function FullScreenLoader() {
  return (
    // Fixed overlay covering the whole viewport
    <div 
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: OVERLAY_BG,
        zIndex: 9999, // Ensure it's on top of everything
      }}
    >
      <div className="text-center">
        {/* Bootstrap Spinner with Custom Color */}
        <div 
          className="spinner-border" 
          role="status"
          style={{
            width: '4rem',
            height: '4rem',
            color: ACCENT_COLOR, // Apply the accent color
            borderWidth: '0.4em'
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        
        {/* Loading Text */}
        <p className="mt-3 lead fw-bold" style={{ color: ACCENT_COLOR }}>
          Loading Dashboard...
        </p>
      </div>
    </div>
  );
}

export default FullScreenLoader;