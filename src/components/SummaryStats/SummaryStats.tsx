import React from 'react';
import {
  ChartType,
  getLevelInfoForChartType,
  ChartTypeToMetricName,
} from 'enums/zones';
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

const SummaryStat = (props: {
  chartType: ChartType;
  value: number;
  beta?: Boolean;
}) => {
  const levelInfo = getLevelInfoForChartType(props.chartType, props.value);

  const formatValueForChart = (
    chartType: ChartType,
    value: number | null,
  ): string => {
    if (value === null) {
      return '-';
    }
    if (chartType === ChartType.CASE_GROWTH_RATE) {
      return formatDecimal(value);
    } else if (chartType === ChartType.HOSPITAL_USAGE) {
      return formatPercent(value);
    } else if (chartType === ChartType.POSITIVE_TESTS) {
      return formatPercent(value);
    }
    fail('Invalid Chart Type');
  };
  return (
    <SummaryStatWrapper>
      <StatTextWrapper>
        <StatNameText>
          {ChartTypeToMetricName[props.chartType]}{' '}
          {props.beta && <BetaTag>Beta</BetaTag>}
        </StatNameText>
        <StatDetailText>{levelInfo.detail}</StatDetailText>
      </StatTextWrapper>
      <StatValueWrapper>
        {props.value && (
          <StatValueText>
            {formatValueForChart(props.chartType, props.value)}
          </StatValueText>
        )}
        <SignalStatus levelInfo={levelInfo} />
      </StatValueWrapper>
    </SummaryStatWrapper>
  );
};

const SummaryStats = (props: { stats: { [key: string]: number | null } }) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => !isNull(val),
  ).length;
  return (
    <>
      {hasStats && (
        <SummaryStatsWrapper>
          <SummaryStat
            chartType={ChartType.CASE_GROWTH_RATE}
            value={props.stats[ChartType.CASE_GROWTH_RATE] as number}
          />
          <SummaryStat
            chartType={ChartType.POSITIVE_TESTS}
            value={props.stats[ChartType.POSITIVE_TESTS] as number}
          />
          <SummaryStat
            chartType={ChartType.HOSPITAL_USAGE}
            beta={true}
            value={props.stats[ChartType.HOSPITAL_USAGE] as number}
          />
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default SummaryStats;
