import React, { useEffect, useState, useMemo, useContext } from 'react';
import LitNextButton from "./LitNextButton";
import chevronDown from "../assets/chevronDown.svg";
import union from "../assets/union.svg";

import {
  WindowedMenuList,
  createFilter,
  components,
} from "react-windowed-select";

import LitBackButton from "./LitBackButton";
import { ShareModalContext } from "../generalComponents/ShareModal";
import CreatableSelect from "react-select/creatable";

const LitTokenSelect = ({ label, setSelectedToken, option, selectedToken }) => {
  const { tokenList, defaultTokens } = useContext(ShareModalContext);
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const Option = ({ children, data: { label, logo, symbol }, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = Object.assign(props, { innerProps: rest });

    return (
      <components.Option {...newProps} className={'lms-z-100 lms-p-0'} style={{ padding: 0, zIndex: 105 }}>
        <div className={'lms-flex lms-items-center'}>
          <div
            className={'lms-h-8 lms-w-8 radius-full lms-ml-1 lms-mr-4 lms-bg-no-repeat lms-bg-contain lms-bg-center'}
            style={{ backgroundImage: logo ? `url(${logo})` : undefined }}
          />
          <div>
            <div className={'lms-text-base lms-leading-normal lms-text-black'}>{label}</div>
            <div className={'lms-text-sm md:lms-text-base lms-text-secondary'}>{symbol}</div>
          </div>
        </div>
      </components.Option>
    );
  };

  const tokenSelectBoxRows = useMemo(() => {
    return [
      {
        label: "Ethereum",
        value: "ethereum",
        symbol: "ETH",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg",
      },
      ...tokenList.map((t) => ({
        label: t.name,
        value: t.address,
        standard: t.standard,
        logo: t.logoURI,
        symbol: t.symbol,
      })),
    ];
  }, [tokenList]);

  const checkForSelected = (token) => {
    if (
      token &&
      token["symbol"] &&
      selectedToken &&
      token["symbol"] === selectedToken["symbol"]
      ) {
        return 'lms-flex lms-flex-row lms-items-center lms-border lms-border-brand-5 lms-rounded lms-py-1.5 lms-px-1.5 lms-mr-2 lms-mt-4 lms-bg-white lms-border-2 lms-cursor-pointer';
      } else {
        return 'lms-flex lms-flex-row lms-items-center lms-border lms-border-brand-5 lms-rounded lms-py-1.5 lms-px-1.5 lms-mr-2 lms-mt-4 lms-bg-white lms-cursor-pointer';
      }
  };

  return (
    <div className={'lms-w-full'}>
      <button
        className={"lms-w-full lms-bg-white lms-h-12 lms-border-2 lms-border-brand-4 lms-rounded hover:lms-border-2 lms-text-brand-4 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-4"}
        onClick={() => setSelectIsOpen(true)}>
        {option ? option.label : label}
        {/* <img src={chevronDown}/> */}
      </button>
      {!!selectIsOpen && (
        <div className={'lms-absolute lms-w-full lms-h-full lms-rounded lms-top-0 lms-left-0 lms-z-20 lms-bg-brand-2'}>
          <header className={'lms-w-full lms-py-4 lms-m-0 lms-bg-brand-4 lms-px-4'}>
            <span className={'lms-w-full lms-bg-brand-4'}>
              <h3 className={'lms-w-full lms-mx-auto lms-text-brand-light'}>SELECT A TOKEN/NFT</h3>
            </span>
          </header>
          <div className={'lms-w-full lms-mx-auto lms-flex lms-flex-col lms-items-center lms-justify-between lms-px-4 lms-mt-8 lms-mb-16'}>
            <p className={'lms-w-full lms-capitalize-and-size'}>TOP TOKENS/NFTS</p>
            <span className={'lms-flex lms-flex-row lms-flex-wrap lms-justify-start lms-w-full'}>
              {defaultTokens.map((t, i) => (
                <span
                  className={checkForSelected(t)}
                  key={t.symbol}
                  onClick={(e) => {
                    setSelectedToken(t);
                  }}
                >
                  {!!t['logo'] && (
                    <img className={'lms-h-6 lms-w-6 lms-mr-2'} src={t['logo']}/>
                  )}
                  <div className={''}>{t.symbol}</div>
                  </span>
              ))}
            </span>
          </div>
          <div className={'lms-flex lms-flex-row lms-justify-between lms-w-full lms-h-12 lms-absolute lms-bottom-0 lms-my-4 lms-bg-transparent lms-z-20 lms-px-4'}>
            <LitBackButton onClick={() => {
              setSelectedToken(null);
              setSelectIsOpen(false);
            }}/>
            <LitNextButton disableConditions={!selectedToken} onClick={() => setSelectIsOpen(false)}/>
          </div>
          <div className={'lms-w-full lms-px-4 lms-mx-auto'}>
            <label className="lms-capitalize-and-size lms-mb-4">SEARCH</label>
            <CreatableSelect
              filterOption={createFilter({ ignoreAccents: false })}
              classNamePrefix="react-select"
              components={{ Option, MenuList: WindowedMenuList }}
              isClearable
              isSearchable
              defaultValue={""}
              options={tokenSelectBoxRows}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
              onChange={setSelectedToken}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LitTokenSelect;
