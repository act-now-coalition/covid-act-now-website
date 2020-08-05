import React from 'react';
import ChartZones from './ChartZones';
import { CASE_DENSITY_LEVEL_INFO_MAP } from 'common/metrics/case_density';
import { Column } from 'common/models/Projection';
import { formatDecimal } from 'common/utils';

const CAP_Y = 100;

const formatValue = (value: number) => formatDecimal(value, 1);

const getTooltipBody = (valueY: number) =>
  `Daily new cases ${formatDecimal(valueY, 1)}/100k`;

const ChartCaseIncidence = ({
  columnData,
  height = 400,
}: {
  columnData: Column[];
  height?: number;
}) => (
  <ChartZones
    height={height}
    columnData={columnData}
    capY={CAP_Y}
    zones={CASE_DENSITY_LEVEL_INFO_MAP}
    getTooltipBody={getTooltipBody}
    getPointText={formatValue}
    yTickFormat={(value: number) => formatDecimal(value, 0)}
  />
);

export default ChartCaseIncidence;
