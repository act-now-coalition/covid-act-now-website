import React from 'react';
import { isNumber } from 'lodash';
import { ALL_METRICS } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { getMetricName, getLevelInfo, formatValue } from 'common/metric';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StatTag from 'components/SummaryStats/StatTag';
import * as urls from 'common/urls';
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

//TODO (Chelsi) - remove dupication: extract 'LocationHeaderStats' and 'SummaryStats' into a single separate component

const StatValue = (props: {
  iconColor: string;
  condensed?: boolean;
  isEmbed?: boolean;
  isMobile?: boolean;
  isHeader?: boolean;
  embedOnClickBaseURL?: string;
  statusUnknown?: boolean;
  value: string;
  newIndicator?: boolean;
  metric: Metric;
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
      {props.metric === Metric.CASE_DENSITY && (
        <PrevalenceMeasure>
          PER
          <br />
          100K
        </PrevalenceMeasure>
      )}
      {props.metric === Metric.VACCINATIONS && (
        <PrevalenceMeasure>
          1ST
          <br />
          SHOT
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
  isMobile,
  isHeader,
  isEmbed,
  embedOnClickBaseURL,
  newIndicator,
}: {
  chartType: Metric;
  value: number;
  onClick: () => void;
  beta?: boolean;
  condensed?: boolean;
  isMobile?: boolean;
  isHeader?: boolean;
  isEmbed?: boolean;
  embedOnClickBaseURL?: string;
  newIndicator?: boolean;
}) => {
  const levelInfo = getLevelInfo(chartType, value);

  const embedOnClick = () => {
    const url = urls.addSharingId(`${embedOnClickBaseURL}/chart/${chartType}`);
    window.open(url, '_blank');
  };

  const finalOnClick = isEmbed ? embedOnClick : onClick;

  const statusUnknown = value === null;

  const statValue = formatValue(chartType, value, 'Unknown');

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
            metric={chartType}
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
            metric={chartType}
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

const LocationHeaderStats = (props: {
  stats: { [key: string]: number | null };
  condensed?: boolean;
  isEmbed?: boolean;
  onMetricClick?: (metric: Metric) => void;
  isMobile?: boolean;
  isHeader?: boolean;
  embedOnClickBaseURL?: string;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => isNumber(val) && Number.isFinite(val),
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
          {ALL_METRICS.map((metric, i) => (
            <SummaryStat
              key={`stat-${i}`}
              onClick={() => props.onMetricClick && props.onMetricClick(metric)}
              chartType={metric}
              value={props.stats[metric] as number}
              {...sharedStatProps}
              newIndicator={[Metric.VACCINATIONS].includes(metric)}
            />
          ))}
        </SummaryStatsWrapper>
      )}
    </>
  );
};

export default LocationHeaderStats;
