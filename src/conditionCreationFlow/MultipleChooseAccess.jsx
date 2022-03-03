import React, { useContext, useState } from 'react';
import LitChooseAccessButton from "../reusableComponents/LitChooseAccessButton";
import POAP from "../assets/POAP.svg";
import venn from "../assets/venn.svg";
import { ShareModalContext } from "../generalComponents/ShareModal";

const MultipleChooseAccess = ({ setSelectPage }) => {
  const { setDisplayedPage, setFlow } = useContext(ShareModalContext);

  return (
    <div className={'flex flex-col items-center'}>
      <h3 className={'mt-6 mb-4'}>Choose who can access this:</h3>
      <LitChooseAccessButton onClick={() => setSelectPage('wallet')} label={'An Individual Wallet'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('group')} label={'A Group of Token or NFT'}/>
      {/*<LitChooseAccessButton onClick={() => setSelectPage('nft')} label={'NFT Ownership'}/>*/}
      <LitChooseAccessButton onClick={() => setSelectPage('dao')} label={'DAO Members'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('poap')} img={POAP} label={'POAP Collectors'}/>
    </div>
  );
};

export default MultipleChooseAccess;
