import { ALL_LIT_CHAINS } from "lit-js-sdk";

export const CONDITION_TYPES = {
  HOLDS_SPECIFIC_NFT: "HOLDS_SPECIFIC_NFT",
};

export const generateUnifiedCondition = ({ chain, conditionType, params }) => {
  if (conditionType === CONDITION_TYPES.HOLDS_SPECIFIC_NFT) {
    const chainDetails = ALL_LIT_CHAINS[chain];
    if (chainDetails.vmType === "EVM") {
      // eth
      return [
        {
          conditionType: "evmBasic",
          contractAddress: params.contractAddress,
          standardContractType: "ERC721",
          chain: chain.value,
          method: "ownerOf",
          parameters: [params.tokenId],
          returnValueTest: {
            comparator: "=",
            value: ":userAddress",
          },
        },
      ];
    } else if (chainDetails.vmType === "SVM") {
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
          chain: "solana",
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
    } else {
      throw new Error(`Unsupported chain type: ${chainDetails.vmType}`);
    }
  }
};
