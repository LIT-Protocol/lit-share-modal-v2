import React, { useContext, useEffect, useState } from "react";
import './LitModal.css';
import trashcan from "../assets/trashcan.svg";
import add from "../assets/add.svg";
import { ShareModalContext } from "../ShareModal";
import LitDeleteModal from "./LitDeleteModal";

const LitMultipleConditionOrganizer = ({ createCondition, humanizedAccessControlConditions }) => {
  const {
    handleDeleteAccessControlCondition,
    updateLogicOperator,
  } = useContext(ShareModalContext);

  const [currentAccIndex, setCurrentAccIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const colorArray = [
    'rgba(0, 148, 255, .5)',
    'rgba(255,0,0,0.5)',
    'rgba(0,255,34,0.5)',
    'rgba(255,153,0,0.5)',
    'rgba(183,0,255,0.5)',
    'rgba(0,255,187,0.5)',
    'rgba(0, 148, 255, .5)',
    'rgba(255,0,0,0.5)',
    'rgba(0,255,34,0.5)',
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
              className={'flex flex-col w-11/12 mx-auto rounded p-3 justify-between items-center border border-brand-4'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              {a.map((n, ni) => {
                console.log('A MAP', n)
                if (!n['operator']) {
                  return (
                    <span className={'flex flex-row w-11/12 justify-between items-center'}
                          key={`n-${ni}`}>
                      <button className={'text-sm break-words text-left w-4/5 overflow-auto'}>
                        {n.humanizedAcc}
                      </button>
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
                    <span className={'flex flex-row w-8/12 mx-auto rounded py-3 px-4 justify-around items-center my-2'}
                          key={`n-${ni}`}>
                      <button onClick={() => updateLogicOperator('and', i, ni)}
                              className={`text-sm text-center p-2 w-20 ${checkOperator('and', n['operator'])}`}>
                        AND
                      </button>
                      <button onClick={() => updateLogicOperator('or', i, ni)}
                              className={`text-sm text-center p-2 w-20 ${checkOperator('or', n['operator'])}`}>
                        OR
                      </button>
                    </span>
                  )
                }
              })}
              <span className={'flex flex-row w-11/12 justify-center mx-auto mt-4 border-brand-4 border rounded py-2'}>
                <button className={'mr-4 flex flex-row'} onClick={() => createCondition(true, i)}>
                  <p className={'mr-2'}>Add Nested Condition</p>
                  <img src={add}/>
                </button>
              </span>
            </div>
          )
        } else if (!a['operator']) {
          return (
            <div
              className={'flex flex-col w-11/12 mx-auto rounded p-3 justify-between items-center border border-brand-4'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'flex flex-row w-11/12 justify-between items-center'}>
                <button className={'text-sm break-words text-left w-4/5 overflow-auto'}>
                  {humanizedAccessControlConditions[i].humanizedAcc}
                </button>
                <span>
                  <button className={'mr-1'}>
                    <img src={trashcan} onClick={() => {
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
              <span className={'flex flex-row w-11/12 justify-center mx-auto mt-4 border-brand-4 border rounded py-2'}>
                <button className={'mr-4 flex flex-row'} onClick={() => createCondition(true, i)}>
                  <p className={'mr-2'}>Add Nested Condition</p>
                  <img src={add}/>
                </button>
              </span>
            </div>
          )
        } else {
          return (
            <span className={'flex flex-row w-8/12 mx-auto rounded py-3 px-4 justify-around items-center my-2'}
                  key={i}>
              <button onClick={() => updateLogicOperator('and', i)}
                      className={`text-sm text-center p-2 w-20 ${checkOperator('and', a['operator'])}`}>
                AND
              </button>
              <button onClick={() => updateLogicOperator('or', i)}
                      className={`text-sm text-center p-2 w-20 ${checkOperator('or', a['operator'])}`}>
                OR
              </button>
            </span>
          )
        }
      })}
      <span className={'flex flex-row w-11/12 justify-center mx-auto mt-4 border-brand-4 border rounded py-2'}>
        <button className={'mr-4 flex flex-row w-11/12 mx-auto justify-center'} onClick={() => createCondition()}>
          <p className={'mr-2'}>Add Condition</p>
          <img src={add}/>
        </button>
      </span>
      <LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>
    </div>
  )
}

export default LitMultipleConditionOrganizer;
