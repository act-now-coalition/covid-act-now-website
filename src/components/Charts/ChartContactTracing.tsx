import React from 'react';
import ChartZones from './ChartZones';
import { CONTACT_TRACING_LEVEL_INFO_MAP } from 'common/metrics/contact_tracing';
import { Column } from 'common/models/Projection';
import { formatPercent } from 'common/utils';

const CAP_Y = 1;

const getPointText = (valueY: number) => formatPercent(valueY, 0);

const getTooltipContent = (valueY: number) => {
  return {
    subtitle: 'Tracers hired',
    body: `${getPointText(valueY)}`,
    width: 'auto',
  };
};

const ChartContactTracing = ({
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
    zones={CONTACT_TRACING_LEVEL_INFO_MAP}
    getTooltipContent={getTooltipContent}
    getPointText={getPointText}
  />
);

export default ChartContactTracing;
