import React, { useState } from 'react';
import nextArrow from "../assets/nextArrow.svg";

const LitNextButton = ({ disableConditions, onClick, label}) => {

  return (
    <button className={'lms-bg-brand-4 lms-text-white lms-h-12 lms-px-6 lms-py-0 lms-mx-4 lms-rounded lms-flex lms-items-center disabled:lms-bg-gray'}
            disabled={!!disableConditions ? disableConditions : false}
            onClick={onClick}>
        {!label ? 'NEXT' : label}
      <img src={nextArrow} className={'lms-ml-2'}/>
    </button>
  );
};

export default LitNextButton;
