import React, { useContext, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitSelectScreen from "../reusableComponents/LitSelectScreen";
import LitSimpleDropdown from '../reusableComponents/LitSimpleDropdown';

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
    const accessControlConditions = [[
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
    ]];

    handleUpdateAccessControlConditions(accessControlConditions);
    setSelectPage('chooseAccess');
    console.log('check conditions', accessControlConditions);

    if (flow === 'singleCondition') {
      setDisplayedPage('review');
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
  };

  return (
    <div className={'lms-w-full lms-h-full lms-flex lms-flex-col lms-items-center lms-px-4 lms-py-4 '}>
      <h3 className={'lms-mb-8 lms-w-full'}>Which POAP should be able to access this asset?</h3>
      <h3 className={'lms-mb-4 lms-w-full'}>POAP Name:</h3>
      <input value={POAPName} onChange={(e) => setPOAPName(e.target.value)}
             className={'lms-w-full lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      <h3 className={'lms-mt-12 lms-w-full lms-mb-4 lms-text-spacing'}>Match conditions:</h3>
      {/* <LitSelectScreen options={matchConditionOptions}
                         label={'Select match condition'}
                         option={setMatchCondition}
                         setOption={setMatchCondition}
                         turnOffSearch={true}
      /> */}
      {/* <label>
        Select match condition
        <select id="lms" value={matchCondition} onChange={(e) => console.log('event', e)}>
          {matchConditionOptions.map((c, i) => {
            <option key={i} value={c.value}>{c.name}</option>
          })}
        </select>
      </label> */}
      <LitSimpleDropdown label={'Select match condition'}
                         options={matchConditionOptions}
                         setSelected={setMatchCondition} 
                         selected={matchCondition} />
      {/* <div>
        <label for="cars">Choose a car:</label>
        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div> */}
      
      <div className={'lms-flex lms-flex-row lms-bg-white lms-justify-between lms-w-full lms-h-12 lms-my-4 lms-px-4 lms-absolute lms-bottom-0'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!POAPName.length || !matchCondition)} onClick={() => handleSubmit()}/>
      </div>
    </div>
  );
};

export default SelectPOAP;
