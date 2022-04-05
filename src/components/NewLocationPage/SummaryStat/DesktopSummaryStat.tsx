import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import { StatContent, Row, MetricLabel } from './SummaryStat.style';
import { Chevron } from '../Shared/Shared.style';
import { metricSubLabelText, SummaryStatProps } from './utils';
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
        <Chevron />
      </Row>
      <Row>
        <MetricValue
          value={formattedValue}
          iconColor={levelInfo.color}
          metric={metric}
        />
        {hasSubLabel && (
          <MetricSubLabel
            text={metricSubLabelText[metric]}
            splitText={metric !== Metric.VACCINATIONS}
          />
        )}
      </Row>
    </StatContent>
  );
};

export default DesktopSummaryStat;
