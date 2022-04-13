import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import SingleCondition from "../generalComponents/SingleCondition";
import ReviewConditions from "../generalComponents/reviewConditions/ReviewConditions";
import MultipleConditions from "../generalComponents/MultipleConditions";
import { ShareModalContext } from "./createShareContext";

import baseCss from "../index.css";
import modalCss from "./ShareModal.css";
import cssFile0 from "../reusableComponents/litReusableSelect/LitReusableSelect.css";
import cssFile1 from "../reusableComponents/litHeader/LitHeader.css";
import cssFile2 from "../reusableComponents/litConfirmationModal/LitConfirmationModal.css";
import cssFile3 from "../reusableComponents/litTokenSelect/LitTokenSelect.css";
import cssFile4 from "../reusableComponents/litFooter/LitNextButton.css";
import cssFile5 from "../reusableComponents/litFooter/LitFooter.css";
import cssFile6 from "../reusableComponents/litFooter/LitBackButton.css";
import cssFile7 from "../reusableComponents/litSimpleDropdown/LitSimpleDropdown.css";
import cssFile8 from "../reusableComponents/litMultipeConditionOrganizer/LitMultipleConditionOrganizer.css";
import cssFile9 from "../reusableComponents/litDeleteModal/LitDeleteModal.css";
import cssFile10 from "../generalComponents/reviewConditions/ReviewConditions.css";

import LitJsSdk from "lit-js-sdk";
import { TOP_LIST } from "../helpers/topList";
import {
  humanizeNestedConditions,
  cleanAccessControlConditions,
} from "../helpers/multipleConditionHelpers";
import LitConfirmationModal from "../reusableComponents/litConfirmationModal/LitConfirmationModal";

const ShareModal = (props) => {
  const [displayPage, setDisplayedPage] = useState("single");
  const [error, setError] = useState(null);
  const [accessControlConditions, setAccessControlConditions] = useState([]);
  const [
    humanizedAccessControlConditions,
    setHumanizedAccessControlConditions,
  ] = useState([]);
  const [flow, setFlow] = useState("singleCondition");
  const [tokenList, setTokenList] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  // export const ShareModalContext = createContext({});

  const {
    onClose = () => false,
    onBack = () => false,
    // TODO: showModal needs to start as false
    showModal = true,
    onAccessControlConditionsSelected,
    defaultTokens = TOP_LIST,
    injectCSS = true,
  } = props;

  useEffect(() => {
    resetModal();
  }, [props.showModal])

  useEffect(() => {
    getTokens();
  }, []);

  useEffect(() => {
    if (injectCSS) {
      // concat the CSS
      const allCss =
        baseCss +
        "\n" +
        modalCss +
        "\n" +
        cssFile0 +
        "\n" +
        cssFile1 +
        "\n" +
        cssFile2 +
        "\n" +
        cssFile3 +
        "\n" +
        cssFile4 +
        "\n" +
        cssFile5 +
        "\n" +
        cssFile6 +
        "\n" +
        cssFile7 +
        "\n" +
        cssFile8 +
        "\n" +
        cssFile9 +
        "\n" +
        cssFile10;
      // inject the CSS
      var style = document.createElement("style");
      style.innerHTML = allCss;
      document.head.appendChild(style);
    }
  }, [injectCSS]);

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

  document.addEventListener("lit-ready", function (e) {
  }, false);

  const getTokens = async () => {
    // get token list and cache it
    try {
      const tokens = await LitJsSdk.getTokenList();
      setTokenList(tokens);
    } catch (err) {
      setError(err)
    }
  };

  const handleDeleteAccessControlCondition = async (
    localIndex,
    nestedIndex
  ) => {
    const updatedAcc = accessControlConditions;
    // TODO: create nested delete

    if (nestedIndex === null) {
      if (localIndex > 1 && localIndex === updatedAcc.length - 1) {
        updatedAcc.splice(-2);
      } else {
        updatedAcc.splice(updatedAcc[localIndex], 2);
      }
    } else {
      if (
        nestedIndex !== 0 &&
        nestedIndex === updatedAcc[localIndex].length - 1
      ) {
        updatedAcc[localIndex].splice(-2);
      } else {
        updatedAcc[localIndex].splice(updatedAcc[localIndex][nestedIndex], 2);
      }
    }

    await updateState(updatedAcc);

    if (updatedAcc.length === 0 && flow === "singleCondition") {
      setDisplayedPage("single");
    }
  };

  const checkForAddingOperatorToCondition = (
    acc,
    newAccessControlCondition
  ) => {
    const updatedAcc = acc;
    if (!acc.length && newAccessControlCondition[0]) {
      updatedAcc.push(newAccessControlCondition[0]);
    } else {
      updatedAcc.push({ operator: "and" });
      updatedAcc.push(newAccessControlCondition[0]);
    }
    return updatedAcc;
  };

  const handleUpdateAccessControlConditions = async (
    newAccessControlCondition,
    isNested = false,
    index = null
  ) => {
    let updatedAcc = [...accessControlConditions];
    if (!newAccessControlCondition[0]) {
      return;
    }

    if (isNested) {
      if (Array.isArray(updatedAcc[index])) {
        updatedAcc[index] = checkForAddingOperatorToCondition(
          updatedAcc[index],
          newAccessControlCondition
        );
      } else {
        let nestedUpdatedAcc = checkForAddingOperatorToCondition(
          [updatedAcc[index]],
          newAccessControlCondition
        );
        updatedAcc[index] = nestedUpdatedAcc;
      }
    } else {
      updatedAcc = checkForAddingOperatorToCondition(
        updatedAcc,
        newAccessControlCondition
      );
    }
    await updateState(updatedAcc);
  };

  const clearAllAccessControlConditions = () => {
    setAccessControlConditions([]);
    setHumanizedAccessControlConditions([]);
  };

  const updateLogicOperator = async (value, localIndex, nestedIndex = null) => {
    let updatedAcc = [...accessControlConditions];
    if (nestedIndex) {
      updatedAcc[localIndex][nestedIndex].operator = value;
    } else {
      updatedAcc[localIndex].operator = value;
    }

    await updateState(updatedAcc);
  };

  const updateState = async (acc) => {
    const cleanedAcc = cleanAccessControlConditions(acc);
    const humanizedData = await humanizeNestedConditions([...cleanedAcc]);
    setHumanizedAccessControlConditions([...humanizedData]);
    setAccessControlConditions([...cleanedAcc]);
  };

  const handleClose = () => {
    if (accessControlConditions.length) {
      setShowConfirmationModal(true);
    } else {
      resetModal();
      onClose();
    }
  };

  const resetModal = () => {
    setFlow("singleCondition");
    setDisplayedPage("single");
    clearAllAccessControlConditions();
    setError(null);
  };

  const handleConfirmModalClose = (modalResponse) => {
    if (modalResponse === "yes") {
      resetModal();
      setShowConfirmationModal(false);
      onClose();
    } else {
      setShowConfirmationModal(false);
    }
  };

  const sendAccessControlConditions = (conditionsAreUpdatable) => {
    const keyParams = {
      accessControlConditions,
      permanent: !conditionsAreUpdatable,
      chain: 'ethereum'
    };
    onAccessControlConditionsSelected(keyParams);
  };

  return (
    <div>
      {showModal && (
        <div className={"lsm-top-modal-overlay md:lsm-bg-modal-overlay"} onClick={() => onClose()}>
          <div
            className={"lsm-css-reset lsm-bg-white lsm-border lsm-border-brand-4 lsm-top-modal"}
            onClick={e => e.stopPropagation()}
          >
            {!error ? (
              <ShareModalContext.Provider
                value={{
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
                }}
              >
                {displayPage === "single" && <SingleCondition/>}
                {displayPage === "multiple" && (
                  <MultipleConditions
                    humanizedAccessControlConditions={
                      humanizedAccessControlConditions
                    }
                    accessControlConditions={
                      accessControlConditions
                    }
                  />
                )}
                {displayPage === "review" && (
                  <ReviewConditions
                    humanizedAccessControlConditions={
                      humanizedAccessControlConditions
                    }
                    accessControlConditions={
                      accessControlConditions
                    }
                  />
                )}
                <LitConfirmationModal
                  message={"Are you sure you want to close the modal?"}
                  showConfirmationModal={showConfirmationModal}
                  onClick={handleConfirmModalClose}
                />
              </ShareModalContext.Provider>
            ) : (
              <span className={'lsm-error-display'}>
                <p className={'lsm-font-segoe lsm-text-brand-5'}>An error occurred with an external API:</p>
                <p className={'lsm-font-segoe'}>{error}</p>
                <p className={'lsm-font-segoe lsm-text-brand-5'}>Please close and reopen the modal to reconnect.</p>
                <button className={'lsm-error-button lsm-bg-brand-4'} onClick={onClose}>Close</button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareModal;
