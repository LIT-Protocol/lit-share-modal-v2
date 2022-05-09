import React, { useContext, useEffect, useState } from "react";
import { ShareModalContext } from "../shareModal/createShareContext.js";
import LitSimpleDropdown from "../reusableComponents/litSimpleDropdown/LitSimpleDropdown";
import LitFooter from "../reusableComponents/litFooter/LitFooter";

const typeOfPoapGate = [
  {
    name: "By POAP ID",
    id: "eventId",
    value: "=",
  },
  {
    name: "By POAP Name",
    id: "tokenURI",
    value: "=",
  },
];

const matchNameType = [
  {
    name: "Contains POAP Name",
    id: "contains",
    value: "contains",
  },
  {
    name: "Equals POAP Name exactly",
    id: "equals",
    value: "=",
  },
];

const SelectPOAP = ({ setSelectPage, handleUpdateAccessControlConditions }) => {
  const { setDisplayedPage, flow } = useContext(ShareModalContext);
  const [poapGateType, setPoapGateType] = useState(typeOfPoapGate[0]);
  const [poapId, setPoapId] = useState("");
  const [nameMatchCondition, setNameMatchCondition] = useState(null);
  const [poapName, setPoapName] = useState("");

  useEffect(() => {
    setPoapName("");
    setPoapId("");
  }, [poapGateType]);

  const getComparator = (type) => {
    if (type === "eventId") {
      return "=";
    } else {
      return nameMatchCondition.value;
    }
  };

  const handleSubmit = () => {
    const accessControlConditions = [
      [
        {
          conditionType: "evmBasic",
          contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
          standardContractType: "POAP",
          chain: "xdai",
          method: poapGateType.id,
          parameters: [],
          returnValueTest: {
            comparator: getComparator(poapGateType.id),
            value: poapGateType.id === "eventId" ? poapId : poapName,
          },
        },
        { operator: "or" },
        {
          conditionType: "evmBasic",
          contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
          standardContractType: "POAP",
          chain: "ethereum",
          method: poapGateType.id,
          parameters: [],
          returnValueTest: {
            comparator: getComparator(poapGateType.id),
            value: poapGateType.id === "eventId" ? poapId : poapName,
          },
        },
      ],
    ];

    handleUpdateAccessControlConditions(accessControlConditions);
    setSelectPage("chooseAccess");

    if (flow === "singleCondition") {
      setDisplayedPage("review");
    } else if (flow === "multipleConditions") {
      setDisplayedPage("multiple");
    }
  };

  return (
    <div className={"lsm-select-container"}>
      <h3
        className={
          "lsm-select-prompt lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light"
        }
      >
        Which POAP should be able to access this asset?
      </h3>
      <h3
        className={
          "lsm-select-label lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light"
        }
      >
        POAP How would you like to reference this POAP?
      </h3>
      <LitSimpleDropdown
        label={"Select Type of Gate"}
        options={typeOfPoapGate}
        setSelected={setPoapGateType}
        selected={poapGateType}
      />
      {poapGateType.id === "eventId" ? (
        <div className={"lsm-w-full"}>
          <h3
            className={
              "lsm-select-label lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light"
            }
          >
            POAP ID:
          </h3>
          <input
            type={"number"}
            value={poapId}
            onChange={(e) => setPoapId(e.target.value)}
            className={
              "lsm-border-gray-4 dark:lsm-text-gray dark:lsm-bg-gray-7 lsm-input"
            }
          />
        </div>
      ) : (
        <div className={"lsm-w-full"}>
          <h3
            className={
              "lsm-select-label lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light"
            }
          >
            POAP Name:
          </h3>
          <input
            value={poapName}
            onChange={(e) => setPoapName(e.target.value)}
            className={
              "lsm-border-gray-4 dark:lsm-text-gray dark:lsm-bg-gray-7 lsm-input"
            }
          />
          <h3
            className={
              "lsm-select-label lsm-text-title-gray dark:lsm-text-gray lsm-font-segoe lsm-text-base lsm-font-light"
            }
          >
            Match conditions:
          </h3>
          <LitSimpleDropdown
            label={"Select match condition"}
            options={matchNameType}
            setSelected={setNameMatchCondition}
            selected={nameMatchCondition}
          />
        </div>
      )}
      <LitFooter
        backAction={() => setSelectPage("chooseAccess")}
        nextAction={handleSubmit}
        nextDisableConditions={
          poapGateType.id === "eventId"
            ? !poapId.length
            : !poapName.length || !nameMatchCondition
        }
      />
    </div>
  );
};

export default SelectPOAP;
