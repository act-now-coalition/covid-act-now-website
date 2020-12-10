import React, { Fragment, useState } from 'react';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
  MobileButtonsWrapper,
  ClickAwayWrapper,
  SocialButtonsWrapper,
  CircularProgress,
} from './ShareButtons.style';
import { ClickAwayListener } from '@material-ui/core';
import makeChartShareQuote from 'common/utils/makeChartShareQuote';
import ShareImageUrlJSON from 'assets/data/share_images_url.json';
import * as urls from 'common/urls';
import moment from 'moment';
import { County } from 'common/locations';

interface InnerContentProps {
  iconSize: string;
  shareURL: string;
  shareQuote: string;
  county: County | undefined;
  stateId: string;
  countyId: string | undefined;
  chartIdentifier: number;
}

const InnerContent = ({
  iconSize,
  shareURL,
  shareQuote,
  county,
  stateId,
  countyId,
  chartIdentifier,
}: InnerContentProps) => {
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [saveInProgress, setSaveInProgress] = useState(false);

  // Delay allows the user to briefly see copy-link button text change when clicked
  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => {
      setShowShareIcons(false);
    }, 1500);
    return () => clearTimeout(timeoutId);
  };

  const imageBaseUrl = ShareImageUrlJSON.share_image_url;
  const downloadLink = county
    ? imageBaseUrl +
      `counties/${county.full_fips_code}/chart/${chartIdentifier}/export.png`
    : imageBaseUrl +
      `states/${stateId.toLowerCase()}/chart/${chartIdentifier}/export.png`;

  const downloadDate = moment().format('YYYY-MM-DD');

  function makeDownloadFilename(chartIdentifier: number) {
    const chartDownloadType = {
      0: 'infection_rate',
      1: 'positive_test_rate',
      2: 'hospital_usage',
      3: 'contact_tracing',
      5: 'case_incidence',
    };

    // @ts-ignore
    const chartType = chartDownloadType[chartIdentifier];
    const location = countyId
      ? `${countyId}_${stateId.toLowerCase()}`
      : `${stateId.toLowerCase()}`;
    return `${location}_${chartType}_${downloadDate}`;
  }

  // The following is a little hacky, adds a link to the blob and immediately clicks it
  // As described in https://stackoverflow.com/a/49500465
  function downloadChart(blob: string, filename: string) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadChartOnClick(url: string) {
    const filename =
      makeDownloadFilename(chartIdentifier) || `CovidActNow_${downloadDate}`;
    setSaveInProgress(true);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        downloadChart(blobUrl, filename);
        setSaveInProgress(false);
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
            {saveInProgress ? <CircularProgress size={25} /> : 'Save'}
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

interface ShareButtonsProps {
  stateId: string;
  county: County | undefined;
  stats: any;
  isMobile: Boolean;
  countyId: string | undefined;
  chartIdentifier: number;
}
const ShareButtons: React.FC<ShareButtonsProps> = ({
  stateId,
  county,
  stats,
  isMobile,
  countyId,
  chartIdentifier,
}) => {
  const shareQuote = makeChartShareQuote(
    stateId,
    county,
    stats,
    chartIdentifier,
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
