import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { mainContent } from 'cms-content/recommendations';
import { Projections } from 'common/models/Projections';
import Recommend from 'components/Recommend';
import { getRecommendationsShareUrl } from 'common/urls';
import {
  getDynamicIntroCopy,
  getRecommendations,
  getShareQuote,
} from 'common/utils/recommend';

interface RecommendationsProps {
  projections: Projections;
  recommendationsRef: React.RefObject<HTMLDivElement>;
}

const Recommendations = ({
  projections,
  recommendationsRef,
}: RecommendationsProps) => {
  const alarmLevel = projections.getAlarmLevel();
  const region = projections.region;
  const projection = projections.primary;

  const recommendationsIntro = getDynamicIntroCopy(
    projection,
    projections.locationName,
    projections.getMetricValues(),
  );

  const recommendationsMainContent = getRecommendations(
    region,
    mainContent.recommendations,
  );

  const recommendsShareUrl = getRecommendationsShareUrl(region);

  const recommendsShareQuote = getShareQuote(
    projections.locationName,
    alarmLevel,
  );

  const recommendationsFeedbackForm = `https://can386399.typeform.com/to/WSPYSGPe#source=can&id=${uuidv4()}&fips=${
    projection.fips
  }`;

  return (
    <Recommend
      introCopy={recommendationsIntro}
      recommendations={recommendationsMainContent}
      locationName={region.fullName}
      shareUrl={recommendsShareUrl}
      shareQuote={recommendsShareQuote}
      recommendationsRef={recommendationsRef}
      feedbackFormUrl={recommendationsFeedbackForm}
    />
  );
};

export default Recommendations;
