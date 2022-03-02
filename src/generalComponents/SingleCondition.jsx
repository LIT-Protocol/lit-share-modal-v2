import React, { useContext, useState } from 'react';
import ChooseAccess from "../conditionCreationFlow/ChooseAccess";
import SelectWallet from "../conditionCreationFlow/SelectWallet";
import SelectGroup from "../conditionCreationFlow/SelectGroup";
import SelectDAO from "../conditionCreationFlow/SelectDAO";
import SelectPOAP from "../conditionCreationFlow/SelectPOAP";
import SelectNFT from "../conditionCreationFlow/SelectNFT";
import union from "../assets/union.svg";
import { ShareModalContext } from "../ShareModal";

const SingleCondition = () => {
  const { handleUpdateAccessControlConditions, handleClose, setDisplayedPage } = useContext(ShareModalContext);
  const [selectPage, setSelectPage] = useState('chooseAccess');

  const coordinateUpdateAccessControl = (accessControlConditions) => {
    handleUpdateAccessControlConditions(accessControlConditions);
    setSelectPage('chooseAccess');
    setDisplayedPage('review');
  }

  return (
    <>
      <header className={'w-full h-14 bg-brand-light flex justify-between items-center px-5'}>
        <h3 className={'text-slate-500'}>ACCESS CONTROL</h3>
        <button><img alt={'close'} className={'h-4 font-os'} src={union} onClick={() => handleClose()}/></button>
      </header>
      {(() => {
        switch (selectPage) {
          case 'chooseAccess':
            return <ChooseAccess setSelectPage={setSelectPage}
                                 handleUpdateAccessControlConditions={coordinateUpdateAccessControl}/>
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

export default SingleCondition;
