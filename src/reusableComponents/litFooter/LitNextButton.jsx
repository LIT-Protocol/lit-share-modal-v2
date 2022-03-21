import React from 'react';
import './LitNextButton.css';

const LitNextButton = ({ disableConditions, onClick, label}) => {

  return (
    <button className={'lsm-bg-brand-4 disabled:lsm-bg-gray disabled:lsm-text-dark-gray lsm-next-button'}
            disabled={!!disableConditions ? disableConditions : false}
            onClick={onClick}>
        {!label ? 'NEXT' : label}
      <span className={'lsm-ml-2'}>→</span>
    </button>
  );
};

export default LitNextButton;
