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
} from './utils';

// TODO (chelsi) - update link's 'to'

const SparkLineSet: React.FC<{ projection: Projection }> = ({ projection }) => {
  return (
    <SetContainer>
      {SPARK_LINE_METRICS.map((metric: SparkLineMetric) => {
        const { title, seriesList } = sparkLinesMetricData[metric];
        const metricSeries = getSparkLineSeriesFromProjection(
          seriesList,
          projection,
        );
        const rawData = getDataFromSeries(metricSeries[0]);
        const smoothedData = getDataFromSeries(metricSeries[1]);
        return (
          <StyledLink to="/">
            <ChartTitle title={title} />
            <SparkLine rawData={rawData} smoothedData={smoothedData} />
          </StyledLink>
        );
      })}
    </SetContainer>
  );
};

export default SparkLineSet;
