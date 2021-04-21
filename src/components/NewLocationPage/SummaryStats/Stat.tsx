import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import {
  CircleIcon,
  Value,
  ValueWrapper,
  MeasureText,
  MidWeightSpan,
} from './SummaryStats.style';
import {
  getMetricNameForCompare,
  getMetricName,
  formatValue,
  getLevelInfo,
} from 'common/metric';
import { Metric } from 'common/metricEnum';
import { useBreakpoint } from 'common/hooks';
import { Chevron } from '../Shared/Shared.style';
import LabelWithChevron from '../Shared/LabelWithChevron';

function getMetricNameForStat(metric: Metric): string {
  if (metric === Metric.VACCINATIONS) {
    return `% ${getMetricName(metric)}`;
  } else {
    return getMetricName(metric);
  }
}

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

const MetricName: React.FC<{ metricName: string }> = ({ metricName }) => {
  return (
    <>
      <Hidden smUp>
        <MidWeightSpan>{metricName}</MidWeightSpan>
      </Hidden>
      <Hidden xsDown>
        <LabelWithChevron text={metricName} />
      </Hidden>
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
  const metricName = getMetricNameForStat(metric);

  return (
    <>
      <StatValue value={formattedValue} iconColor={levelInfo.color} />
      <MetricName metricName={metricName} />
      {showMetricMeasureText && (
        <MetricMeasure text={metricMeasureText[metric]} />
      )}
    </>
  );
};

export default Stat;
