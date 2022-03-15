import React, { useContext, useEffect, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import { ShareModalContext } from "./ShareModal";
import MultipleCreateCondition from "./MultipleCreateCondition";
import union from "../assets/union.svg";
import LitConfirmationModal from "../reusableComponents/LitConfirmationModal";
import LitMultipleConditionOrganizer from "../reusableComponents/LitMultipleConditionOrganizer";

const MultipleConditions = ({ humanizedAccessControlConditions }) => {
  const {
    setDisplayedPage,
    setFlow,
    resetModal,
    handleClose,
  } = useContext(ShareModalContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [isNested, setIsNested] = useState(false);
  const [nestedIndex, setNestedIndex] = useState(null);

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      resetModal();
    }

    setShowConfirmationModal(false);
  }

  const createCondition = (isNested = false, nestedIndex = null) => {
    setIsNested(isNested);
    setNestedIndex(nestedIndex);
    setShowAddCondition(true);
  }

  const endOfCreateCondition = () => {
    setIsNested(false);
    setNestedIndex(null);
    setShowAddCondition(false);
  }

  return (
    <>
      <header className={'lms-w-full lms-h-14 lms-bg-brand-light lms-flex lms-justify-between lms-items-center lms-px-4 lms-rounded-t-lg'}>
        <h3 className={'lms-text-slate-500'}>ACCESS CONTROL</h3>
        <button><img alt={'close'} className={'lms-h-4 font-os'} src={union} onClick={() => handleClose()}/></button>
      </header>
      {!showAddCondition ? (
        <>
          <div className={'lms-overflow-scroll lms-h-5/6 lms-px-4 lms-mt-4'}>
            <LitMultipleConditionOrganizer createCondition={createCondition}
                                          humanizedAccessControlConditions={humanizedAccessControlConditions}/>
          </div>
          <div className={'lms-flex lms-flex-row lms-bg-white lms-justify-between lms-w-full lms-h-12 lms-my-4 lms-px-4 lms-absolute lms-bottom-0'}>
            <LitBackButton onClick={() => {
              if (humanizedAccessControlConditions.length < 1) {
                setFlow('singleCondition');
                setDisplayedPage('single');
              } else {
                setShowConfirmationModal(true);
              }
            }}/>
            <LitNextButton disableConditions={!humanizedAccessControlConditions || !humanizedAccessControlConditions.length}
                           onClick={() => setDisplayedPage('review')}/>
          </div>
          <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                                onClick={handleConfirmGoBack}/>
        </>
      ) : (
        <MultipleCreateCondition endOfCreateCondition={endOfCreateCondition}
                                 isNested={isNested}
                                 nestedIndex={nestedIndex}/>
      )}
    </>
  );
};

export default MultipleConditions;
