import React, { useContext, useState, useEffect } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import { ShareModalContext } from "./ShareModal";
import link from '../assets/link.svg';
import LitConfirmationModal from "../reusableComponents/LitConfirmationModal";

const ReviewConditions = ({ humanizedAccessControlConditions }) => {
  const {
    sendAccessControlConditions,
    flow,
    setFlow,
    setDisplayedPage,
    clearAllAccessControlConditions,
  } = useContext(ShareModalContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigateBack = () => {
    if (flow === 'singleCondition') {
      setShowConfirmationModal(true);
    } else if (flow === 'multipleCondition') {
      setDisplayedPage('multiple');
    }
  }

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      setFlow('singleCondition');
      setDisplayedPage('single');
      clearAllAccessControlConditions();
    }

    setShowConfirmationModal(false);
  }

  return (
    <div className={'w-full h-full flex flex-col items-center w-11/12 py-4 mx-auto'}>
      <h3 className={'text-sm text-center mb-4'}>Scroll down to review your conditions and confirm at bottom</h3>
      <div
        className={'w-full h-auto mx-auto px-2 py-6 bg-brand-light rounded flex flex-col items-align overflow-scroll'}
      >
        {!!humanizedAccessControlConditions && humanizedAccessControlConditions.map((h, i) => {
          console.log('LOCAL HUMAN ACC', h)
          if (Array.isArray(h)) {
            return (
              <div className={'flex flex-col bg-white w-11/12 mx-auto rounded p-3 justify-between items-center'}
                   key={i}>
                {h.map((n, ni) => {
                  if (!n['operator']) {
                    return (
                      <span className={'text-sm break-words text-left w-11/12 overflow-auto'}
                            key={`n-${ni}`}
                      >{n.humanizedAcc}
                      </span>
                    )
                  } else {
                    return <span className={'text-sm break-words text-center w-11/12 overflow-auto my-2'}
                                 key={`n-${ni}`}
                    >{n.operator === 'and' ? 'AND' : 'OR'}
                    </span>
                  }
                })}
              </div>
            )
          } else if (h['operator']) {
            return (
              <span className={'text-sm break-words text-center overflow-auto my-2'}
                    key={i}
              >{h.operator === 'and' ? 'AND' : 'OR'}
              </span>
            )
          } else {
            return (
              <span className={'text-sm w-11/12 p-3 mx-auto bg-white break-words text-center overflow-auto rounded'}
                    key={i}
              > {h.humanizedAcc}
              </span>
            )
          }
        })}
      </div>
      {/*<footer className={'flex flex-col bg-white items-align w-full h-30 fixed bottom-0 left-0'}>*/}
      <footer className={'flex flex-col bg-white items-align w-full h-30'}>
        <div className={'mt-4 w-11/12 flex items-center mx-auto border rounded border-brand-4 p-2'}>
          <input className={'mr-4'} type="checkbox" id="edit" name="edit"/>
          <label className={'text-sm'} htmlFor="edit">Make condition(s) editable; if selected, only you can edit</label>
        </div>
        <div className={'w-full mx-auto flex justify-center mt-4 text-brand-4'}>
          <a className={'text-sm flex'} href={'https://developer.litprotocol.com/docs/AccessControlConditions/basicExamples'} target={'_blank'} rel="noreferrer">More information about
            conditions <img
              alt={'clear input'} className={'h-4 font-os ml-2'} src={link}/></a>
        </div>
        {/*<div className={'flex flex-row justify-end w-full h-12 mt-8'}>*/}
        <div className={'flex flex-row bg-white justify-between w-full h-12 my-4'}>
          <LitBackButton onClick={() => navigateBack()}/>
          <LitNextButton disableConditions={false} onClick={() => sendAccessControlConditions()}/>
        </div>
      </footer>
      <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                            onClick={handleConfirmGoBack}/>
      {/*<LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>*/}
    </div>
  );
};

export default ReviewConditions;
