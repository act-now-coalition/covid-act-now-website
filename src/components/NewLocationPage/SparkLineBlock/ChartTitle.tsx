import React from 'react';
import { Chevron } from '../Shared/Shared.style';
import {
  ChartTitleWrapper,
  ChartTitle as Title,
  TitleItem,
  IconItem,
} from './SparkLineBlock.style';

const ChartTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <ChartTitleWrapper>
      <TitleItem>
        <Title>{title}</Title>
      </TitleItem>
      <IconItem>
        <Chevron />
      </IconItem>
    </ChartTitleWrapper>
  );
};

export default ChartTitle;
