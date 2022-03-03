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
    <div className={'w-full h-full flex flex-col items-center px-8 py-4 bg-white'}>
      <h3 className={'mb-4'}>Which wallet should be able to access this asset?</h3>
      <p className={'text-sm mb-4 text-brand-4'} onClick={() => setSelectPage('wallet')}>Grant Access to Wallet or
        Blockchain Domain</p>
      <h3 className={'w-full mb-2'}>Select blockchain:</h3>
      <LitSelectDropdown options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         backButtonLabel={'BACK TO SELECT WALLET'}
                         turnOffSearch={true}
      />
      <h3 className={'w-full mt-8 mb-2'}>Select token or enter contract address</h3>
      <LitSelectToken option={selectedToken}
                      label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                      selectedToken={selectedToken}
                      setSelectedToken={setSelectedToken}
      />
      <h3 className={'mt-8 mb-2 w-full'}>Select token or enter contract address</h3>
      <input value={tokenId} onChange={(e) => setTokenId(e.target.value)}
             className={'w-full py-2 px-4 border rounded border-brand-4 focus:outline-0'}/>
      <footer className={'flex flex-row justify-between w-full h-12 mb-4 mt-8'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!chain || !tokenId.length || !selectedToken)}
                       onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
};

export default SelectNFT;
