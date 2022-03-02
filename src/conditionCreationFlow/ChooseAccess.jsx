import React, { useContext, useState } from 'react';
import LitChooseAccessButton from "../reusableComponents/LitChooseAccessButton";
import POAP from "../assets/POAP.svg";
import venn from "../assets/venn.svg";
import { ShareModalContext } from "../ShareModal";

const ChooseAccess = ({ setSelectPage }) => {
  const { setDisplayedPage, setFlow } = useContext(ShareModalContext);

  return (
    <div className={'flex flex-col items-center'}>
      <h3 className={'mt-6 mb-4'}>Choose who can access this:</h3>
      <LitChooseAccessButton onClick={() => setSelectPage('wallet')} label={'An Individual Wallet'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('group')} label={'A Group of Token or NFT'}/>
      {/*<LitChooseAccessButton onClick={() => setSelectPage('nft')} label={'NFT Ownership'}/>*/}
      <LitChooseAccessButton onClick={() => setSelectPage('dao')} label={'DAO Members'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('poap')} img={POAP} label={'POAP Collectors'}/>
        <span className={'flex justify-center mt-8 mx-auto'} onClick={() => {
          setFlow('multipleCondition');
          setDisplayedPage('multiple');
        }}>
          <img src={venn}/>
          <p className={'text-xs w-6/12 ml-4 text-brand-4 underline'}>Gate with multiple conditions using AND/OR operators</p>
        </span>
    </div>
  );
};

export default ChooseAccess;
