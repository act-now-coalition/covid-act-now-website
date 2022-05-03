import React from 'react';
import { Metric } from 'common/metricEnum';
import {
  getMetricNameForCompare,
  formatValue,
  getLevelInfo,
} from 'common/metric';
import {
  SummaryStatsWrapper,
  SummaryStatWrapper,
  StatNameText,
  StatValueText,
  StatTextWrapper,
  StatValueWrapper,
} from './SummaryStats.style';
import * as urls from 'common/urls';
import { CircleIcon } from 'components/NewLocationPage/Shared/Shared.style';

//TODO (Chelsi) - remove dupication: extract 'SummaryStats' into a single separate component

const SummaryStat: React.FC<{
  chartType: Metric;
  value: number;
  isEmbed?: boolean;
  embedOnClickBaseURL?: string;
}> = ({ chartType, value, isEmbed, embedOnClickBaseURL }) => {
  const levelInfo = getLevelInfo(chartType, value);
  const embedOnClick = () => {
    const url = urls.addSharingId(`${embedOnClickBaseURL}/chart/${chartType}`);
    window.open(url, '_blank');
  };
  const finalOnClick = isEmbed ? embedOnClick : () => {};

  return (
    <SummaryStatWrapper onClick={finalOnClick} $isEmbed={isEmbed}>
      <StatTextWrapper $isEmbed={isEmbed}>
        <StatNameText $isEmbed={isEmbed}>
          {getMetricNameForCompare(chartType)}{' '}
        </StatNameText>
      </StatTextWrapper>
      <StatValueWrapper>
        {value == null ? null : (
          <>
            <CircleIcon $iconColor={levelInfo.color} />
            <StatValueText $isEmbed={isEmbed}>
              {formatValue(chartType, value, /*nullValueCopy=*/ '-')}
            </StatValueText>
          </>
        )}
      </StatValueWrapper>
    </SummaryStatWrapper>
  );
};

const SummaryStats = (props: {
  stats: { [key: string]: number | null };
  isEmbed?: boolean;
  embedOnClickBaseURL?: string;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => val !== null,
  ).length;
  const sharedStatProps = {
    embedOnClickBaseURL: props.embedOnClickBaseURL,
    isEmbed: props.isEmbed,
  };

  return (
    <>
      {hasStats && (
        <SummaryStatsWrapper>
          <SummaryStat
            chartType={Metric.WEEKLY_CASES_PER_100K}
            value={props.stats[Metric.WEEKLY_CASES_PER_100K] as number}
            {...sharedStatProps}
          />
          <SummaryStat
            chartType={Metric.ADMISSIONS_PER_100K}
            value={props.stats[Metric.ADMISSIONS_PER_100K] as number}
            {...sharedStatProps}
          />
          <SummaryStat
            chartType={Metric.RATIO_BEDS_WITH_COVID}
            value={props.stats[Metric.RATIO_BEDS_WITH_COVID] as number}
            {...sharedStatProps}
          />
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default SummaryStats;
