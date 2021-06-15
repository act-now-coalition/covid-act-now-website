import React from 'react';
import { Metric } from 'common/metricEnum';
import { ExploreMetric } from 'components/Explore';
import { Projections } from 'common/models/Projections';
import { MetricValues } from 'common/models/Projections';
import { Region } from 'common/regions';
import MetricChartFooter from 'components/NewLocationPage/ChartFooter/MetricChartFooter';
import AddedMetricChartFooter from 'components/NewLocationPage/ChartFooter/AddedMetricChartFooter';
import { MetricType } from 'components/Charts/Redesign/Groupings';

const ChartFooter: React.FC<{
  metric: Metric | ExploreMetric;
  projections: Projections;
  region: Region;
  stats: MetricValues;
  metricType: MetricType;
  formattedValue: string;
}> = ({ projections, region, stats, metricType, metric, formattedValue }) => {
  return (
    <>
      {metricType === MetricType.KEY_METRIC ? (
        <MetricChartFooter
          metric={metric as Metric}
          projections={projections}
          region={region}
          stats={stats}
        />
      ) : (
        <AddedMetricChartFooter
          metric={metric as ExploreMetric}
          projections={projections}
          region={region}
          stats={stats}
          formattedValue={formattedValue}
        />
      )}
    </>
  );
};

export default ChartFooter;
