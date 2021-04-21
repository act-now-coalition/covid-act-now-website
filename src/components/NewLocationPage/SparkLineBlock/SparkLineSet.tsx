import React from 'react';
import SparkLine from './SparkLine';
import { SparkLineSetContainer } from './SparkLineBlock.style';
import { Projection } from 'common/models/Projection';
import {
  orderedSparkLineMetrics,
  SparkLineMetric,
  getSparkLineSeriesFromProjection,
  sparkLinesMetricData,
  getDataFromSeries,
} from './utils';

const SparkLineSet: React.FC<{ projection: Projection }> = ({ projection }) => {
  return (
    <SparkLineSetContainer>
      {orderedSparkLineMetrics.map((metric: SparkLineMetric) => {
        const { title, seriesList } = sparkLinesMetricData[metric];
        const metricSeries = getSparkLineSeriesFromProjection(
          seriesList,
          projection,
        );
        const rawData = getDataFromSeries(metricSeries[0]);
        const smoothedData = getDataFromSeries(metricSeries[1]);
        return (
          <SparkLine
            rawData={rawData}
            smoothedData={smoothedData}
            title={title}
          />
        );
      })}
    </SparkLineSetContainer>
  );
};

export default SparkLineSet;
