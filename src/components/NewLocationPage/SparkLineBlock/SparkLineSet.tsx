import React from 'react';
import SparkLine from './SparkLine';
import ChartTitle from './ChartTitle';
import { SetContainer, StyledLink } from './SparkLineBlock.style';
import { Projection } from 'common/models/Projection';
import {
  SPARK_LINE_METRICS,
  SparkLineMetric,
  getSparkLineSeriesFromProjection,
  sparkLinesMetricData,
  getDataFromSeries,
  daysToChart,
} from './utils';
import { subtractTime, TimeUnit } from 'common/utils/time-utils';

// TODO (chelsi) - update link's 'to'

const SparkLineSet: React.FC<{ projection: Projection }> = ({ projection }) => {
  const dateTo = new Date();
  const dateFrom = subtractTime(dateTo, daysToChart, TimeUnit.DAYS);
  return (
    <SetContainer>
      {SPARK_LINE_METRICS.map((metric: SparkLineMetric) => {
        const { title, seriesList } = sparkLinesMetricData[metric];
        const metricSeries = getSparkLineSeriesFromProjection(
          seriesList,
          projection,
        );
        const rawData = getDataFromSeries(metricSeries[0], dateFrom);
        const smoothedData = getDataFromSeries(metricSeries[1], dateFrom);
        return (
          <StyledLink to="/">
            <ChartTitle title={title} />
            <SparkLine
              rawData={rawData}
              smoothedData={smoothedData}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />
          </StyledLink>
        );
      })}
    </SetContainer>
  );
};

export default SparkLineSet;
