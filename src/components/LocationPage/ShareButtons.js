import React, { Fragment, useState } from 'react';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
  MobileButtonsWrapper,
  ClickAwayWrapper,
} from './ShareButtons.style';
import { useTheme } from '@material-ui/core/styles';
import { ClickAwayListener, useMediaQuery } from '@material-ui/core';

const InnerContent = props => {
  const { iconSize, shareURL } = props;

  const [showShareIcons, setShowShareIcons] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setShowShareIcons(false)}>
      <ClickAwayWrapper>
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
        {showShareIcons && (
          <SocialButtons iconSize={iconSize} shareURL={shareURL} />
        )}
      </ClickAwayWrapper>
    </ClickAwayListener>
  );
};

const ShareButtons = props => {
  const { shareURL } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Fragment>
      {isMobile && (
        <MobileButtonsWrapper>
          <InnerContent iconSize="40" shareURL={shareURL} />
        </MobileButtonsWrapper>
      )}
      {!isMobile && (
        <DesktopButtonsWrapper>
          <InnerContent iconSize="50" shareURL={shareURL} />
        </DesktopButtonsWrapper>
      )}
    </Fragment>
  );
};

export default ShareButtons;
