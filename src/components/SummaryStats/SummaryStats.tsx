import React from 'react';
import { Metric } from 'common/metric';
import { getMetricName, getLevelInfo } from 'common/metric';

import {
  SummaryStatsWrapper,
  SummaryStatWrapper,
  StatNameText,
  StatDetailText,
  StatValueText,
  StatTextWrapper,
  StatValueWrapper,
  BetaTag,
} from './SummaryStats.style';

import SignalStatus from 'components/SignalStatus/SignalStatus';
import { formatDecimal, formatPercent } from 'components/Charts/utils';
import { fail } from 'assert';
import { isNull } from 'util';

const SummaryStat = ({
  chartType,
  value,
  beta,
  condensed,
}: {
  chartType: Metric;
  value: number;
  beta?: Boolean;
  condensed?: Boolean;
}) => {
  const levelInfo = getLevelInfo(chartType, value);

  const formatValueForChart = (
    chartType: Metric,
    value: number | null,
  ): string => {
    if (value === null) {
      return '-';
    }
    if (chartType === Metric.CASE_GROWTH_RATE) {
      return formatDecimal(value);
    } else if (chartType === Metric.HOSPITAL_USAGE) {
      return formatPercent(value);
    } else if (chartType === Metric.POSITIVE_TESTS) {
      return formatPercent(value, 1);
    } else if (chartType === Metric.CONTACT_TRACING) {
      return formatPercent(value, 1);
    }
    fail('Invalid Chart Type');
  };
  return (
    <SummaryStatWrapper condensed={condensed}>
      <StatTextWrapper>
        <StatNameText condensed={condensed}>
          {getMetricName(chartType)}{' '}
          {!condensed && beta && <BetaTag>Beta</BetaTag>}
        </StatNameText>
        {!condensed && <StatDetailText>{levelInfo.detail}</StatDetailText>}
      </StatTextWrapper>
      <StatValueWrapper condensed={condensed}>
        {value && (
          <StatValueText condensed={condensed}>
            {formatValueForChart(chartType, value)}
          </StatValueText>
        )}
        <SignalStatus levelInfo={levelInfo} condensed={condensed} />
      </StatValueWrapper>
    </SummaryStatWrapper>
  );
};

const SummaryStats = (props: {
  stats: { [key: string]: number | null };
  condensed?: Boolean;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => !isNull(val),
  ).length;
  return (
    <>
      {hasStats && (
        <SummaryStatsWrapper condensed={props.condensed}>
          <SummaryStat
            chartType={Metric.CASE_GROWTH_RATE}
            condensed={props.condensed}
            value={props.stats[Metric.CASE_GROWTH_RATE] as number}
          />
          <SummaryStat
            chartType={Metric.POSITIVE_TESTS}
            condensed={props.condensed}
            value={props.stats[Metric.POSITIVE_TESTS] as number}
          />
          <SummaryStat
            chartType={Metric.HOSPITAL_USAGE}
            beta={true}
            condensed={props.condensed}
            value={props.stats[Metric.HOSPITAL_USAGE] as number}
          />
          <SummaryStat
            chartType={Metric.CONTACT_TRACING}
            beta={true}
            condensed={props.condensed}
            value={props.stats[Metric.HOSPITAL_USAGE] as number}
          />
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default SummaryStats;
