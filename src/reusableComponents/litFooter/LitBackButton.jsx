import React, { useState } from 'react';
import './LitBackButton.css';

const LitBackButton = ({ onClick, label, backgroundColor = 'lms-bg-white' }) => {
  return (
    <button className={`${backgroundColor} lms-text-brand-4 lms-back-button`}
            onClick={onClick}>
      <span className={'lms-mr-2'}>←</span>
      {!label ? 'BACK' : label}
    </button>
  );
};

export default LitBackButton;
