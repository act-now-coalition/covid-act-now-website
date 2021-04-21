import React from 'react';
import SparkLine from './SparkLine';
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
    <div>
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
            width={120}
            height={60}
          />
        );
      })}
    </div>
  );
};

export default SparkLineSet;
