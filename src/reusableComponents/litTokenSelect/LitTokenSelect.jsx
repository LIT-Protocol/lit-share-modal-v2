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
      <components.Option {...newProps} className={'lms-z-100 lms-p-0'} style={{ padding: 0, zIndex: 105 }}>
        <div className={'lms-flex lms-items-center lms-cursor-pointer'}>
          <div
            className={'lms-h-8 lms-w-8 radius-full lms-ml-1 lms-mr-4 lms-bg-no-repeat lms-bg-contain lms-bg-center'}
            style={{ backgroundImage: logo ? `url(${logo})` : undefined }}
          />
          <div>
            <div className={'lms-text-base lms-leading-normal lms-text-black lms-font-segoe lms-font-light'}>{label}</div>
            <div className={'lms-text-sm lms-text-secondary lms-text-gray lms-font-segoe lms-font-light'}>{symbol}</div>
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
        return 'lms-reusable-select-option lms-border-brand-5 lms-bg-white lms-border-2';
      } else {
        return 'lms-reusable-select-option lms-border-brand-5 lms-bg-white lms-border';
      }
  };

  return (
    <div className={'lms-w-full'}>
      <span className={'lms-flex lms-items-center'}>
        <button
          className={"lms-mr-3 lms-bg-white lms-border-brand-4 lms-text-brand-4 lms-token-select-button"}
          onClick={() => setSelectIsOpen(true)}>
          {option ? `${option.label}` : label}
        </button>
        {selectedToken && selectedToken.label && (
          <button className={'lms-bg-white lms-border-black lms-text-title-gray lms-token-clear-select-button'}
            onClick={() => setSelectedToken(null)}
          >
            Clear selection
            {/*<img alt={'close'} className={'lms-ml-4 lms-h-3 lms-bg-transparent'} src={union} onClick={() => setSelectedToken(null)}/>*/}
          </button>
        )}
      </span>
      {!!selectIsOpen && (
        <div className={'lms-token-select-container lms-bg-brand-2'}>
          <header className={'lms-token-select-header lms-bg-brand-4'}>
              <h3 className={'lms-text-gray lms-font-segoe lms-font-light'}>SELECT A TOKEN/NFT</h3>
          </header>
          <div className={'lms-top-tokens-container'}>
            <p className={'lms-w-full lms-capitalize-and-size'}>TOP TOKENS/NFTS</p>
            <span className={'lms-top-token-chips'}>
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
                  <div className={'lms-text-black lms-font-segoe lms-font-light'}>{t.symbol}</div>
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
                     backgroundColor={'lms-bg-transparent'}
          />
          <div className={'lms-token-select-dropdown-container lms-mx-auto'}>
            <label className="lms-capitalize-and-size lms-pb-4 lms-font-sans">SEARCH</label>
            <CreatableSelect
              className={'lms-token-select-dropdown'}
              classNamePrefix={'lms-token-select'}
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
