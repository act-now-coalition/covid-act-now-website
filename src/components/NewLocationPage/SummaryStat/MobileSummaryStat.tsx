import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import {
  MetricLabel,
  StatContent,
  Row,
  CondensedChevron,
  StatInfoText,
} from './SummaryStat.style';
import { SummaryStatProps, metricNameSubLabel } from './utils';

const MobileSummaryStat: React.FC<SummaryStatProps> = ({
  levelInfo,
  formattedValue,
  hasSubLabel,
  metricName,
  isMobile,
  metric,
}) => {
  return (
    <StatContent>
      <StatInfoText>
        <MetricLabel>{metricName}</MetricLabel>
        {hasSubLabel && <MetricSubLabel text={metricNameSubLabel[metric]} />}
      </StatInfoText>
      <Row>
        <MetricValue
          value={formattedValue}
          iconColor={levelInfo.color}
          metric={metric}
        />
        <CondensedChevron />
      </Row>
    </StatContent>
  );
};

export default MobileSummaryStat;
