import React from "react";
import './LitDeleteModal.css';

const LitDeleteModal = ({ showDeleteModal, onClick }) => {

  return (
    <div>
      {!!showDeleteModal && (
        <div className={'lsm-bg-light-modal-overlay lsm-delete-modal-container'}>
          <div
            className={'lsm-border-gray-4 dark:lsm-border-gray-2 lsm-bg-white dark:lsm-bg-gray-7 lsm-delete-modal'}>
            <h3
              className={'lsm-w-full lsm-text-left dark:lsm-text-gray lsm-mt-0 lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Are
              you sure you want to delete this access control condition?</h3>
            <span className={'lsm-flex lsm-flex-row lsm-justify-around lsm-w-full lsm-h-12 lsm-mt-8'}>
              <button
                className={'lsm-cursor-pointer lsm-bg-initial-blue lsm-text-white lsm-px-10 lsm-py-0 lsm-mx-4 lsm-rounded lsm-border-none lsm-flex lsm-items-center disabled:lsm-bg-gray'}
                onClick={() => onClick('no')}>
                NO
              </button>
              <button
                className={'lsm-cursor-pointer lsm-duration-200 lsm-bg-white lsm-border-standard hover:lsm-border-gray-5 lsm-border-gray-4 lsm-text-gray-4 lsm-px-10 lsm-py-0 lsm-mx-4 lsm-rounded lsm-flex lsm-items-center disabled:lsm-bg-gray dark:lsm-bg-gray-7 dark:lsm-text-gray'}
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

export default LitDeleteModal;
