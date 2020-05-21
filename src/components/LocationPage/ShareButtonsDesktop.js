import React, { useState, useRef } from 'react';
import useOutsideClickHandler from '../../common/utils/useOutsideClickHandler';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
} from './ShareButtons.style';

const ShareButtonsDesktop = props => {
  const { isFirst, chartAbove } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  const iconSize = 50;

  const shareButtonsRef = useRef(null);

  useOutsideClickHandler(shareButtonsRef, setShowShareIcons);

  return (
    <DesktopButtonsWrapper
      isFirst={isFirst}
      chartAbove={chartAbove}
      ref={shareButtonsRef}
    >
      <SaveOrShareContainer>
        <SaveOrShareButton
          onClick={() => {
            setShowShareIcons(false);
          }}
        >
          Save
        </SaveOrShareButton>
        <SaveOrShareButton
          isLast
          onClick={() => {
            setShowShareIcons(!showShareIcons);
          }}
        >
          Share
        </SaveOrShareButton>
      </SaveOrShareContainer>
      {showShareIcons && <SocialButtons iconSize={iconSize} />}
    </DesktopButtonsWrapper>
  );
};

export default ShareButtonsDesktop;
