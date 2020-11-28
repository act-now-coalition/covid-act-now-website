import React, { useState } from 'react';
import { useParams } from 'react-router';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import { Projections } from 'common/models/Projections';
import { useProjections } from 'common/utils/model';
import {
  ShareCardWrapper,
  TitleWrapper,
  LastUpdatedWrapper,
} from './ShareCardImage.style';
import { DarkScreenshotWrapper } from './ShareImage.style';
import { formatLocalDate } from 'common/utils';
import { findCountyByFips } from 'common/locations';
import { ScreenshotReady, SCREENSHOT_CLASS } from 'components/Screenshot';

// TODO(michael): Split this into HomeImage and LocationImage (with some shared code).

/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const ShareCardImage = ({ mapImage }: { mapImage: boolean }) => {
  const { stateId, countyFipsId } = useParams();
  const isHomePage = !stateId && !countyFipsId;
  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Header isHomePage={isHomePage} />
      <ShareCardWrapper isHomePage={isHomePage}>
        <ShareCard stateId={stateId} countyFipsId={countyFipsId} />
      </ShareCardWrapper>
    </DarkScreenshotWrapper>
  );
};

interface ShareCardProps {
  stateId?: string;
  countyFipsId?: string;
}

const Header = (props: { isHomePage?: Boolean }) => {
  return (
    <>
      <TitleWrapper isHomePage={props.isHomePage}>
        Real-time COVID metrics
      </TitleWrapper>
      <LastUpdatedWrapper>
        Updated {formatLocalDate(new Date())}
      </LastUpdatedWrapper>
    </>
  );
};

const ShareCard = ({ stateId, countyFipsId }: ShareCardProps) => {
  if (stateId || countyFipsId) {
    return <LocationShareCard stateId={stateId} countyFipsId={countyFipsId} />;
  } else {
    return <SocialLocationPreview />;
  }
};

const LocationShareCard = ({ stateId, countyFipsId }: ShareCardProps) => {
  let projections: Projections | undefined;
  const [countyOption] = useState(
    countyFipsId && findCountyByFips(countyFipsId),
  );
  stateId = stateId || countyOption.state_code;
  projections = useProjections(stateId!, countyOption) as any;

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
