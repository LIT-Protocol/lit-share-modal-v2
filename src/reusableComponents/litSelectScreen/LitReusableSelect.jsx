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
      return 'lms-reusable-select-option lms-border-brand-5 lms-bg-white lms-border-2';
    } else {
      return 'lms-reusable-select-option lms-border-brand-5 lms-bg-white lms-border';
    }
  };

  return (
    <div className={'lms-w-full'}>
      <button className={"lms-bg-white lms-border-brand-4 hover:lms-border-2 lms-select-none focus:lms-outline-0 focus:lms-outline-transparent lms-reusable-select-button"}
              onClick={() => setSelectIsOpen(true)}>
        {option ? option.name : label}
        <img src={chevronDown}/>
      </button>
      {!!selectIsOpen && (
        <div className={'lms-reusable-select-container lms-bg-brand-2'}>
            {!!turnOffSearch ? (
              <div className={'lms-reusable-select-title lms-bg-brand-4'}>
                <h3 className={'lms-text-gray lms-font-segoe lms-font-light'}>{label.toUpperCase()}</h3>
              </div>
            ) : (
              <div className={'lms-fixed lms-top-0 lms-left-0 lms-w-full lms-pt-4 lms-pb-2 lms-bg-brand-2'}>
                <span className={'lms-w-11/12 lms-mx-auto lms-border-b lms-border-brand-2 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-2'}>
                  <input className={'lms-w-full lms-py-2 focus:outline-0 lms-bg-brand-light lms-input'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  <img alt={'clear input'} className={'lms-h-4 font-os'} src={union} onClick={() => setSearchTerm('')}/>
                </span>
                <p className={"lms-w-11/12 lms-mx-auto lms-mt-2 lms-mr-2"}>No. of results: {filteredOptions.length}</p>
              </div>
            )}
          <span className={!!turnOffSearch ? 'lms-reusable-select-option-container' : 'lms-flex lms-flex-row lms-flex-wrap lms-justify-start lms-w-full lms-mt-20'}>
              {filteredOptions.map((t, i) => (
                <span
                  className={checkForSelected(t)}
                  key={i}
                  onClick={(e) => {
                    setOption(t);
                  }}
                >
                  {!!t['logo'] && (
                    <img className={'lms-h-6 lms-w-6 lms-mr-2'} src={t['logo']} />
                  )}
                  <div className={'lms-text-base lms-font-segoe lms-font-light'}>{t.name}</div>
                  </span>
              ))}
            </span>
          <LitFooter backAction={() => setSelectIsOpen(false)}
                     nextAction={() => setSelectIsOpen(false)}
                     nextDisableConditions={!option}
                     backgroundColor={'lms-bg-transparent'} />
        </div>
      )}
    </div>
  )
}

export default LitReusableSelect;
