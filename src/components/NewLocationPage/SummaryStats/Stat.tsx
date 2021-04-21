import React from 'react';
import {
  CircleIcon,
  Value,
  ValueWrapper,
  MeasureText,
} from './SummaryStats.style';
import {
  getMetricNameForCompare,
  formatValue,
  getLevelInfo,
} from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useBreakpoint } from 'common/hooks';

const StatValue: React.FC<{ value: any; iconColor: string }> = ({
  value,
  iconColor,
}) => {
  return (
    <>
      <ValueWrapper>
        <CircleIcon $iconColor={iconColor} />
        <Value>{value}</Value>
      </ValueWrapper>
    </>
  );
};

const metricMeasureText: { [key in Metric]: string[] } = {
  [Metric.CASE_DENSITY]: ['per', '100k'],
  [Metric.VACCINATIONS]: ['1+', 'dose'],
  [Metric.CASE_GROWTH_RATE]: [''], // delete these empties without typescript complaining
  [Metric.HOSPITAL_USAGE]: [''],
  [Metric.POSITIVE_TESTS]: [''],
};

const MetricMeasure: React.FC<{ text: string[] }> = ({ text }) => {
  const isMobile = useBreakpoint(600);

  return (
    <>
      <MeasureText>{text[0]}</MeasureText> {!isMobile && <br />}
      <MeasureText>{text[1]}</MeasureText>
    </>
  );
};

const Stat: React.FC<{ metric: Metric; value: number }> = ({
  metric,
  value,
}) => {
  const levelInfo = getLevelInfo(metric, value);
  const formattedValue = formatValue(metric, value, /*nullValueCopy=*/ '-');
  const showMetricMeasureText = metric in metricMeasureText;

  return (
    <>
      <StatValue value={formattedValue} iconColor={levelInfo.color} />
      {showMetricMeasureText && (
        <MetricMeasure text={metricMeasureText[metric]} />
      )}
    </>
  );
};

export default Stat;
