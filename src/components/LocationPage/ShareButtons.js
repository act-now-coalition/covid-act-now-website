import React, { Fragment, useState } from 'react';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
  MobileButtonsWrapper,
  ClickAwayWrapper,
  SocialButtonsWrapper,
} from './ShareButtons.style';
import { ClickAwayListener } from '@material-ui/core';
import makeChartShareQuote from 'common/utils/makeChartShareQuote';

const InnerContent = props => {
  const { iconSize, shareURL, shareQuote } = props;

  const [showShareIcons, setShowShareIcons] = useState(false);

  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => {
      setShowShareIcons(false);
    }, 1500);
    return () => clearTimeout(timeoutId);
  };

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
        <SocialButtonsWrapper
          onClick={() => {
            hideSocialButtons();
          }}
        >
          {showShareIcons && (
            <SocialButtons
              iconSize={iconSize}
              shareURL={shareURL}
              shareQuote={shareQuote}
            />
          )}
        </SocialButtonsWrapper>
      </ClickAwayWrapper>
    </ClickAwayListener>
  );
};

const ShareButtons = props => {
  const {
    shareURL,
    stateId,
    county,
    stats,
    chartType,
    projections,
    isMobile,
  } = props;

  const shareQuote = makeChartShareQuote(
    stateId,
    county,
    stats,
    chartType,
    projections,
  );

  const innerContentProps = { shareURL, shareQuote };

  return (
    <Fragment>
      {isMobile && (
        <MobileButtonsWrapper>
          <InnerContent iconSize="40" {...innerContentProps} />
        </MobileButtonsWrapper>
      )}
      {!isMobile && (
        <DesktopButtonsWrapper>
          <InnerContent iconSize="50" {...innerContentProps} />
        </DesktopButtonsWrapper>
      )}
    </Fragment>
  );
};

export default ShareButtons;
