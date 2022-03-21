import React, { useEffect, useState } from 'react';
import chevronDown from '../../assets/chevronDown.svg';
import './LitSimpleDropdown.css';

const LitSimpleDropdown = ({ label, options, selected, setSelected}) => {

  const [ showMenu, setShowMenu ] = useState(false);
  const [ dropdownStyle, setDropdownStyle ] = useState('')

  useEffect(() => {
    console.log('check show Menu', showMenu)
    if (!showMenu) {
      setDropdownStyle("lms-hidden");
    } else {
      setDropdownStyle("lms-dropdown-menu lms-border-gray");
    }
  }, [showMenu])

  return (
    <div className="lms-w-full lms-relative lms-block">
      <button className={"lms-w-full lms-bg-white lms-h-12 lms-border lms-border-brand-4 lms-rounded hover:lms-border-2 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-4 lms-text-title-gray lms-font-segoe lms-text-sm lms-font-light"}
        onClick={() => {
          setShowMenu(!showMenu)
        }}>
        {!selected ? (!label ? 'Select' : label) : selected.name}
        <img src={chevronDown}/>
        </button>
        <ul className={dropdownStyle}>
          { options.map((option, i) => {
                return (
                  <span key={i}
                    onClick={() => {
                      setSelected(option)
                      setShowMenu(false);
                    }
                  }
                  ><li className={"lms-dropdown-item hover:lms-bg-gray lms-text-title-gray lms-font-segoe lms-text-sm lms-font-light"}
                  >{option.name}</li>
                  </span>
                )
            })
          }
        </ul>
      {/* )} */}
    </div>
  )
}

export default LitSimpleDropdown;
