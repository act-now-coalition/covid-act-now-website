import React, { useState } from 'react';
import { useParams } from 'react-router';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import { Projections } from 'common/models/Projections';
import { useProjections } from 'common/utils/model';
import {
  Wrapper,
  Content,
  ShareCardWrapper,
  TitleWrapper,
  LastUpdatedWrapper,
  ScreenshotWrapper,
} from './ShareImage.style';
import { formatDate } from 'common/utils';
import { findCountyByFips } from 'common/locations';
import { Metric } from 'common/metric';

/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const OpenGraphImage = () => {
  const { stateId, countyFipsId } = useParams();
  const isHomePage = !stateId && !countyFipsId;
  return (
    <Wrapper>
      <Content>
        <ScreenshotWrapper className={'screenshot'}>
          <Header />
          <ShareCardWrapper isHomePage={isHomePage}>
            <ShareCard stateId={stateId} countyFipsId={countyFipsId} />
          </ShareCardWrapper>
        </ScreenshotWrapper>
      </Content>
    </Wrapper>
  );
};

interface ShareCardProps {
  stateId?: string;
  countyFipsId?: string;
}

const Header = () => {
  return (
    <>
      <TitleWrapper>Real-time COVID metrics</TitleWrapper>
      <LastUpdatedWrapper>Updated {formatDate(new Date())}</LastUpdatedWrapper>
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
  projections = useProjections(stateId, countyOption) as any;

  if (!projections) {
    return null;
  }
  const projection = projections.primary;
  const stats = {
    [Metric.CASE_GROWTH_RATE]: projection.rt,
    [Metric.HOSPITAL_USAGE]: projection.currentIcuUtilization,
    [Metric.POSITIVE_TESTS]: projection.currentTestPositiveRate,
  };

  return <SocialLocationPreview projections={projections} stats={stats} />;
};

export default OpenGraphImage;
