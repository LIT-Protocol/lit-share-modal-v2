import React, { useContext, useState, useEffect } from 'react';
import { ShareModalContext } from "../shareModal/createShareContext.js";
import LitReusableSelect from "../reusableComponents/litReusableSelect/LitReusableSelect";
import LitJsSdk from "lit-js-sdk";
import LitFooter from "../reusableComponents/litFooter/LitFooter";
import { utils } from 'ethers';
import LitInput from "../reusableComponents/litInput/LitInput";


const SelectWallet = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, chainOptions, flow } = useContext(ShareModalContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [chain, setChain] = useState({});
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(
    () =>
      setChain({
        name: "Ethereum",
        id: "ethereum",
        value: "ethereum",
      }),
    []
  );

  useEffect(() => {
    const isValid = utils.isAddress(walletAddress);
    setAddressIsValid(isValid);
  }, [walletAddress])

  const handleSubmit = async () => {
    let resolvedAddress = walletAddress;

    if (walletAddress.includes(".")) {
      // do domain name lookup
      try {
        resolvedAddress = await LitJsSdk.lookupNameServiceAddress({
          chain: chain.value,
          name: walletAddress,
        });
      } catch (err) {
        alert('Error connecting.  If using mobile, use the Metamask Mobile Browser to connect.')
        return;
      }
      if (!resolvedAddress) {
        // ADD_ERROR_HANDLING
        console.log("failed to resolve ENS address");
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
    <div className={'lsm-select-container'}>
      <h3
        className={'lsm-select-prompt lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Which
        wallet
        should be able to access this asset?</h3>
      <h3
        className={'lsm-select-label lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Select
        blockchain:</h3>
      <LitReusableSelect options={chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3
        className={'lsm-select-label lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Add
        Wallet
        Address or Blockchain Domain (e.g. ENS, UNS) here:</h3>
      <LitInput value={walletAddress}
                setValue={setWalletAddress}
                errorMessage={addressIsValid ? null : 'Address is invalid'}
      />
      <p
        className={'lsm-text-sm lsm-w-full lsm-cursor-pointer md:lsm-text-base dark:lsm-text-brand-3 lsm-mb-4 lsm-mt-8 lsm-text-brand-4 lsm-text-left lsm-font-segoe lsm-font-light'}
        onClick={() => setSelectPage('nft')}>Grant Access on NFT Ownership</p>
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={() => handleSubmit()}
                 nextDisableConditions={(!chain['name'] || !walletAddress.length || !addressIsValid)}/>
    </div>
  );
}


export default SelectWallet;
