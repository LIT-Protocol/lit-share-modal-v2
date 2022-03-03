import React, { useContext, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitSelectDropdown from "../reusableComponents/LitSelectDropdown";

const matchConditionOptions = [
  {
    name: "Equals POAP Name exactly",
    id: "equals",
    value: "=",
  },
  {
    name: "Contains POAP Name",
    id: "contains",
    value: "contains",
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
    <div className={'w-full h-full flex flex-col items-center px-8 py-4 '}>
      <h3 className={'mb-8 w-full'}>Which POAP should be able to access this asset?</h3>
      <h3 className={'mb-4 w-full'}>POAP Name:</h3>
      <input value={POAPName} onChange={(e) => setPOAPName(e.target.value)}
             className={'w-full py-2 px-4 border rounded border-brand-4 focus:outline-0'}/>
      <h3 className={'mt-12 w-full mb-4'}>Match conditions:</h3>
      <LitSelectDropdown options={matchConditionOptions}
                         label={'Select match condition'}
                         option={matchCondition}
                         setOption={setMatchCondition}
                         turnOffSearch={true}
                         backButtonLabel={'BACK TO SELECT POAP'}
      />
      <footer className={'flex flex-row justify-between w-full h-12 mb-4 mt-8'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!POAPName.length || !matchCondition)} onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
};

export default SelectPOAP;
