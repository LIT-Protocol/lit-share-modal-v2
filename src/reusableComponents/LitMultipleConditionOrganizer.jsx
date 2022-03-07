import React, { useContext, useEffect, useState } from "react";
import trashcan from "../assets/trashcan.svg";
import add from "../assets/add.svg";
import uparrow from "../assets/uparrow.svg";
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitDeleteModal from "./LitDeleteModal";

const LitMultipleConditionOrganizer = ({ createCondition, humanizedAccessControlConditions }) => {
  const {
    handleDeleteAccessControlCondition,
    updateLogicOperator,
  } = useContext(ShareModalContext);

  const [currentAccIndex, setCurrentAccIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const colorArray = [
    'rgba(0, 148, 255, .22)',
    'rgba(255,0,0,0.22)',
    'rgba(255, 230, 0, 0.22)',
    'rgba(0,255,87,0.22)',
    'rgba(255,153,0,0.5)',
    'rgba(183,0,255,0.5)',
    'rgba(0,255,187,0.5)',
    'rgba(0, 148, 255, .22)',
    'rgba(255,0,0,0.22)',
    'rgba(0,255,87,0.22)',
    'rgba(255,153,0,0.5)',
    'rgba(183,0,255,0.5)',
    'rgba(0,255,187,0.5)',
  ]

  const handleDelete = (modalResponse) => {
    if (modalResponse === 'yes') {
      console.log('CURRENT ACC INDEX', currentAccIndex)
      currentAccIndex.length === 1 ?
        handleDeleteAccessControlCondition(currentAccIndex[0], null) :
        handleDeleteAccessControlCondition(currentAccIndex[0], currentAccIndex[1])
    }

    setCurrentAccIndex(null);
    setShowDeleteModal(false);
  }

  const checkOperator = (operator, value) => {
    if (operator === value) {
      return 'lms-border lms-border-black lms-rounded'
    } else {
      return '';
    }
  }

  return (
    <div className={'lms-mt-4 lms-mb-20'}>
      {humanizedAccessControlConditions.length > 0 && humanizedAccessControlConditions.map((a, i) => {
        if (Array.isArray(a)) {
          return (
            <div
              className={'lms-flex lms-flex-col lms-w-11/12 lms-mx-auto lms-rounded lms-p-3 lms-justify-between lms-items-center lms-condition-shadow '}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              {a.map((n, ni) => {
                if (!n['operator']) {
                  return (
                    <span className={'lms-flex lms-flex-row lms-w-11/12 lms-justify-between lms-items-center'}
                          key={`n-${ni}`}>
                      {/* <span className={'lms-mr-4 lms-flex lms-flex-row lms-w-full lms-mx-auto lms-justify-center lms-bg-white lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-p-1 lms-break-words lms-text-left lms-overflow-auto lms-choose-access-button '}> */}
                      <span className={'lms-mr-4 lms-flex lms-flex-row lms-w-full lms-mx-auto lms-justify-center lms-p-1 lms-break-words lms-text-left lms-overflow-auto lms-choose-access-button '}>
                        {n.humanizedAcc}
                      </span>
                      <span>
                        <button className={'lms-mr-1'}>
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
                    <span className={'lms-flex lms-flex-row lms-w-8/12 lms-mx-auto lms-rounded lms-py-3 lms-px-4 lms-justify-center lms-items-center lms-my-2'}
                          key={`n-${ni}`}>
                      <button onClick={() => updateLogicOperator('and', i, ni)}
                              className={`mr-8 lms-text-sm md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('and', n['operator'])}`}>
                        AND
                      </button>
                      <button onClick={() => updateLogicOperator('or', i, ni)}
                              className={`text-sm md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('or', n['operator'])}`}>
                        OR
                      </button>
                    </span>
                  )
                }
              })}
              {/* <span className={'lms-flex lms-flex-row lms-w-11/12 lms-justify-center lms-mx-auto lms-mt-4 lms-rounded lms-py-2'}> */}
              <span className={'lms-mr-4 lms-flex lms-flex-row lms-mt-4 lms-w-full lms-mx-auto lms-justify-center lms-bg-white lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-p-1 lms-choose-access-button'}>
                <button className={'lms-flex lms-flex-row lms-w-full'} onClick={() => createCondition(true, i)}>
                  <p className={'lms-mx-auto lms-bg-white'}>Define Another Nested Condition</p>
                  {/* <img src={add}/> */}
                </button>
              </span>
            </div>
          )
        } else if (!a['operator']) {
          return (
            <div
              className={'lms-flex lms-flex-col lms-w-11/12 lms-mx-auto lms-rounded lms-p-3 lms-justify-between lms-items-center lms-condition-shadow '}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'lms-flex lms-flex-row lms-w-full lms-justify-between lms-items-center'}>
                {/* <span className={'lms-mr-4 lms-flex lms-flex-row lms-w-full lms-mx-auto lms-justify-center lms-bg-white lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-p-1 lms-break-words lms-text-left lms-overflow-auto lms-choose-access-button '}> */}
                <span className={'lms-mr-4 lms-flex lms-flex-row lms-w-full lms-mx-auto lms-justify-center lms-p-1 lms-break-words lms-text-left lms-overflow-auto lms-choose-access-button '}>
                  {humanizedAccessControlConditions[i].humanizedAcc}
                </span>
                <span>
                  <button className={'lms-mr-1'}>
                    <img src={trashcan} onClick={() => {
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
              <span className={'lms-mr-4 lms-flex lms-flex-row lms-mt-4 lms-w-full lms-mx-auto lms-justify-center lms-bg-white lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-p-1 lms-choose-access-button'}>
                <button className={'lms-flex lms-flex-row lms-w-full'} onClick={() => createCondition(true, i)}>
                  <p className={'lms-mx-auto lms-bg-white'}>Define Another Nested Condition</p>
                  {/* <img src={add}/> */}
                </button>
              </span>
            </div>
          )
        } else {
          return (
            <span className={'lms-flex lms-flex-row lms-w-8/12 lms-mx-auto lms-rounded lms-py-3 lms-px-4 lms-justify-center lms-items-center lms-my-2'}
                  key={i}>
              <button onClick={() => updateLogicOperator('and', i)}
                      className={`mr-8 lms-text-sm md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('and', a['operator'])}`}>
                AND
              </button>
              <button onClick={() => updateLogicOperator('or', i)}
                      className={`text-sm md:lms-text-base lms-text-center lms-p-2 lms-w-20 ${checkOperator('or', a['operator'])}`}>
                OR
              </button>
            </span>
          )
        }
      })}
        {humanizedAccessControlConditions.length ? (
          <span className={'lms-flex lms-flex-row lms-w-11/12 lms-justify-center lms-mx-auto lms-mt-4 lms-rounded'}>
            {/* <button className={'lms-flex lms-flex-row lms-w-11/12 lms-mx-auto lms-justify-center'} onClick={() => createCondition()}> */}
            <button className={'lms-flex lms-flex-row lms-w-full lms-mx-auto lms-justify-center lms-bg-white lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-p-1 lms-choose-access-button'} onClick={() => createCondition()}>
              <p className={'lms-bg-white'}>Define Another Condition</p>
              {/* <img src={add}/> */}
            </button>
          </span>
        ) : (
          <div className={'lms-flex lms-flex-col lms-items-center'}>
            <span className={'lms-flex lms-flex-col lms-w-11/12 lms-mx-auto lms-rounded lms-p-4 lms-justify-between lms-items-center lms-mb-4 lms-bg-initial-blue'}>
              <button className={'lms-flex lms-flex-row lms-w-full lms-mx-auto lms-justify-center lms-bg-white lms-border-brand-4 lms-border lms-rounded lms-text-brand-4 lms-p-1 lms-choose-access-button'} onClick={() => createCondition()}>
                <p className={'lms-bg-white'}>Define First Condition</p>
                {/* <img src={add}/> */}
              </button>
            </span>
            <img className="lms-mr-16 lms-h-28" src={uparrow}/>
            <h3 className={"lms-text-base lms-text-center lms-mt-4 lms-w-9/12 lms-text-dark-gray md:lms-text-base"}>
              Once you've added your first condition, you can add operators like “and" and “or" plus groups
            </h3>
          </div>
        )}
      <LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>
    </div>
  )
}

export default LitMultipleConditionOrganizer;
