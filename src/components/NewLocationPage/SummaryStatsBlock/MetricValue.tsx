import React from 'react';
import { CircleIcon, Value, ValueWrapper } from './SummaryStatsBlock.style';

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
