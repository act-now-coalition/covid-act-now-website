import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import { MetricLabel, StatContent, Row } from './SummaryStat.style';
import { Chevron } from '../Shared/Shared.style';
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
      <Row>
        <MetricLabel>{metricName}</MetricLabel>
        {hasSubLabel && <MetricSubLabel text={metricSubLabelText[metric]} />}
      </Row>
      <Row>
        <MetricValue
          value={formattedValue}
          iconColor={levelInfo.color}
          metric={metric}
        />
        <Chevron />
      </Row>
    </StatContent>
  );
};

export default MobileSummaryStat;
