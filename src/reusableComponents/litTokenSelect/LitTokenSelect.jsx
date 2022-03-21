import React, { useEffect, useState, useMemo, useContext } from 'react';
import LitNextButton from "../litFooter/LitNextButton";
import './LitTokenSelect.css';
import chevronDown from "../../assets/chevronDown.svg";
import union from "../../assets/union.svg";

import {
  WindowedMenuList,
  createFilter,
  components,
} from "react-windowed-select";

import LitBackButton from "../litFooter/LitBackButton";
import { ShareModalContext } from "../../shareModal/ShareModal";
import CreatableSelect from "react-select/creatable";
import LitFooter from "../litFooter/LitFooter";

const LitTokenSelect = ({ label, setSelectedToken, option, selectedToken }) => {
  const { tokenList, defaultTokens } = useContext(ShareModalContext);
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const Option = ({ children, data: { label, logo, symbol }, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = Object.assign(props, { innerProps: rest });

    return (
      <components.Option {...newProps} className={'lsm-z-100 lsm-p-0'} style={{ padding: 0, zIndex: 105 }}>
        <div className={'lsm-flex lsm-items-center lsm-cursor-pointer'}>
          <div
            className={'lsm-h-8 lsm-w-8 radius-full lsm-ml-1 lsm-mr-4 lsm-bg-no-repeat lsm-bg-contain lsm-bg-center'}
            style={{ backgroundImage: logo ? `url(${logo})` : undefined }}
          />
          <div>
            <div className={'lsm-text-base lsm-leading-normal lsm-text-black lsm-font-segoe lsm-font-light'}>{label}</div>
            <div className={'lsm-text-sm lsm-text-secondary lsm-text-gray lsm-font-segoe lsm-font-light'}>{symbol}</div>
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
        return 'lsm-reusable-select-option lsm-border-brand-5 lsm-bg-white lsm-border-2';
      } else {
        return 'lsm-reusable-select-option lsm-border-brand-5 lsm-bg-white lsm-border';
      }
  };

  return (
    <div className={'lsm-w-full'}>
      <span className={'lsm-flex lsm-items-center'}>
        <button
          className={"lsm-mr-3 lsm-bg-white lsm-border-brand-4 lsm-text-brand-4 lsm-token-select-button"}
          onClick={() => setSelectIsOpen(true)}>
          {option ? `${option.label}` : label}
        </button>
        {selectedToken && selectedToken.label && (
          <button className={'lsm-bg-white lsm-border-black lsm-text-title-gray lsm-token-clear-select-button'}
            onClick={() => setSelectedToken(null)}
          >
            Clear selection
            {/*<img alt={'close'} className={'lsm-ml-4 lsm-h-3 lsm-bg-transparent'} src={union} onClick={() => setSelectedToken(null)}/>*/}
          </button>
        )}
      </span>
      {!!selectIsOpen && (
        <div className={'lsm-token-select-container lsm-bg-brand-2'}>
          <header className={'lsm-token-select-header lsm-bg-brand-4'}>
              <h3 className={'lsm-text-gray lsm-font-segoe lsm-font-light'}>SELECT A TOKEN/NFT</h3>
          </header>
          <div className={'lsm-top-tokens-container'}>
            <p className={'lsm-w-full lsm-capitalize-and-size'}>TOP TOKENS/NFTS</p>
            <span className={'lsm-top-token-chips'}>
              {defaultTokens.map((t, i) => (
                <span
                  className={checkForSelected(t)}
                  key={t.symbol}
                  onClick={(e) => {
                    setSelectedToken(t);
                  }}
                >
                  {!!t['logo'] && (
                    <img className={'lsm-h-6 lsm-w-6 lsm-mr-2'} src={t['logo']}/>
                  )}
                  <div className={'lsm-text-black lsm-font-segoe lsm-font-light'}>{t.symbol}</div>
                  </span>
              ))}
            </span>
          </div>
          <LitFooter backAction={() => {
                      setSelectedToken(null);
                      setSelectIsOpen(false);
                    }}
                     nextAction={() => setSelectIsOpen(false)}
                     nextDisableConditions={!selectedToken}
                     backgroundColor={'lsm-bg-transparent'}
          />
          <div className={'lsm-token-select-dropdown-container lsm-mx-auto'}>
            <label className="lsm-capitalize-and-size lsm-pb-4 lsm-font-sans">SEARCH</label>
            <CreatableSelect
              className={'lsm-token-select-dropdown'}
              classNamePrefix={'lsm-token-select'}
              filterOption={createFilter({ ignoreAccents: false })}
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
