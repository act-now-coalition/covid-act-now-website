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
import { County, Region, State } from 'common/regions';

const getShareImageUrl = (region: Region, chartIdentifier: number): string => {
  const imageBaseUrl = ShareImageUrlJSON.share_image_url;
  if (region instanceof County) {
    return (
      imageBaseUrl +
      `counties/${region.fipsCode}/chart/${chartIdentifier}/export.png`
    );
  }
  if (region instanceof State) {
    const state = region as State;
    return (
      imageBaseUrl +
      `states/${state.stateCode.toLowerCase()}/chart/${chartIdentifier}/export.png`
    );
  }

  // TODO: AHHHHHHh
  return '';
};

interface InnerContentProps {
  region: Region;
  iconSize: string;
  shareURL: string;
  shareQuote: string;
  chartIdentifier: number;
}

const InnerContent = ({
  region,
  iconSize,
  shareURL,
  shareQuote,
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

  const downloadLink = getShareImageUrl(region, chartIdentifier);
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
    // TODO Make this better capture
    const location = region.fullName;
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
          {/* HELP: Why the type error? */}
          {/* 
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
          */}
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

interface ShareButtonProps {
  region: Region;
  stats: any;
  isMobile: Boolean;
  chartIdentifier: number;
}
const ShareButtons = ({
  region,
  stats,
  isMobile,
  chartIdentifier,
}: ShareButtonProps) => {
  const shareQuote = makeChartShareQuote(
    region.fullName,
    stats,
    chartIdentifier,
  );

  const shareBaseURL = region.canonicalUrl;

  const shareURL = urls.addSharingId(
    `${shareBaseURL}/chart/${chartIdentifier}`,
  );

  const iconSize = isMobile ? '40' : '50';
  return (
    <MobileButtonsWrapper>
      <InnerContent
        iconSize={iconSize}
        shareURL={shareURL}
        shareQuote={shareQuote}
        chartIdentifier={chartIdentifier}
        region={region}
      />
    </MobileButtonsWrapper>
  );
};

export default ShareButtons;
