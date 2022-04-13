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
  StatDetailText,
  StatValueText,
  StatTextWrapper,
  StatValueWrapper,
} from './SummaryStats.style';
import * as urls from 'common/urls';
import StatTag from 'components/SummaryStats/StatTag';
import { CircleIcon } from 'components/NewLocationPage/Shared/Shared.style';

//TODO (Chelsi) - remove dupication: extract 'LocationHeaderStats' and 'SummaryStats' into a single separate component

const SummaryStat: React.FC<{
  chartType: Metric;
  value: number;
  onClick: () => void;
  beta?: boolean;
  condensed?: boolean;
  flipSignalStatusOrder?: boolean;
  isMobile?: boolean;
  isHeader?: boolean;
  isEmbed?: boolean;
  embedOnClickBaseURL?: string;
}> = ({
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
}) => {
  const levelInfo = getLevelInfo(chartType, value);
  const embedOnClick = () => {
    const url = urls.addSharingId(`${embedOnClickBaseURL}/chart/${chartType}`);
    window.open(url, '_blank');
  };
  const finalOnClick = isEmbed ? embedOnClick : onClick;

  return (
    <SummaryStatWrapper
      onClick={finalOnClick}
      $condensed={condensed}
      $isEmbed={isEmbed}
    >
      <StatTextWrapper $isEmbed={isEmbed}>
        <StatNameText $condensed={condensed} $isEmbed={isEmbed}>
          {getMetricNameForCompare(chartType)}{' '}
          {!condensed && beta && isMobile && (
            <StatTag beta isHeader={isHeader} />
          )}
        </StatNameText>
        {!condensed && <StatDetailText>{levelInfo.detail()}</StatDetailText>}
      </StatTextWrapper>
      <StatValueWrapper $condensed={condensed}>
        {value == null ? null : (
          <>
            <CircleIcon $iconColor={levelInfo.color} />
            <StatValueText $condensed={condensed} $isEmbed={isEmbed}>
              {formatValue(chartType, value, /*nullValueCopy=*/ '-')}
              {!condensed && beta && !isMobile && <StatTag beta />}
            </StatValueText>
          </>
        )}
      </StatValueWrapper>
    </SummaryStatWrapper>
  );
};

const noop = () => {};

const SummaryStats = (props: {
  stats: { [key: string]: number | null };
  condensed?: boolean;
  isEmbed?: boolean;
  onRtRangeClick?: () => void;
  onTestPositiveClick?: () => void;
  onIcuUtilizationClick?: () => void;
  onVaccinationsClick?: () => void;
  isMobile?: boolean;
  isHeader?: boolean;
  embedOnClickBaseURL?: string;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => val !== null,
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
        <SummaryStatsWrapper $condensed={props.condensed}>
          <SummaryStat
            onClick={props.onRtRangeClick || noop}
            chartType={Metric.WEEKLY_CASES}
            value={props.stats[Metric.WEEKLY_CASES] as number}
            {...sharedStatProps}
          />
          <SummaryStat
            onClick={props.onRtRangeClick || noop}
            chartType={Metric.ADMISSIONS_PER_100K}
            value={props.stats[Metric.ADMISSIONS_PER_100K] as number}
            {...sharedStatProps}
          />
          <SummaryStat
            onClick={props.onRtRangeClick || noop}
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
