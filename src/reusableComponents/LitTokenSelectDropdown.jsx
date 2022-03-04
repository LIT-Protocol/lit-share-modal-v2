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
    <div className={'lms-w-11/12 lms-z-20 lms-mx-auto lms-px-2'}>
      <p className={'lms-text-sm md:lms-text-base lms-w-full'}>SEARCH</p>
      <button
        className={"lms-w-full lms-h-12 lms-bg-white lms-border lms-border-brand-4 lms-rounded hover:lms-border-2 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-4"}
        onClick={() => setSelectIsOpen(true)}>
        {option ? option.name : label}
        <img src={chevronDown}/>
      </button>
      {!!selectIsOpen && (
        <div className={'lms-absolute lms-w-full lms-h-full lms-top-0 lms-left-0 bg-brand-20 lms-p-6'}>
          <div className={'lms-fixed lms-top-0 lms-left-0 lms-w-full lms-pt-4 lms-pb-2 lms-bg-brand-4'}>
              <span
                className={'lms-w-11/12 lms-mx-auto lms-border-b lms-border-brand-light lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-2'}>
                <input className={'lms-w-full lms-py-2 focus:outline-0 lms-bg-brand-4 lms-text-brand-light lms-input'} value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <img alt={'clear input'} className={'lms-h-4 font-os'} src={union} onClick={() => setSearchTerm('')}/>
              </span>
            <p className={"lms-w-11/12 lms-mx-auto lms-mt-2 lms-mr-2 lms-text-brand-light"}>No. of results: {filteredCount}</p>
          </div>
          <div className={'lms-mt-20'}>
            {filteredOptions.map((option, i) => {
              return <button key={i}
                             className={"lms-w-full lms-h-16 lms-border lms-border-brand-4 lms-rounded lms-mt-2 lms-flex lms-flex-row lms-items-center lms-justify-start lms-px-4"}
                             onClick={() => {
                               setOption(option);
                               setSelectIsOpen(false);
                             }}>
                {!!option['logoURI'] && (
                  <img className={'lms-h-10 lms-w-10 lms-mr-2 lms-rounded-full'} src={option['logoURI']}/>
                )}
                {option.name}
              </button>
            })
            }
          </div>
          <span className={'lms-w-full lms-h-16 lms-fixed lms-bottom-0 lms-left-0 lms-py-3 bg-brand-20'}>
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
