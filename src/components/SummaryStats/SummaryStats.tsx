import React from 'react';
import { Metric } from 'common/metric';
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
import SignalStatus from 'components/SignalStatus/SignalStatus';
import * as urls from 'common/urls';
import StatTag from 'components/SummaryStats/StatTag';

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
      condensed={condensed}
      isEmbed={isEmbed}
    >
      <StatTextWrapper isEmbed={isEmbed}>
        <StatNameText condensed={condensed} isEmbed={isEmbed}>
          {getMetricNameForCompare(chartType)}{' '}
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
              {formatValue(chartType, value, /*nullValueCopy=*/ '-')}
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
        <SummaryStatsWrapper condensed={props.condensed}>
          <SummaryStat
            onClick={props.onRtRangeClick || noop}
            chartType={Metric.CASE_DENSITY}
            value={props.stats[Metric.CASE_DENSITY] as number}
            {...sharedStatProps}
          />
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
            onClick={props.onVaccinationsClick || noop}
            chartType={Metric.VACCINATIONS}
            beta={true}
            value={props.stats[Metric.VACCINATIONS] as number}
            flipSignalStatusOrder
            {...sharedStatProps}
          />
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default SummaryStats;
