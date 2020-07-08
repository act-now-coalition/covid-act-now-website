import _ from 'lodash';
import moment from 'moment';
import { LevelInfoMap, Level, LevelInfo } from 'common/level';

export const last = (list: any[]) => list[list.length - 1];

export const roundAxisLimits = (axisMin: number, axisMax: number) => [
  axisMin,
  _.ceil(axisMax, 2),
];

export const getTruncationDate = (date: Date, truncationDays: number) =>
  moment(date).subtract(truncationDays, 'days').toDate();

export const randomizeId = (name: string): string =>
  `${name}-${Math.random().toFixed(9)}`;

export interface Region {
  valueFrom: number;
  valueTo: number;
  name: string;
  color: string;
}

const isNotEmpty = (region: Region) =>
  Math.abs(region.valueFrom - region.valueTo) > 1e-3;

export const getChartRegions = (
  minY: number,
  maxY: number,
  zones: LevelInfoMap,
): Region[] => {
  const regions = [
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
      valueTo: maxY,
      name: zones[Level.CRITICAL].name,
      color: zones[Level.CRITICAL].color,
    },
  ];

  return regions.filter(isNotEmpty);
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

  return zones[Level.CRITICAL];
};

export const computeTickPositions = (
  minY: number,
  maxY: number,
  zones: LevelInfoMap,
) => {
  const maxZones = zones[Level.HIGH].upperLimit;
  const maxTick = maxY < maxZones ? 1.5 * maxZones : maxY;
  return [
    minY,
    zones[Level.LOW].upperLimit,
    zones[Level.MEDIUM].upperLimit,
    zones[Level.HIGH].upperLimit,
    maxTick,
  ];
};

export const getAxisLimits = (
  minY: number,
  maxY: number,
  zones: LevelInfoMap,
) => {
  const tickPositions = computeTickPositions(minY, maxY, zones);
  const minTickPosition = _.min(tickPositions) || minY;
  const maxTickPosition = _.max(tickPositions) || maxY;
  return roundAxisLimits(minTickPosition, maxTickPosition);
};
