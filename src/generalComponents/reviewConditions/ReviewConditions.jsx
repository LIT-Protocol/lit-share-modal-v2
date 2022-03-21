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
      <div className={'lms-review-conditions-container lms-review-scroll lms-overflow-auto'}>
        <h3 className={'lms-select-prompt lms-text-title-gray lms-font-segoe lms-text-base lms-font-light'}>Scroll down to review your conditions and confirm at bottom</h3>
        <div className={'lms-w-full lms-pb-4'}>
          <div
            className={'lms-w-full lms-h-auto lms-mx-auto lms-rounded lms-flex lms-flex-col items-align lms-overflow-scroll'}
          >
            {!!humanizedAccessControlConditions && humanizedAccessControlConditions.map((h, i) => {
              if (Array.isArray(h) && h[0].humanizedAcc === 'Owns any POAP') {
                return (
                  <div className={'lms-review-condition-group  lms-condition-shadow'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    <span className={'lms-overflow-auto lms-humanized-condition-text lms-text-black lms-font-segoe lms-text-base lms-font-light'}
                          key={i}
                    > {h[2].humanizedAcc}
                    </span>
                  </div>
                )
              } else if (Array.isArray(h)) {
                return (
                  <div className={'lms-review-condition-group  lms-condition-shadow'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    {h.map((n, ni) => {
                      if (!n['operator']) {
                        return (
                          <span className={'lms-overflow-auto lms-humanized-condition-text lms-text-black lms-font-segoe lms-text-base lms-font-light'}
                                key={`n-${ni}`}>
                            {n.humanizedAcc}
                          </span>
                        )
                      } else {
                        return <span className={'lms-humanized-condition-text lms-text-title-gray lms-font-segoe lms-text-base lms-font-light lms-py-2'}
                                    key={`n-${ni}`}
                        >{n.operator === 'and' ? 'AND' : 'OR'}
                        </span>
                      }
                    })}
                  </div>
                )
              } else if (h['operator']) {
                return (
                  <span className={'lms-overflow-auto lms-ml-4 lms-w-16 lms-humanized-condition-text lms-text-title-gray lms-font-segoe lms-text-base lms-font-light lms-py-2'}
                        key={i}
                  >{h.operator === 'and' ? 'AND' : 'OR'}
                  </span>
                )
              } else {
                return (
                  <div className={'lms-review-condition-group  lms-condition-shadow'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    <span className={'lms-overflow-auto lms-humanized-condition-text lms-text-black lms-font-segoe lms-text-base lms-font-light'}
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
      <footer className={'lms-flex lms-flex-col lms-bg-white lms-items-align lms-review-conditions-group'}>
        <div className={'lms-mt-4 lms-flex lms-items-center lms-justify-center lms-mx-auto lms-px-4 lms-text-title-gray lms-text-left lms-font-segoe lms-font-light'}>
          <input className={'lms-mr-4 lms-h-4 lms-w-4 lms-p-2'} type="checkbox" id="edit" name="edit" value={conditionsAreUpdatable} onChange={(e) => setConditionsAreUpdatable(e.target.checked)}/>
          <label className={'lms-text-sm md:lms-text-base lms-p-2'} htmlFor="edit">Make condition(s) editable; if selected, only you can edit</label>
        </div>
        <div className={'lms-text-sm lms-mx-auto lms-cursor-pointer md:lms-text-base lms-mb-4 lms-mt-4 lms-text-brand-4 lms-text-left lms-font-segoe lms-font-light'}>
          <a className={'lms-text-sm md:lms-text-base lms-flex lms-items-center'} href={'https://developer.litprotocol.com/docs/AccessControlConditions/evmBasicExamples'} target={'_blank'} rel="noreferrer">More information about
            conditions <img
              alt={'clear input'} className={'lms-h-4 font-os lms-ml-2'} src={link}/></a>
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
