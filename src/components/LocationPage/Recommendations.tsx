// @ts-nocheck

import React from 'react';
import { mainContent } from 'cms-content/recommendations';
import Recommend from 'components/Recommend';
import ExpandableContainer from 'components/ExpandableContainer';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import LocationPageSectionFooter from 'components/LocationPageSectionFooter/LocationPageSectionFooter';
import { DisclaimerWrapper } from 'components/LocationPage/ChartsHolder.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import { Projections } from 'common/models/Projections';
import { getRecommendationsShareUrl } from 'common/urls';
import { getRecommendations, getShareQuote } from 'common/utils/recommend';
import { Region } from 'common/regions';
import { SectionHeader } from 'components/SharedComponents';

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

  mainContent.recommendations = [
    {
      body:
        '**Incentives** Create tax and rebate incentives for people to purchase electric appliances.',
      source: 'FED',
      category: 'GATHERINGS',
      level: 'ALL',
      id: 'GATHERINGS_ALL',
    },
    {
      body:
        '**Travel** Contact these 3 mayors who are leading the country in electrification.',
      source: 'FED',
      category: 'TRAVEL',
      level: 'ALL',
      id: 'TRAVEL_ALL',
    },
    {
      body:
        '**Job training** Invest in training contractors and electricians in our county.',
      category: 'SCHOOLS',
      source: 'HGHI',
      level: 'ALL',
      id: 'SCHOOLS_ALL',
    },
    {
      body:
        '**Advocate** Call [this number](tel:555-5555) to talk to your local representative and demand climate action now!',
      source: 'FED',
      category: 'RESTAURANTS',
      level: 'ALL',
      id: 'GATHERINGS_ALL',
    },
  ];
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
    collapsedHeightMobile: '275px',
    collapsedHeightDesktop: '165px',
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
      <SectionHeader id="recommendations">Recommendations</SectionHeader>
      <Recommend
        recommendations={recommendationsMainContent}
        recommendationsRef={recommendationsRef}
      />
      <LocationPageSectionFooter>
        <DisclaimerWrapper>
          Source:{' '}
          <ExternalLink
            style={{ color: 'inherit' }}
            href="https://www.cdc.gov/"
            onClick={trackSourceClick}
          >
            Rewiring America
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
