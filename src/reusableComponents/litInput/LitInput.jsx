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
             className={'lsm-border-gray-4 lsm-input dark:lsm-bg-gray-7 dark:lsm-text-white'}/>
      <p className={'lsm-input-error lsm-text-error dark:lsm-text-dark-error lsm-font-segoe lsm-text-sm'}>
        {(errorMessage && value.length) ? errorMessage : ''}</p>
    </div>
  );
};

export default LitInput;
