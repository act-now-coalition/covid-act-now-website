import { isUndefined as _isUndefined } from 'lodash';
import { Zones } from '../../enums/zones';

const randInt = (a: number, b: number): number =>
  Math.round(a + (b - a) * Math.random());

export const randomizeId = (name: string): string =>
  `${randInt(100, 999)}-${name}`;

export const calculateYTicks = (
  minY: number,
  maxY: number,
  zones: Zones,
): number[] => [minY, zones.LOW.upperLimit, zones.MEDIUM.upperLimit, maxY];

export const last = (list: any[]) => list[list.length - 1];

export const formatDecimal = (num: number, places = 2): string =>
  num.toFixed(places);

export const formatPercent = (num: number, places = 0): string =>
  `${formatDecimal(100 * num, places)}%`;

/** Adds comma's for thousands, millions, etc. */
export const formatInteger = (num: number): string => num.toLocaleString();

export const isDefined = (d: any): boolean => !_isUndefined(d);

// TODO(@pnavarrc) - define types for the elements
export const computeZoneRegions = (
  minY: number,
  maxY: number,
  zones: Zones,
) => [
  {
    valueFrom: minY,
    valueTo: zones.LOW.upperLimit,
    name: zones.LOW.name,
    color: zones.LOW.color,
  },
  {
    valueFrom: zones.LOW.upperLimit,
    valueTo: zones.MEDIUM.upperLimit,
    name: zones.MEDIUM.name,
    color: zones.MEDIUM.color,
  },
  {
    valueFrom: zones.MEDIUM.upperLimit,
    valueTo: maxY,
    name: zones.HIGH.name,
    color: zones.HIGH.color,
  },
];
