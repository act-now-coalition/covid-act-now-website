import React from 'react';
import SparkLineSet from './SparkLineSet';
import { SectionContainer, GrayTitle } from '../Shared/Shared.style';
import { daysToChart } from './utils';
import { useProjectionsFromRegion } from 'common/utils/model';
import { Region } from 'common/regions';
import { SparkLineMetric } from './utils';
import ErrorBoundary from 'components/ErrorBoundary';

const SparkLineBlock: React.FC<{
  region: Region;
  onClickSparkLine: (metric: SparkLineMetric) => void;
}> = ({ region, onClickSparkLine }) => {
  const projections = useProjectionsFromRegion(region);

  if (!projections || !projections.primary) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SectionContainer>
        <GrayTitle>Past {daysToChart} days</GrayTitle>
        <SparkLineSet
          projection={projections.primary}
          onClickSparkLine={onClickSparkLine}
        />
      </SectionContainer>
    </ErrorBoundary>
  );
};

export default SparkLineBlock;
