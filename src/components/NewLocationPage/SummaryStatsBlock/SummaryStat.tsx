import React from 'react';
import MobileSummaryStat from './MobileSummaryStat';
import DesktopSummaryStat from './DesktopSummaryStat';
import { MobileOnly, DesktopOnly } from './SummaryStatsBlock.style';
import { formatValue, getLevelInfo } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useBreakpoint } from 'common/hooks';
import { getMetricNameForStat, metricSubLabelText } from './utils';

const SummaryStat: React.FC<{ metric: Metric; value: number }> = ({
  metric,
  value,
}) => {
  const levelInfo = getLevelInfo(metric, value);
  const formattedValue = formatValue(metric, value, /*nullValueCopy=*/ '-');
  const hasSubLabel = metric in metricSubLabelText;
  const metricName = getMetricNameForStat(metric);
  const isMobile = useBreakpoint(600);

  const statProps = {
    levelInfo,
    formattedValue,
    hasSubLabel,
    metricName,
    isMobile,
    metric,
  };

  return (
    <>
      <MobileOnly>
        <MobileSummaryStat {...statProps} />
      </MobileOnly>
      <DesktopOnly>
        <DesktopSummaryStat {...statProps} />
      </DesktopOnly>
    </>
  );
};

export default SummaryStat;
