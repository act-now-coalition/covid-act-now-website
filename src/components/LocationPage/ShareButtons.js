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
import ShareImageUrlJSON from 'assets/data/share_images_url.json';

const InnerContent = props => {
  const {
    iconSize,
    shareURL,
    shareQuote,
    county,
    stateId,
    countyId,
    chartIdentifier,
  } = props;

  const [showShareIcons, setShowShareIcons] = useState(false);

  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => {
      setShowShareIcons(false);
    }, 1500);
    return () => clearTimeout(timeoutId);
  };

  const imageBaseUrl = ShareImageUrlJSON.share_image_url;
  const downloadLink = countyId
    ? imageBaseUrl +
      `counties/${county.full_fips_code}/chart/${chartIdentifier}/export.png`
    : imageBaseUrl +
      `states/${stateId.toLowerCase()}/chart/${chartIdentifier}/export.png`;

  return (
    <ClickAwayListener onClickAway={() => setShowShareIcons(false)}>
      <ClickAwayWrapper>
        <SaveOrShareContainer>
          <SaveOrShareButton
            as="a"
            onClick={() => {
              setShowShareIcons(false);
            }}
            href={downloadLink}
            target="_blank"
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
    stateId,
    county,
    stats,
    projections,
    isMobile,
    countyId,
    chartIdentifier,
  } = props;

  const shareQuote = makeChartShareQuote(
    stateId,
    county,
    stats,
    chartIdentifier,
    projections,
  );

  const shareBaseURL = `https://covidactnow.org/us/${stateId.toLowerCase()}${
    county ? `/county/${county.county_url_name}` : ''
  }`;
  const shareURL = `${shareBaseURL}/chart/${chartIdentifier}`;

  const innerContentProps = {
    shareURL,
    shareQuote,
    county,
    stateId,
    countyId,
    chartIdentifier,
  };

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
