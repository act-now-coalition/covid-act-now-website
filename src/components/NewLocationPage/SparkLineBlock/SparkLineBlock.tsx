import React from 'react';
import SparkLineSet from './SparkLineSet';
import { SectionContainer, GrayTitle } from '../Shared/Shared.style';
import { Projection } from 'common/models/Projection';
import { daysToChart } from './utils';

const SparkLineBlock: React.FC<{ projection: Projection }> = ({
  projection,
}) => {
  return (
    // Placing margins on the bottom of each spark line container, so removing this padding bottom:
    <SectionContainer style={{ paddingBottom: 0 }}>
      <GrayTitle>Past {daysToChart} days</GrayTitle>
      <SparkLineSet projection={projection} />
    </SectionContainer>
  );
};

export default SparkLineBlock;
