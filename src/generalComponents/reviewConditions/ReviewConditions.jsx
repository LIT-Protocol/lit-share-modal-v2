import React, { useContext, useState, useEffect } from 'react';
import { ShareModalContext } from "../../shareModal/ShareModal";
import link from '../../assets/link.svg';
import LitConfirmationModal from "../../reusableComponents/litConfirmationModal/LitConfirmationModal";
import LitHeader from "../../reusableComponents/litHeader/LitHeader";
import LitFooter from "../../reusableComponents/litFooter/LitFooter";
import { colorArray } from "../../helpers/colorArray";
import './ReviewConditions.css';

const ReviewConditions = ({ humanizedAccessControlConditions }) => {
  const {
    sendAccessControlConditions,
    flow,
    handleClose,
    resetModal,
    setDisplayedPage,
  } = useContext(ShareModalContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [conditionsAreUpdatable, setConditionsAreUpdatable] = useState(false);

  const navigateBack = () => {
    if (flow === 'singleCondition') {
      setShowConfirmationModal(true);
    } else if (flow === 'multipleCondition') {
      setDisplayedPage('multiple');
    }
  }

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      resetModal();
    }

    setShowConfirmationModal(false);
  }

  return (
    <>
      <LitHeader handleClose={handleClose} />
      <div className={'lsm-review-conditions-container lsm-review-scroll lsm-overflow-auto'}>
        <h3 className={'lsm-select-prompt lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light'}>Scroll down to review your conditions and confirm at bottom</h3>
        <div className={'lsm-w-full lsm-pb-4'}>
          <div
            className={'lsm-w-full lsm-h-auto lsm-mx-auto lsm-rounded lsm-flex lsm-flex-col items-align lsm-overflow-scroll'}
          >
            {!!humanizedAccessControlConditions && humanizedAccessControlConditions.map((h, i) => {
              if (Array.isArray(h) && h[0].humanizedAcc === 'Owns any POAP') {
                return (
                  <div className={'lsm-review-condition-group  lsm-condition-shadow'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    <span className={'lsm-overflow-auto lsm-humanized-condition-text lsm-text-black lsm-font-segoe lsm-text-base lsm-font-light'}
                          key={i}
                    > {h[2].humanizedAcc}
                    </span>
                  </div>
                )
              } else if (Array.isArray(h)) {
                return (
                  <div className={'lsm-review-condition-group  lsm-condition-shadow'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    {h.map((n, ni) => {
                      if (!n['operator']) {
                        return (
                          <span className={'lsm-overflow-auto lsm-humanized-condition-text lsm-text-black lsm-font-segoe lsm-text-base lsm-font-light'}
                                key={`n-${ni}`}>
                            {n.humanizedAcc}
                          </span>
                        )
                      } else {
                        return <span className={'lsm-humanized-condition-text lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light lsm-py-2'}
                                    key={`n-${ni}`}
                        >{n.operator === 'and' ? 'AND' : 'OR'}
                        </span>
                      }
                    })}
                  </div>
                )
              } else if (h['operator']) {
                return (
                  <span className={'lsm-overflow-auto lsm-ml-4 lsm-w-16 lsm-humanized-condition-text lsm-text-title-gray lsm-font-segoe lsm-text-base lsm-font-light lsm-py-2'}
                        key={i}
                  >{h.operator === 'and' ? 'AND' : 'OR'}
                  </span>
                )
              } else {
                return (
                  <div className={'lsm-review-condition-group  lsm-condition-shadow'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    <span className={'lsm-overflow-auto lsm-humanized-condition-text lsm-text-black lsm-font-segoe lsm-text-base lsm-font-light'}
                      key={i}
                    > {h.humanizedAcc}
                    </span>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <footer className={'lsm-flex lsm-flex-col lsm-bg-white lsm-items-align lsm-review-conditions-group'}>
        <div className={'lsm-mt-4 lsm-flex lsm-items-center lsm-justify-center lsm-mx-auto lsm-px-4 lsm-text-title-gray lsm-text-left lsm-font-segoe lsm-font-light'}>
          <input className={'lsm-mr-4 lsm-h-4 lsm-w-4 lsm-p-2'} type="checkbox" id="edit" name="edit" value={conditionsAreUpdatable} onChange={(e) => setConditionsAreUpdatable(e.target.checked)}/>
          <label className={'lsm-text-sm md:lsm-text-base lsm-p-2'} htmlFor="edit">Make condition(s) editable; if selected, only you can edit</label>
        </div>
        <div className={'lsm-text-sm lsm-mx-auto lsm-cursor-pointer md:lsm-text-base lsm-mb-4 lsm-mt-4 lsm-text-brand-4 lsm-text-left lsm-font-segoe lsm-font-light'}>
          <a className={'lsm-text-sm md:lsm-text-base lsm-flex lsm-items-center'} href={'https://developer.litprotocol.com/docs/AccessControlConditions/evmBasicExamples'} target={'_blank'} rel="noreferrer">More information about
            conditions <img
              alt={'clear input'} className={'lsm-h-4 font-os lsm-ml-2'} src={link}/></a>
        </div>
        <LitFooter backAction={() => navigateBack()}
                   nextAction={() => sendAccessControlConditions(conditionsAreUpdatable)}
                   nextDisableConditions={false}
                   nextButtonLabel={'DONE'}/>
      </footer>
      <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                            onClick={handleConfirmGoBack}/>
    {/*</div>*/}
    </>
  );
};

export default ReviewConditions;
