import React, { useState } from 'react';
import backArrow from "../../assets/backArrow.svg";
import './LitBackButton.css';

const LitBackButton = ({ onClick, label, backgroundColor = 'lms-bg-white' }) => {
  return (
    <button className={`${backgroundColor} lms-text-brand-4 lms-back-button`}
            onClick={onClick}>
      <img src={backArrow} className={'lms-mr-2'}/>
      {!label ? 'BACK' : label}
    </button>
  );
};

export default LitBackButton;
