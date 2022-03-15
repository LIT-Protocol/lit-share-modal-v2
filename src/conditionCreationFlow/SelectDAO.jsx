import React, { useContext, useEffect, useMemo, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import LitSelectScreen from "../reusableComponents/LitSelectScreen";
import { ShareModalContext } from "../generalComponents/ShareModal";

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
    <div className={'lms-w-full lms-h-full lms-flex lms-flex-col lms-items-center lms-px-4 lms-py-4 '}>
      <h3 className={'lms-mb-4 md:lms-mb-0 lms-w-full'}>Which DAO's members should be able to access this asset?</h3>
      <h3 className={'lms-w-full lms-mb-2 lms-text-spacing'}>Select blockchain:</h3>
      <LitSelectScreen options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lms-mt-12 lms-mb-4 lms-w-full lms-text-spacing'}>Add DAO contract address:</h3>
      <input value={DAOAddress} onChange={(e) => setDAOAddress(e.target.value)}
             className={'lms-w-full lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      <p className={'lms-mt-4 lms-mb-4 lms-w-full lms-text-sm'}>Lit Gateway currently supports DAOs using the MolochDAOv2.1 contract (includes
        DAOhaus)</p>
      <div className={'lms-flex lms-flex-row lms-bg-white lms-justify-between lms-w-full lms-h-12 lms-my-4 lms-px-4 lms-absolute lms-bottom-0'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!chain['name'] || !DAOAddress.length)} onClick={() => handleSubmit()}/>
      </div>
    </div>
  );
};

export default SelectDAO;
