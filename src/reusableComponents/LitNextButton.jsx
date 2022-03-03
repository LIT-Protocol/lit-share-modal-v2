import React, { useState } from 'react';
import nextArrow from "../assets/nextArrow.svg";

const LitNextButton = ({ disableConditions, onClick, label}) => {

  return (
    <button className={'bg-brand-4 text-white h-12 px-6 py-0 mx-4 rounded flex items-center disabled:bg-gray'}
            disabled={!!disableConditions ? disableConditions : false}
            onClick={onClick}>
        {!label ? 'NEXT' : label}
      <img src={nextArrow} className={'ml-2'}/>
    </button>
  );
};

export default LitNextButton;
