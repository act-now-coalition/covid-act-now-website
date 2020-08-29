import React from 'react';
import { HOSPITAL_USAGE_LEVEL_INFO_MAP } from 'common/metrics/hospitalizations';
import { Column } from 'common/models/Projection';
import ChartZones from './ChartZones';
import { formatPercent } from 'common/utils';

const CAP_Y = 1;

const getPointText = (valueY: number) => formatPercent(valueY, 0);

const getTooltipContent = (valueY: number) =>
  valueY > CAP_Y
    ? {
        subtitle: `ICU headroom used >`,
        body: `${getPointText(CAP_Y)}`,
        width: 'auto',
      }
    : {
        subtitle: `ICU headroom used`,
        body: `${getPointText(valueY)}`,
        width: 'auto',
      };

const ChartICUHeadroom = ({
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
    zones={HOSPITAL_USAGE_LEVEL_INFO_MAP}
    getTooltipContent={getTooltipContent}
    getPointText={getPointText}
  />
);

export default ChartICUHeadroom;
