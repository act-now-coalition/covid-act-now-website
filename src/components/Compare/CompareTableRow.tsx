import React from 'react';
import { useHistory } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { MetricCell, Row } from 'components/Compare/Compare.style';
import { Metric, formatValue } from 'common/metric';
import { RankedLocationSummary } from 'common/utils/compare';
import { Level } from 'common/level';

function cellValue(metric: any, metricType: Metric) {
  if (metric === null || metric === undefined) {
    return 'Unknown';
  }
  return formatValue(metricType, metric.value, '?');
}

const CompareTableRow = (props: {
  location: RankedLocationSummary;
  sorter: number;
  isCurrentCounty?: boolean;
}) => {
  const { location, sorter, isCurrentCounty } = props;

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
    >
      <MetricCell iconColor={location.metricsInfo.level}>
        <span>{location.rank}</span>
        <FiberManualRecordIcon />
        {locationName}
      </MetricCell>
      <MetricCell
        sorter={sorter}
        metric={Metric.CASE_DENSITY}
        iconColor={getLevel(Metric.CASE_DENSITY)}
      >
        <FiberManualRecordIcon />
        {cellValue(location.metricsInfo.metrics[5], Metric.CASE_DENSITY)}
      </MetricCell>
      <MetricCell
        sorter={sorter}
        metric={Metric.CASE_GROWTH_RATE}
        iconColor={getLevel(Metric.CASE_GROWTH_RATE)}
      >
        <FiberManualRecordIcon />
        {cellValue(location.metricsInfo.metrics[0], Metric.CASE_GROWTH_RATE)}
      </MetricCell>
      <MetricCell
        sorter={sorter}
        metric={Metric.POSITIVE_TESTS}
        iconColor={getLevel(Metric.POSITIVE_TESTS)}
      >
        <FiberManualRecordIcon />
        {cellValue(location.metricsInfo.metrics[1], Metric.POSITIVE_TESTS)}
      </MetricCell>
      <MetricCell
        sorter={sorter}
        metric={Metric.HOSPITAL_USAGE}
        iconColor={getLevel(Metric.HOSPITAL_USAGE)}
      >
        <FiberManualRecordIcon />
        {cellValue(location.metricsInfo.metrics[2], Metric.HOSPITAL_USAGE)}
      </MetricCell>
      <MetricCell
        sorter={sorter}
        metric={Metric.CONTACT_TRACING}
        iconColor={getLevel(Metric.CONTACT_TRACING)}
      >
        <FiberManualRecordIcon />
        {cellValue(location.metricsInfo.metrics[3], Metric.CONTACT_TRACING)}
      </MetricCell>
    </Row>
  );
};

export default CompareTableRow;
