import React from 'react';
import './LitNextButton.css';

const LitNextButton = ({ disableConditions, onClick, label }) => {

  return (
    <button
      className={'lsm-text-gray lsm-bg-initial-blue disabled:lsm-cursor-auto disabled:lsm-bg-gray-light disabled:lsm-text-gray lsm-next-button'}
      disabled={disableConditions ? disableConditions : false}
      onClick={onClick}>
      {!label ? 'NEXT' : label}
      <span className={'lsm-ml-2'}>→</span>
    </button>
  );
};

export default LitNextButton;
