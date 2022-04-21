import React from 'react';
import ChartZones from './ChartZones';
import { formatPercent } from 'common/utils';
import { Column } from 'common/models/Projection';
import { RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP } from 'common/metrics/ratio_beds_with_covid_patients';

// Add (100 * CAP_PADDING)% extra padding above the maximum chart value
const CAP_PADDING = 0.05;

const getPointText = (valueY: number) => formatPercent(valueY, 1);

const getTooltipContent = (valueY: number) => ({
  subtitle: `COVID PATIENTS`,
  body: `${formatPercent(valueY, 0)} of all beds`,
  width: '125px',
});

const maxColumnValue = (data: Column[]) => {
  return Math.max.apply(
    null,
    data.map(function (column) {
      return column.y;
    }),
  );
};

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
    capY={maxColumnValue(columnData) + CAP_PADDING}
    zones={RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP}
    getTooltipContent={getTooltipContent}
    getPointText={getPointText}
  />
);

export default ChartRatioBedsWithCovidPatients;
