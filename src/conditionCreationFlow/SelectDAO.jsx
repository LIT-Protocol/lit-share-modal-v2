import React, { useContext, useEffect, useMemo, useState } from 'react';
import LitReusableSelect from "../reusableComponents/litSelectScreen/LitReusableSelect";
import { ShareModalContext } from "../shareModal/ShareModal";
import LitFooter from "../reusableComponents/litFooter/LitFooter";

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
    <div className={'lms-select-container lms-bg-white'}>
      <h3 className={'lms-select-prompt lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Which DAO's members should be able to access this asset?</h3>
      <h3 className={'lms-select-label lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Select blockchain:</h3>
      <LitReusableSelect options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lms-select-label lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Add DAO contract address:</h3>
      <input value={DAOAddress} onChange={(e) => setDAOAddress(e.target.value)}
             className={'lms-border-brand-4 lms-input'}/>
      <p className={'lms-mt-4 lms-mb-4 lms-w-full lms-text-sm lms-text-title-gray lms-font-segoe lms-font-light'}>Lit Gateway currently supports DAOs using the MolochDAOv2.1 contract (includes
        DAOhaus)</p>
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!chain['name'] || !DAOAddress.length)}/>
    </div>
  );
};

export default SelectDAO;
