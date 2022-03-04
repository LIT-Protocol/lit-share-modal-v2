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
      return 'border border-black rounded'
    } else {
      return '';
    }
  }

  return (
    <div className={'mt-4 mb-20'}>
      {humanizedAccessControlConditions.length > 0 && humanizedAccessControlConditions.map((a, i) => {
        if (Array.isArray(a)) {
          return (
            <div
              className={'flex flex-col w-11/12 mx-auto rounded p-3 justify-between items-center lms-condition-shadow '}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              {a.map((n, ni) => {
                if (!n['operator']) {
                  return (
                    <span className={'flex flex-row w-11/12 justify-between items-center'}
                          key={`n-${ni}`}>
                      {/* <span className={'mr-4 flex flex-row w-full mx-auto justify-center bg-white border-brand-4 border rounded text-brand-4 p-1 break-words text-left overflow-auto lms-choose-access-button '}> */}
                      <span className={'mr-4 flex flex-row w-full mx-auto justify-center p-1 break-words text-left overflow-auto lms-choose-access-button '}>
                        {n.humanizedAcc}
                      </span>
                      <span>
                        <button className={'mr-1'}>
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
                    <span className={'flex flex-row w-8/12 mx-auto rounded py-3 px-4 justify-center items-center my-2'}
                          key={`n-${ni}`}>
                      <button onClick={() => updateLogicOperator('and', i, ni)}
                              className={`mr-8 text-sm md:text-base text-center p-2 w-20 ${checkOperator('and', n['operator'])}`}>
                        AND
                      </button>
                      <button onClick={() => updateLogicOperator('or', i, ni)}
                              className={`text-sm md:text-base text-center p-2 w-20 ${checkOperator('or', n['operator'])}`}>
                        OR
                      </button>
                    </span>
                  )
                }
              })}
              {/* <span className={'flex flex-row w-11/12 justify-center mx-auto mt-4 rounded py-2'}> */}
              <span className={'mr-4 flex flex-row mt-4 w-full mx-auto justify-center bg-white border-brand-4 border rounded text-brand-4 p-1 lms-choose-access-button'}>
                <button className={'flex flex-row w-full'} onClick={() => createCondition(true, i)}>
                  <p className={'mx-auto'}>Define Another Nested Condition</p>
                  {/* <img src={add}/> */}
                </button>
              </span>
            </div>
          )
        } else if (!a['operator']) {
          return (
            <div
              className={'flex flex-col w-11/12 mx-auto rounded p-3 justify-between items-center border border-brand-4 lms-condition-shadow '}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'flex flex-row w-full justify-between items-center'}>
                {/* <span className={'mr-4 flex flex-row w-full mx-auto justify-center bg-white border-brand-4 border rounded text-brand-4 p-1 break-words text-left overflow-auto lms-choose-access-button '}> */}
                <span className={'mr-4 flex flex-row w-full mx-auto justify-center p-1 break-words text-left overflow-auto lms-choose-access-button '}>
                  {humanizedAccessControlConditions[i].humanizedAcc}
                </span>
                <span>
                  <button className={'mr-1'}>
                    <img src={trashcan} onClick={() => {
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
              <span className={'mr-4 flex flex-row mt-4 w-full mx-auto justify-center bg-white border-brand-4 border rounded text-brand-4 p-1 lms-choose-access-button'}>
                <button className={'flex flex-row w-full'} onClick={() => createCondition(true, i)}>
                  <p className={'mx-auto'}>Define Another Nested Condition</p>
                  {/* <img src={add}/> */}
                </button>
              </span>
            </div>
          )
        } else {
          return (
            <span className={'flex flex-row w-8/12 mx-auto rounded py-3 px-4 justify-center items-center my-2'}
                  key={i}>
              <button onClick={() => updateLogicOperator('and', i)}
                      className={`mr-8 text-sm md:text-base text-center p-2 w-20 ${checkOperator('and', a['operator'])}`}>
                AND
              </button>
              <button onClick={() => updateLogicOperator('or', i)}
                      className={`text-sm md:text-base text-center p-2 w-20 ${checkOperator('or', a['operator'])}`}>
                OR
              </button>
            </span>
          )
        }
      })}
        {humanizedAccessControlConditions.length ? (
          <span className={'flex flex-row w-11/12 justify-center mx-auto mt-4 rounded'}>
            {/* <button className={'flex flex-row w-11/12 mx-auto justify-center'} onClick={() => createCondition()}> */}
            <button className={'flex flex-row w-full mx-auto justify-center bg-white border-brand-4 border rounded text-brand-4 p-1 lms-choose-access-button'} onClick={() => createCondition()}>
              <p className={''}>Define Another Condition</p>
              {/* <img src={add}/> */}
            </button>
          </span>
        ) : (
          <div className={'flex flex-col items-center'}>
            <span className={'flex flex-col w-11/12 mx-auto rounded p-4 justify-between items-center mb-4 bg-initial-blue'}>
              <button className={'flex flex-row w-full mx-auto justify-center bg-white border-brand-4 border rounded text-brand-4 p-1 lms-choose-access-button'} onClick={() => createCondition()}>
                <p className={''}>Define First Condition</p>
                {/* <img src={add}/> */}
              </button>
            </span>
            <img className="mr-16 h-28" src={uparrow}/>
            <h3 className={"text-base text-center mt-4 w-9/12 text-dark-gray md:text-base"}>
              Once you've added your first condition, you can add operators like “and" and “or" plus groups
            </h3>
          </div>
        )}
      <LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>
    </div>
  )
}

export default LitMultipleConditionOrganizer;
