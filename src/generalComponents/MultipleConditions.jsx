import React, { useContext, useState } from 'react';
import { ShareModalContext } from "../shareModal/createShareContext.js";
import MultipleCreateCondition from "./MultipleCreateCondition";
import LitConfirmationModal from "../reusableComponents/litConfirmationModal/LitConfirmationModal";
import LitMultipleConditionOrganizer
  from "../reusableComponents/litMultipleConditionOrganizer/LitMultipleConditionOrganizer";
import LitFooter from "../reusableComponents/litFooter/LitFooter";
import LitHeader from "../reusableComponents/litHeader/LitHeader";

const MultipleConditions = ({ humanizedAccessControlConditions, accessControlConditions }) => {
  const {
    setDisplayedPage,
    setFlow,
    resetModal,
    handleClose,
    darkTheme
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
    <div className={'lsm-h-full'}>
      <LitHeader handleClose={handleClose} darkTheme={darkTheme}/>
      {!showAddCondition ? (
        <div className={'lsm-multiple-scroll'}>
          <div className={'lsm-overflow-scroll lsm-pt-4 lsm-form-scroll'}>
            <LitMultipleConditionOrganizer createCondition={createCondition}
                                           humanizedAccessControlConditions={humanizedAccessControlConditions}
                                           accessControlConditions={accessControlConditions}
            />
          </div>
          <LitFooter
            backAction={() => {
              if (humanizedAccessControlConditions.length < 1) {
                setFlow('singleCondition');
                setDisplayedPage('single');
              } else {
                setShowConfirmationModal(true);
              }
            }}
            nextAction={() => setDisplayedPage('review')}
            nextDisableConditions={!humanizedAccessControlConditions || !humanizedAccessControlConditions.length}
          />
          <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                                onClick={handleConfirmGoBack}/>
        </div>
      ) : (
        <MultipleCreateCondition endOfCreateCondition={endOfCreateCondition}
                                 isNested={isNested}
                                 nestedIndex={nestedIndex}/>
      )}
    </div>
  );
};

export default MultipleConditions;
