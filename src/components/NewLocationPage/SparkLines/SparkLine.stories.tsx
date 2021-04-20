import React, { useEffect, useState } from 'react';
import some from 'lodash/some';
import SparkLine from './SparkLine';
import regions from 'common/regions';
import {
  getSparkLineSeries,
  SparkLineMetric,
  SeriesWithData,
  daysToChart,
} from './utils';

export default {
  title: 'Location page redesign/Spark lines',
  component: SparkLine,
};

export const Example = () => {
  const region = regions.findByFipsCodeStrict('09001');

  const [sparkLineSeries, setSparkLineSeries] = useState<SeriesWithData[]>([]);

  useEffect(() => {
    const casesMetric = SparkLineMetric.CASES;
    const fetchSeries = () => getSparkLineSeries(casesMetric, region);
    fetchSeries().then(setSparkLineSeries);
  }, [region]);
  const hasData = some(sparkLineSeries, ({ data }) => data.length > 0);

  if (sparkLineSeries.length < 2 || !hasData) {
    return null;
  }

  return (
    <SparkLine
      width={120}
      height={60}
      rawData={sparkLineSeries[0].data.slice(-daysToChart)} // move grabbing the last 30 into a util
      smoothedData={sparkLineSeries[1].data.slice(-daysToChart)}
    />
  );
};
