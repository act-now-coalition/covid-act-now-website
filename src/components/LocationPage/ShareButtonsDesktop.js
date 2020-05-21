import React, { useState } from 'react';

import SocialButtons from './SocialButtons';

import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
} from './ShareButtons.style';

const ShareButtonsDesktop = props => {
  const { isFirst } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  return (
    <DesktopButtonsWrapper isFirst={isFirst}>
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
    </DesktopButtonsWrapper>
  );
};

export default ShareButtonsDesktop;
