import React from 'react';
import './LitInput.css';

const LitInput = ({
                    value,
                    setValue,
                    errorMessage = null,
                    placeholder = ''
                  }) => {
  return (
    <div className={`lsm-input-container lsm-w-full`}>
      <input placeholder={placeholder}
             value={value}
             onChange={(e) => setValue(e.target.value)}
             className={'lsm-border-brand-4 lsm-input'}/>
      <p className={'lsm-input-error lsm-text-error lsm-font-segoe lsm-text-sm'}>
        {(errorMessage && value.length) ? errorMessage : ''}</p>
    </div>
  );
};

export default LitInput;
