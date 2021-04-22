import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import {
  StatContent,
  Row,
  MetricLabel,
  StyledChevron,
} from './SummaryStatsBlock.style';
import { metricSubLabelText, SummaryStatProps } from './utils';

const DesktopSummaryStat: React.FC<SummaryStatProps> = ({
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
        <StyledChevron />
      </Row>
      <Row>
        <MetricValue value={formattedValue} iconColor={levelInfo.color} />
        {hasSubLabel && (
          <MetricSubLabel
            text={metricSubLabelText[metric]}
            isMobile={isMobile}
          />
        )}
      </Row>
    </StatContent>
  );
};

export default DesktopSummaryStat;
