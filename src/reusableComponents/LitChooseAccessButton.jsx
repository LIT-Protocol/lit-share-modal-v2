import React from 'react';

const LitChooseAccessButton = (props) => {
  return (
    <button
      className={"lsm-w-9/12 lsm-h-16 lsm-duration-200 lsm-bg-gray-light dark:lsm-bg-gray-7 dark:lsm-text-gray dark:lsm-border-gray-6 dark:hover:lsm-border-gray-5 lsm-text-gray-6 lsm-border-standard lsm-border-gray-4 hover:lsm-border-gray-5 lsm-rounded lms-border-solid lsm-mt-4 lsm-flex lsm-items-center lsm-justify-center lsm-cursor-pointer lsm-choose-access-button"}
      onClick={props.onClick}>
      {!!props['img'] && (<img className={'lsm-mr-4'} src={props.img}/>)}
      {props.label}
    </button>
  );
};

export default LitChooseAccessButton;
