import React, { useContext, useEffect, useState } from 'react';
import chevronDown from '../assets/chevronDown.svg';
import union from '../assets/union.svg';
import LitBackButton from "./LitBackButton";
import { ShareModalContext } from "../generalComponents/ShareModal";

const LitTokenSelectDropdown = ({ options, label, setOption, option, }) => {
  const context = useContext(ShareModalContext);
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([])
  const [filteredCount, setFilteredCount] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(true);

  useEffect(() => {
    if (isSubscribed && searchTerm.length) {
      const results = options.filter(o => {
        if (o.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return o;
        }
      })
      setFilteredCount(results.length);
      setFilteredOptions(results);
    } else {
      setFilteredCount(options.length);
    }

    return () => {
      setIsSubscribed(false);
    }
  }, [searchTerm])

  return (
    <div className={'w-11/12 z-20 mx-auto px-2'}>
      <p className={'text-sm w-full'}>SEARCH</p>
      <button
        className={"w-full h-12 bg-white border border-brand-4 rounded hover:border-2 flex flex-row items-center justify-between px-4"}
        onClick={() => setSelectIsOpen(true)}>
        {option ? option.name : label}
        <img src={chevronDown}/>
      </button>
      {!!selectIsOpen && (
        <div className={'absolute w-full h-full top-0 left-0 bg-brand-20 p-6'}>
          <div className={'fixed top-0 left-0 w-full pt-4 pb-2 bg-brand-4'}>
              <span
                className={'w-11/12 mx-auto border-b border-brand-light flex flex-row items-center justify-between px-2'}>
                <input className={'w-full py-2 focus:outline-0 bg-brand-4 text-brand-light'} value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <img alt={'clear input'} className={'h-4 font-os'} src={union} onClick={() => setSearchTerm('')}/>
              </span>
            <p className={"w-11/12 mx-auto mt-2 mr-2 text-brand-light"}>No. of results: {filteredCount}</p>
          </div>
          <div className={'mt-20'}>
            {filteredOptions.map((option, i) => {
              return <button key={i}
                             className={"w-full h-16 border border-brand-4 rounded mt-2 flex flex-row items-center justify-start px-4"}
                             onClick={() => {
                               setOption(option);
                               setSelectIsOpen(false);
                             }}>
                {!!option['logoURI'] && (
                  <img className={'h-10 w-10 mr-2 rounded-full'} src={option['logoURI']}/>
                )}
                {option.name}
              </button>
            })
            }
          </div>
          <span className={'w-full h-16 fixed bottom-0 left-0 py-3 bg-brand-20'}>
            <LitBackButton label={'BACK TO TOKEN SELECT'}
                           backgroundColor={'bg-brand-20'}
                           onClick={() => setSelectIsOpen(false)}/>
          </span>
        </div>
      )}
    </div>
  )
}

export default LitTokenSelectDropdown;
