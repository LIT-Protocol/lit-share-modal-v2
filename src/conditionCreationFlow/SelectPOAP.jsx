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
    <div className={'lms-w-full lms-h-full lms-flex lms-flex-col lms-items-center lms-px-8 lms-py-4 '}>
      <h3 className={'lms-mb-8 lms-w-full'}>Which POAP should be able to access this asset?</h3>
      <h3 className={'lms-mb-4 lms-w-full'}>POAP Name:</h3>
      <input value={POAPName} onChange={(e) => setPOAPName(e.target.value)}
             className={'lms-w-full lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      <h3 className={'lms-mt-12 lms-w-full lms-mb-4 lms-text-spacing'}>Match conditions:</h3>
      <LitSelectDropdown options={matchConditionOptions}
                         label={'Select match condition'}
                         option={matchCondition}
                         setOption={setMatchCondition}
                         turnOffSearch={true}
                         backButtonLabel={'BACK TO SELECT POAP'}
      />
      <footer className={'lms-flex lms-flex-row lms-justify-between lms-w-full lms-h-12 lms-mb-4 lms-mt-8'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!POAPName.length || !matchCondition)} onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
};

export default SelectPOAP;
