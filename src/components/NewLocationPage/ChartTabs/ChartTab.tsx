import React from 'react';
// import { formatValue, getLevelInfo } from 'common/metric';
import { useBreakpoint } from 'common/hooks';
import {
  TabContainer,
  TabTitle,
  TabContent,
  MetricSubLabel,
} from './ChartTab.style';
import { CircleIcon } from '../Shared/Shared.style';
import { Value } from '../SummaryStat/SummaryStat.style';

const ChartTab: React.FC<{ metricName: string; subLabel?: string[] }> = ({
  metricName,
  subLabel,
}) => {
  const isMobile = useBreakpoint(600);

  return (
    <TabContainer>
      <TabTitle>
        {metricName}
        {isMobile && subLabel && (
          <MetricSubLabel>{subLabel.join(' ')}</MetricSubLabel>
        )}
      </TabTitle>
      <TabContent>
        {/* <CircleIcon $iconColor={levelInfo.color} /> */}
        <CircleIcon $iconColor="red" />
        {/* <Value>{formattedValue}</Value> */}
        <Value>95%</Value>
        {!isMobile && subLabel && (
          <MetricSubLabel>{subLabel.join(' ')}</MetricSubLabel>
        )}
      </TabContent>
    </TabContainer>
  );
};

export default ChartTab;
