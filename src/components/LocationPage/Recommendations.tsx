import React from 'react';
import { mainContent } from 'cms-content/recommendations';
import { Projections } from 'common/models/Projections';
import Recommend from 'components/Recommend';
import { getRecommendationsShareUrl } from 'common/urls';
import { getRecommendations, getShareQuote } from 'common/utils/recommend';
import ExpandableContainer from 'components/ExpandableContainer';
import { LocationPageSectionHeader } from 'components/LocationPage/ChartsHolder.style';
import { Header } from 'components/Compare/Compare.style';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import LocationPageSectionFooter from 'components/LocationPageSectionFooter/LocationPageSectionFooter';
import { Region } from 'common/regions';
import { DisclaimerWrapper } from 'components/LocationPage/ChartsHolder.style';
import ExternalLink from 'components/ExternalLink';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

interface RecommendationsProps {
  projections: Projections;
  recommendationsRef: React.RefObject<HTMLDivElement>;
  region: Region;
}

const Recommendations = ({
  region,
  projections,
  recommendationsRef,
}: RecommendationsProps) => {
  const alarmLevel = projections.getAlarmLevel();

  const recommendationsMainContent = getRecommendations(
    region,
    mainContent.recommendations,
  );

  const recommendsShareUrl = getRecommendationsShareUrl(region);

  const recommendsShareQuote = getShareQuote(
    projections.locationName,
    alarmLevel,
  );

  const containerProps = {
    collapsedHeight: 240,
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Vulnerabilities',
  };

  const trackSourceClick = () => {
    trackEvent(EventCategory.RECOMMENDATIONS, EventAction.REDIRECT, 'CDC');
  };

  return (
    <>
      <Header id="recommendations">
        <LocationPageSectionHeader>Recommendations</LocationPageSectionHeader>
      </Header>
      <ExpandableContainer {...containerProps}>
        <Recommend
          recommendations={recommendationsMainContent}
          recommendationsRef={recommendationsRef}
        />
      </ExpandableContainer>
      <LocationPageSectionFooter>
        <DisclaimerWrapper>
          Source:{' '}
          <ExternalLink
            style={{ color: 'inherit' }}
            href="https://www.cdc.gov/"
            onClick={trackSourceClick}
          >
            CDC
          </ExternalLink>
        </DisclaimerWrapper>
        <ShareButtons
          eventCategory={EventCategory.RECOMMENDATIONS}
          shareUrl={recommendsShareUrl}
          shareQuote={recommendsShareQuote}
        />
      </LocationPageSectionFooter>
    </>
  );
};

export default Recommendations;
