import React, { useContext, useEffect, useState } from 'react';
import { ethers } from "ethers";
import { ShareModalContext } from "../shareModal/createShareContext.js";
import LitJsSdk from "lit-js-sdk";
import LitReusableSelect from "../reusableComponents/litReusableSelect/LitReusableSelect";
import LitTokenSelect from "../reusableComponents/litTokenSelect/LitTokenSelect";
import LitFooter from "../reusableComponents/litFooter/LitFooter";

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
      handleUpdateAccessControlConditions(accessControlConditions);
    } else {

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

  // const createTokenSelectLabel = () => {
  //   if (selectedToken && selectedToken.label) {
  //     return (
  //       <span>
  //         {selectedToken.label}
  //         <button className={'lsm-border-none lsm-cursor-pointer'}>
  //           <img alt={'close'}
  //                className={'lsm-h-4'}
  //                src={union}
  //                onClick={() => setSelectedToken(null)}/>
  //         </button>
  //       </span>
  //     )
  //   } else {
  //     return 'Search for a token/NFT';
  //   }
  // }

  return (
    <div className={'lsm-select-container lsm-bg-white'}>
      <h3 className={'lsm-select-prompt lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Which wallet should be able to access this asset?</h3>
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Select blockchain:</h3>
      <LitReusableSelect options={context.chainOptions}
                         label={'Select blockchain'}
                         option={chain}
                         setOption={setChain}
                         turnOffSearch={true}
      />
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Select token/NFT or enter contract address:</h3>
      {(!contractAddress.length) && (
        <LitTokenSelect option={selectedToken}
                        label={(!selectedToken || !selectedToken['label']) ? 'Search for a token/NFT' : selectedToken.label}
                        selectedToken={selectedToken}
                        setSelectedToken={setSelectedToken}
        />
      )}
      {((!selectedToken || !selectedToken['label']) && !contractAddress.length) && (
        <p className={'lsm-text-sm md:lsm-text-base lsm-w-full lsm-my-1 lsm-condition-spacing lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>OR</p>
      )}
      {(!selectedToken || !selectedToken['label']) && (
        <input placeholder={'ERC20 or ERC721 or ERC1155 address'}
               value={contractAddress}
               onChange={(e) => setContractAddress(e.target.value)}
               className={'lsm-border-brand-4 lsm-input'}/>
      )}
      {(!!contractAddress.length) && (
        <div className={'lsm-w-full'}>
          <h3 className={'lsm-mt-2 lsm-mb-2 lsm-w-full lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light lsm-select-label'}>Token Contract Type:</h3>
          <span onChange={(e) => handleChangeContractType(e.target.value)} className={'lsm-flex lsm-w-full lsm-justify-around lsm-items-center lsm-mt-2 lsm-px-4 lsm-border lsm-rounded lsm-border-brand-4 focus:outline-0 lsm-input'}>
            <div>
              <input readOnly checked={contractType === 'ERC20'} type="radio" id="erc20" name="addressType" value="ERC20"/>
              <label className={'lsm-ml-2'} htmlFor="erc20">ERC20</label>
            </div>

            <div>
              <input readOnly checked={contractType === 'ERC721'} type="radio" id="erc721" name="addressType" value="ERC721"/>
              <label className={'lsm-ml-2'} htmlFor="erc721">ERC721</label>
            </div>

            <div>
              <input readOnly checked={contractType === 'ERC1155'} type="radio" id="erc1155" name="addressType" value="ERC1155"/>
              <label className={'lsm-ml-2'} htmlFor="erc1155">ERC1155</label>
            </div>
          </span>
        </div>
      )}
      {(!!contractAddress.length && contractType === 'ERC1155') && (
          <input placeholder={'ERC1155 Token Id'}
          value={erc1155TokenId}
          onChange={(e) => setErc1155TokenId(e.target.value)}
          className={'lsm-border-brand-4 lsm-input'}/>
      )}
      {/*{(!!selectedToken && !!selectedToken['label']) && (*/}
      {/*  <button*/}
      {/*    className={"lsm-h-12 lsm-text-brand-light lsm-bg-brand-4 lsm-rounded hover:lsm-border-2 lsm-flex lsm-flex-row lsm-items-center lsm-justify-between lsm-px-4 lsm-mt-4"}*/}
      {/*    onClick={() => setSelectedToken(null)}>*/}
      {/*    Clear token/NFT*/}
      {/*  </button>*/}
      {/*)}*/}
      <h3 className={'lsm-select-label lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>How many tokens does the wallet need to own?</h3>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={'##'}
             className={'lsm-border-brand-4 lsm-input'}/>
      <LitFooter backAction={() => setSelectPage('chooseAccess')}
                 nextAction={handleSubmit}
                 nextDisableConditions={!amount || (!selectedToken && !contractAddress) || !chain || (contractType === 'ERC1155' && !erc1155TokenId.length)} />
    </div>
  );
};

export default SelectGroup;
