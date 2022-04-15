import React from 'react';
import './LitNextButton.css';

const LitNextButton = ({ disableConditions, onClick, label }) => {

  return (
    <button
      className={'lsm-bg-brand-4 dark:lsm-text-gray dark:lsm-bg-brand-4 disabled:lsm-cursor-auto disabled:lsm-bg-gray dark:disabled:lsm-bg-darker-gray dark:disabled:lsm-text-dark-gray disabled:lsm-text-dark-gray lsm-next-button'}
      disabled={disableConditions ? disableConditions : false}
      onClick={onClick}>
      {!label ? 'NEXT' : label}
      <span className={'lsm-ml-2'}>→</span>
    </button>
  );
};

export default LitNextButton;
