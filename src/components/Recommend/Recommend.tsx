import React from 'react';
import chunk from 'lodash/chunk';
import ceil from 'lodash/ceil';
import partition from 'lodash/partition';
import {
  HeaderCopy,
  Intro,
  RecommendationsContainer,
  RecommendationBody,
  Icon,
  Column,
  RecommendationItem,
} from './Recommend.style';
import {
  RecommendationWithIcon,
  mainContent,
} from 'cms-content/recommendations';
import { LocationPageSectionHeader } from 'components/LocationPage/ChartsHolder.style';
import { HeaderWrapper } from 'components/VulnerabilitiesBlock/VulnerabilitiesBlock.style';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventCategory } from 'components/Analytics';
import { Subtitle1 } from 'components/Typography';
import { useBreakpoint } from 'common/hooks';

const { header } = mainContent;

const Header = (props: {
  introCopy: string;
  locationName: string;
  shareUrl: string;
  shareQuote: string;
}) => {
  const { introCopy, locationName, shareUrl, shareQuote } = props;
  return (
    <>
      <HeaderWrapper id="recommendations">
        <LocationPageSectionHeader>
          <HeaderCopy>{header}</HeaderCopy>
        </LocationPageSectionHeader>
        <ShareButtons
          eventCategory={EventCategory.RECOMMENDATIONS}
          shareUrl={shareUrl}
          shareQuote={shareQuote}
        />
      </HeaderWrapper>
      <Subtitle1>for {locationName}</Subtitle1>
      <Intro>
        These recommendations match the guidelines set by the{' '}
        <strong>CDC</strong>. {introCopy}
      </Intro>
    </>
  );
};

const Recommend = (props: {
  introCopy: string;
  recommendations: RecommendationWithIcon[];
  locationName: string;
  shareUrl: string;
  shareQuote: string;
  recommendationsRef: React.RefObject<HTMLDivElement>;
  feedbackFormUrl: string;
}) => {
  const {
    introCopy,
    recommendations,
    locationName,
    shareUrl,
    shareQuote,
    recommendationsRef,
  } = props;

  /*
    Divides recommendations into 2 columns.
    For mobile: splits originally-ordered recommendations array in half.
    For desktop: splits by even/odds so the highest 'ranked' recommendations will appear on top.
  */
  const midpoint = ceil(recommendations.length / 2);
  const halvedInOrder = chunk(recommendations, midpoint);
  const partitionedByIndex = partition(
    recommendations,
    item => item.index % 2 === 0,
  );

  const isMobile = useBreakpoint(600);
  const recommendationsColumns = isMobile ? halvedInOrder : partitionedByIndex;

  return (
    <Wrapper ref={recommendationsRef}>
      <Header
        introCopy={introCopy}
        locationName={locationName}
        shareUrl={shareUrl}
        shareQuote={shareQuote}
      />
      <RecommendationsContainer>
        {recommendationsColumns.map((half, j) => {
          return (
            <Column key={`half-${j}`}>
              {half.map((recommendation, i) => {
                return (
                  <RecommendationItem
                    key={`recommendation-${i}`}
                    highlight={false}
                  >
                    <Icon
                      src={recommendation.iconInfo.iconImage}
                      alt={recommendation.iconInfo.altText}
                    />
                    <RecommendationBody
                      className={recommendation.recommendationInfo.category}
                      source={recommendation.recommendationInfo.body}
                    />
                  </RecommendationItem>
                );
              })}
            </Column>
          );
        })}
      </RecommendationsContainer>
    </Wrapper>
  );
};

export default Recommend;
