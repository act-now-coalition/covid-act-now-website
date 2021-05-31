import React from 'react';
import { mainContent } from 'cms-content/recommendations';
import Recommend from 'components/Recommend';
import ExpandableContainer from 'components/ExpandableContainer';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import { Projections } from 'common/models/Projections';
import { getRecommendationsShareUrl } from 'common/urls';
import { getRecommendations, getShareQuote } from 'common/utils/recommend';
import { Region } from 'common/regions';
import { SectionHeader } from 'components/SharedComponents';
import {
  FooterWrapper,
  Footer,
  ButtonContainer,
} from 'components/NewLocationPage/ChartFooter/ChartFooter.style';

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
      <SectionHeader id="recommendations">Recommendations</SectionHeader>
      <ExpandableContainer {...containerProps}>
        <Recommend
          recommendations={recommendationsMainContent}
          recommendationsRef={recommendationsRef}
        />
      </ExpandableContainer>
      <FooterWrapper>
        <Footer>
          Source:&nbsp;
          <ExternalLink
            href="https://www.cdc.gov/"
            style={{ color: 'inherit' }}
            onClick={trackSourceClick}
          >
            CDC
          </ExternalLink>
          <ButtonContainer>
            <ShareButtons
              eventCategory={EventCategory.RECOMMENDATIONS}
              shareUrl={recommendsShareUrl}
              shareQuote={recommendsShareQuote}
              region={region}
            />
          </ButtonContainer>
        </Footer>
      </FooterWrapper>
    </>
  );
};

export default Recommendations;
