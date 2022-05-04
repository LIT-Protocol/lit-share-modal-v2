import React from 'react';
import './LitHeader.css';

const LitHeader = ({ handleClose, darkTheme }) => {
  return (
    <header className={'lsm-bg-gray-light dark:lsm-bg-gray-7 lsm-header-container'}>
      <h3 className={'lsm-text-gray-6 dark:lsm-text-gray-2 lsm-header-text lsm-font-light lsm-font-segoe'}>ACCESS
        CONTROL</h3>
      {/*<img alt={'close'} className={'lsm-h-4'} src={union} onClick={handleClose}/>*/}
      {!darkTheme ? (
        <button className={'lsm-border-none lsm-cursor-pointer lsm-bg-transparent'} onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 11.4142L17.7782 19.1924L19.1924 17.7782L11.4142 10L19.1924 2.22183L17.7782 0.807617L10 8.58579L2.22183 0.807617L0.807617 2.22183L8.58579 10L0.807619 17.7782L2.22183 19.1924L10 11.4142Z"
              fill={"rgba(0, 5, 51, 0.6)"}/>
            {/*fill={"#e6dcfa"}/>*/}
          </svg>
        </button>
      ) : (
        <button className={'lsm-border-none lsm-cursor-pointer lsm-bg-transparent'} onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 11.4142L17.7782 19.1924L19.1924 17.7782L11.4142 10L19.1924 2.22183L17.7782 0.807617L10 8.58579L2.22183 0.807617L0.807617 2.22183L8.58579 10L0.807619 17.7782L2.22183 19.1924L10 11.4142Z"
              // fill={darkMode ? "#e6dcfa" : "rgba(0, 5, 51, 0.6)"}/>
              fill={"#e6dcfa"}/>
          </svg>
        </button>
      )}
    </header>
  );
};

export default LitHeader;
