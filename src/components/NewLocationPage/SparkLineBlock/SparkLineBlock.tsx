import React from 'react';
import SparkLineSet from './SparkLineSet';
import { SectionContainer, GrayTitle } from '../Shared/Shared.style';
import { daysToChart } from './utils';
import { useProjectionsFromRegion } from 'common/utils/model';
import { Region } from 'common/regions';

const SparkLineBlock: React.FC<{ region: Region }> = ({ region }) => {
  const projections = useProjectionsFromRegion(region);

  if (!projections || !projections.primary) {
    return null;
  }

  return (
    <SectionContainer>
      <GrayTitle>Past {daysToChart} days</GrayTitle>
      <SparkLineSet projection={projections.primary} />
    </SectionContainer>
  );
};

export default SparkLineBlock;
