import React, { useContext, useState, useMemo, useEffect } from 'react';
import { ShareModalContext } from "../shareModal/ShareModal";
import LitReusableSelect from "../reusableComponents/litSelectScreen/LitReusableSelect";
import LitJsSdk from "lit-js-sdk";
import LitFooter from "../reusableComponents/litFooter/LitFooter";

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
    <div className={'lms-select-container lms-bg-white'}>
      <h3 className={'lms-select-prompt lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Which wallet should be able to access this asset?</h3>
      <h3 className={'lms-select-label lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Select blockchain:</h3>
      <LitReusableSelect options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lms-select-label lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Add Wallet Address or Blockchain Domain (e.g. ENS, UNS) here:</h3>
      <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
             className={'lms-border-brand-4 lms-input'}/>
      <p className={'lms-text-sm lms-w-full lms-cursor-pointer md:lms-text-base lms-mb-4 lms-mt-8 lms-text-brand-4 lms-text-left lms-font-segoe lms-font-light'} onClick={() => setSelectPage('nft')}>Grant Access on NFT Ownership</p>
      <LitFooter backAction={() => setSelectPage('chooseAccess')} nextAction={() => handleSubmit()} nextDisableConditions={(!chain['name'] || !walletAddress.length)} />
    </div>
  );
}


export default SelectWallet;
