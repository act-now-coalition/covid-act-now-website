import React from 'react';
import { Chevron } from '../Shared/Shared.style';
import { ChartTitleWrapper, ChartTitle as Title } from './SparkLineBlock.style';

const ChartTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <ChartTitleWrapper>
      <Title>{title}</Title>
      <Chevron />
    </ChartTitleWrapper>
  );
};

export default ChartTitle;
