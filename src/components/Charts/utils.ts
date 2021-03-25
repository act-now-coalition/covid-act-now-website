import range from 'lodash/range';
import ceil from 'lodash/ceil';
import min from 'lodash/min';
import max from 'lodash/max';
import { scaleUtc } from '@vx/scale';
import { LevelInfoMap, Level, LevelInfo } from 'common/level';
import {
  DateFormat,
  formatDateTime,
  TimeUnit,
  addTime,
  subtractTime,
  formatUTCDateTime,
  getStartOf,
  getTimeDiff,
} from 'common/utils/time-utils';
import { Column } from 'common/models/Projection';

export const last = (list: any[]) => list[list.length - 1];

export const roundAxisLimits = (axisMin: number, axisMax: number) => [
  axisMin,
  ceil(axisMax, 2),
];

export const getTruncationDate = (date: Date, truncationDays: number) =>
  subtractTime(date, truncationDays, TimeUnit.DAYS);

export const randomizeId = (name: string): string =>
  `${name}-${Math.random().toFixed(9)}`;

export interface Region {
  valueFrom: number;
  valueTo: number;
  name: string;
  color: string;
}

// NOTE: valueFrom and valueTo could be Infinity and then the 1e-3 check doesn't work.
const isNotEmpty = (region: Region) =>
  region.valueFrom !== region.valueTo &&
  Math.abs(region.valueFrom - region.valueTo) > 1e-3;

export const getChartRegions = (
  minY: number,
  maxY: number,
  zones: LevelInfoMap,
): Region[] => {
  let regions = [
    {
      valueFrom: minY,
      valueTo: zones[Level.LOW].upperLimit,
      name: zones[Level.LOW].name,
      color: zones[Level.LOW].color,
    },
    {
      valueFrom: zones[Level.LOW].upperLimit,
      valueTo: zones[Level.MEDIUM].upperLimit,
      name: zones[Level.MEDIUM].name,
      color: zones[Level.MEDIUM].color,
    },
    {
      valueFrom: zones[Level.MEDIUM].upperLimit,
      valueTo: zones[Level.HIGH].upperLimit,
      name: zones[Level.HIGH].name,
      color: zones[Level.HIGH].color,
    },
    {
      valueFrom: zones[Level.HIGH].upperLimit,
      valueTo: zones[Level.CRITICAL].upperLimit,
      name: zones[Level.CRITICAL].name,
      color: zones[Level.CRITICAL].color,
    },
    ...(includeSuperCritical(maxY, zones)
      ? [
          {
            valueFrom: zones[Level.CRITICAL].upperLimit,
            valueTo: zones[Level.SUPER_CRITICAL].upperLimit,
            name: zones[Level.SUPER_CRITICAL].name,
            color: zones[Level.SUPER_CRITICAL].color,
          },
        ]
      : []),
  ];

  // Remove empty regions (not all metrics use all Levels) and then cap the last
  // one to maxY.
  regions = regions.filter(isNotEmpty);
  regions[regions.length - 1].valueTo = maxY;
  return regions;
};

const isBetween = (zoneLow: LevelInfo, zoneHigh: LevelInfo, value: number) =>
  zoneLow.upperLimit <= value && value < zoneHigh.upperLimit;

export const getZoneByValue = (value: number, zones: LevelInfoMap) => {
  if (value < zones[Level.LOW].upperLimit) {
    return zones[Level.LOW];
  }

  if (isBetween(zones[Level.LOW], zones[Level.MEDIUM], value)) {
    return zones[Level.MEDIUM];
  }

  if (isBetween(zones[Level.MEDIUM], zones[Level.HIGH], value)) {
    return zones[Level.HIGH];
  }

  if (isBetween(zones[Level.HIGH], zones[Level.CRITICAL], value)) {
    return zones[Level.CRITICAL];
  }

  return zones[Level.SUPER_CRITICAL];
};

export const computeTickPositions = (
  minY: number,
  maxY: number,
  zones: LevelInfoMap,
) => {
  const maxZones = includeSuperCritical(maxY, zones)
    ? zones[Level.CRITICAL].upperLimit
    : zones[Level.HIGH].upperLimit;
  const maxTick = maxY < 1.2 * maxZones ? 1.2 * maxZones : maxY;
  return [
    minY,
    zones[Level.LOW].upperLimit,
    zones[Level.MEDIUM].upperLimit,
    zones[Level.HIGH].upperLimit,
    ...(includeSuperCritical(maxY, zones)
      ? [zones[Level.CRITICAL].upperLimit]
      : []),
    maxTick,
  ];
};

// We only include the SUPER_CRITICAL zone (which starts at
// zones[Level.CRITICAL].upperLimit) if necessary.
const includeSuperCritical = (maxY: number, zones: LevelInfoMap) =>
  maxY >= zones[Level.CRITICAL].upperLimit;

export const getAxisLimits = (
  minY: number,
  maxY: number,
  zones: LevelInfoMap,
) => {
  const tickPositions = computeTickPositions(minY, maxY, zones);
  const minTickPosition = min(tickPositions) || minY;
  const maxTickPosition = max(tickPositions) || maxY;
  return roundAxisLimits(minTickPosition, maxTickPosition);
};

/**
 * Creates a UTC time scale using the given parameters and adjusts it
 * to make the labels fit without overlapping the data.
 *
 * Used to scale data and x-ticks
 */
export const getUtcScale = (
  dateFrom: Date,
  dateTo: Date,
  minX: number,
  maxX: number,
  zoneLabelsWidth = 15,
) => {
  const dateScale = scaleUtc({
    domain: [dateFrom, dateTo],
    range: [minX, maxX - zoneLabelsWidth],
  });

  const endDate = dateScale.invert(maxX);
  dateScale.domain([dateFrom, endDate]).range([0, maxX]);

  return dateScale;
};

export const getXTickFormat = (date: Date) => {
  // Shows the year if the tick is in January (0) or December (11)
  const dateFormat =
    date.getMonth() === 0 || date.getMonth() === 11
      ? DateFormat.MMM_YY
      : DateFormat.MMM;
  return formatDateTime(date, dateFormat).replace(' ', " '");
};

/**
 * For mobile, we only show every other month
 */
function getMobileDateTicks(tickValues: Date[]): Date[] {
  return tickValues.filter((value: Date, i: number) => i % 2 === 0);
}

export function getFinalTicks(isMobile: boolean, ticks: Date[]): Date[] {
  if (isMobile) {
    return getMobileDateTicks(ticks);
  }
  return ticks;
}

export function getTimeAxisTicks(from: Date, to: Date) {
  const dateFrom = getStartOf(from, TimeUnit.MONTHS);
  const numMonths = getTimeDiff(to, dateFrom, TimeUnit.MONTHS);
  return range(1, numMonths + 1).map((i: number) =>
    addTime(dateFrom, i, TimeUnit.MONTHS),
  );
}

export function getColumnDate({ x }: Column): Date {
  return new Date(x);
}

export function formatTooltipColumnDate(data: Column): string {
  return formatUTCDateTime(getColumnDate(data), DateFormat.MMM_D_YYYY);
}
