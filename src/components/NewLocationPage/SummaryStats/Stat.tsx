import React from 'react';
import MetricMeasure from './MetricMeasure';
import StatValue from './StatValue';
import {
  MetricLabel,
  StatContent,
  Row,
  StyledChevron,
  MobileOnly,
  DesktopOnly,
} from './SummaryStats.style';
import { formatValue, getLevelInfo } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useBreakpoint } from 'common/hooks';
import { getMetricNameForStat, metricMeasureText } from './utils';

const MetricName: React.FC<{ metricName: string }> = ({ metricName }) => {
  return <MetricLabel>{metricName}</MetricLabel>;
};

const Stat: React.FC<{ metric: Metric; value: number }> = ({
  metric,
  value,
}) => {
  const levelInfo = getLevelInfo(metric, value);
  const formattedValue = formatValue(metric, value, /*nullValueCopy=*/ '-');
  const showMetricMeasureText = metric in metricMeasureText;
  const metricName = getMetricNameForStat(metric);
  const isMobile = useBreakpoint(600);

  return (
    <StatContent>
      <Row>
        <MetricName metricName={metricName} />
        <MobileOnly>
          {showMetricMeasureText && (
            <MetricMeasure
              text={metricMeasureText[metric]}
              isMobile={isMobile}
            />
          )}
        </MobileOnly>
        <DesktopOnly>
          <StyledChevron />
        </DesktopOnly>
      </Row>
      <Row>
        <StatValue value={formattedValue} iconColor={levelInfo.color} />
        <MobileOnly>
          <StyledChevron />
        </MobileOnly>
        <DesktopOnly>
          {showMetricMeasureText && (
            <MetricMeasure
              text={metricMeasureText[metric]}
              isMobile={isMobile}
            />
          )}
        </DesktopOnly>
      </Row>
    </StatContent>
  );
};

export default Stat;
