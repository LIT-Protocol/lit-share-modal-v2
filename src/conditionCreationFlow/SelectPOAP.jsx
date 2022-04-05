import React, { useContext, useState } from 'react';
import { ShareModalContext } from "../shareModal/createShareContext.js";
import LitSimpleDropdown from '../reusableComponents/litSimpleDropdown/LitSimpleDropdown';
import LitFooter from "../reusableComponents/litFooter/LitFooter";

const matchConditionOptions = [
  {
    name: "Contains POAP Name",
    id: "contains",
    value: "contains",
  },
  {
    name: "Equals POAP Name exactly",
    id: "equals",
    value: "=",
  },
];

const SelectPOAP = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [POAPName, setPOAPName] = useState("");
  const [matchCondition, setMatchCondition] = useState(null);

  const handleSubmit = () => {
    const chain = "xdai";
    const accessControlConditions = [
      {
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        standardContractType: "ERC721",
        chain,
        method: "balanceOf",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: ">",
          value: "0",
        },
      },
      {operator: "and"},
      {
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        standardContractType: "POAP",
        chain,
        method: "tokenURI",
        parameters: [],
        returnValueTest: {
          comparator: matchCondition.value,
          value: POAPName,
        },
      },
    ];

    handleUpdateAccessControlConditions(accessControlConditions);
    setSelectPage('chooseAccess');

    if (flow === 'singleCondition') {
      setDisplayedPage('review');
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
  };

  return (
    <div className={'lsm-select-container lsm-bg-white'}>
      <h3 className={'lsm-select-prompt lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Which POAP should be able to access this asset?</h3>
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>POAP Name:</h3>
      <input value={POAPName} onChange={(e) => setPOAPName(e.target.value)}
             className={'lsm-border-brand-4 lsm-input'}/>
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Match conditions:</h3>
      <LitSimpleDropdown label={'Select match condition'}
                         options={matchConditionOptions}
                         setSelected={setMatchCondition}
                         selected={matchCondition} />
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!POAPName.length || !matchCondition)} />
    </div>
  );
};

export default SelectPOAP;
