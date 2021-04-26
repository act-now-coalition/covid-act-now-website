import React from 'react';
import { Value, ValueWrapper } from './SummaryStatsBlock.style';
import { CircleIcon } from '../Shared/Shared.style';

const MetricValue: React.FC<{ value: string; iconColor: string }> = ({
  value,
  iconColor,
}) => {
  return (
    <ValueWrapper>
      <CircleIcon $iconColor={iconColor} />
      <Value>{value}</Value>
    </ValueWrapper>
  );
};

export default MetricValue;
