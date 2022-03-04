import React, { useContext, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import LitSelectDropdown from "../reusableComponents/LitSelectDropdown";
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitSelectToken from "../reusableComponents/LitSelectToken";

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
    <div className={'lms-w-full lms-flex lms-flex-col lms-items-center lms-px-8 lms-py-4 lms-bg-white'}>
      <h3 className={'lms-mb-4'}>Which wallet should be able to access this asset?</h3>
      <p className={'lms-text-sm md:lms-text-base lms-mb-4 text-brand-4'} onClick={() => setSelectPage('wallet')}>Grant Access to Wallet or
        Blockchain Domain</p>
      <h3 className={'lms-w-full lms-mb-2'}>Select lms-blockchain:</h3>
      <LitSelectDropdown options={chainOptions}
                         label={'Select lms-blockchain'}
                         option={chain}
                         setOption={setChain}
                         backButtonLabel={'BACK TO SELECT WALLET'}
                         turnOffSearch={true}
      />
      <h3 className={'lms-w-full lms-mt-8 lms-mb-2'}>Select token or enter contract address</h3>
      <LitSelectToken option={selectedToken}
                      label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                      selectedToken={selectedToken}
                      setSelectedToken={setSelectedToken}
      />
      <h3 className={'lms-mt-8 lms-mb-2 lms-w-full'}>Select token or enter contract address</h3>
      <input value={tokenId} onChange={(e) => setTokenId(e.target.value)}
             className={'lms-w-full lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      <footer className={'lms-flex lms-flex-row lms-justify-between lms-w-full lms-h-12 lms-mb-4 lms-mt-8'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!chain || !tokenId.length || !selectedToken)}
                       onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
};

export default SelectNFT;
