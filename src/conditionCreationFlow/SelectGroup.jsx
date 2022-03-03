import React, { useContext, useEffect, useMemo, useState } from 'react';
import LitBackButton from "../reusableComponents/LitBackButton";
import LitNextButton from "../reusableComponents/LitNextButton";
import { ethers } from "ethers";
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitJsSdk from "lit-js-sdk";
import LitSelectDropdown from "../reusableComponents/LitSelectDropdown";
import LitSelectToken from "../reusableComponents/LitSelectToken";

const SelectGroup = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const context = useContext(ShareModalContext);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);
  const [contractAddress, setContractAddress] = useState("");
  const [chain, setChain] = useState(null);
  const [contractType, setContractType] = useState("ERC721");

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
    console.log("handleSubmit and selectedToken is", selectedToken);


    if (contractAddress && contractAddress.length) {
      const accessControlConditions = [
        {
          contractAddress: contractAddress,
          standardContractType: contractType,
          chain: chain.value,
          method: "balanceOf",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: ">=",
            value: amount.toString(),
          },
        },
      ];
      handleUpdateAccessControlConditions(accessControlConditions);

    } else if (selectedToken && selectedToken.value === "ethereum") {
      // ethereum
      const amountInWei = ethers.utils.parseEther(amount);
      const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: chain.value,
          method: "eth_getBalance",
          parameters: [":userAddress", "latest"],
          returnValueTest: {
            comparator: ">=",
            value: amountInWei.toString(),
          },
        },
      ];
      console.log("accessControlConditions token", accessControlConditions);
      handleUpdateAccessControlConditions(accessControlConditions);

    } else {
      console.log("selectedToken", selectedToken);

      let tokenType;
      if (selectedToken && selectedToken.standard?.toLowerCase() === "erc721") {
        tokenType = "erc721";
      } else if (selectedToken && selectedToken.decimals) {
        tokenType = "erc20";
      } else {
        // if we don't already know the type, try and get decimal places.  if we get back 0 or the request fails then it's probably erc721.
        let decimals = 0;
        try {
          decimals = await LitJsSdk.decimalPlaces({
            contractAddress: selectedToken.value,
          });
        } catch (e) {
          console.log(e);
        }
        if (decimals == 0) {
          tokenType = "erc721";
        } else {
          tokenType = "erc20";
        }
      }

      console.log("tokenType is", tokenType);

      if (tokenType == "erc721") {
        // erc721
        const accessControlConditions = [
          {
            contractAddress: selectedToken.value,
            standardContractType: "ERC721",
            chain: chain.value,
            method: "balanceOf",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: ">=",
              value: amount.toString(),
            },
          },
        ];
        console.log(
          "accessControlConditions typeerc721",
          accessControlConditions
        );
        handleUpdateAccessControlConditions(accessControlConditions);
      } else {
        // erc20 token
        let amountInBaseUnit;
        if (selectedToken.decimals) {
          amountInBaseUnit = ethers.utils.parseUnits(
            amount,
            selectedToken.decimals
          );
        } else {
          // need to check the contract for decimals
          // this will auto switch the chain to the selected one in metamask
          let decimals = 0;
          try {
            decimals = await LitJsSdk.decimalPlaces({
              contractAddress: selectedToken.value,
            });
          } catch (e) {
            console.log(e);
          }
          console.log(`decimals in ${selectedToken.value}`, decimals);
          amountInBaseUnit = ethers.utils.parseUnits(amount, decimals);
        }
        const accessControlConditions = [
          {
            contractAddress: selectedToken.value,
            standardContractType: "ERC20",
            chain: chain.value,
            method: "balanceOf",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: ">=",
              value: amountInBaseUnit.toString(),
            },
          },
        ];
        console.log("accessControlConditions else", accessControlConditions);
        handleUpdateAccessControlConditions(accessControlConditions);
      }
    }

    if (context.flow === 'singleCondition') {
      context.setDisplayedPage('review');
    } else if (context.flow === 'multipleConditions') {
      context.setDisplayedPage('multiple');
    }
  };

  return (
    <div className={'w-full h-full flex flex-col items-center px-8 py-4 bg-white'}>
      <h3 className={'mb-4'}>Which wallet should be able to access this asset?</h3>
      <h3 className={'w-full mb-2'}>Select blockchain:</h3>
      <LitSelectDropdown options={context.chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
                         backButtonLabel={'BACK TO SELECT WALLET'}
      />
      <h3 className={'mt-4 mb-2'}>Select token/NFT or enter contract address:</h3>
      {(!contractAddress.length) && (
        <LitSelectToken option={selectedToken}
                        label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                        selectedToken={selectedToken}
                        setSelectedToken={setSelectedToken}
        />
      )}
      {((!selectedToken || !selectedToken['label']) && !contractAddress.length) && (
        <p className={'text-sm w-full my-1'}>OR</p>
      )}
      {(!selectedToken || !selectedToken['label']) && (
        <input placeholder={'ERC20 or ERC721 address'}
               value={contractAddress}
               onChange={(e) => setContractAddress(e.target.value)}
               className={'duration-200 w-full py-2 px-4 border rounded border-brand-4 focus:outline-0'}/>
      )}
      {(!!selectedToken && !!selectedToken['label']) && (
        <button
          className={"w-full h-12 text-brand-light bg-brand-4 rounded hover:border-2 flex flex-row items-center justify-between px-4 mt-4"}
          onClick={() => setSelectedToken(null)}>
          Clear token/NFT
        </button>
      )}
      <h3 className={'mt-4 mb-2'}>How many tokens does the wallet need to own?</h3>
      <input value={amount} onChange={(e) => setAmount(e.target.value)}
             className={'w-full py-2 px-4 border rounded border-brand-4 focus:outline-0'}/>
      <footer className={'flex flex-row justify-between w-full h-12 bottom-0 my-4'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={!amount || (!selectedToken && !contractAddress) || !chain}
                       onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
};

export default SelectGroup;
