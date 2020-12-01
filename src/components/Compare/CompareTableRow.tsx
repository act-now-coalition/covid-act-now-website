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
import { getCanonicalUrl } from 'common/locations';

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

  const fipsCode =
    location?.locationInfo?.full_fips_code ||
    location?.locationInfo.state_fips_code;
  const locationLink = `/${getCanonicalUrl(fipsCode)}`;

  const locationName = getColumnLocationName(location.locationInfo);

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
              <Fragment>{location.locationInfo.state_code}</Fragment>
            )}
            <br />
            <LocationInfoWrapper>
              <Population>
                {formatEstimate(
                  location.locationInfo.population,
                  populationRoundTo,
                )}
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
