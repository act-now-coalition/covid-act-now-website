import React from 'react';
import ChartZones from './ChartZones';
import { PREVALENCE_LEVEL_INFO_MAP } from 'common/metrics/prevalence';
import { formatInteger } from 'common/utils';
import { Column } from 'common/models/Projection';

const CAP_Y = 100;

const getTooltipBody = (valueY: number) =>
  `Deaths ${formatInteger(valueY)}/100k`;

const ChartPrevalenceDeaths = ({
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
    zones={PREVALENCE_LEVEL_INFO_MAP}
    getTooltipBody={getTooltipBody}
    getPointText={formatInteger}
    yAxisTickFormat={formatInteger}
  />
);

export default ChartPrevalenceDeaths;
