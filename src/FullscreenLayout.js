// FullscreenLayout.js
import React from 'react';
import './FullscreenLayout.css';

const FullscreenLayout = ({ children }) => {
  return (
    <div className="fullscreen-layout">
      {children}
    </div>
  );
};

export default FullscreenLayout;
