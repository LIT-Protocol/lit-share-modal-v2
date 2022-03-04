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
    accessControlConditions,
    setFlow,
    resetModal,
    handleClose,
    clearAllAccessControlConditions,
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
      <header className={'lms-w-full lms-h-14 lms-bg-brand-light lms-flex lms-justify-between lms-items-center lms-px-5 lms-rounded-t-lg'}>
        <h3 className={'lms-text-slate-500'}>ACCESS CONTROL</h3>
        <button><img alt={'close'} className={'lms-h-4 font-os'} src={union} onClick={() => handleClose()}/></button>
      </header>
      {!showAddCondition ? (
        <>
          <div className={'lms-overflow-scroll lms-h-5/6'}>
            <LitMultipleConditionOrganizer createCondition={createCondition}
                                          humanizedAccessControlConditions={humanizedAccessControlConditions}/>
          </div>
          <footer className={'lms-flex lms-bg-white lms-rounded-b-lg lms-flex-row lms-justify-between lms-items-center lms-w-full lms-h-20 lms-fixed lms-bottom-0 lms-left-0'}>
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
          </footer>
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
