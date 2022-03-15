import React, { useContext, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import LitSelectScreen from "../reusableComponents/LitSelectScreen";
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitTokenSelect from "../reusableComponents/LitTokenSelect";

const SelectNFT = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
  const [tokenId, setTokenId] = useState("");
  const [chain, setChain] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  const handleSubmit = () => {
    const accessControlConditions = [
      {
        contractAddress: selectedToken.value,
        standardContractType: "ERC721",
        chain: chain.value,
        method: "ownerOf",
        parameters: [tokenId],
        returnValueTest: {
          comparator: "=",
          value: ":userAddress",
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
    <div className={'lms-w-full lms-flex lms-flex-col lms-items-center lms-px-4 lms-py-4 lms-bg-white'}>
      <h3 className={'lms-mb-4 lms-w-full'}>Which wallet should be able to access this asset?</h3>
      <h3 className={'lms-mt-12 lms-mb-4 lms-w-full lms-text-spacing'}>Select blockchain:</h3>
      <LitSelectScreen options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lms-w-full lms-mt-8 lms-mb-2'}>Select token or enter contract address</h3>
      <LitTokenSelect option={selectedToken}
                      label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                      selectedToken={selectedToken}
                      setSelectedToken={setSelectedToken}
      />
      <h3 className={'lms-mt-8 lms-mb-2 lms-w-full'}>Select token or enter contract address</h3>
      <input value={tokenId} onChange={(e) => setTokenId(e.target.value)}
             className={'lms-w-full lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      <p className={'lms-text-sm md:lms-text-base lms-w-full lms-mt-4 lms-cursor-pointer lms-mb-4 lms-text-brand-4'} onClick={() => setSelectPage('wallet')}>Grant Access to Wallet or
        Blockchain Domain</p>
      <div className={'lms-flex lms-flex-row lms-bg-white lms-justify-between lms-w-full lms-h-12 lms-my-4 lms-px-4 lms-absolute lms-bottom-0'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!chain || !tokenId.length || !selectedToken)}
                       onClick={() => handleSubmit()}/>
      </div>
    </div>
  );
};

export default SelectNFT;
