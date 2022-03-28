import React from 'react';

const LitChooseAccessButton = (props) => {
  return (
    <button className={"lsm-w-9/12 lsm-h-16 lsm-duration-200 lsm-bg-white lsm-border-brand-4 hover:lsm-border-brand-5 lsm-rounded lms-border-solid lsm-mt-4 lsm-border lsm-flex lsm-items-center lsm-justify-center lsm-cursor-pointer"}
            onClick={props.onClick}>
      {!!props['img'] && (<img className={'lsm-mr-4'} src={props.img} />)}
      {props.label}
    </button>
  );
};

export default LitChooseAccessButton;
