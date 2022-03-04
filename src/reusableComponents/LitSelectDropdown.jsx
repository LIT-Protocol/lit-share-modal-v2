import React, { useEffect, useState } from 'react';
import chevronDown from '../assets/chevronDown.svg';
import union from '../assets/union.svg';
import LitBackButton from "./LitBackButton";

const LitSelectDropdown = ({options, label, setOption, option, backButtonLabel, turnOffSearch = false}) => {
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
      return 'lms-flex lms-flex-row lms-items-center lms-border lms-border-brand-5 lms-rounded lms-py-2.5 lms-px-2.5 lms-mr-2 lms-mt-4 lms-bg-white lms-border-2 lms-cursor-pointer';
    } else {
      return 'lms-flex lms-flex-row lms-items-center lms-border lms-border-brand-5 lms-rounded lms-py-2.5 lms-px-2.5 lms-mr-2 lms-mt-4 lms-bg-white lms-cursor-pointer';
    }
  };

  return (
    <div className={'lms-w-full'}>
      <button className={"lms-w-full lms-h-12 lms-border lms-border-brand-4 lms-rounded hover:lms-border-2 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-4 lms-select-none focus:outline-0 focus:outline-transparent"}
              onClick={() => setSelectIsOpen(true)}>
        {option ? option.name : label}
        <img src={chevronDown}/>
      </button>
      {!!selectIsOpen && (
        <div className={'lms-absolute lms-w-full lms-h-full lms-top-0 lms-left-0 bg-brand-2 lms-p-6 lms-z-20'}>
            {!!turnOffSearch ? (
              <div className={'lms-fixed lms-top-0 lms-left-0 lms-w-full lms-py-4 lms-bg-brand-4 lms-text-white lms-h-14'}>
                <h3 className={'lms-ml-6'}>{label.toUpperCase()}</h3>
              </div>
            ) : (
              <div className={'lms-fixed lms-top-0 lms-left-0 lms-w-full lms-pt-4 lms-pb-2 bg-brand-2'}>
                <span className={'lms-w-11/12 lms-mx-auto lms-border-b lms-border-brand-2 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-2'}>
                  <input className={'lms-w-full lms-py-2 focus:outline-0 lms-bg-brand-light lms-input'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  <img alt={'clear input'} className={'lms-h-4 font-os'} src={union} onClick={() => setSearchTerm('')}/>
                </span>
                <p className={"lms-w-11/12 lms-mx-auto lms-mt-2 lms-mr-2"}>No. of results: {filteredOptions.length}</p>
              </div>
            )}
          <span className={turnOffSearch ? 'lms-flex lms-flex-row lms-flex-wrap lms-justify-start lms-w-full lms-mt-12' : 'lms-flex lms-flex-row lms-flex-wrap lms-justify-start lms-w-full lms-mt-20'}>
              {filteredOptions.map((t, i) => (
                <span
                  className={checkForSelected(t)}
                  key={i}
                  onClick={(e) => {
                    setOption(t);
                    setSelectIsOpen(false);
                  }}
                >
                  {!!t['logo'] && (
                    <img className={'lms-h-6 lms-w-6 lms-mr-2'} src={t['logo']} />
                  )}
                  <div className={''}>{t.name}</div>
                  </span>
              ))}
            </span>
          <footer className={'lms-w-full bg-brand-2 lms-py-4 lms-flex lms-flex-row lms-justify-between lms-w-full lms-h-20 lms-bottom-0 lms-fixed lms-bottom-0 lms-left-0'}>
            <LitBackButton label={backButtonLabel} onClick={() => setSelectIsOpen(false)}/>
          </footer>
        </div>
      )}
    </div>
  )
}

export default LitSelectDropdown;
