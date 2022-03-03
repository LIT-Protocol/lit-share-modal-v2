import React from "react";

const LitConfirmationModal = ({ showConfirmationModal, modalResponse, onClick, message = null }) => {

  return (
    <div>
      {!!showConfirmationModal && (
        <div className={'w-full h-full bg-modal-overlay fixed top-0 left-0'}>
          <div className={'w-11/12 h-auto fixed bg-white border border-brand-4 rounded z-30 modal p-6'}>
            <h3>{!message ? 'Are you sure you want to go back? Current conditions will be lost.' : message}</h3>
            <span className={'flex flex-row justify-around w-full h-12 mt-8'}>
                <button className={'bg-brand-4 text-white px-10 py-0 mx-4 rounded flex items-center disabled:bg-gray'}
                        onClick={() => onClick('no')}>
                NO
              </button>
              <button
                className={'bg-white border border-brand-4 text-brand-4 px-10 py-0 mx-4 rounded flex items-center disabled:bg-gray'}
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
