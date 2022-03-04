import React, {  useState } from 'react';

const LitChooseAccessButton = (props) => {
  return (
    <button className={"w-9/12 h-16 border border-brand-4 rounded mt-4 hover:border-2 flex items-center justify-center lms-choose-access-button"}
            onClick={props.onClick}>
      {!!props['img'] && (<img className={'mr-4'} src={props.img} />)}
      {props.label}
    </button>
  );
};

export default LitChooseAccessButton;
