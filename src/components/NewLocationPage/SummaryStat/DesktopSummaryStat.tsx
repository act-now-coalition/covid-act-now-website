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
import { Projection } from 'common/models/Projection';
import StatChart from './StatChart';

const DesktopSummaryStat: React.FC<
  SummaryStatProps & { projection?: Projection }
> = ({
  levelInfo,
  formattedValue,
  hasSubLabel,
  metricName,
  metric,
  projection,
}) => {
  return (
    <StatContent>
      <Row>
        <MetricLabel>{metricName}</MetricLabel>
        <CondensedChevron />
      </Row>
      <StatInfoText>
        {projection && <StatChart projection={projection} metric={metric} />}
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
