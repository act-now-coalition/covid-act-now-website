import React from 'react';
import { mainContent } from 'cms-content/recommendations';
import Recommend from 'components/Recommend';
import ExpandableContainer from 'components/ExpandableContainer';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import { getRecommendationsShareUrl } from 'common/urls';
import { getRecommendations, getShareQuote } from 'common/utils/recommend';
import { Region } from 'common/regions';
import {
  SectionHeader,
  DisclaimerWrapper,
  PageSectionFooter,
} from 'components/SharedComponents';
import { useBreakpoint } from 'common/hooks';
import { Level } from 'common/level';

interface RecommendationsProps {
  recommendationsRef: React.RefObject<HTMLDivElement>;
  alarmLevel: Level;
  region: Region;
  isHomepage: boolean;
}

const Recommendations = ({
  region,
  recommendationsRef,
  alarmLevel,
  isHomepage,
}: RecommendationsProps) => {
  const recommendationsMainContent = getRecommendations(
    region,
    mainContent.recommendations,
  );

  const recommendsShareQuote = getShareQuote(region.name, alarmLevel);
  const recommendsShareUrl = getRecommendationsShareUrl(region);
  const isMobile = useBreakpoint(600);

  // TODO (Fai): Rework component so we can specify undefined for collapsedHeightDesktop.
  const containerProps = {
    collapsedHeightMobile: '350px',
    collapsedHeightDesktop: '165px',
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Recommendations module',
    trackingCategory: EventCategory.RECOMMENDATIONS,
  };

  const trackSourceClick = (source: string) => {
    trackEvent(EventCategory.RECOMMENDATIONS, EventAction.REDIRECT, source);
  };

  return (
    <>
      <SectionHeader
        id="recommendations"
        $isHomepage={isHomepage}
        ref={recommendationsRef}
      >
        Recommendations
      </SectionHeader>
      {isMobile ? (
        <ExpandableContainer {...containerProps}>
          <Recommend recommendations={recommendationsMainContent} />
        </ExpandableContainer>
      ) : (
        <Recommend recommendations={recommendationsMainContent} />
      )}
      <PageSectionFooter>
        <DisclaimerWrapper>
          Source:{' '}
          <ExternalLink
            style={{ color: 'inherit' }}
            href="https://www.cdc.gov/"
            onClick={() => trackSourceClick('CDC')}
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
      </PageSectionFooter>
    </>
  );
};

export default Recommendations;
