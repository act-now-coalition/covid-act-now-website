import React from 'react';
import { mainContent } from 'cms-content/recommendations';
import Recommend from 'components/Recommend';
import ExpandableContainer from 'components/ExpandableContainer';
import { Header } from 'components/Compare/Compare.style';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import LocationPageSectionFooter from 'components/LocationPageSectionFooter/LocationPageSectionFooter';
import {
  DisclaimerWrapper,
  LocationPageSectionHeader,
} from 'components/LocationPage/ChartsHolder.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import { Projections } from 'common/models/Projections';
import { getRecommendationsShareUrl } from 'common/urls';
import { getRecommendations, getShareQuote } from 'common/utils/recommend';
import { Region } from 'common/regions';

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
    collapsedHeightMobile: 275,
    collapsedHeightDesktop: 165,
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Recommendations module',
    trackingCategory: EventCategory.RECOMMENDATIONS,
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
          region={region}
        />
      </LocationPageSectionFooter>
    </>
  );
};

export default Recommendations;
