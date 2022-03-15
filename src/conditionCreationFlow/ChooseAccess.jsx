import React, { useContext, useState } from 'react';
import LitChooseAccessButton from "../reusableComponents/LitChooseAccessButton";
import POAP from "../assets/POAP.svg";
import venn from "../assets/venn.svg";
import { ShareModalContext } from "../generalComponents/ShareModal";
import LitBackButton from "../reusableComponents/LitBackButton";

const ChooseAccess = ({ setSelectPage }) => {
  const { setDisplayedPage, setFlow } = useContext(ShareModalContext);

  return (
    <div className={'lms-flex lms-flex-col lms-items-center'}>
      <h3 className={'lms-mt-6 lms-mb-4'}>Choose who can access this:</h3>
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
          <p className={'lms-text-xs lms-w-6/12 lms-ml-4 lms-text-brand-4 lms-underline md:lms-text-base md:lms-w-11/12'}>Gate with multiple conditions using AND/OR operators</p>
        </span>
      <div className={'lms-flex lms-flex-row lms-bg-white lms-justify-between lms-w-full lms-h-12 lms-my-4 lms-absolute lms-bottom-0 lms-px-4'}>
        <LitBackButton onClick={() => handleClose()}/>
          {/* <LitNextButton label={'DONE'} disableConditions={false} onClick={() => sendAccessControlConditions(conditionsAreUpdatable)}/> */}
      </div>
    </div>
  );
};

export default ChooseAccess;
