import React, { useContext, useEffect, useState } from "react";
import trashcan from "../../assets/trashcan.svg";
import lighttrashcan from "../../assets/lighttrashcan.svg";
import uparrow from "../../assets/uparrow.svg";
import lightuparrow from "../../assets/lightuparrow.svg";
import { ShareModalContext } from "../../shareModal/createShareContext.js";
import LitDeleteModal from "../litDeleteModal/LitDeleteModal";
import './LitMultipleConditionOrganizer.css';
import { colorArray, darkColorArray } from "../../helpers/colorArray";

const poapKeys = {
  "=": "equals",
  "contains": "containing"
}

const LitMultipleConditionOrganizer = ({
                                         createCondition,
                                         humanizedAccessControlConditions,
                                         accessControlConditions
                                       }) => {
  const {
    handleDeleteAccessControlCondition,
    updateLogicOperator,
    darkTheme
  } = useContext(ShareModalContext);

  useEffect(() => {
    console.log('humanizedAccessControlConditions', humanizedAccessControlConditions)
  }, [humanizedAccessControlConditions]);

  const [currentAccIndex, setCurrentAccIndex] = useState(null);
  const [accType, setAccType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (modalResponse) => {
    if (modalResponse === 'yes') {
      if (accType === 'paop') {
        handleDeleteAccessControlCondition(currentAccIndex[0], null)
        return;
      }
      currentAccIndex.length === 1 ?
        handleDeleteAccessControlCondition(currentAccIndex[0], null) :
        handleDeleteAccessControlCondition(currentAccIndex[0], currentAccIndex[1])
    }

    setCurrentAccIndex(null);
    setAccType(null);
    setShowDeleteModal(false);
  }

  const checkOperator = (operator, value) => {
    if (operator === value) {
      return 'lsm-border-standard lsm-border-black lsm-rounded'
    } else {
      return 'lsm-border-none';
    }
  }

  return (
    <div className={'lsm-mb-20 lsm-width lsm-interior-scroll'}>
      {humanizedAccessControlConditions.length > 0 && humanizedAccessControlConditions.map((a, i) => {
        if (Array.isArray(a)
          && a.length === 3
          && a[0].humanizedAcc.includes('POAP')
          && a[2].humanizedAcc.includes('POAP')) {
          return (
            <div
              className={'lsm-condition-organizer-group lsm-condition-shadow'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'lsm-humanized-condition-text-container'}>
                <div className={'lsm-multiple-condition-group'}>
                  <span
                    className={'lsm-overflow-auto dark:lsm-text-gray lsm-humanized-condition-text lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>
                    {a[0].humanizedAcc}
                  </span>
                  <span
                    className={'lsm-overflow-auto dark:lsm-text-gray lsm-humanized-condition-text lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>
                    OR
                  </span>
                  <span
                    className={'lsm-overflow-auto dark:lsm-text-gray lsm-humanized-condition-text lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>
                    {a[2].humanizedAcc}
                  </span>
                </div>
                <button className={'lsm-mr-1 lsm-border-none lsm-bg-transparent lsm-cursor-pointer'}>
                  <img src={darkTheme ? lighttrashcan : trashcan} onClick={() => {
                    setAccType('POAP');
                    setCurrentAccIndex([i]);
                    setShowDeleteModal(true);
                  }}/>
                </button>
              </span>
            </div>
          )
        } else if (Array.isArray(a)) {
          return (
            <div
              className={'lsm-condition-organizer-group lsm-condition-shadow'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              {a.map((n, ni) => {
                if (!n['operator']) {
                  return (
                    <span className={'lsm-humanized-condition-text-container'}
                          key={`n-${ni}`}>
                      <span
                        className={'lsm-overflow-auto lsm-humanized-condition-text lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>
                        {n.humanizedAcc}
                      </span>
                      <span>
                        <button className={'lsm-mr-1 lsm-border-none lsm-bg-transparent lsm-cursor-pointer'}>
                          <img src={darkTheme ? lighttrashcan : trashcan} onClick={() => {
                            setCurrentAccIndex([i, ni]);
                            setShowDeleteModal(true);
                          }}/>
                        </button>
                      </span>
                    </span>
                  )
                } else {
                  return (
                    <span
                      className={'lsm-flex lsm-flex-row lsm-w-8/12 lsm-mx-auto lsm-rounded lsm-py-3 lsm-justify-center lsm-items-center lsm-my-2'}
                      key={`n-${ni}`}>
                      <button onClick={() => updateLogicOperator('and', i, ni)}
                              className={`lsm-cursor-pointer lsm-mr-8 lsm-bg-transparent lsm-text-title-gray lsm-text-sm md:lsm-text-base lsm-text-center dark:lsm-text-gray dark:lsm-border-gray-2 lsm-p-2 lsm-w-20 ${checkOperator('and', n['operator'])}`}>
                        AND
                      </button>
                      <button onClick={() => updateLogicOperator('or', i, ni)}
                              className={`lsm-cursor-pointer lsm-text-sm lsm-text-title-gray lsm-bg-transparent md:lsm-text-base lsm-text-center dark:lsm-text-gray dark:lsm-border-gray-2 lsm-p-2 lsm-w-20 ${checkOperator('or', n['operator'])}`}>
                        OR
                      </button>
                    </span>
                  )
                }
              })}
              <span
                className={'lsm-flex lsm-flex-row lsm-mt-4 lsm-width lsm-mx-auto lsm-justify-center lsm-border-gray-4 lsm-border-standard lsm-rounded lsm-text-title-gray lsm-choose-access-button'}>
                <button
                  className={'lsm-bg-white lsm-duration-200 hover:lsm-border-gray-5 lsm-border-gray-4 lsm-text-title-gray lsm-define-condition-button dark:lsm-border-gray-2 dark:lsm-bg-gray-7 dark:lsm-text-gray'}
                  onClick={() => createCondition(true, i)}>
                  Define Another Nested Condition
                </button>
              </span>
            </div>
          )
        } else if (!a['operator']) {
          return (
            <div
              className={'lsm-condition-organizer-group lsm-condition-shadow '}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'lsm-humanized-condition-text-container'}>
                <span
                  className={'lsm-overflow-auto lsm-humanized-condition-text lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>
                  {humanizedAccessControlConditions[i].humanizedAcc}
                </span>
                <span>
                  <button className={'lsm-mr-1 lsm-border-none lsm-bg-transparent lsm-cursor-pointer'}>
                    <img src={darkTheme ? lighttrashcan : trashcan} onClick={() => {
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
              <span
                className={'lsm-flex lsm-flex-row lsm-mt-4 lsm-width lsm-mx-auto lsm-justify-center lsm-border-gray-4 lsm-border-standard lsm-rounded lsm-text-title-gray lsm-choose-access-button'}>
                <button
                  className={'lsm-bg-white lsm-duration-200 hover:lsm-border-gray-5 lsm-border-gray-4 lsm-text-title-gray lsm-define-condition-button dark:lsm-border-gray-2 dark:lsm-bg-gray-7 dark:lsm-text-gray'}
                  onClick={() => createCondition(true, i)}>
                  Define Another Nested Condition
                  {/* <img src={add}/> */}
                </button>
              </span>
            </div>
          )
        } else {
          return (
            <span
              className={'lsm-flex lsm-flex-row lsm-w-8/12 lsm-mx-auto lsm-rounded lsm-py-3 lsm-justify-center lsm-items-center lsm-my-2'}
              key={i}>
              <button onClick={() => updateLogicOperator('and', i)}
                      className={`lsm-cursor-pointer lsm-mr-8 lsm-bg-transparent lsm-text-title-gray lsm-text-sm md:lsm-text-base lsm-text-center dark:lsm-text-gray dark:lsm-border-gray-2 lsm-p-2 lsm-w-20 ${checkOperator('and', a['operator'])}`}>
                AND
              </button>
              <button onClick={() => updateLogicOperator('or', i)}
                      className={`lsm-cursor-pointer lsm-text-sm lsm-text-title-gray lsm-bg-transparent md:lsm-text-base lsm-text-center dark:lsm-text-gray dark:lsm-border-gray-2 lsm-p-2 lsm-w-20 ${checkOperator('or', a['operator'])}`}>
                OR
              </button>
            </span>
          )
        }
      })}
      {humanizedAccessControlConditions.length ? (
        <span className={'lsm-flex lsm-flex-row lsm-width lsm-justify-center lsm-mx-auto lsm-mt-4 lsm-rounded'}>
            <button
              className={'lsm-bg-white lsm-duration-200 hover:lsm-border-gray-5 lsm-border-gray-4 lsm-text-title-gray lsm-define-condition-button dark:lsm-border-gray-2 dark:lsm-bg-gray-7 dark:lsm-text-gray'}
              onClick={() => createCondition()}>
              Define Another Condition
            </button>
          </span>
      ) : (
        <div className={'lsm-flex lsm-flex-col lsm-items-center'}>
            <span className={'lsm-condition-organizer-group'}
                  style={{ 'backgroundColor': colorArray[0] }}>
              <button
                className={'lsm-bg-white lsm-duration-200 hover:lsm-border-gray-5 lsm-border-gray-4 lsm-text-title-gray lsm-define-condition-button dark:lsm-border-gray-2 dark:lsm-bg-gray-7 dark:lsm-text-gray'}
                onClick={() => createCondition()}>
                Define First Condition
              </button>
            </span>
          <img className="lsm-mr-16 lsm-h-28" src={darkTheme ? lightuparrow : uparrow}/>
          <h3
            className={"lsm-text-left lsm-mt-4 lsm-w-9/12 lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light"}>
            Once you've added your first condition, you can add operators like ???and" and ???or" plus groups
          </h3>
        </div>
      )}
      <LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>
    </div>
  )
}

export default LitMultipleConditionOrganizer;
