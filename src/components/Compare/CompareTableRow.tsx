import React from 'react';
import { isNumber } from 'lodash';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  MetricCell,
  Row,
  MetricValue,
  Population,
  LocationCellWrapper,
  LocationInfoWrapper,
  LocationRankWrapper,
  LocationNameCell,
  LocationNameWrapper,
  Rank,
  StyledLink,
} from 'components/Compare/Compare.style';
import { Metric, formatValue } from 'common/metric';
import { RankedLocationSummary } from 'common/utils/compare';
import { Level } from 'common/level';
import { formatEstimate } from 'common/utils';
import regions from 'common/regions';
import { fail } from 'assert';
import { StyledRegionName } from 'components/SharedComponents';

function cellValue(metric: any, metricType: Metric) {
  if (metric === null || metric === undefined) {
    return 'Unknown';
  }
  return formatValue(metricType, metric.value, '---');
}

const CompareTableRow = (props: {
  metrics: Metric[];
  location: RankedLocationSummary;
  sorter: number;
  isCurrentCounty?: boolean;
  isModal?: boolean;
  sortByPopulation: boolean;
  isHomepage?: boolean;
  showStateCode: boolean;
}) => {
  const {
    metrics,
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
  const locationLink = region.relativeUrl;

  const populationRoundTo = isHomepage ? 3 : 2;

  return (
    <StyledLink to={locationLink}>
      <Row
        index={location.rank}
        $isCurrentCounty={isCurrentCounty}
        $isModal={isModal}
      >
        <LocationNameCell
          iconColor={location.metricsInfo.level}
          sortByPopulation={sortByPopulation}
        >
          <LocationCellWrapper>
            <LocationRankWrapper>
              <Rank>{location.rank}</Rank>
              <FiberManualRecordIcon />
            </LocationRankWrapper>
            <LocationNameWrapper>
              <StyledRegionName
                showStateCode={showStateCode}
                region={location.region}
                condensed
              />
              <br />
              <LocationInfoWrapper>
                <Population>
                  {formatEstimate(
                    location.region.population,
                    populationRoundTo,
                  )}
                </Population>
              </LocationInfoWrapper>
            </LocationNameWrapper>
          </LocationCellWrapper>
        </LocationNameCell>
        {metrics.map((metric: Metric, i) => {
          const metricForValue = location.metricsInfo.metrics[metric];
          const metricValue = metricForValue?.value;
          const valueUnknown =
            !isNumber(metricValue) || !Number.isFinite(metricValue);

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
    </StyledLink>
  );
};

export default CompareTableRow;
