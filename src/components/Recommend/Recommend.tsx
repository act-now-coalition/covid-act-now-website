import React from 'react';
import chunk from 'lodash/chunk';
import ceil from 'lodash/ceil';
import partition from 'lodash/partition';
import { Recommendation } from 'cms-content/recommendations';
import {
  RecommendationsContainer,
  RecommendationBody,
  Icon,
  Column,
  RecommendationItem,
  RecommendationContent,
} from './Recommend.style';
import { useBreakpoint } from 'common/hooks';
import CTAButton from './CTAButton';

const Recommend = (props: { recommendations: Recommendation[] }) => {
  const { recommendations } = props;

  /*
    Divides recommendations into 2 columns.
    For mobile: splits originally-ordered recommendations array in half.
    For desktop: splits by even/odds so the highest 'ranked' recommendations will appear on top.
  */
  const midpoint = ceil(recommendations.length / 2);
  const halvedInOrder = chunk(recommendations, midpoint);
  const indexedRecommendations = recommendations.map((item, index) => ({
    index,
    ...item,
  }));
  const partitionedByIndex = partition(
    indexedRecommendations,
    item => item.index % 2 === 0,
  );

  const isMobile = useBreakpoint(600);
  const recommendationsColumns = isMobile ? halvedInOrder : partitionedByIndex;

  return (
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
                    src={recommendation.icon.iconImage}
                    alt={recommendation.icon.altText}
                  />
                  <RecommendationContent>
                    <RecommendationBody
                      className={recommendation.category}
                      source={recommendation.body}
                    />
                    {recommendation.cta && (
                      <CTAButton
                        cta={recommendation.cta}
                        category={recommendation.category}
                      />
                    )}
                  </RecommendationContent>
                </RecommendationItem>
              );
            })}
          </Column>
        );
      })}
    </RecommendationsContainer>
  );
};

export default Recommend;
