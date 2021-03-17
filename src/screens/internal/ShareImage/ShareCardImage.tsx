import React from 'react';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import { useProjectionsFromRegion } from 'common/utils/model';
import {
  ShareCardWrapper,
  TitleWrapper,
  LastUpdatedWrapper,
} from './ShareCardImage.style';
import { DarkScreenshotWrapper } from './ShareImage.style';
import { ScreenshotReady, SCREENSHOT_CLASS } from 'components/Screenshot';
import { useRegionFromParams } from 'common/regions';
import { Region } from 'common/regions';
import { TimeFormat, formatDateTime } from 'common/utils/time-utils';

// TODO(michael): Split this into HomeImage and LocationImage (with some shared code).

/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const ShareCardImage = () => {
  const region = useRegionFromParams();
  const isHomePage = !region;
  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Header isHomePage={isHomePage} />
      <ShareCardWrapper isHomePage={isHomePage}>
        <ShareCard region={region} />
      </ShareCardWrapper>
    </DarkScreenshotWrapper>
  );
};

const Header = (props: { isHomePage?: Boolean }) => {
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

interface ShareCardProps {
  region: Region | null;
}

const ShareCard = ({ region }: ShareCardProps) => {
  if (region) {
    return <LocationShareCard region={region} />;
  } else {
    return <SocialLocationPreview />;
  }
};

interface LocationShareCardProps {
  region: Region;
}

const LocationShareCard = ({ region }: LocationShareCardProps) => {
  const projections = useProjectionsFromRegion(region);

  if (!projections) {
    return null;
  }
  const stats = projections.getMetricValues();

  return (
    <>
      <ScreenshotReady />
      <SocialLocationPreview projections={projections} stats={stats} />
    </>
  );
};

export default ShareCardImage;
