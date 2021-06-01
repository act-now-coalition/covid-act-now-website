import React from 'react';
import { formatValue, getLevelInfo } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useBreakpoint } from 'common/hooks';
import {
  TabsContainer,
  Tab,
  TabTitle,
  TabContent,
  MetricSubLabel,
} from './ChartTab.style';
import { CircleIcon } from '../Shared/Shared.style';
import { Value } from '../SummaryStat/SummaryStat.style';
import { getMetricNameForStat, metricSubLabelText } from '../SummaryStat/utils';

const ChartTab: React.FC<{ metric: Metric; value: number | null }> = ({
  metric,
  value,
}) => {
  const isMobile = useBreakpoint(600);
  const metricName = getMetricNameForStat(metric);
  const hasSubLabel = metric in metricSubLabelText;
  const levelInfo = getLevelInfo(metric, value);
  const formattedValue = formatValue(metric, value, /*nullValueCopy=*/ '-');

  return (
    <TabsContainer>
      <Tab>
        <TabTitle>
          {metricName}
          {isMobile && hasSubLabel && (
            <MetricSubLabel>
              {metricSubLabelText[metric].join(' ')}
            </MetricSubLabel>
          )}
        </TabTitle>
        <TabContent>
          <CircleIcon $iconColor={levelInfo.color} />
          <Value>{formattedValue}</Value>
          {!isMobile && hasSubLabel && (
            <MetricSubLabel>
              {metricSubLabelText[metric].join(' ')}
            </MetricSubLabel>
          )}
        </TabContent>
      </Tab>
    </TabsContainer>
  );
};

export default ChartTab;
