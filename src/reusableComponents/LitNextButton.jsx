import React, { useState } from 'react';
import nextArrow from "../assets/nextArrow.svg";

const LitNextButton = (props) => {

  return (
    <button className={'bg-brand-4 text-white h-12 px-6 py-0 mx-4 rounded flex items-center disabled:bg-gray'}
            disabled={!!props.disableConditions ? props.disableConditions : false}
            onClick={props.onClick}>
      NEXT
      <img src={nextArrow} className={'ml-2'}/>
    </button>
  );
};

export default LitNextButton;
