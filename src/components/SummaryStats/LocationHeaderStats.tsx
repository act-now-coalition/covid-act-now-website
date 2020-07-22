import React from 'react';
import { Metric } from 'common/metric';
import { getMetricName, getLevelInfo } from 'common/metric';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import {
  SummaryStatsWrapper,
  SummaryStatWrapper,
  StatNameText,
  StatDetailText,
  StatValueText,
  StatTextWrapper,
  StatValueWrapper,
  ValueWrapper,
  PrevalenceMeasure,
} from './SummaryStats.style';

import StatTag from 'components/SummaryStats/StatTag';

import { formatDecimal, formatPercent } from 'common/utils';
import { fail } from 'assert';
import { isNull } from 'util';
import * as urls from 'common/urls';

//TODO (Chelsi) - remove dupication: extract 'LocationHeaderStats' and 'SummaryStats' into a single separate component

const StatValue = (props: {
  iconColor: string;
  condensed?: Boolean;
  isEmbed?: Boolean;
  isMobile?: Boolean;
  isHeader?: Boolean;
  embedOnClickBaseURL?: string;
  statusUnknown?: Boolean;
  value: string;
  newIndicator?: Boolean;
}) => {
  return (
    <ValueWrapper iconColor={props.iconColor}>
      <FiberManualRecordIcon />
      <StatValueText
        condensed={props.condensed}
        isEmbed={props.isEmbed}
        statusUnknown={props.statusUnknown}
        isHeader={props.isHeader}
      >
        {props.value}
      </StatValueText>
      {props.newIndicator && (
        <PrevalenceMeasure>
          PER
          <br />
          100K
        </PrevalenceMeasure>
      )}
    </ValueWrapper>
  );
};

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
  newIndicator,
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
  newIndicator?: Boolean;
}) => {
  const levelInfo = getLevelInfo(chartType, value);

  const embedOnClick = () => {
    const url = urls.addSharingId(`${embedOnClickBaseURL}/chart/${chartType}`);
    window.open(url, '_blank');
  };

  const finalOnClick = isEmbed ? embedOnClick : onClick;

  const statusUnknown = value === null;

  const formatValueForChart = (
    chartType: Metric,
    value: number | null,
  ): string => {
    if (value === null) {
      return 'Unknown';
    }
    if (chartType === Metric.CASE_DENSITY) {
      return value.toFixed(1).toString();
    } else if (chartType === Metric.CASE_GROWTH_RATE) {
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

  const statValue = formatValueForChart(chartType, value);

  return (
    <SummaryStatWrapper
      onClick={finalOnClick}
      condensed={condensed}
      isEmbed={isEmbed}
      isHeader={isHeader}
    >
      <StatTextWrapper isHeader={isHeader}>
        <StatNameText
          condensed={condensed}
          isEmbed={isEmbed}
          isHeader={true}
          statusUnknown={statusUnknown}
        >
          {getMetricName(chartType)}{' '}
        </StatNameText>
        {!condensed && !isMobile && (
          <StatValue
            value={statValue}
            iconColor={levelInfo.color}
            condensed={condensed}
            isEmbed={isEmbed}
            statusUnknown={statusUnknown}
            isHeader={isHeader}
            newIndicator={newIndicator}
          />
        )}
        {!condensed && <StatDetailText>{levelInfo.detail()}</StatDetailText>}
        {!condensed && !isMobile && (
          <StatTag
            isHeader={isHeader}
            beta={beta}
            newIndicator={newIndicator}
          />
        )}
      </StatTextWrapper>
      {!condensed && isMobile && (
        <StatValueWrapper condensed={condensed}>
          <StatValue
            value={statValue}
            iconColor={levelInfo.color}
            condensed={condensed}
            isEmbed={isEmbed}
            statusUnknown={statusUnknown}
            isHeader={isHeader}
            newIndicator={newIndicator}
          />
          <StatTag
            isHeader={isHeader}
            beta={beta}
            newIndicator={newIndicator}
          />
        </StatValueWrapper>
      )}
    </SummaryStatWrapper>
  );
};

const noop = () => {};

const LocationHeaderStats = (props: {
  stats: { [key: string]: number | null };
  condensed?: Boolean;
  isEmbed?: Boolean;
  onCaseDensityClick?: () => void;
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
        <SummaryStatsWrapper
          isHeader={props.isHeader}
          condensed={props.condensed}
        >
          <SummaryStat
            onClick={props.onCaseDensityClick || noop}
            chartType={Metric.CASE_DENSITY}
            value={props.stats[Metric.CASE_DENSITY] as number}
            {...sharedStatProps}
            newIndicator={true}
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

export default LocationHeaderStats;
