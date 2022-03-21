import React, {  useState } from 'react';

const LitChooseAccessButton = (props) => {
  return (
    <button className={"lsm-w-9/12 lsm-h-16 lsm-bg-white lsm-border lsm-border-brand-4 lsm-rounded lsm-mt-4 hover:lsm-border-2 lsm-flex lsm-items-center lsm-justify-center lsm-cursor-pointer"}
            onClick={props.onClick}>
      {!!props['img'] && (<img className={'lsm-mr-4'} src={props.img} />)}
      {props.label}
    </button>
  );
};

export default LitChooseAccessButton;
