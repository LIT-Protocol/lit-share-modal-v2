import React, { useEffect, useState } from 'react';
import chevronDown from '../../assets/chevronDown.svg';
import union from '../../assets/union.svg';
import './LitReusableSelect.css';
import LitFooter from "../litFooter/LitFooter";

const LitReusableSelect = ({options, label, setOption, option, turnOffSearch = false}) => {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([])

  useEffect(() => {
    if (!!options) {
      const results = options.filter(o => {
        if (o.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          return o;
        }
      })
      setFilteredOptions(results);
    }
  }, [searchTerm])

  const checkForSelected = (chain) => {
    if (
      chain &&
      chain["name"] &&
      option &&
      chain["name"] === option["name"]
    ) {
      return 'lsm-reusable-select-option lsm-border-brand-5 lsm-bg-white lsm-border-2';
    } else {
      return 'lsm-reusable-select-option lsm-border-brand-5 lsm-bg-white lsm-border';
    }
  };

  return (
    <div className={'lsm-w-full'}>
      <button className={"lsm-bg-white lsm-border-brand-4 hover:lsm-border-2 lsm-select-none focus:lsm-outline-0 focus:lsm-outline-transparent lsm-reusable-select-button"}
              onClick={() => setSelectIsOpen(true)}>
        {option ? option.name : label}
        <img src={chevronDown}/>
      </button>
      {!!selectIsOpen && (
        <div className={'lsm-reusable-select-container lsm-bg-brand-2'}>
            {!!turnOffSearch ? (
              <div className={'lsm-reusable-select-title lsm-bg-brand-4'}>
                <h3 className={'lsm-text-gray lsm-font-segoe lsm-font-light'}>{label.toUpperCase()}</h3>
              </div>
            ) : (
              <div className={'lsm-fixed lsm-top-0 lsm-left-0 lsm-w-full lsm-pt-4 lsm-pb-2 lsm-bg-brand-2'}>
                <span className={'lsm-w-11/12 lsm-mx-auto lsm-border-b lsm-border-brand-2 lsm-flex lsm-flex-row lsm-items-center lsm-justify-between lsm-px-2'}>
                  <input className={'lsm-w-full lsm-py-2 focus:outline-0 lsm-bg-brand-light lsm-input'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  <img alt={'clear input'} className={'lsm-h-4 font-os'} src={union} onClick={() => setSearchTerm('')}/>
                </span>
                <p className={"lsm-w-11/12 lsm-mx-auto lsm-mt-2 lsm-mr-2"}>No. of results: {filteredOptions.length}</p>
              </div>
            )}
          <span className={!!turnOffSearch ? 'lsm-reusable-select-option-container' : 'lsm-flex lsm-flex-row lsm-flex-wrap lsm-justify-start lsm-w-full lsm-mt-20'}>
              {filteredOptions.map((t, i) => (
                <span
                  className={checkForSelected(t)}
                  key={i}
                  onClick={(e) => {
                    setOption(t);
                  }}
                >
                  {!!t['logo'] && (
                    <img className={'lsm-h-6 lsm-w-6 lsm-mr-2'} src={t['logo']} />
                  )}
                  <div className={'lsm-text-base lsm-font-segoe lsm-font-light'}>{t.name}</div>
                  </span>
              ))}
            </span>
          <LitFooter backAction={() => setSelectIsOpen(false)}
                     nextAction={() => setSelectIsOpen(false)}
                     nextDisableConditions={!option}
                     backgroundColor={'lsm-bg-transparent'} />
        </div>
      )}
    </div>
  )
}

export default LitReusableSelect;
