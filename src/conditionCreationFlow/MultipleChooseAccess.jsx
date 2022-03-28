import React from 'react';
import LitChooseAccessButton from "../reusableComponents/LitChooseAccessButton";
import POAP from "../assets/POAP.svg";

const MultipleChooseAccess = ({ setSelectPage, isNested = false }) => {

  return (
    <div className={'lsm-flex lsm-flex-col lsm-items-center'}>
      <h3 className={'lsm-mt-6 lsm-mb-4 lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Choose who can access this:</h3>
      <LitChooseAccessButton onClick={() => setSelectPage('wallet')} label={'An Individual Wallet'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('group')} label={'A Group of Token or NFT Holders'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('dao')} label={'DAO Members'}/>
      {!isNested && (
        <LitChooseAccessButton onClick={() => setSelectPage('poap')} img={POAP} label={'POAP Collectors'}/>
      )}
    </div>
  );
};

export default MultipleChooseAccess;
