import React from 'react';
import ChartZones from './ChartZones';
import { VACCINATIONS_LEVEL_INFO_MAP } from 'common/metrics/vaccinations';
import { Column } from 'common/models/Projection';
import { formatPercent } from 'common/utils';
import { getMetricDefinition, Metric } from 'common/metric';

const CAP_Y = 1;

const getPointText = (valueY: number) => formatPercent(valueY, 1);

const getTooltipContent = (valueY: number) => {
  return {
    subtitle: getMetricDefinition(Metric.VACCINATIONS).extendedMetricName,
    body: `${getPointText(valueY)}`,
    width: 'auto',
  };
};

const ChartVaccinations = ({
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
    zones={VACCINATIONS_LEVEL_INFO_MAP}
    getTooltipContent={getTooltipContent}
    getPointText={getPointText}
  />
);

export default ChartVaccinations;
