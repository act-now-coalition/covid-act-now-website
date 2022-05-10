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
  sparkLinesMetricData,
  getSparkLineProps,
} from './utils';

const SparkLineSet: React.FC<{
  projection: Projection;
  onClickSparkLine: (metric: SparkLineMetric) => void;
}> = React.memo(({ projection, onClickSparkLine }) => {
  return (
    <GridContainer>
      {SPARK_LINE_METRICS.map((metric: SparkLineMetric) => {
        const { title } = sparkLinesMetricData[metric];
        const sparkLineProps = getSparkLineProps(metric, projection);

        if (!sparkLineProps) {
          return null;
        }

        const { dateFrom, dateTo, rawData, smoothedData } = sparkLineProps;

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
});

export default SparkLineSet;
