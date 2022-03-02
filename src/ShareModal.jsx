import React, { createContext, useEffect, useContext, useReducer, useMemo, useState } from 'react';
import SingleCondition from "./generalComponents/SingleCondition";
import ReviewConditions from "./generalComponents/ReviewConditions";
import MultipleConditions from "./generalComponents/MultipleConditions";

import LitJsSdk from "lit-js-sdk";
import { TOP_LIST } from "./helpers/topList";
import { humanizeNestedConditions, cleanAccessControlConditions } from "./helpers/multipleConditionHelpers";
import LitConfirmationModal from "./reusableComponents/LitConfirmationModal";

export const ShareModalContext = createContext({});

const ShareModal = (props) => {
  const {
    onClose = () => false,
    onBack = () => false,
    // TODO: showModal needs to start as false
    showModal = false,
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
      console.log("Lit client ready");
    },
    false
  );


  const handleDeleteAccessControlCondition = async (localIndex, nestedIndex) => {
    const updatedAcc = accessControlConditions;
    // TODO: create nested delete
    console.log('INDEX LIST, local:', localIndex, 'Nested', nestedIndex)

    if (nestedIndex === null) {
      if (localIndex > 1 && localIndex === updatedAcc.length - 1) {
        updatedAcc.splice(updatedAcc[localIndex - 1], 2);
      } else {
        updatedAcc.splice(updatedAcc[localIndex], 2);
      }
    } else {
      console.log('1. NESTED START', updatedAcc[localIndex])
      if (nestedIndex > 1 && nestedIndex === updatedAcc[localIndex].length - 1) {
        console.log('2. LONG NESTED START', updatedAcc[localIndex]);
        updatedAcc[localIndex].splice(updatedAcc[localIndex][nestedIndex - 1], 2);
        console.log('2. LONG NESTED END', updatedAcc[localIndex]);

      } else {
        console.log('2. SHORT NESTED START', updatedAcc)
        updatedAcc[localIndex].splice(updatedAcc[localIndex][nestedIndex], 2);
        console.log('2. SHORT NESTED END', updatedAcc)
      }
    }

    await updateState(updatedAcc);

    if (updatedAcc.length === 0 && flow === 'singleCondition') {
      setDisplayedPage('single');
    }
  }

  const checkForAddingOperatorToCondition = (acc, newAccessControlCondition) => {
    const updatedAcc = acc;
    console.log('Check for adding, updatedAcc', updatedAcc)
    if (!acc.length && newAccessControlCondition[0]) {
      updatedAcc.push(newAccessControlCondition[0]);
    } else {
      console.log('Check to add new nested condition')
      updatedAcc.push({ operator: 'and' });
      updatedAcc.push(newAccessControlCondition[0]);
      console.log('end of adding new nested condition', updatedAcc)
    }
    return updatedAcc;
  }

  const handleUpdateAccessControlConditions = async (newAccessControlCondition, isNested = false, index = null) => {
    console.log('---> handle update, nested:', isNested, 'index', index)
    let updatedAcc = [...accessControlConditions];
    if (!newAccessControlCondition[0]) {
      return;
    }

    if (isNested) {
      if (Array.isArray(updatedAcc[index])) {
        console.log('Handle update, already array')
        updatedAcc[index] = checkForAddingOperatorToCondition(updatedAcc[index], newAccessControlCondition);
      } else {
        console.log('Handle update, not array')
        let nestedUpdatedAcc = checkForAddingOperatorToCondition([updatedAcc[index]], newAccessControlCondition);
        console.log('Handle update, nestedUpdatedAcc', nestedUpdatedAcc)
        updatedAcc[index] = nestedUpdatedAcc;
        console.log('After updateAcc', updatedAcc)
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
    console.log('start of update logic operator', value, localIndex, nestedIndex)
    let updatedAcc = [...accessControlConditions];
    console.log('udpated acc', updatedAcc[nestedIndex])
    if (!!nestedIndex) {
      console.log('nested', nestedIndex, localIndex)
      updatedAcc[localIndex][nestedIndex].operator = value;
    } else {
      updatedAcc[localIndex].operator = value;
    }

    await updateState(updatedAcc);
  }

  const updateState = async (acc) => {
    const cleanedAcc = cleanAccessControlConditions(acc);
    const humanizedData = await humanizeNestedConditions([...cleanedAcc]);
    console.log('---> UPDATE STATE', humanizedData)
    setHumanizedAccessControlConditions([...humanizedData]);
    setAccessControlConditions([...cleanedAcc]);
    console.log('CLEANED AND UPDATED', cleanedAcc)
  }

  const handleClose = () => {
    if (accessControlConditions.length) {
      setShowConfirmationModal(true);
    } else {
      clearAllAccessControlConditions();
      console.log('CLOSE YO!');
      // TODO: handle on close
      // onClose();
    }
  }

  const handleConfirmModalClose = (modalResponse) => {
    if (modalResponse === 'yes') {
      clearAllAccessControlConditions();
      console.log('CLOSE TRHOUGH THE MODAL YO!');
    }

    setShowConfirmationModal(false);
  }

  const sendAccessControlConditions = () => {
    onAccessControlConditionsSelected(accessControlConditions);
  }

  return (
    <div>
      {showModal && (
        <ShareModalContext.Provider value={{
          handleUpdateAccessControlConditions,
          handleDeleteAccessControlCondition,
          clearAllAccessControlConditions,
          updateLogicOperator,
          handleClose,
          humanizedAccessControlConditions,
          accessControlConditions,
          setError,
          setDisplayedPage,
          displayPage,
          tokenList,
          flow,
          setFlow,
          chainOptions,
          defaultTokens,
          sendAccessControlConditions
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
      )}
    </div>
  );
};

export default ShareModal;
