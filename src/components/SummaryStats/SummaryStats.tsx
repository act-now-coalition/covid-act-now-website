import React from 'react';
import { ChartType, getLevelInfoForChartType } from 'enums/zones';
import { SummaryStatsWrapper, SummaryHolder,   SummaryStatWrapper,
  StatNameText,
  StatValueText,} from './SummaryStats.style';

import SignalStatus from 'components/SignalStatus/SignalStatus';
import { formatDecimal, formatPercent } from 'components/Charts/utils';
import { fail } from 'assert';

const SummaryStat = (props: {chartType: ChartType, value: number}) => {
  const levelInfo = getLevelInfoForChartType(props.chartType, props.value);
  const formatValueForChart = (chartType: ChartType, value: number): string => {
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
      <StatNameText>{props.chartType}</StatNameText>
      <StatValueText>
        {formatValueForChart(props.chartType, props.value)}
      </StatValueText>
      <SignalStatus levelInfo={levelInfo} />
    </SummaryStatWrapper>
  );
};

const SummaryStats = (props: { stats: { [key: string]: any } }) => {
  return (
    <SummaryHolder>
      <SummaryStatsWrapper>
        <SummaryStat
          chartType={ChartType.CASE_GROWTH_RATE}
          value={props.stats[ChartType.CASE_GROWTH_RATE].rt}
        />
        <SummaryStat
          chartType={ChartType.POSITIVE_TESTS}
          value={props.stats[ChartType.POSITIVE_TESTS]}
        />
        <SummaryStat
          chartType={ChartType.HOSPITAL_USAGE}
          value={props.stats[ChartType.HOSPITAL_USAGE]}
        />
      </SummaryStatsWrapper>
    </SummaryHolder>
  );
};

export default SummaryStats;
