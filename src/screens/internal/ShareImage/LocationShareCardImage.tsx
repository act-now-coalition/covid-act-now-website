import React from 'react';
import SocialLocationPreview, {
  SocialLocationPreviewProps,
} from 'components/SocialLocationPreview/SocialLocationPreview';
import { MetricValues, Projections } from 'common/models/Projections';
import {
  ShareCardWrapper,
  TitleWrapper,
  LastUpdatedWrapper,
} from './ShareCardImage.style';
import { DarkScreenshotWrapper } from './ShareImage.style';
import { ScreenshotReady, SCREENSHOT_CLASS } from 'components/Screenshot';
import { TimeFormat, formatDateTime } from 'common/utils/time-utils';

export type LocationShareCardImageProps = SocialLocationPreviewProps;
/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const LocationShareCardImage = (props: LocationShareCardImageProps) => {
  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Header />
      <ShareCardWrapper>
        <ScreenshotReady />
        <SocialLocationPreview {...props} />
      </ShareCardWrapper>
    </DarkScreenshotWrapper>
  );
};

export const Header = (props: { isHomePage?: Boolean }) => {
  return (
    <>
      <TitleWrapper isHomePage={props.isHomePage}>
        Real-time COVID metrics
      </TitleWrapper>
      <LastUpdatedWrapper>
        Updated {formatDateTime(new Date(), TimeFormat.MMMM_D_YYYY)}
      </LastUpdatedWrapper>
    </>
  );
};

export default LocationShareCardImage;
