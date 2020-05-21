import React, { useState, useRef } from 'react';
import useOutsideClickHandler from '../../common/utils/useOutsideClickHandler';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  SaveOrShareButton,
  MobileButtonsWrapper,
} from './ShareButtons.style';

const ShareButtonsMobile = props => {
  const { isFirst } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  const iconSize = 40;

  const shareButtonsRef = useRef(null);

  useOutsideClickHandler(shareButtonsRef, setShowShareIcons);

  return (
    <MobileButtonsWrapper isFirst={isFirst} ref={shareButtonsRef}>
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
    </MobileButtonsWrapper>
  );
};

export default ShareButtonsMobile;
