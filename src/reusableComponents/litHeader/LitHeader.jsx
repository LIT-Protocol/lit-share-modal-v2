import React from 'react';
import union from "../../assets/union.svg";
import './LitHeader.css';

const LitHeader = ({ handleClose }) => {
  return (
    <header className={'lms-bg-brand-light lms-header-container'}>
      <h3 className={'lms-text-title-gray lms-font-light lms-font-segoe'}>ACCESS CONTROL</h3>
      <button className={'lms-border-none lms-cursor-pointer'}><img alt={'close'} className={'lms-h-4'} src={union} onClick={handleClose}/></button>
    </header>
  );
};

export default LitHeader;
