import React, { useState } from 'react';
import backArrow from "../assets/backArrow.svg";

const LitBackButton = ({ onClick, label, backgroundColor = 'lms-bg-white' }) => {
  return (
    <button className={`${backgroundColor} lms-text-brand-4 lms-h-12 lms-px-6 lms-py-0 lms-mx-4 lms-rounded lms-flex lms-items-center`}
            onClick={onClick}>
      <img src={backArrow} className={'lms-mr-2'}/>
      {!label ? 'BACK' : label}
    </button>
  );
};

export default LitBackButton;
