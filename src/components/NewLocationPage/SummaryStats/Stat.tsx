import React from 'react';
import MobileStat from './MobileStat';
import DesktopStat from './DesktopStat';
import { MobileOnly, DesktopOnly } from './SummaryStats.style';
import { formatValue, getLevelInfo } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useBreakpoint } from 'common/hooks';
import { getMetricNameForStat, metricMeasureText } from './utils';

const Stat: React.FC<{ metric: Metric; value: number }> = ({
  metric,
  value,
}) => {
  const levelInfo = getLevelInfo(metric, value);
  const formattedValue = formatValue(metric, value, /*nullValueCopy=*/ '-');
  const showMetricMeasureText = metric in metricMeasureText;
  const metricName = getMetricNameForStat(metric);
  const isMobile = useBreakpoint(600);

  const statProps = {
    levelInfo,
    formattedValue,
    showMetricMeasureText,
    metricName,
    isMobile,
    metric,
  };

  return (
    <>
      <MobileOnly>
        <MobileStat {...statProps} />
      </MobileOnly>
      <DesktopOnly>
        <DesktopStat {...statProps} />
      </DesktopOnly>
    </>
  );
};

export default Stat;
