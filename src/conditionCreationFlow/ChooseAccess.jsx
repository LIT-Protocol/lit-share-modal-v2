import React, { useContext, useState } from 'react';
import LitChooseAccessButton from "../reusableComponents/LitChooseAccessButton";
import POAP from "../assets/POAP.svg";
import venn from "../assets/venn.svg";
import { ShareModalContext } from "../shareModal/ShareModal";
import LitFooter from "../reusableComponents/litFooter/LitFooter";

const ChooseAccess = ({ setSelectPage }) => {
  const { setDisplayedPage, setFlow } = useContext(ShareModalContext);

  return (
    <div className={'lms-flex lms-flex-col lms-items-center'}>
      <h3 className={'lms-mt-8 lms-mb-4 lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Choose who can access this:</h3>
      <LitChooseAccessButton onClick={() => setSelectPage('wallet')} label={'An Individual Wallet'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('group')} label={'A Group of Token or NFT Holders'}/>
      {/*<LitChooseAccessButton onClick={() => setSelectPage('nft')} label={'NFT Ownership'}/>*/}
      <LitChooseAccessButton onClick={() => setSelectPage('dao')} label={'DAO Members'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('poap')} img={POAP} label={'POAP Collectors'}/>
        <span className={'lms-flex lms-justify-center lms-mt-8 lms-mx-auto lms-items-center lms-cursor-pointer'} onClick={() => {
          setFlow('multipleCondition');
          setDisplayedPage('multiple');
        }}>
          <img src={venn}/>
          <p className={'lms-text-sm lms-font-segoe lms-my-0 lms-w-6/12 lms-ml-4 lms-text-brand-4 lms-underline md:lms-text-base md:lms-w-11/12'}>Gate with multiple conditions using AND/OR operators</p>
        </span>
      <LitFooter backAction={() => setSelectPage('chooseAccess')} />
    </div>
  );
};

export default ChooseAccess;
