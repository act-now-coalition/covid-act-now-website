import React from 'react';
import chunk from 'lodash/chunk';
import ceil from 'lodash/ceil';
import partition from 'lodash/partition';
import { RecommendationWithIcon } from 'cms-content/recommendations';
import {
  RecommendationsContainer,
  RecommendationBody,
  Icon,
  Column,
  RecommendationItem,
} from './Recommend.style';
import { useBreakpoint } from 'common/hooks';

const Recommend = (props: {
  recommendations: RecommendationWithIcon[];
  recommendationsRef: React.RefObject<HTMLDivElement>;
}) => {
  const { recommendations, recommendationsRef } = props;

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
    <RecommendationsContainer ref={recommendationsRef}>
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
  );
};

export default Recommend;
