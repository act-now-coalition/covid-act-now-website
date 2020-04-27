import React from 'react';

import { ChartType, determineZoneInfoForChart } from 'enums/zones';
import SignalStatus from 'components/SignalStatus/SignalStatus';
import {
  SummaryStatWrapper,
  StatNameText,
  StatValueText,
} from './SummaryStat.style';

export interface SummaryStatProp {
  chartType: ChartType;
  value: number;
}

const SummaryStat = (props: SummaryStatProp) => {
  const zoneInfo = determineZoneInfoForChart(props.chartType, props.value)
  return (
    <SummaryStatWrapper>
      <StatNameText>{props.chartType}</StatNameText>
      <StatValueText>{props.value}</StatValueText>
      <SignalStatus zoneInfo={zoneInfo} />
    </SummaryStatWrapper>
  );
};

export default SummaryStat;
