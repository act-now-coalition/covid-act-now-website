import React from 'react';
import ChartZones from './ChartZones';
import { formatPercent } from 'common/utils';
import { Column } from 'common/models/Projection';
import { RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP } from 'common/metrics/ratio_beds_with_covid_patients';

// TODO(8.2) - confirm thresholds/chart/tooltip content, y-cap
const CAP_Y = 0.4;

const getPointText = (valueY: number) => formatPercent(valueY, 1);

const getTooltipContent = (valueY: number) => ({
  subtitle: `COVID PATIENTS`,
  body: `${formatPercent(CAP_Y, 0)} of all beds`,
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
    capY={CAP_Y}
    zones={RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP}
    getTooltipContent={getTooltipContent}
    getPointText={getPointText}
  />
);

export default ChartRatioBedsWithCovidPatients;
