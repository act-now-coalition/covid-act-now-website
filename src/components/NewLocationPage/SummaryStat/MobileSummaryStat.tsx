import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import {
  MetricLabel,
  StatContent,
  Row,
  CondensedChevron,
} from './SummaryStat.style';
import { metricSubLabelText, SummaryStatProps } from './utils';

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
      <Row style={{ marginRight: '20px' }}>
        <MetricLabel>{metricName}</MetricLabel>
        {hasSubLabel && <MetricSubLabel text={metricSubLabelText[metric]} />}
      </Row>
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
