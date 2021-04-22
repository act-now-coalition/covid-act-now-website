import React from 'react';
import MetricMeasure from './MetricMeasure';
import StatValue from './StatValue';
import {
  MetricLabel,
  StatContent,
  Row,
  StyledChevron,
} from './SummaryStats.style';
import { Metric } from 'common/metricEnum';
import { metricMeasureText } from './utils';

const MetricName: React.FC<{ metricName: string }> = ({ metricName }) => {
  return <MetricLabel>{metricName}</MetricLabel>;
};

const MobileStat: React.FC<{
  levelInfo: any;
  formattedValue: string;
  showMetricMeasureText: boolean;
  metricName: string;
  isMobile: boolean;
  metric: Metric;
}> = ({
  levelInfo,
  formattedValue,
  showMetricMeasureText,
  metricName,
  isMobile,
  metric,
}) => {
  return (
    <StatContent>
      <Row>
        <MetricName metricName={metricName} />
        {showMetricMeasureText && (
          <MetricMeasure text={metricMeasureText[metric]} isMobile={isMobile} />
        )}
      </Row>
      <Row>
        <StatValue value={formattedValue} iconColor={levelInfo.color} />
        <StyledChevron />
      </Row>
    </StatContent>
  );
};

export default MobileStat;
