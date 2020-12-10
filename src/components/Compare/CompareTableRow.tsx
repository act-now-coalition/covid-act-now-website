import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  MetricCell,
  Row,
  MetricValue,
  Population,
  CountySuffix,
  LocationInfoWrapper,
  LocationNameCell,
  Rank,
} from 'components/Compare/Compare.style';
import { Metric, formatValue } from 'common/metric';
import {
  RankedLocationSummary,
  orderedMetrics,
  getColumnLocationName,
} from 'common/utils/compare';
import { Level } from 'common/level';
import { formatEstimate } from 'common/utils';
import regions, { getStateCode } from 'common/regions';
import { fail } from 'assert';

function cellValue(metric: any, metricType: Metric) {
  if (metric === null || metric === undefined) {
    return 'Unknown';
  }
  return formatValue(metricType, metric.value, '---');
}

const CompareTableRow = (props: {
  location: RankedLocationSummary;
  sorter: number;
  isCurrentCounty?: boolean;
  isModal?: boolean;
  sortByPopulation: boolean;
  isHomepage?: boolean;
  showStateCode: boolean;
}) => {
  const {
    location,
    sorter,
    isCurrentCounty,
    isModal,
    sortByPopulation,
    isHomepage,
    showStateCode,
  } = props;

  function getLevel(metricIndex: Metric): Level {
    const metricInfo = location.metricsInfo.metrics[metricIndex];
    if (metricInfo) {
      return metricInfo.level;
    }
    return 4;
  }

  const fipsCode = location.region.fipsCode;

  const region = regions.findByFipsCode(fipsCode);
  // TODO(chris): What todo about possibly null region?
  if (!region) {
    fail(`missing region for fips code ${fipsCode}`);
  }
  const locationLink = `/${region.relativeUrl}`;

  const locationName = getColumnLocationName(location.region);

  const populationRoundTo = isHomepage ? 3 : 2;

  return (
    <Link to={locationLink}>
      <Row
        index={location.rank}
        $isCurrentCounty={isCurrentCounty}
        $isModal={isModal}
      >
        <LocationNameCell
          iconColor={location.metricsInfo.level}
          sortByPopulation={sortByPopulation}
        >
          <div>
            <Rank>{location.rank}</Rank>
            <FiberManualRecordIcon />
          </div>
          <div>
            {locationName[0]}{' '}
            {locationName[1] && <CountySuffix>{locationName[1]}</CountySuffix>}
            {showStateCode && (
              <Fragment>{getStateCode(location.region)}</Fragment>
            )}
            <br />
            <LocationInfoWrapper>
              <Population>
                {formatEstimate(location.region.population, populationRoundTo)}
              </Population>
            </LocationInfoWrapper>
          </div>
        </LocationNameCell>
        {orderedMetrics.map((metric: Metric, i) => {
          const metricForValue = location.metricsInfo.metrics[metric];
          const valueUnknown =
            metricForValue && metricForValue.level === Level.UNKNOWN
              ? true
              : false;
          return (
            <MetricCell
              key={`metric-cell-${i}`}
              sorter={sorter}
              metric={metric}
              iconColor={getLevel(metric)}
              sortByPopulation={sortByPopulation}
            >
              <FiberManualRecordIcon />
              <MetricValue valueUnknown={valueUnknown}>
                {cellValue(metricForValue, metric)}
              </MetricValue>
            </MetricCell>
          );
        })}
      </Row>
    </Link>
  );
};

export default CompareTableRow;
