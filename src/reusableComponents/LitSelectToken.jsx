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

const LitSelectToken = ({ label, setSelectedToken, option, selectedToken }) => {
  const { tokenList, defaultTokens } = useContext(ShareModalContext);
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const Option = ({ children, data: { label, logo, symbol }, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = Object.assign(props, { innerProps: rest });

    return (
      <components.Option {...newProps} className={'z-100 p-0'} style={{ padding: 0, zIndex: 105 }}>
        <div className={'flex items-center'}>
          <div
            className={'h-2.5 w-2.5 radius-full mx-1.5 bg-no-repeat bg-contain bg-center'}
            style={{ backgroundImage: logo ? `url(${logo})` : undefined }}
          />
          <div>
            <div className={'text-base leading-normal text-black'}>{label}</div>
            <div className={'text-sm md:text-base text-secondary'}>{symbol}</div>
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
      return 'flex flex-row items-center border border-brand-5 rounded py-1.5 px-1.5 mr-2 mt-4 bg-white border-2 cursor-pointer';
    } else {
      return 'flex flex-row items-center border border-brand-5 rounded py-1.5 px-1.5 mr-2 mt-4 bg-white cursor-pointer';
    }
  };

  return (
    <div className={'w-full'}>
      <button
        className={"w-full h-12 border border-brand-4 rounded hover:border-2 flex flex-row items-center justify-between px-4"}
        onClick={() => setSelectIsOpen(true)}>
        {option ? option.label : label}
        <img src={chevronDown}/>
      </button>
      {!!selectIsOpen && (
        <div className={'absolute w-full h-full top-0 left-0 bg-brand-20'}>
          <header className={'w-full py-4 m-0 bg-brand-4'}>
            <span className={'w-full bg-brand-4'}>
              <h3 className={'w-11/12 mx-auto text-brand-light'}>SELECT A TOKEN/NFT</h3>
            </span>
          </header>
          <div className={'w-11/12 mx-auto flex flex-col items-center justify-between px-2 mt-8 mb-16'}>
            <p className={'text-sm md:text-base w-full'}>TOP TOKENS/NFTS</p>
            <span className={'flex flex-row flex-wrap justify-start w-full'}>
              {defaultTokens.map((t, i) => (
                <span
                  className={checkForSelected(t)}
                  key={t.symbol}
                  onClick={(e) => {
                    setSelectedToken(t);
                  }}
                >
                  {!!t['logo'] && (
                    <img className={'h-6 w-6 mr-2'} src={t['logo']}/>
                  )}
                  <div className={''}>{t.symbol}</div>
                  </span>
              ))}
            </span>
          </div>
          <div className={'flex flex-row justify-between w-full h-12 absolute bottom-0 my-4 bg-co z-0'}>
            <LitBackButton onClick={() => {
              setSelectedToken(null);
              setSelectIsOpen(false);
            }}/>
            <LitNextButton disableConditions={false} onClick={() => setSelectIsOpen(false)}/>
          </div>
          <div className={'w-11/12 mx-auto'}>
            <label>Search</label>
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

export default LitSelectToken;
