import React, { useContext, useEffect, useState } from 'react';
import LitReusableSelect from "../reusableComponents/litReusableSelect/LitReusableSelect";
import { ShareModalContext } from "../shareModal/createShareContext.js";
import LitFooter from "../reusableComponents/litFooter/LitFooter";
import LitInput from "../reusableComponents/litInput/LitInput";

const SelectDAO = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
  const [DAOAddress, setDAOAddress] = useState("");
  const [chain, setChain] = useState({});

  useEffect(
    () =>
      setChain({
        name: "Ethereum",
        id: "ethereum",
        value: "ethereum",
      }),
    []
  );

  const handleSubmit = () => {
    const accessControlConditions = [
      {
        contractAddress: DAOAddress,
        standardContractType: "MolochDAOv2.1",
        chain: chain.value,
        method: "members",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: "true",
        },
      },
    ];

    handleUpdateAccessControlConditions(accessControlConditions);

    if (flow === 'singleCondition') {
      setDisplayedPage('review');
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
  };

  return (
    <div className={'lsm-select-container lsm-bg-white'}>
      <h3 className={'lsm-select-prompt lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Which DAO's
        members should be able to access this asset?</h3>
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Select
        blockchain:</h3>
      <LitReusableSelect options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Add DAO
        contract address:</h3>
      <LitInput value={DAOAddress} setValue={setDAOAddress}/>
      <p className={'lsm-mt-4 lsm-mb-4 lsm-w-full lsm-text-sm lsm-text-title-gray lsm-font-segoe lsm-font-light'}>Lit
        Gateway currently supports DAOs using the MolochDAOv2.1 contract (includes
        DAOhaus)</p>
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!chain['name'] || !DAOAddress.length)}/>
    </div>
  );
};

export default SelectDAO;
