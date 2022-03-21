import React from 'react';
import './LitNextButton.css';

const LitNextButton = ({ disableConditions, onClick, label}) => {

  return (
    <button className={'lms-bg-brand-4 disabled:lms-bg-gray disabled:lms-text-dark-gray lms-next-button'}
            disabled={!!disableConditions ? disableConditions : false}
            onClick={onClick}>
        {!label ? 'NEXT' : label}
      <p className={'lms-ml-2'}>→</p>
    </button>
  );
};

export default LitNextButton;
