import React from 'react';
import './LitBackButton.css';

const LitBackButton = ({ onClick, label, backgroundColor = 'lsm-bg-white dark:lsm-bg-gray-7' }) => {
  return (
    <button className={`${backgroundColor} lsm-text-gray-4 dark:lsm-text-gray lsm-back-button`}
            onClick={onClick}>
      <span className={'lsm-mr-2'}>←</span>
      {!label ? 'BACK' : label}
    </button>
  );
};

export default LitBackButton;
