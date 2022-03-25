import React from 'react';
import union from "../../assets/union.svg";
import './LitHeader.css';

const LitHeader = ({ handleClose }) => {
  return (
    <header className={'lsm-bg-brand-light lsm-header-container'}>
      <h3 className={'lsm-text-title-gray lsm-font-light lsm-font-segoe'}>ACCESS CONTROL</h3>
      <button className={'lsm-border-none lsm-cursor-pointer'}><img alt={'close'} className={'lsm-h-4'} src={union} onClick={handleClose}/></button>
    </header>
  );
};

export default LitHeader;
