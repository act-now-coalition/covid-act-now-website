import React from 'react';
import MobileSummaryStat from './MobileSummaryStat';
import DesktopSummaryStat from './DesktopSummaryStat';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import { formatValue, getLevelInfo } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useBreakpoint } from 'common/hooks';
import { getMetricNameForStat, metricNameSubLabel } from './utils';
import { Projection } from 'common/models/Projection';

const SummaryStat: React.FC<{
  metric: Metric;
  value: number | null;
  projection?: Projection;
}> = ({ metric, value, projection }) => {
  const levelInfo = getLevelInfo(metric, value);
  const formattedValue = formatValue(metric, value, /*nullValueCopy=*/ '-');
  const hasSubLabel = metric in metricNameSubLabel;
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
        <DesktopSummaryStat {...statProps} projection={projection} />
      </DesktopOnly>
    </>
  );
};

export default SummaryStat;
