import React from 'react';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { Series } from '../Explore/interfaces';
import * as Styles from '../Explore/Explore.style';
import Axes from 'components/Explore/Axes';
import GridLines from 'components/Explore/GridLines';
import ChartSeries from 'components/Explore/SeriesChart';
import { RectClipGroup } from 'components/Charts';
import { Column } from 'common/models/Projection';
import moment from 'moment';
import { formatPercent } from 'common/utils';
import { ParentSize } from '@vx/responsive';
import * as ChartStyle from './Charts.style';
import { Axis as AxisStyle } from 'components/Explore/Explore.style';
import { AxisLeft, AxisBottom } from '@vx/axis';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;
const daysBetween = (dateFrom: Date, dateTo: Date) =>
  moment(dateTo).diff(dateFrom, 'days');

const VaccinationLines: React.FC<{
  seriesList?: Series[];
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  seriesList = [],
  width,
  height,
  marginTop = 10,
  marginBottom = 60,
  marginLeft = 60,
  marginRight = 20,
}) => {
  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  const dateFrom = new Date('2021-01-01');
  const dateTo = new Date();

  const dateScale = scaleTime({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });

  const maxY = 1; // 100%
  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [innerHeight, 0],
  });

  const getXPosition = (d: Column) => dateScale(getDate(d)) || 0;
  const getYPosition = (d: Column) => yScale(getY(d));

  return (
    <Styles.PositionRelative style={{ height }}>
      <svg width={width} height={height}>
        <Group key="chart-container" top={marginTop} left={marginLeft}>
          <GridLines
            width={innerWidth}
            height={innerHeight}
            dateScale={dateScale}
            yScale={yScale}
            numTicksRows={5}
          />
          <AxisStyle>
            <AxisLeft
              scale={yScale}
              numTicks={5}
              tickFormat={(value: number) => formatPercent(value, 0)}
            />
            <AxisBottom top={innerHeight} scale={dateScale} />
          </AxisStyle>
          <RectClipGroup width={innerWidth} height={innerHeight}>
            {seriesList.map(({ label, data, type, params }) => (
              <ChartSeries
                key={`series-chart-${label}`}
                data={data}
                x={getXPosition}
                y={getYPosition}
                type={type}
                yMax={innerHeight}
                barWidth={0}
                barOpacity={1}
                params={params}
              />
            ))}
          </RectClipGroup>
        </Group>
      </svg>
    </Styles.PositionRelative>
  );
};

const ChartVaccinationsAutosize: React.FC<{
  seriesList?: Series[];
  height?: number;
}> = ({ seriesList, height = 400 }) => (
  <ChartStyle.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <VaccinationLines
          width={width}
          height={height}
          seriesList={seriesList}
        />
      )}
    </ParentSize>
  </ChartStyle.ChartContainer>
);

export default ChartVaccinationsAutosize;
