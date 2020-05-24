import React from 'react';
import ChartZones from './ChartZones';
import { POSITIVE_TESTS_LEVEL_INFO_MAP } from 'common/metrics/positive_rate';
import { formatPercent } from './utils';
import { Column } from '../../common/models/Projection';

const CAP_Y = 0.4;

const getPointText = (valueY: number) => formatPercent(valueY, 1);

// It shows one decimal point for tooltip values, except for
// values over the cap (it shows > 40%)
const getTooltipBody = (valueY: number) =>
  valueY > CAP_Y
    ? `Positive Tests > ${formatPercent(CAP_Y, 0)}`
    : `Positive Tests ${getPointText(valueY)}`;

const ChartPositiveTests = ({
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
    zones={POSITIVE_TESTS_LEVEL_INFO_MAP}
    getTooltipBody={getTooltipBody}
    getPointText={getPointText}
  />
);

export default ChartPositiveTests;
