import React from 'react';
import SparkLine from './SparkLine';
import { ParentSize } from '@vx/responsive';
import ChartTitle from './ChartTitle';
import {
  WrappingButton,
  GridContainer,
  GridItem,
} from './SparkLineBlock.style';
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

// TODO (chelsi) - update onClick scrolling functionality

const SparkLineSet: React.FC<{
  projection: Projection;
  onClickSparkLine: (metric: SparkLineMetric) => void;
}> = ({ projection, onClickSparkLine }) => {
  const dateTo = new Date();
  const dateFrom = subtractTime(dateTo, daysToChart, TimeUnit.DAYS);
  return (
    <GridContainer>
      {SPARK_LINE_METRICS.map((metric: SparkLineMetric) => {
        const { title, seriesList } = sparkLinesMetricData[metric];
        const metricSeries = getSparkLineSeriesFromProjection(
          seriesList,
          projection,
        );
        const rawData = getDataFromSeries(metricSeries[0], dateFrom);
        const smoothedData = getDataFromSeries(metricSeries[1], dateFrom);
        return (
          <GridItem key={title}>
            <ParentSize>
              {({ width }) => (
                <div style={{ width }}>
                  <WrappingButton
                    style={{ width }}
                    onClick={() => onClickSparkLine(metric)}
                  >
                    <ChartTitle title={title} />
                    <SparkLine
                      rawData={rawData}
                      smoothedData={smoothedData}
                      dateFrom={dateFrom}
                      dateTo={dateTo}
                    />
                  </WrappingButton>
                </div>
              )}
            </ParentSize>
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

export default SparkLineSet;
