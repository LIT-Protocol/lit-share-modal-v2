import React, { useContext, useEffect, useMemo, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import LitSelectDropdown from "../reusableComponents/LitSelectDropdown";
import { ShareModalContext } from "../ShareModal";

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
    <div className={'w-full h-full flex flex-col items-center px-8 py-4 '}>
      <h3 className={'mb-8'}>Which DAO's members should be able to access this asset?</h3>
      <h3 className={'w-full mb-4'}>Select blockchain:</h3>
      <LitSelectDropdown options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         backButtonLabel={'BACK TO SELECT DAO'}
                         turnOffSearch={true}
      />
      <h3 className={'mt-12 mb-4'}>Add DAO contract address:</h3>
      <input value={DAOAddress} onChange={(e) => setDAOAddress(e.target.value)}
             className={'w-full py-2 px-4 border rounded border-brand-4 focus:outline-0'}/>
      <p className={'mt-4 mb-4 text-sm'}>Lit Gateway currently supports DAOs using the MolochDAOv2.1 contract (includes
        DAOhaus)</p>
      <footer className={'flex flex-row justify-between w-full h-12 mb-4 mt-8'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!chain['name'] || !DAOAddress.length)} onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
};

export default SelectDAO;
