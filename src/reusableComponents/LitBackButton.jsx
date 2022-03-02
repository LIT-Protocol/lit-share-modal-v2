import React, { useState } from 'react';
import backArrow from "../assets/backArrow.svg";

const LitBackButton = ({ onClick, label, backgroundColor = 'bg-white' }) => {
  return (
    <button className={`${backgroundColor} text-brand-4 h-12 px-6 py-0 mx-4 rounded flex items-center`}
            onClick={onClick}>
      <img src={backArrow} className={'mr-2'}/>
      {!label ? 'BACK' : label}
    </button>
  );
};

export default LitBackButton;
