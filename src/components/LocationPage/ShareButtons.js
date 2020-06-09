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
import * as urls from 'common/urls';
import moment from 'moment';

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

  // Delay allows the user to briefly see copy-link button text change when clicked
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

  const downloadDate = moment().format('YYYY-MM-DD');

  function makeDownloadFilename(chartIdentifier) {
    const chartDownloadType = {
      0: 'infection_growth',
      1: 'posative_test_rate',
      2: 'hospitalization_usage',
      3: 'contact_tracing',
      4: 'future_projections',
    };
    const chartType = chartDownloadType[chartIdentifier];
    const location = countyId
      ? `${stateId.toLowerCase()}_${countyId}`
      : `${stateId.toLowerCase()}`;
    return `${location}_${chartType}_${downloadDate}`;
  }

  function downloadChart(blob, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadChartOnClick(url) {
    const filename =
      makeDownloadFilename(chartIdentifier) || `CovidActNow_${downloadDate}`;
    fetch(url, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: 'cors',
    })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        downloadChart(blobUrl, filename);
      })
      .catch(error => console.error(error));
  }

  return (
    <ClickAwayListener onClickAway={() => setShowShareIcons(false)}>
      <ClickAwayWrapper>
        <SaveOrShareContainer>
          <SaveOrShareButton
            onClick={() => {
              setShowShareIcons(false);
              downloadChartOnClick(downloadLink);
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
  const shareURL = urls.addSharingId(
    `${shareBaseURL}/chart/${chartIdentifier}`,
  );

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
