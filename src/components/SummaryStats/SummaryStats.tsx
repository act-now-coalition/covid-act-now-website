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
  onClick,
  beta,
  condensed,
  flipSignalStatusOrder,
}: {
  chartType: Metric;
  value: number;
  onClick: () => void;
  beta?: Boolean;
  condensed?: Boolean;
  flipSignalStatusOrder?: Boolean;
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
    <SummaryStatWrapper onClick={onClick} condensed={condensed}>
      <StatTextWrapper>
        <StatNameText condensed={condensed}>
          {getMetricName(chartType)}{' '}
        </StatNameText>
        {!condensed && <StatDetailText>{levelInfo.detail}</StatDetailText>}
      </StatTextWrapper>
      <StatValueWrapper condensed={condensed}>
        {value && (
          <>
            <StatValueText condensed={condensed}>
              {formatValueForChart(chartType, value)}
              {!condensed && beta && <BetaTag>Beta</BetaTag>}
            </StatValueText>
          </>
        )}
        <SignalStatus
          levelInfo={levelInfo}
          condensed={condensed}
          flipOrder={flipSignalStatusOrder}
        />
      </StatValueWrapper>
    </SummaryStatWrapper>
  );
};

const noop = () => {};

const SummaryStats = (props: {
  stats: { [key: string]: number | null };
  condensed?: Boolean;
  onRtRangeClick?: () => void;
  onTestPositiveClick?: () => void;
  onIcuUtilizationClick?: () => void;
  onContactTracingClick?: () => void;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => !isNull(val),
  ).length;
  return (
    <>
      {hasStats && (
        <SummaryStatsWrapper condensed={props.condensed}>
          <SummaryStat
            onClick={props.onRtRangeClick || noop}
            chartType={Metric.CASE_GROWTH_RATE}
            condensed={props.condensed}
            value={props.stats[Metric.CASE_GROWTH_RATE] as number}
          />
          <SummaryStat
            onClick={props.onTestPositiveClick || noop}
            chartType={Metric.POSITIVE_TESTS}
            condensed={props.condensed}
            value={props.stats[Metric.POSITIVE_TESTS] as number}
          />
          <SummaryStat
            onClick={props.onIcuUtilizationClick || noop}
            chartType={Metric.HOSPITAL_USAGE}
            beta={true}
            condensed={props.condensed}
            value={props.stats[Metric.HOSPITAL_USAGE] as number}
          />
          <SummaryStat
            onClick={props.onContactTracingClick || noop}
            chartType={Metric.CONTACT_TRACING}
            beta={true}
            condensed={props.condensed}
            value={props.stats[Metric.CONTACT_TRACING] as number}
            flipSignalStatusOrder
          />
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default SummaryStats;
