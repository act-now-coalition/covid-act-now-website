import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import {
  StatContent,
  Row,
  MetricLabel,
  CondensedChevron,
  StatInfoText,
} from './SummaryStat.style';
import { SummaryStatProps, metricNameSubLabel } from './utils';
import { Metric } from 'common/metricEnum';

const DesktopSummaryStat: React.FC<SummaryStatProps> = ({
  levelInfo,
  formattedValue,
  hasSubLabel,
  metricName,
  metric,
}) => {
  return (
    <StatContent>
      <Row>
        <MetricLabel>{metricName}</MetricLabel>
        <CondensedChevron />
      </Row>
      <StatInfoText>
        <MetricValue
          value={formattedValue}
          iconColor={levelInfo.color}
          metric={metric}
        />
        {hasSubLabel && (
          <MetricSubLabel
            text={metricNameSubLabel[metric]}
            splitText={metric !== Metric.VACCINATIONS}
          />
        )}
      </StatInfoText>
    </StatContent>
  );
};

export default DesktopSummaryStat;
