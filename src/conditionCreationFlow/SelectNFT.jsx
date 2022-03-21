import React, { useContext, useState } from 'react';
import LitReusableSelect from "../reusableComponents/litSelectScreen/LitReusableSelect";
import { ShareModalContext } from "../shareModal/ShareModal";
import LitTokenSelect from "../reusableComponents/litTokenSelect/LitTokenSelect";
import LitFooter from "../reusableComponents/litFooter/LitFooter";

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
    <div className={'lms-select-container lms-bg-white'}>
      <h3 className={'lms-select-prompt lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Which wallet should be able to access this asset?</h3>
      <h3 className={'lms-select-label lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Select blockchain:</h3>
      <LitReusableSelect options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lms-select-label lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Select token or enter contract address</h3>
      <LitTokenSelect option={selectedToken}
                      label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                      selectedToken={selectedToken}
                      setSelectedToken={setSelectedToken}
      />
      <h3 className={'lms-select-label lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Select token or enter contract address</h3>
      <input value={tokenId} onChange={(e) => setTokenId(e.target.value)}
             className={'lms-border-brand-4 lms-input'}/>
      <p className={'lms-text-sm md:lms-text-base lms-w-full lms-mt-8 lms-cursor-pointer lms-mb-4 lms-text-brand-4 lms-text-left lms-font-segoe lms-font-light'} onClick={() => setSelectPage('wallet')}>
        Grant Access to Wallet or
        Blockchain Domain</p>
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={(!chain || !tokenId.length || !selectedToken)} />
    </div>
  );
};

export default SelectNFT;
