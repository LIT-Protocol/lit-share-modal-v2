import React, { createContext, useEffect, useContext, useReducer, useMemo, useState } from 'react';
import SingleCondition from "../generalComponents/SingleCondition";
import ReviewConditions from "../generalComponents/reviewConditions/ReviewConditions";
import MultipleConditions from "../generalComponents/MultipleConditions";
import '../index.css'
import './ShareModal.css'

import LitJsSdk from "lit-js-sdk";
import { TOP_LIST } from "../helpers/topList";
import { humanizeNestedConditions, cleanAccessControlConditions } from "../helpers/multipleConditionHelpers";
import LitConfirmationModal from "../reusableComponents/litConfirmationModal/LitConfirmationModal";

export const ShareModalContext = createContext({});

const ShareModal = (props) => {
  const {
    onClose = () => false,
    onBack = () => false,
    // TODO: showModal needs to start as false
    showModal = true,
    onAccessControlConditionsSelected,
    defaultTokens = TOP_LIST
  } = props;

  const [displayPage, setDisplayedPage] = useState('single');
  const [error, setError] = useState(null);
  const [accessControlConditions, setAccessControlConditions] = useState([]);
  const [humanizedAccessControlConditions, setHumanizedAccessControlConditions] = useState([]);
  const [flow, setFlow] = useState('singleCondition');
  const [tokenList, setTokenList] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
      const getTokens = async () => {
        // get token list and cache it
        const tokens = await LitJsSdk.getTokenList();
        setTokenList(tokens);
      };
      getTokens();
    }, []);

  const chainOptions = useMemo(
    () =>
      Object.keys(LitJsSdk.LIT_CHAINS).map((item) => {
        return {
          name: LitJsSdk.LIT_CHAINS[item].name,
          id: item,
          value: item,
        };
      }),
    []
  );

  document.addEventListener(
    "lit-ready",
    function (e) {
    },
    false
  );


  const handleDeleteAccessControlCondition = async (localIndex, nestedIndex) => {
    const updatedAcc = accessControlConditions;
    // TODO: create nested delete

    if (nestedIndex === null) {
      if (localIndex > 1 && localIndex === updatedAcc.length - 1) {
        updatedAcc.splice(-2);
      } else {
        updatedAcc.splice(updatedAcc[localIndex], 2);
      }
    } else {
      if (nestedIndex !== 0 && nestedIndex === updatedAcc[localIndex].length - 1) {
        updatedAcc[localIndex].splice(-2);

      } else {
        updatedAcc[localIndex].splice(updatedAcc[localIndex][nestedIndex], 2);
      }
    }

    await updateState(updatedAcc);

    if (updatedAcc.length === 0 && flow === 'singleCondition') {
      setDisplayedPage('single');
    }
  }

  const checkForAddingOperatorToCondition = (acc, newAccessControlCondition) => {
    const updatedAcc = acc;
    if (!acc.length && newAccessControlCondition[0]) {
      updatedAcc.push(newAccessControlCondition[0]);
    } else {
      updatedAcc.push({ operator: 'and' });
      updatedAcc.push(newAccessControlCondition[0]);
    }
    return updatedAcc;
  }

  const handleUpdateAccessControlConditions = async (newAccessControlCondition, isNested = false, index = null) => {
    let updatedAcc = [...accessControlConditions];
    if (!newAccessControlCondition[0]) {
      return;
    }

    if (isNested) {
      if (Array.isArray(updatedAcc[index])) {
        updatedAcc[index] = checkForAddingOperatorToCondition(updatedAcc[index], newAccessControlCondition);
      } else {
        let nestedUpdatedAcc = checkForAddingOperatorToCondition([updatedAcc[index]], newAccessControlCondition);
        updatedAcc[index] = nestedUpdatedAcc;
      }
    } else {
      updatedAcc = checkForAddingOperatorToCondition(updatedAcc, newAccessControlCondition);
    }
    await updateState(updatedAcc);
  }

  const clearAllAccessControlConditions = () => {
    setAccessControlConditions([]);
    setHumanizedAccessControlConditions([]);
  }

  const updateLogicOperator = async (value, localIndex, nestedIndex = null) => {
    let updatedAcc = [...accessControlConditions];
    if (!!nestedIndex) {
      updatedAcc[localIndex][nestedIndex].operator = value;
    } else {
      updatedAcc[localIndex].operator = value;
    }

    await updateState(updatedAcc);
  }

  const updateState = async (acc) => {
    const cleanedAcc = cleanAccessControlConditions(acc);
    const humanizedData = await humanizeNestedConditions([...cleanedAcc]);
    setHumanizedAccessControlConditions([...humanizedData]);
    setAccessControlConditions([...cleanedAcc]);
  }

  const handleClose = () => {
    if (accessControlConditions.length) {
      setShowConfirmationModal(true);
    } else {
      resetModal();
      onClose();
    }
  }

  const resetModal = () => {
    setFlow('singleCondition');
    setDisplayedPage('single');
    clearAllAccessControlConditions();
  }

  const handleConfirmModalClose = (modalResponse) => {
    if (modalResponse === 'yes') {
      resetModal();
      setShowConfirmationModal(false);
      onClose();
    } else {
      setShowConfirmationModal(false);
    }
  }

  const sendAccessControlConditions = (conditionsAreUpdatable) => {
    const keyParams = {
      accessControlConditions,
      permanent: !conditionsAreUpdatable
    }
    onAccessControlConditionsSelected(keyParams);
    resetModal();
    onClose();
  }

  return (
    <div>
      {showModal && (
        <div className={'lsm-top-modal-overlay md:lsm-bg-modal-overlay'}>
          <div className={'lsm-bg-white lsm-border lsm-border-brand-4 lsm-top-modal '}>
            <ShareModalContext.Provider value={{
              handleUpdateAccessControlConditions,
              handleDeleteAccessControlCondition,
              clearAllAccessControlConditions,
              updateLogicOperator,
              handleClose,
              sendAccessControlConditions,
              resetModal,
              setError,
              setDisplayedPage,
              setFlow,
              humanizedAccessControlConditions,
              accessControlConditions,
              displayPage,
              tokenList,
              flow,
              chainOptions,
              defaultTokens,
            }}>
              {displayPage === 'single' && (
                <SingleCondition/>
              )}
              {displayPage === 'multiple' && (
                <MultipleConditions humanizedAccessControlConditions={humanizedAccessControlConditions}/>
              )}
              {displayPage === 'review' && (
                <ReviewConditions humanizedAccessControlConditions={humanizedAccessControlConditions}/>
              )}
              <LitConfirmationModal message={'Are you sure you want to close the modal?'}
                                    showConfirmationModal={showConfirmationModal}
                                    onClick={handleConfirmModalClose}/>
            </ShareModalContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareModal;
