import React from 'react';
import './LitBackButton.css';

const LitBackButton = ({ onClick, label, backgroundColor = 'lsm-bg-white' }) => {
  return (
    <button className={`${backgroundColor} lsm-text-brand-4 lsm-back-button`}
            onClick={onClick}>
      <span className={'lsm-mr-2'}>←</span>
      {!label ? 'BACK' : label}
    </button>
  );
};

export default LitBackButton;
