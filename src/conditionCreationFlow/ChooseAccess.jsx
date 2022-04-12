import React, { useContext } from 'react';
import LitChooseAccessButton from "../reusableComponents/LitChooseAccessButton";
import POAP from "../assets/POAP.svg";
import venn from "../assets/venn.svg";
import { ShareModalContext } from "../shareModal/createShareContext.js";

const ChooseAccess = ({ setSelectPage }) => {
  const { setDisplayedPage, setFlow } = useContext(ShareModalContext);

  return (
    <div className={'lsm-flex lsm-flex-col lsm-items-center'}>
      <h3 className={'lsm-mt-8 lsm-mb-4 lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Choose who can
        access this:</h3>
      <LitChooseAccessButton onClick={() => setSelectPage('wallet')} label={'An Individual Wallet'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('group')} label={'A Group of Token or NFT Holders'}/>
      {/*<LitChooseAccessButton onClick={() => setSelectPage('nft')} label={'NFT Ownership'}/>*/}
      <LitChooseAccessButton onClick={() => setSelectPage('dao')} label={'DAO Members'}/>
      <LitChooseAccessButton onClick={() => setSelectPage('poap')} img={POAP} label={'POAP Collectors'}/>
      <span className={'lsm-flex lsm-justify-center lsm-mt-8 lsm-mx-auto lsm-items-center lsm-cursor-pointer'}
            onClick={() => {
              setFlow('multipleCondition');
              setDisplayedPage('multiple');
            }}>
          <img src={venn}/>
          <p
            className={'lsm-text-sm lsm-font-segoe lsm-my-0 lsm-w-6/12 lsm-ml-4 lsm-text-brand-4 lsm-underline md:lsm-text-base md:lsm-w-11/12'}>Gate with multiple conditions using AND/OR operators</p>
        </span>
    </div>
  );
};

export default ChooseAccess;
