import React, { useContext, useEffect, useState } from "react";
import trashcan from "../../assets/trashcan.svg";
import uparrow from "../../assets/uparrow.svg";
import { ShareModalContext } from "../../shareModal/ShareModal";
import LitDeleteModal from "../litDeleteModal/LitDeleteModal";
import './LitMultipleConditionOrganizer.css';
import { colorArray, darkColorArray } from "../../helpers/colorArray";

const poapKeys = {
  "=": "equals",
  "contains": "containing"
}

const LitMultipleConditionOrganizer = ({ createCondition, humanizedAccessControlConditions }) => {
  const {
    handleDeleteAccessControlCondition,
    updateLogicOperator,
  } = useContext(ShareModalContext);

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
      return 'lms-border lms-border-black lms-rounded'
    } else {
      return 'lms-border-none';
    }
  }

  return (
    <div className={'lms-mb-20 lms-width lms-interior-scroll'}>
      {humanizedAccessControlConditions.length > 0 && humanizedAccessControlConditions.map((a, i) => {
        if (Array.isArray(a) && a[0].humanizedAcc === 'Owns any POAP') {
          return (
            <div
              className={'lms-condition-organizer-group lms-condition-shadow'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'lms-humanized-condition-text-container'}>
                <span className={'lms-overflow-auto lms-humanized-condition-text lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>
                  {a[2].humanizedAcc}
                </span>
                <span>
                  <button className={'lms-mr-1 lms-border-none lms-bg-transparent lms-cursor-pointer'}>
                    <img src={trashcan} onClick={() => {
                      setAccType('POAP');
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
            </div>
          )
        } else if (Array.isArray(a)) {
          return (
            <div
              className={'lms-condition-organizer-group lms-condition-shadow'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              {a.map((n, ni) => {
                if (!n['operator']) {
                  return (
                    <span className={'lms-humanized-condition-text-container'}
                          key={`n-${ni}`}>
                      <span className={'lms-overflow-auto lms-humanized-condition-text lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>
                        {n.humanizedAcc}
                      </span>
                      <span>
                        <button className={'lms-mr-1 lms-border-none lms-bg-transparent lms-cursor-pointer'}>
                          <img src={trashcan} onClick={() => {
                            setCurrentAccIndex([i, ni]);
                            setShowDeleteModal(true);
                          }}/>
                        </button>
                      </span>
                    </span>
                  )
                } else {
                  return (
                    <span className={'lms-flex lms-flex-row lms-w-8/12 lms-mx-auto lms-rounded lms-py-3 lms-justify-center lms-items-center lms-my-2'}
                          key={`n-${ni}`}>
                      <button onClick={() => updateLogicOperator('and', i, ni)}
                              className={`lms-cursor-pointer lms-mr-8 lms-bg-transparent lms-text-sm md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('and', n['operator'])}`}>
                        AND
                      </button>
                      <button onClick={() => updateLogicOperator('or', i, ni)}
                              className={`lms-cursor-pointer lms-text-sm lms-bg-transparent md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('or', n['operator'])}`}>
                        OR
                      </button>
                    </span>
                  )
                }
              })}
              <span className={'lms-flex lms-flex-row lms-mt-4 lms-width lms-mx-auto lms-justify-center lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-choose-access-button'}>
                <button className={'lms-flex lms-flex-row lms-px-4 lms-mx-auto lms-justify-center lms-bg-white lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-choose-access-button'}
                        onClick={() => createCondition(true, i)}>
                  <p className={'lms-mx-auto lms-bg-white'}>Define Another Nested Condition</p>
                </button>
              </span>
            </div>
          )
        } else if (!a['operator']) {
          return (
            <div
              className={'lms-condition-organizer-group lms-condition-shadow '}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'lms-humanized-condition-text-container'}>
                <span className={'lms-overflow-auto lms-humanized-condition-text lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>
                  {humanizedAccessControlConditions[i].humanizedAcc}
                </span>
                <span>
                  <button className={'lms-mr-1 lms-border-none lms-bg-transparent lms-cursor-pointer'}>
                    <img src={trashcan} onClick={() => {
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
              <span className={'lms-flex lms-flex-row lms-mt-4 lms-width lms-mx-auto lms-justify-center lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-choose-access-button'}>
                <button className={'lms-bg-white lms-border-brand-4 lms-text-brand-4 lms-define-condition-button'}
                        onClick={() => createCondition(true, i)}>
                  <p className={'lms-mx-auto lms-bg-white'}>Define Another Nested Condition</p>
                  {/* <img src={add}/> */}
                </button>
              </span>
            </div>
          )
        } else {
          return (
            <span className={'lms-flex lms-flex-row lms-w-8/12 lms-mx-auto lms-rounded lms-py-3 lms-justify-center lms-items-center lms-my-2'}
                  key={i}>
              <button onClick={() => updateLogicOperator('and', i)}
                      className={`lms-cursor-pointer lms-mr-8 lms-bg-transparent lms-text-sm md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('and', a['operator'])}`}>
                AND
              </button>
              <button onClick={() => updateLogicOperator('or', i)}
                      className={`lms-cursor-pointer lms-text-sm lms-bg-transparent md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('or', a['operator'])}`}>
                OR
              </button>
            </span>
          )
        }
      })}
        {humanizedAccessControlConditions.length ? (
          <span className={'lms-flex lms-flex-row lms-width lms-justify-center lms-mx-auto lms-mt-4 lms-rounded'}>
            <button className={'lms-bg-white lms-border-brand-4 lms-text-brand-4 lms-define-condition-button'} onClick={() => createCondition()}>
              <p className={'lms-bg-white'}>Define Another Condition</p>
            </button>
          </span>
        ) : (
          <div className={'lms-flex lms-flex-col lms-items-center'}>
            <span className={'lms-condition-organizer-group lms-bg-initial-blue'}>
              <button className={'lms-bg-white lms-border-brand-4 lms-text-brand-4 lms-define-condition-button'} onClick={() => createCondition()}>
                <p className={'lms-bg-white'}>Define First Condition</p>
              </button>
            </span>
            <img className="lms-mr-16 lms-h-28" src={uparrow}/>
            <h3 className={"lms-text-left lms-mt-4 lms-w-9/12 lms-text-title-gray lms-font-segoe lms-text-base lms-font-light"}>
              Once you've added your first condition, you can add operators like “and" and “or" plus groups
            </h3>
          </div>
        )}
      <LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>
    </div>
  )
}

export default LitMultipleConditionOrganizer;
