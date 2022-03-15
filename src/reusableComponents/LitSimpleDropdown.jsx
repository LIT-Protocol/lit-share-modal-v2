import React, { useEffect, useState, useMemo, useContext } from 'react';
import './LitSimpleDropdown.css';
import chevronDown from '../assets/chevronDown.svg';

const LitSimpleDropdown = ({ label, options, selected, setSelected}) => {

  const [ showMenu, setShowMenu ] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState('')

  useEffect(() => {
    if (!showMenu) {
      setDropdownStyle("lms-hidden lms-absolute lms-w-full lms-rounded lms-border lms-border-gray");
    } else {
      setDropdownStyle("lms-block lms-w-full lms-rounded lms-border lms-border-gray");
    }
  }, [showMenu])

  return (
    <div className="lms-w-full lms-relative lms-block">
      <button className={"lms-w-full lms-bg-white lms-h-12 lms-border lms-border-brand-4 lms-rounded hover:lms-border-2 lms-flex lms-flex-row lms-items-center lms-justify-between lms-px-4"}
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
                  ><li className={"lms-w-full lms-m-0 lms-p-3 hover:lms-bg-gray"}
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