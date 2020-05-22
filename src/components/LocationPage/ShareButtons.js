import React, { Fragment, useState } from 'react';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
  MobileButtonsWrapper,
} from './ShareButtons.style';
import { useTheme } from '@material-ui/core/styles';
import { ClickAwayListener, useMediaQuery } from '@material-ui/core';

const InnerContent = props => {
  const { iconSize, setShowShareIcons, showShareIcons } = props;

  return (
    <Fragment>
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
    </Fragment>
  );
};

const ShareButtons = props => {
  const { isFirst } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Fragment>
      {isMobile && (
        <ClickAwayListener onClickAway={() => setShowShareIcons(false)}>
          <MobileButtonsWrapper>
            <InnerContent
              iconSize="40"
              showShareIcons={showShareIcons}
              setShowShareIcons={setShowShareIcons}
            />
          </MobileButtonsWrapper>
        </ClickAwayListener>
      )}
      {!isMobile && (
        <ClickAwayListener onClickAway={() => setShowShareIcons(false)}>
          <DesktopButtonsWrapper isFirst={isFirst}>
            <InnerContent
              iconSize="50"
              showShareIcons={showShareIcons}
              setShowShareIcons={setShowShareIcons}
            />
          </DesktopButtonsWrapper>
        </ClickAwayListener>
      )}
    </Fragment>
  );
};

export default ShareButtons;
