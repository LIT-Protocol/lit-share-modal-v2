import React from "react";

const LitDeleteModal = ({ showDeleteModal, modalResponse, onClick, message }) => {

  return (
    <div>
      {!!showDeleteModal && (
        <div className={'lms-w-full lms-h-full lms-bg-modal-overlay lms-fixed lms-top-0 lms-left-0 lms-z-10'}>
          <div className={'lms-w-11/12 lms-h-auto lms-fixed lms-bg-white lms-border lms-border-brand-4 lms-rounded lms-z-30 modal lms-p-6'}>
            <h3 className={'lms-w-full lms-text-center'}>Are you sure you want to delete this access control condition?</h3>
            <span className={'lms-flex lms-flex-row lms-justify-around lms-w-full lms-h-12 lms-mt-8'}>
                <button className={'lms-bg-brand-4 lms-text-white lms-px-10 lms-py-0 lms-mx-4 lms-rounded lms-flex lms-items-center disabled:lms-bg-gray'}
                        onClick={() => onClick('no')}>
                NO
                  {/*<img src={nextArrow} className={'lms-ml-2'}/>*/}
              </button>
              <button
                className={'lms-bg-white lms-border lms-border-brand-4 text-brand-4 lms-px-10 lms-py-0 lms-mx-4 lms-rounded lms-flex lms-items-center disabled:lms-bg-gray'}
                onClick={() => onClick('yes')}>
                YES
                {/*<img src={nextArrow} className={'lms-ml-2'}/>*/}
              </button>
          </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default LitDeleteModal;
