import React from 'react';
import { Metric } from 'common/metricEnum';
import { getSparkLineProps, MetricToSparkLine } from '../SparkLineBlock/utils';
import { Projection } from 'common/models/Projection';
import SparkLine from '../SparkLineBlock/SparkLine';
import VaccinationProgressBarBlock from '../VaccinationProgressBarBlock';

const StatChart: React.FC<{ projection: Projection; metric: Metric }> = ({
  metric,
  projection,
}) => {
  const sparkLineMetric = MetricToSparkLine[metric];
  const sparkLineProps = getSparkLineProps(sparkLineMetric, projection);

  if (metric === Metric.VACCINATIONS) {
    return (
      <VaccinationProgressBarBlock
        projection={projection}
        locationName={projection.region.shortName}
      />
    );
  }

  if (!sparkLineProps) {
    return null;
  }

  const { dateFrom, dateTo, rawData, smoothedData } = sparkLineProps;

  return (
    <SparkLine
      rawData={rawData}
      smoothedData={smoothedData}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
};

export default StatChart;
