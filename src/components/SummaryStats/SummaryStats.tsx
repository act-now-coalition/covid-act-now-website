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
} from './SummaryStats.style';
import SignalStatus from 'components/SignalStatus/SignalStatus';
import { formatDecimal, formatPercent } from 'common/utils';
import { fail } from 'assert';
import { isNull } from 'util';
import * as urls from 'common/urls';
import StatTag from 'components/SummaryStats/StatTag';

//TODO (Chelsi) - remove dupication: extract 'LocationHeaderStats' and 'SummaryStats' into a single separate component

const SummaryStat = ({
  chartType,
  value,
  onClick,
  beta,
  condensed,
  flipSignalStatusOrder,
  isMobile,
  isHeader,
  isEmbed,
  embedOnClickBaseURL,
}: {
  chartType: Metric;
  value: number;
  onClick: () => void;
  beta?: Boolean;
  condensed?: Boolean;
  flipSignalStatusOrder?: Boolean;
  isMobile?: Boolean;
  isHeader?: Boolean;
  isEmbed?: Boolean;
  embedOnClickBaseURL?: string;
}) => {
  const levelInfo = getLevelInfo(chartType, value);
  const embedOnClick = () => {
    const url = urls.addSharingId(`${embedOnClickBaseURL}/chart/${chartType}`);
    window.open(url, '_blank');
  };
  const finalOnClick = isEmbed ? embedOnClick : onClick;
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
    <SummaryStatWrapper
      onClick={finalOnClick}
      condensed={condensed}
      isEmbed={isEmbed}
    >
      <StatTextWrapper>
        <StatNameText condensed={condensed} isEmbed={isEmbed}>
          {getMetricName(chartType)}{' '}
          {!condensed && beta && isMobile && (
            <StatTag beta isHeader={isHeader} />
          )}
        </StatNameText>
        {!condensed && <StatDetailText>{levelInfo.detail()}</StatDetailText>}
      </StatTextWrapper>
      <StatValueWrapper condensed={condensed}>
        {value == null ? null : (
          <>
            <StatValueText condensed={condensed} isEmbed={isEmbed}>
              {formatValueForChart(chartType, value)}
              {!condensed && beta && !isMobile && <StatTag beta />}
            </StatValueText>
          </>
        )}
        <SignalStatus
          levelInfo={levelInfo}
          condensed={condensed}
          flipOrder={flipSignalStatusOrder}
          isEmbed={isEmbed}
        />
      </StatValueWrapper>
    </SummaryStatWrapper>
  );
};

const noop = () => {};

const SummaryStats = (props: {
  stats: { [key: string]: number | null };
  condensed?: Boolean;
  isEmbed?: Boolean;
  onRtRangeClick?: () => void;
  onTestPositiveClick?: () => void;
  onIcuUtilizationClick?: () => void;
  onContactTracingClick?: () => void;
  isMobile?: Boolean;
  isHeader?: Boolean;
  embedOnClickBaseURL?: string;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => !isNull(val),
  ).length;
  const sharedStatProps = {
    isMobile: props.isMobile,
    condensed: props.condensed,
    isHeader: props.isHeader,
    embedOnClickBaseURL: props.embedOnClickBaseURL,
    isEmbed: props.isEmbed,
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
