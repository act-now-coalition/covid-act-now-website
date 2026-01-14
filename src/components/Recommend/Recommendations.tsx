import React from 'react';
import { mainContent } from 'cms-content/recommendations';
import Recommend from 'components/Recommend';
import ExpandableContainer from 'components/ExpandableContainer';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import { getRecommendations } from 'common/utils/recommend';
import { Region } from 'common/regions';
import {
  SectionHeader,
  DisclaimerWrapper,
  PageSectionFooter,
} from 'components/SharedComponents';
import { useBreakpoint } from 'common/hooks';

interface RecommendationsProps {
  recommendationsRef: React.RefObject<HTMLDivElement>;
  region: Region;
  isHomepage: boolean;
}

const Recommendations = ({
  region,
  recommendationsRef,
  isHomepage,
}: RecommendationsProps) => {
  const recommendationsMainContent = getRecommendations(
    region,
    mainContent.recommendations,
  );
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
      </PageSectionFooter>
    </>
  );
};

export default Recommendations;
