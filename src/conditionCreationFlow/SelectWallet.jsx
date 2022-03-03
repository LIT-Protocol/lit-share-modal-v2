import React, { useContext, useState, useMemo, useEffect } from 'react';
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitSelectDropdown from "../reusableComponents/LitSelectDropdown";
import LitJsSdk from "lit-js-sdk";
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";

const SelectWallet = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setError, setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
  const [walletAddress, setWalletAddress] = useState("");
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

  const handleSubmit = async () => {
    let resolvedAddress = walletAddress;
    if (walletAddress.includes(".")) {
      // do domain name lookup
      try {
        resolvedAddress = await LitJsSdk.lookupNameServiceAddress({
          chain: chain.value,
          name: walletAddress,
        });
      } catch(err) {
        alert('Error connecting.  If using mobile, use the Metamask Mobile Browser to connect.')
        return;
      }
      if (!resolvedAddress) {
        // ADD_ERROR_HANDLING
        console.log("failed to resolve ENS address");
        setError({
          title: "Could not resolve ENS address",
          details: "Try another wallet address",
        });
        return;
      }
    }
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: chain.value,
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: resolvedAddress,
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
    <div className={'w-full flex flex-col items-center px-8 py-4 bg-white'}>
      <h3 className={'mb-4'}>Which wallet should be able to access this asset?</h3>
      <p className={'text-sm mb-4 text-brand-4'} onClick={() => setSelectPage('nft')}>Grant Access on NFT Ownership</p>
      <h3 className={'w-full mb-4'}>Select blockchain:</h3>
      <LitSelectDropdown options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         backButtonLabel={'BACK TO SELECT WALLET'}
                         turnOffSearch={true}
      />
      <h3 className={'mt-12 mb-4'}>Add Wallet Address or Blockchain Domain (e.g. ENS, UNS) here:</h3>
      <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
             className={'w-full py-2 px-4 border rounded border-brand-4 focus:outline-0'}/>
      <footer className={'flex flex-row justify-between w-full h-12 mb-4 mt-8'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={(!chain['name'] || !walletAddress.length)} onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
}


export default SelectWallet;
