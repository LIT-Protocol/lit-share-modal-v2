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
    handleClose,
    clearAllAccessControlConditions,
  } = useContext(ShareModalContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [isNested, setIsNested] = useState(false);
  const [nestedIndex, setNestedIndex] = useState(null);

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      setFlow('singleCondition');
      setDisplayedPage('single');
      clearAllAccessControlConditions();
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
      <header className={'w-full h-14 bg-brand-light flex justify-between items-center px-5'}>
        <h3 className={'text-slate-500'}>ACCESS CONTROL</h3>
        <button><img alt={'close'} className={'h-4 font-os'} src={union} onClick={() => handleClose()}/></button>
      </header>
      {!showAddCondition ? (
        <>
          <LitMultipleConditionOrganizer createCondition={createCondition}
                                         humanizedAccessControlConditions={humanizedAccessControlConditions}/>
          <footer className={'flex bg-white flex-row justify-between items-center w-full h-20 fixed bottom-0 left-0'}>
            <LitBackButton onClick={() => {
              if (accessControlConditions.length < 1) {
                setFlow('singleCondition');
                setDisplayedPage('single');
              } else {
                setShowConfirmationModal(true);
              }
            }}/>
            <LitNextButton disableConditions={!accessControlConditions}
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
