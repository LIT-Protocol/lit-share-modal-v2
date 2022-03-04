import React, {  useState } from 'react';

const LitChooseAccessButton = (props) => {
  return (
    <button className={"lms-w-9/12 lms-h-16 lms-border lms-border-brand-4 lms-rounded lms-mt-4 hover:lms-border-2 lms-flex lms-items-center lms-justify-center lms-choose-access-button"}
            onClick={props.onClick}>
      {!!props['img'] && (<img className={'lms-mr-4'} src={props.img} />)}
      {props.label}
    </button>
  );
};

export default LitChooseAccessButton;
