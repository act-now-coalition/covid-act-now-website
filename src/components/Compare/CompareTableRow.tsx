import React from 'react';
import { useHistory } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  MetricCell,
  Row,
  MetricValue,
  Population,
} from 'components/Compare/Compare.style';
import { Metric, formatValue } from 'common/metric';
import { RankedLocationSummary } from 'common/utils/compare';
import { Level } from 'common/level';
import { orderedMetrics } from 'components/Compare/CompareTable';

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
}) => {
  const {
    location,
    sorter,
    isCurrentCounty,
    isModal,
    sortByPopulation,
  } = props;

  //TODO(Chelsi): fix the else?
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

  const locationName = !location.locationInfo.county
    ? location.locationInfo.state
    : location.locationInfo.county.includes('Parish')
    ? location.locationInfo.county.replace('Parish', 'Par.')
    : location.locationInfo.county.replace('County', 'Co.');

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
          {locationName}
          <br />
          <Population>
            {location.locationInfo.population.toLocaleString()}
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
