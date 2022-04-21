import React from 'react';
import max from 'lodash/max';
import ChartZones from './ChartZones';
import { formatPercent } from 'common/utils';
import { Column } from 'common/models/Projection';
import { RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP } from 'common/metrics/ratio_beds_with_covid_patients';

// Add (100 * CAP_PADDING)% extra padding above the maximum chart value
const CAP_PADDING = 0.05;
const MIN_Y_LIMIT = 0.2; // 20%
const maxColumnValue = (data: Column[]) => max(data.map(col => col.y));

const getPointText = (valueY: number) => formatPercent(valueY, 1);

const getTooltipContent = (valueY: number) => ({
  subtitle: `COVID PATIENTS`,
  body: `${formatPercent(valueY, 0)} of all beds`,
  width: '125px',
});

const ChartRatioBedsWithCovidPatients = ({
  columnData,
  height,
}: {
  columnData: Column[];
  height: number;
}) => (
  <ChartZones
    height={height}
    columnData={columnData}
    capY={Math.max(maxColumnValue(columnData) + CAP_PADDING, MIN_Y_LIMIT)}
    zones={RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP}
    getTooltipContent={getTooltipContent}
    getPointText={getPointText}
  />
);

export default ChartRatioBedsWithCovidPatients;
