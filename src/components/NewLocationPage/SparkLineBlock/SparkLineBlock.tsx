import React from 'react';
import SparkLineSet from './SparkLineSet';
import { SectionContainer, GrayTitle } from '../Shared/Shared.style';
import { Projection } from 'common/models/Projection';
import { daysToChart } from './utils';

const SparkLineBlock: React.FC<{ projection: Projection }> = ({
  projection,
}) => {
  return (
    <SectionContainer>
      <GrayTitle>Past {daysToChart} days</GrayTitle>
      <SparkLineSet projection={projection} />
    </SectionContainer>
  );
};

export default SparkLineBlock;
