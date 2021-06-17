import React from 'react';
import { useBreakpoint } from 'common/hooks';
import {
  TabContainer,
  TabTitle,
  TabContent,
  MetricSubLabel,
} from './ChartTab.style';
import { CircleIcon } from '../Shared/Shared.style';
import { Value } from '../SummaryStat/SummaryStat.style';
import { ValueInfo } from 'components/Charts/Groupings';

const ChartTab: React.FC<{
  metricName: string;
  subLabel?: string[];
  metricValueInfo: ValueInfo;
}> = ({ metricName, subLabel, metricValueInfo }) => {
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
        {metricValueInfo.levelColor && (
          <CircleIcon $iconColor={metricValueInfo.levelColor} />
        )}
        <Value>{metricValueInfo.formattedValue}</Value>
        {!isMobile && subLabel && (
          <MetricSubLabel>{subLabel.join(' ')}</MetricSubLabel>
        )}
      </TabContent>
    </TabContainer>
  );
};

export default ChartTab;
