import React from 'react';
import {
  ChartType,
  getLevelInfoForChartType,
  ChartTypeToTitle,
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

const SummaryStat = ({
  chartType,
  value,
  beta,
  condensed,
}: {
  chartType: ChartType;
  value: number;
  beta?: Boolean;
  condensed?: Boolean;
}) => {
  const levelInfo = getLevelInfoForChartType(chartType, value);

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
      return formatPercent(value, 1);
    }
    fail('Invalid Chart Type');
  };
  return (
    <SummaryStatWrapper condensed={condensed}>
      <StatTextWrapper>
        <StatNameText condensed={condensed}>
          {ChartTypeToTitle[chartType]}{' '}
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
            chartType={ChartType.CASE_GROWTH_RATE}
            condensed={props.condensed}
            value={props.stats[ChartType.CASE_GROWTH_RATE] as number}
          />
          <SummaryStat
            chartType={ChartType.POSITIVE_TESTS}
            condensed={props.condensed}
            value={props.stats[ChartType.POSITIVE_TESTS] as number}
          />
          <SummaryStat
            chartType={ChartType.HOSPITAL_USAGE}
            beta={true}
            condensed={props.condensed}
            value={props.stats[ChartType.HOSPITAL_USAGE] as number}
          />
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default SummaryStats;
