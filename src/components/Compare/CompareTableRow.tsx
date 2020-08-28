import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  MetricCell,
  Row,
  MetricValue,
  Population,
  CountySuffix,
} from 'components/Compare/Compare.style';
import { Metric, formatValue } from 'common/metric';
import {
  RankedLocationSummary,
  orderedMetrics,
  getColumnLocationName,
} from 'common/utils/compare';
import { Level } from 'common/level';
import { formatEstimate } from 'common/utils';

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

  const history = useHistory();

  const goToLocationPage = (page: string) => {
    //clicking current county when in modal wasn't triggering refresh/modal close, so:
    if (window.location.pathname === page) {
      window.location.reload();
    } else {
      window.scrollTo(0, 0);
      history.push(page);
    }
  };

  const handleLocationClick = () => {
    return goToLocationPage(
      `/us/${location.locationInfo.state_code.toLowerCase()}${
        location.locationInfo.county_url_name
          ? `/county/${location.locationInfo.county_url_name.toLowerCase()}`
          : ''
      }`,
    );
  };

  const locationName = getColumnLocationName(location.locationInfo);

  const populationRoundTo = isHomepage ? 3 : 2;

  return (
    <Row
      index={location.rank}
      isCurrentCounty={isCurrentCounty}
      onClick={handleLocationClick}
      isModal={isModal}
    >
      <MetricCell
        iconColor={location.metricsInfo.level}
        sortByPopulation={sortByPopulation}
      >
        <div>
          <span>{location.rank}</span>
          <FiberManualRecordIcon />
        </div>
        <div>
          {locationName[0]}{' '}
          {locationName[1] && <CountySuffix>{locationName[1]}</CountySuffix>}
          {showStateCode && (
            <Fragment>{location.locationInfo.state_code}</Fragment>
          )}
          <br />
          <Population>
            {formatEstimate(
              location.locationInfo.population,
              populationRoundTo,
            )}
          </Population>
        </div>
      </MetricCell>
      {orderedMetrics.map((metric: Metric) => {
        const metricForValue = location.metricsInfo.metrics[metric];
        const valueUnknown =
          metricForValue && metricForValue.level === Level.UNKNOWN
            ? true
            : false;
        return (
          <MetricCell
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
  );
};

export default CompareTableRow;
