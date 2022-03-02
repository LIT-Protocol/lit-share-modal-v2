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
      return 'flex flex-row items-center border border-brand-5 rounded py-2.5 px-2.5 mr-2 mt-4 bg-white border-2';
    } else {
      return 'flex flex-row items-center border border-brand-5 rounded py-2.5 px-2.5 mr-2 mt-4 bg-white';
    }
  };

  return (
    <div className={'w-full'}>
      <button className={"w-full h-12 border border-brand-4 rounded hover:border-2 flex flex-row items-center justify-between px-4 select-none focus:outline-0 focus:outline-transparent"}
              onClick={() => setSelectIsOpen(true)}>
        {option ? option.name : label}
        <img src={chevronDown}/>
      </button>
      {!!selectIsOpen && (
        <div className={'absolute w-full h-full top-0 left-0 bg-brand-2 p-6 z-20'}>
            {!!turnOffSearch ? (
              <div className={'fixed top-0 left-0 w-full py-4 bg-brand-4 text-white h-14'}>
                <h3 className={'ml-6'}>{label.toUpperCase()}</h3>
              </div>
            ) : (
              <div className={'fixed top-0 left-0 w-full pt-4 pb-2 bg-brand-2'}>
                <span className={'w-11/12 mx-auto border-b border-brand-2 flex flex-row items-center justify-between px-2'}>
                  <input className={'w-full py-2 focus:outline-0 bg-brand-light'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  <img alt={'clear input'} className={'h-4 font-os'} src={union} onClick={() => setSearchTerm('')}/>
                </span>
                <p className={"w-11/12 mx-auto mt-2 mr-2"}>No. of results: {filteredOptions.length}</p>
              </div>
            )}
          <span className={turnOffSearch ? 'flex flex-row flex-wrap justify-start w-full mt-12' : 'flex flex-row flex-wrap justify-start w-full mt-20'}>
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
                    <img className={'h-6 w-6 mr-2'} src={t['logo']} />
                  )}
                  <div className={''}>{t.name}</div>
                  </span>
              ))}
            </span>
          <footer className={'w-full bg-brand-2 py-4 flex flex-row justify-between w-full h-20 bottom-0 fixed bottom-0 left-0'}>
            <LitBackButton label={backButtonLabel} onClick={() => setSelectIsOpen(false)}/>
          </footer>
        </div>
      )}
    </div>
  )
}

export default LitSelectDropdown;
