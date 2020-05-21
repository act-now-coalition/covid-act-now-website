import React, { useState } from 'react';

import SocialButtons from './SocialButtons';

import {
  SaveOrShareContainer,
  SaveOrShareButton,
  MobileButtonsWrapper,
} from './ShareButtons.style';

const ShareButtonsMobile = props => {
  const { isFirst } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  return (
    <MobileButtonsWrapper isFirst={isFirst}>
      <SaveOrShareContainer>
        <SaveOrShareButton>Save</SaveOrShareButton>
        <SaveOrShareButton
          isLast
          onClick={() => {
            setShowShareIcons(!showShareIcons);
          }}
        >
          Share
        </SaveOrShareButton>
      </SaveOrShareContainer>

      {showShareIcons && <SocialButtons />}
    </MobileButtonsWrapper>
  );
};

export default ShareButtonsMobile;
