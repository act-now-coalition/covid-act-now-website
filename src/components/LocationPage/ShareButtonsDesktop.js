import React, { useState } from 'react';

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

  return (
    <DesktopButtonsWrapper isFirst={isFirst} chartAbove={chartAbove}>
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

      {showShareIcons && <SocialButtons iconSize={iconSize} />}
    </DesktopButtonsWrapper>
  );
};

export default ShareButtonsDesktop;
