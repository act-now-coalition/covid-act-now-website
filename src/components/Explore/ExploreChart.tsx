import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { scaleTime, scaleLinear } from '@vx/scale';
import { GridRows, GridColumns } from '@vx/grid';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Column } from 'common/models/Projection';
import * as ChartStyle from 'components/Charts/Charts.style';
import RectClipGroup from 'components/Charts/RectClipGroup';
import { Series } from './interfaces';
import SeriesChart from './SeriesChart';
import { getMaxBy, getTimeAxisTicks } from './utils';
import * as Styles from './Explore.style';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;
const daysBetween = (dateFrom: Date, dateTo: Date) =>
  moment(dateTo).diff(dateFrom, 'days');

const ExploreChart: FunctionComponent<{
  width: number;
  height: number;
  series: Series[];
  isMobile: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  width,
  height,
  series,
  isMobile,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 50,
  marginRight = 10,
}) => {
  const dateFrom = new Date('2020-03-01');
  const dateTo = new Date();
  const numDays = daysBetween(dateFrom, dateTo);
  const maxY = getMaxBy<number>(series, getY, 1);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const timeScale = scaleTime({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo);
  const timeTickFormat = isMobile ? 'MMM' : 'MMMM D';

  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [innerHeight, 0],
  });

  const barWidth = 0.7 * (innerWidth / numDays);

  return (
    <svg width={width} height={height}>
      <Group key="chart-container" top={marginTop} left={marginLeft}>
        <Styles.GridLines>
          <GridColumns<Date> scale={timeScale} height={innerHeight} />
          <GridRows<number> scale={yScale} width={innerWidth} />
        </Styles.GridLines>
        <RectClipGroup width={innerWidth} height={innerHeight}>
          {series.map((serie, i) => (
            <SeriesChart
              key={`series-chart-${i}`}
              data={serie.data}
              x={d => timeScale(getDate(d)) || 0}
              y={d => yScale(getY(d))}
              type={serie.type}
              yMax={innerHeight}
              barWidth={barWidth}
            />
          ))}
        </RectClipGroup>
        <ChartStyle.Axis>
          <AxisLeft scale={yScale} />
          <AxisBottom
            top={innerHeight}
            scale={timeScale}
            tickValues={timeTicks}
            tickFormat={(date: Date) => moment(date).format(timeTickFormat)}
          />
        </ChartStyle.Axis>
      </Group>
    </svg>
  );
};

export default ExploreChart;
