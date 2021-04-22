import React from 'react';
import MetricSubLabel from './MetricSubLabel';
import MetricValue from './MetricValue';
import {
  MetricLabel,
  StatContent,
  Row,
  StyledChevron,
} from './SummaryStatsBlock.style';
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
        {hasSubLabel && (
          <MetricSubLabel
            text={metricSubLabelText[metric]}
            isMobile={isMobile}
          />
        )}
      </Row>
      <Row>
        <MetricValue value={formattedValue} iconColor={levelInfo.color} />
        <StyledChevron />
      </Row>
    </StatContent>
  );
};

export default MobileSummaryStat;
