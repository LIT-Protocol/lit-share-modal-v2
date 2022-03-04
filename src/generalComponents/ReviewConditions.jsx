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
    resetModal,
    setDisplayedPage,
    clearAllAccessControlConditions,
  } = useContext(ShareModalContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [conditionsAreUpdatable, setConditionsAreUpdatable] = useState(false);

  const navigateBack = () => {
    if (flow === 'singleCondition') {
      setShowConfirmationModal(true);
    } else if (flow === 'multipleCondition') {
      setDisplayedPage('multiple');
    }
  }

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      resetModal();
    }

    setShowConfirmationModal(false);
  }

  return (
    <div className={'lms-w-full lms-h-full lms-flex lms-flex-col lms-items-center lms-w-11/12 lms-py-4 lms-mx-auto'}>
      <h3 className={'lms-text-sm md:lms-text-base lms-text-center lms-mb-4'}>Scroll down to review your conditions and confirm at bottom</h3>
      <div
        className={'lms-w-full lms-h-auto lms-mx-auto lms-px-2 lms-py-6 lms-bg-brand-light lms-rounded lms-flex lms-flex-col items-align lms-overflow-scroll'}
      >
        {!!humanizedAccessControlConditions && humanizedAccessControlConditions.map((h, i) => {
          console.log('LOCAL HUMAN ACC', h)
          if (Array.isArray(h)) {
            return (
              <div className={'lms-flex lms-flex-col lms-bg-white lms-w-11/12 lms-mx-auto lms-rounded lms-p-3 lms-justify-between lms-items-center'}
                   key={i}>
                {h.map((n, ni) => {
                  if (!n['operator']) {
                    return (
                      <span className={'lms-text-sm md:lms-text-base lms-break-words lms-text-left lms-w-11/12 lms-overflow-auto'}
                            key={`n-${ni}`}
                      >{n.humanizedAcc}
                      </span>
                    )
                  } else {
                    return <span className={'lms-text-sm md:lms-text-base lms-break-words lms-text-center lms-w-11/12 lms-overflow-auto lms-my-2'}
                                 key={`n-${ni}`}
                    >{n.operator === 'and' ? 'AND' : 'OR'}
                    </span>
                  }
                })}
              </div>
            )
          } else if (h['operator']) {
            return (
              <span className={'lms-text-sm md:lms-text-base lms-break-words lms-text-center lms-overflow-auto lms-my-2'}
                    key={i}
              >{h.operator === 'and' ? 'AND' : 'OR'}
              </span>
            )
          } else {
            return (
              <span className={'lms-text-sm md:lms-text-base lms-w-11/12 lms-p-3 lms-mx-auto lms-bg-white lms-break-words lms-text-left lms-overflow-auto lms-rounded'}
                    key={i}
              > {h.humanizedAcc}
              </span>
            )
          }
        })}
      </div>
      {/*<footer className={'lms-flex lms-flex-col lms-bg-white items-align lms-w-full lms-h-30 lms-fixed lms-bottom-0 lms-left-0'}>*/}
      <footer className={'lms-flex lms-flex-col lms-bg-white items-align lms-w-full lms-h-30'}>
        <div className={'lms-mt-4 lms-w-full lms-flex lms-items-center lms-justify-center lms-mx-auto lms-border lms-rounded lms-border-brand-4'}>
          <input className={'lms-mr-4 lms-input lms-p-2'} type="checkbox" id="edit" name="edit" value={conditionsAreUpdatable} onChange={(e) => setConditionsAreUpdatable(e.target.checked)}/>
          <label className={'lms-text-sm md:lms-text-base lms-p-2'} htmlFor="edit">Make condition(s) editable; if selected, only you can edit</label>
        </div>
        <div className={'lms-w-full lms-mx-auto lms-flex lms-justify-center lms-mt-4 text-brand-4'}>
          <a className={'lms-text-sm md:lms-text-base lms-flex'} href={'https://developer.litprotocol.com/docs/AccessControlConditions/evmBasicExamples'} target={'_blank'} rel="noreferrer">More information about
            conditions <img
              alt={'clear input'} className={'lms-h-4 font-os lms-ml-2'} src={link}/></a>
        </div>
        {/*<div className={'lms-flex lms-flex-row lms-justify-end lms-w-full lms-h-12 lms-mt-8'}>*/}
        <div className={'lms-flex lms-flex-row lms-bg-white lms-justify-between lms-w-full lms-h-12 lms-my-4'}>
          <LitBackButton onClick={() => navigateBack()}/>
          <LitNextButton label={'DONE'} disableConditions={false} onClick={() => sendAccessControlConditions(conditionsAreUpdatable)}/>
        </div>
      </footer>
      <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                            onClick={handleConfirmGoBack}/>
      {/*<LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>*/}
    </div>
  );
};

export default ReviewConditions;
