import { ALL_LIT_CHAINS } from "lit-js-sdk";

export const CONDITION_TYPES = {
  HOLDS_SPECIFIC_NFT: "HOLDS_SPECIFIC_NFT",
  INDIVIDUAL_WALLET: "INDIVIDUAL_WALLET",
  HOLDS_TOKEN_IN_COLLECTION: "HOLDS_TOKEN_IN_COLLECTION",
  HOLDS_BALANCE: "HOLDS_BALANCE",
};

export const generateUnifiedCondition = ({ chain, conditionType, params }) => {
  const chainDetails = ALL_LIT_CHAINS[chain];
  // only supporting EVM and SVM for now (eth and solana)
  if (chainDetails.vmType !== "EVM" && chainDetails.vmType !== "SVM") {
    throw new Error(`Unsupported chain type: ${chainDetails.vmType}`);
  }
  const { vmType } = chainDetails;
  if (conditionType === CONDITION_TYPES.HOLDS_SPECIFIC_NFT) {
    if (vmType === "EVM") {
      // eth
      return [
        {
          conditionType: "evmBasic",
          contractAddress: params.contractAddress,
          standardContractType: "ERC721",
          chain,
          method: "ownerOf",
          parameters: [params.tokenId],
          returnValueTest: {
            comparator: "=",
            value: ":userAddress",
          },
        },
      ];
    } else if (vmType === "SVM") {
      // solana
      return [
        {
          conditionType: "solRpc",
          method: "GetTokenAccountsByOwner",
          params: [
            ":userAddress",
            {
              programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              encoding: "jsonParsed",
            },
          ],
          chain,
          returnValueTest: {
            key:
              '$[?(@.account.data.parsed.info.mint == "' +
              params.tokenId +
              '")].account.data.parsed.info.tokenAmount.amount',
            comparator: ">",
            value: "0",
          },
        },
      ];
    }
  } else if (conditionType === CONDITION_TYPES.INDIVIDUAL_WALLET) {
    if (vmType === "EVM") {
      return [
        {
          conditionType: "evmBasic",
          contractAddress: "",
          standardContractType: "",
          chain,
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: params.resolvedAddress,
          },
        },
      ];
    } else if (vmType === "SVM") {
      return [
        {
          conditionType: "solRpc",
          method: "",
          params: [":userAddress"],
          chain,
          returnValueTest: {
            key: "",
            comparator: "=",
            value: params.resolvedAddress,
          },
        },
      ];
    }
  } else if (conditionType === CONDITION_TYPES.HOLDS_TOKEN_IN_COLLECTION) {
    if (vmType === "EVM") {
      if (params.contractType === "ERC20") {
        return [
          {
            conditionType: "evmBasic",
            contractAddress: params.contractAddress,
            standardContractType: params.contractType,
            chain,
            method: "balanceOf",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: ">=",
              value: params.amount,
            },
          },
        ];
      } else if (params.contractType === "ERC721") {
        return [
          {
            conditionType: "evmBasic",
            contractAddress: params.contractAddress,
            standardContractType: params.contractType,
            chain,
            method: "balanceOf",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: ">=",
              value: params.amount,
            },
          },
        ];
      } else if (params.contractType === "ERC1155") {
        return [
          {
            conditionType: "evmBasic",
            contractAddress: params.contractAddress,
            standardContractType: params.contractType,
            chain,
            method: "balanceOf",
            parameters: [":userAddress", params.erc1155TokenId],
            returnValueTest: {
              comparator: ">=",
              value: params.amount,
            },
          },
        ];
      }
    } else if (vmType === "SVM") {
      return [
        {
          conditionType: "solRpc",
          method: "balanceOfMetaplexCollection",
          params: [params.contractAddress],
          chain,
          returnValueTest: {
            key: "",
            comparator: ">=",
            value: params.amount,
          },
        },
      ];
    }
  } else if (conditionType === CONDITION_TYPES.HOLDS_BALANCE) {
    if (vmType === "EVM") {
      return [
        {
          conditionType: "evmBasic",
          contractAddress: "",
          standardContractType: "",
          chain,
          method: "eth_getBalance",
          parameters: [":userAddress", "latest"],
          returnValueTest: {
            comparator: ">=",
            value: params.amount,
          },
        },
      ];
    } else if (vmType === "SVM") {
      return [
        {
          conditionType: "solRpc",
          method: "getBalance",
          params: [":userAddress"],
          chain,
          returnValueTest: {
            key: "",
            comparator: ">=",
            value: params.amount,
          },
        },
      ];
    }
  }
};
