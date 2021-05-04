import React from 'react';
import { Value, ValueWrapper } from './SummaryStat.style';
import { CircleIcon } from '../Shared/Shared.style';
import { Metric } from 'common/metricEnum';

const MetricValue: React.FC<{
  value: string;
  iconColor: string;
  metric: Metric;
}> = ({ value, iconColor, metric }) => {
  return (
    <ValueWrapper>
      {metric !== Metric.VACCINATIONS && <CircleIcon $iconColor={iconColor} />}
      <Value>{value}</Value>
    </ValueWrapper>
  );
};

export default MetricValue;
