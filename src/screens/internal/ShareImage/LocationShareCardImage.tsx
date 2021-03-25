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
import { DateFormat, formatDateTime } from 'common/utils/time-utils';
import { assert } from 'common/utils';

/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const LocationShareCardImage = () => {
  const region = useRegionFromParams();
  // we know Region won't be null because this won't be called for non-region routes
  assert(region !== null);
  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Header />
      <ShareCardWrapper>
        <LocationShareCard region={region} />
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
        Updated {formatDateTime(new Date(), DateFormat.MMMM_D_YYYY)}
      </LastUpdatedWrapper>
    </>
  );
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

export default LocationShareCardImage;
