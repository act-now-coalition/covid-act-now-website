import React from 'react';
import ChartZones from './ChartZones';
import { POSITIVE_TESTS_LEVEL_INFO_MAP } from 'common/metrics/positive_rate';
import { formatPercent } from './utils';

const CAP_Y = 0.4;

const getTooltipText = (valueY: number) =>
  valueY > CAP_Y
    ? `Positive Tests > ${formatPercent(CAP_Y, 1)}`
    : `Positive Tests ${formatPercent(valueY, 1)}`;

const ChartPositiveTests = ({
  columnData,
  height = 400,
}: {
  columnData: any[];
  height?: number;
}) => (
  <ChartZones
    height={height}
    columnData={columnData}
    capY={CAP_Y}
    zones={POSITIVE_TESTS_LEVEL_INFO_MAP}
    getTooltipText={getTooltipText}
  />
);

export default ChartPositiveTests;
