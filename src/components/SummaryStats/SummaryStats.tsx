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
import { formatDecimal, formatPercent } from 'common/utils';
import { fail } from 'assert';
import { isNull } from 'util';

const SummaryStat = ({
  chartType,
  value,
  onClick,
  beta,
  condensed,
  flipSignalStatusOrder,
  isMobile,
}: {
  chartType: Metric;
  value: number;
  onClick: () => void;
  beta?: Boolean;
  condensed?: Boolean;
  flipSignalStatusOrder?: Boolean;
  isMobile?: Boolean;
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
      return formatPercent(value, 0);
    }
    fail('Invalid Chart Type');
  };
  return (
    <SummaryStatWrapper onClick={onClick} condensed={condensed}>
      <StatTextWrapper>
        <StatNameText condensed={condensed}>
          {getMetricName(chartType)}{' '}
          {!condensed && beta && isMobile && <BetaTag>Beta</BetaTag>}
        </StatNameText>
        {!condensed && <StatDetailText>{levelInfo.detail()}</StatDetailText>}
      </StatTextWrapper>
      <StatValueWrapper condensed={condensed}>
        {value == null ? null : (
          <>
            <StatValueText condensed={condensed}>
              {formatValueForChart(chartType, value)}
              {!condensed && beta && !isMobile && <BetaTag>Beta</BetaTag>}
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
  isMobile?: Boolean;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => !isNull(val),
  ).length;

  const sharedStatProps = {
    isMobile: props.isMobile,
    condensed: props.condensed,
  };

  return (
    <>
      {hasStats && (
        <SummaryStatsWrapper condensed={props.condensed}>
          <SummaryStat
            onClick={props.onRtRangeClick || noop}
            chartType={Metric.CASE_GROWTH_RATE}
            value={props.stats[Metric.CASE_GROWTH_RATE] as number}
            {...sharedStatProps}
          />
          <SummaryStat
            onClick={props.onTestPositiveClick || noop}
            chartType={Metric.POSITIVE_TESTS}
            value={props.stats[Metric.POSITIVE_TESTS] as number}
            {...sharedStatProps}
          />
          <SummaryStat
            onClick={props.onIcuUtilizationClick || noop}
            chartType={Metric.HOSPITAL_USAGE}
            beta={true}
            value={props.stats[Metric.HOSPITAL_USAGE] as number}
            {...sharedStatProps}
          />
          <SummaryStat
            onClick={props.onContactTracingClick || noop}
            chartType={Metric.CONTACT_TRACING}
            beta={true}
            value={props.stats[Metric.CONTACT_TRACING] as number}
            flipSignalStatusOrder
            {...sharedStatProps}
          />
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default SummaryStats;
