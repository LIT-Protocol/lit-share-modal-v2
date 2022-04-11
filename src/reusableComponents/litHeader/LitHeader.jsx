import React from 'react';
import union from "../../assets/union.svg";
import './LitHeader.css';

const LitHeader = ({ handleClose }) => {
  return (
    <header className={'lsm-bg-brand-light lsm-header-container'}>
      <h3 className={'lsm-text-brand-6 lsm-font-normal lsm-font-segoe'}>ACCESS CONTROL</h3>
      <button className={'lsm-border-none lsm-cursor-pointer'} onClick={handleClose}>
        {/*<img alt={'close'} className={'lsm-h-4'} src={union} onClick={handleClose}/>*/}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 11.4142L17.7782 19.1924L19.1924 17.7782L11.4142 10L19.1924 2.22183L17.7782 0.807617L10 8.58579L2.22183 0.807617L0.807617 2.22183L8.58579 10L0.807619 17.7782L2.22183 19.1924L10 11.4142Z"
            fill="rgba(0, 5, 51, 0.6)"/>
        </svg>

      </button>
    </header>
  );
};

export default LitHeader;
