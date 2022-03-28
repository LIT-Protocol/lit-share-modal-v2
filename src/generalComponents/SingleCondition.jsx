import React, { useContext, useState } from 'react';
import ChooseAccess from "../conditionCreationFlow/ChooseAccess";
import SelectWallet from "../conditionCreationFlow/SelectWallet";
import SelectGroup from "../conditionCreationFlow/SelectGroup";
import SelectDAO from "../conditionCreationFlow/SelectDAO";
import SelectPOAP from "../conditionCreationFlow/SelectPOAP";
import SelectNFT from "../conditionCreationFlow/SelectNFT";
import { ShareModalContext } from "../shareModal/createShareContext.js";
import LitHeader from "../reusableComponents/litHeader/LitHeader";

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
      <LitHeader handleClose={handleClose} />
      <div className={'lsm-width'}>
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
      </div>

    </>
  )

};

export default SingleCondition;
