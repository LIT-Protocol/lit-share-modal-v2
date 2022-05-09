import { ALL_LIT_CHAINS } from "lit-js-sdk";

export const CONDITION_TYPES = {
  HOLDS_SPECIFIC_NFT: "HOLDS_SPECIFIC_NFT",
  INDIVIDUAL_WALLET: "INDIVIDUAL_WALLET",
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
  }
};
