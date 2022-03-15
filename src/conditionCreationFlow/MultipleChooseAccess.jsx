import React, { useContext, useState } from 'react';
import LitChooseAccessButton from "../reusableComponents/LitChooseAccessButton";
import POAP from "../assets/POAP.svg";
import venn from "../assets/venn.svg";

const MultipleChooseAccess = ({ setSelectPage, isNested = false }) => {

  return (
    <div className={'lms-flex lms-flex-col lms-items-center'}>
      <h3 className={'lms-mt-6 lms-mb-4'}>Choose who can access this:</h3>
      <LitChooseAccessButton onClick={() => setSelectPage('wallet')} label={'An Individual Wallet'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('group')} label={'A Group of Token or NFT Holders'}/>
      {/*<LitChooseAccessButton onClick={() => setSelectPage('nft')} label={'NFT Ownership'}/>*/}
      <LitChooseAccessButton onClick={() => setSelectPage('dao')} label={'DAO Members'}/>
      {!isNested && (
        <LitChooseAccessButton onClick={() => setSelectPage('poap')} img={POAP} label={'POAP Collectors'}/>
      )}
    </div>
  );
};

export default MultipleChooseAccess;
