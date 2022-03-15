import React, { useContext, useEffect, useState } from 'react';
import MultipleChooseAccess from "../conditionCreationFlow/MultipleChooseAccess";
import SelectWallet from "../conditionCreationFlow/SelectWallet";
import SelectGroup from "../conditionCreationFlow/SelectGroup";
import SelectDAO from "../conditionCreationFlow/SelectDAO";
import SelectPOAP from "../conditionCreationFlow/SelectPOAP";
import SelectNFT from "../conditionCreationFlow/SelectNFT";
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import { ShareModalContext } from "./ShareModal";

const MultipleCreateCondition = ({ endOfCreateCondition, isNested, nestedIndex }) => {
  const { handleUpdateAccessControlConditions } = useContext(ShareModalContext);
  const [selectPage, setSelectPage] = useState('chooseAccess');

  const coordinateUpdateAccessControl = (acc) => {
    if (isNested) {
      handleUpdateAccessControlConditions(acc, true, nestedIndex)
    } else {
      handleUpdateAccessControlConditions(acc);
    }
    setSelectPage('chooseAccess');
    endOfCreateCondition();
  }

  if (selectPage === 'chooseAccess') {
    return <>
      <MultipleChooseAccess setSelectPage={setSelectPage} isNested={isNested}/>
      <div className={'lms-flex lms-flex-row lms-bg-white lms-justify-between lms-w-full lms-h-12 lms-my-4 lms-px-4 lms-absolute lms-bottom-0'}>
        <LitBackButton onClick={() => endOfCreateCondition(false)}/>
        {/* <LitNextButton disableConditions={false} onClick={() => console.log('HEY HEY')}/> */}
      </div>
    </>
  }

  return (
    <>
      {(() => {
        switch (selectPage) {
          case 'wallet':
            return <SelectWallet setSelectPage={setSelectPage}
                                 handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'nft':
            return <SelectNFT setSelectPage={setSelectPage}
                              handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'group':
            return <SelectGroup setSelectPage={setSelectPage}
                                handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'dao':
            return <SelectDAO setSelectPage={setSelectPage}
                              handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
          case 'poap':
            return <SelectPOAP setSelectPage={setSelectPage}
                               handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
        }
      })()
      }
    </>
  )
};

export default MultipleCreateCondition;
