import React from "react";
import './LitConfirmationModal.css';

const LitConfirmationModal = ({ showConfirmationModal, modalResponse, onClick, message = null }) => {

  return (
    <div>
      {!!showConfirmationModal && (
        // <div className={'lms-w-full lms-h-full lms-bg-light-modal-overlay lms-fixed lms-top-0 lms-left-0'}>
        <div className={'lms-bg-light-modal-overlay lms-confirmation-modal-container'}>
          {/*<div className={'lms-w-11/12 lms-h-auto lms-fixed lms-bg-white lms-border lms-border-brand-4 lms-rounded lms-z-30 modal lms-p-6'}>*/}
          <div className={'lms-border-brand-4 lms-bg-white lms-confirmation-modal'}>
            <h3 className={'lms-w-full lms-text-left lms-mt-0 lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>{!message ? 'Are you sure you want to go back? Current conditions will be lost.' : message}</h3>
            <span className={'lms-flex lms-flex-row lms-justify-around lms-w-full lms-h-12 lms-mt-8'}>
                <button className={'lms-cursor-pointer lms-bg-brand-4 lms-text-white lms-px-10 lms-py-0 lms-mx-4 lms-rounded lms-border-none lms-flex lms-items-center disabled:lms-bg-gray'}
                        onClick={() => onClick('no')}>
                NO
              </button>
              <button
                className={'lms-cursor-pointer lms-bg-white lms-border lms-border-brand-4 lms-text-brand-4 lms-px-10 lms-py-0 lms-mx-4 lms-rounded lms-flex lms-items-center disabled:lms-bg-gray'}
                onClick={() => onClick('yes')}>
                YES
              </button>
          </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default LitConfirmationModal;
