import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import {
  StatContent,
  Row,
  MetricLabel,
  StyledChevron,
} from './SummaryStat.style';
import { metricSubLabelText, SummaryStatProps } from './utils';

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
        <StyledChevron />
      </Row>
      <Row>
        <MetricValue
          value={formattedValue}
          iconColor={levelInfo.color}
          metric={metric}
        />
        {hasSubLabel && <MetricSubLabel text={metricSubLabelText[metric]} />}
      </Row>
    </StatContent>
  );
};

export default DesktopSummaryStat;
