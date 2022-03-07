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
  const [erc1155TokenId, setErc1155TokenId] = useState("");

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
      let accessControlConditions;
      if (contractType === "ERC20") {
        let decimals = 0;
        try {
          decimals = await LitJsSdk.decimalPlaces({
            chain: chain.value,
            contractAddress: contractAddress,
          });
        } catch (e) {
          console.log(e);
        }
        console.log(`decimals`, decimals);
        const amountInBaseUnit = ethers.utils.parseUnits(amount, decimals);
        accessControlConditions = [
          {
            contractAddress: contractAddress,
            standardContractType: contractType,
            chain: chain.value,
            method: "balanceOf",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: ">=",
              value: amountInBaseUnit.toString(),
            },
          },
        ];
      } else if (contractType === "ERC721") {
        accessControlConditions = [
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
      } else if (contractType === "ERC1155") {
        accessControlConditions = [
          {
            contractAddress: contractAddress,
            standardContractType: contractType,
            chain: chain.value,
            method: "balanceOf",
            parameters: [":userAddress", erc1155TokenId],
            returnValueTest: {
              comparator: ">=",
              value: amount.toString(),
            },
          },
        ];
      }
      console.log("accessControlConditions contract", accessControlConditions);
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

  const handleChangeContractType = (value) => {
    setContractType(value);
  };

  return (
    <div className={'lms-w-full lms-flex lms-flex-col lms-items-center lms-px-8 lms-py-4 lms-bg-white'}>
      <h3 className={'lms-mb-4 md:lms-mb-0'}>Which wallet should be able to access this asset?</h3>
      <h3 className={'lms-w-full lms-mb-2 lms-text-spacing'}>Select lms-blockchain:</h3>
      <LitSelectDropdown options={context.chainOptions}
                         label={'Select lms-blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
                         backButtonLabel={'BACK TO SELECT WALLET'}
      />
      <h3 className={'lms-mt-4 lms-mb-2 lms-w-full lms-text-spacing'}>Select token/NFT or enter contract address:</h3>
      {(!contractAddress.length) && (
        <LitSelectToken option={selectedToken}
                        label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                        selectedToken={selectedToken}
                        setSelectedToken={setSelectedToken}
        />
      )}
      {((!selectedToken || !selectedToken['label']) && !contractAddress.length) && (
        <p className={'lms-text-sm md:lms-text-base lms-w-full lms-my-1 lms-condition-spacing'}>OR</p>
      )}
      {(!selectedToken || !selectedToken['label']) && (
        <input placeholder={'ERC20 or ERC721 or ERC1155 address'}
               value={contractAddress}
               onChange={(e) => setContractAddress(e.target.value)}
               className={'lms-duration-200 lms-w-full lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      )}
      {(!!contractAddress.length) && (
        // <span className={'lms-flex lms-w-full lms-justify-around lms-items-center lms-h-8'}>
        <div className={'lms-w-full'}>
          <h3 className={'lms-mt-2 lms-mb-2 lms-w-full'}>Token Contract Type:</h3>
          <span onChange={(e) => handleChangeContractType(e.target.value)} className={'lms-flex lms-w-full lms-justify-around lms-items-center lms-mt-2 lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}>
            <div>
              <input readOnly checked={contractType === 'ERC20'} type="radio" id="erc20" name="addressType" value="ERC20"/>
              <label className={'lms-ml-2'} for="erc20">ERC20</label>
            </div>

            <div>
              <input readOnly checked={contractType === 'ERC721'} type="radio" id="erc721" name="addressType" value="ERC721"/>
              <label className={'lms-ml-2'} for="erc721">ERC721</label>
            </div>

            <div>
              <input readOnly checked={contractType === 'ERC1155'} type="radio" id="erc1155" name="addressType" value="ERC1155"/>
              <label className={'lms-ml-2'} for="erc1155">ERC1155</label>
            </div>
          </span>
        </div>
      )}
      {(!!contractAddress.length && contractType === 'ERC1155') && (
          <input placeholder={'ERC1155 Token Id'}
          value={erc1155TokenId}
          onChange={(e) => setErc1155TokenId(e.target.value)}
          className={'lms-duration-200 lms-w-full lms-mt-2 lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      )}
      {(!!selectedToken && !!selectedToken['label']) && (
        <button
          className={"lms-w-full lms-h-12 lms-text-brand-light lms-bg-brand-4 lms-rounded hover:lms-border-2 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-4 lms-mt-4"}
          onClick={() => setSelectedToken(null)}>
          Clear token/NFT
        </button>
      )}
      <h3 className={'lms-mt-4 lms-mb-2 lms-w-full lms-text-spacing'}>How many tokens does the wallet need to own?</h3>
      <input value={amount} onChange={(e) => setAmount(e.target.value)}
             className={'lms-w-full lms-py-2 lms-px-4 lms-border lms-rounded lms-border-brand-4 focus:outline-0 lms-input'}/>
      <footer className={'lms-flex lms-flex-row lms-justify-between lms-w-full lms-h-12 lms-bottom-0 lms-my-4'}>
        <LitBackButton onClick={() => setSelectPage('chooseAccess')}/>
        <LitNextButton disableConditions={!amount || (!selectedToken && !contractAddress) || !chain || (contractType === 'ERC1155' && !erc1155TokenId.length)}
                       onClick={() => handleSubmit()}/>
      </footer>
    </div>
  );
};

export default SelectGroup;
