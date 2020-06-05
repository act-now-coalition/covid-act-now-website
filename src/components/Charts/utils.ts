import _ from 'lodash';
import moment from 'moment';
import Highcharts, { dateFormat } from 'highcharts';
import palette from 'assets/theme/palette';
import { LevelInfoMap as Zones, Level, LevelInfo } from 'common/level';

const isValidPoint = (d: Highcharts.Point): boolean =>
  _.isFinite(d.x) && _.isFinite(d.y);

export const last = (list: any[]) => list[list.length - 1];

export const lastValidPoint = (data: Highcharts.Point[]) =>
  last(data.filter(isValidPoint));

export const parseDate = (date: Date): number => new Date(date).valueOf();

export const titleCase = (str: string) => _.startCase(_.toLower(str));

export const currentValueAnnotation = (
  x: number,
  y: number,
  text: string,
  xOffset = 12,
  yOffset = -16,
): Highcharts.AnnotationsOptions => ({
  draggable: '',
  labelOptions: {
    backgroundColor: palette.white,
  },
  labels: [
    {
      align: 'left',
      // @ts-ignore - Bug in Highchart types
      verticalAlign: 'center',
      x: xOffset,
      y: yOffset,
      shape: 'rect',
      point: {
        xAxis: 0,
        yAxis: 0,
        x,
        y,
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
      text,
      className: 'ZoneAnnotation ZoneAnnotation--CurrentValue',
    },
  ],
});

export const getTickPositions = (
  minY: number,
  maxY: number,
  zones: Zone[],
): (number | undefined)[] => {
  const zoneTicks = zones
    .map(zone => zone.value)
    .filter(val => !_.isUndefined(val));
  const maxZone = _.max(zoneTicks) || maxY;
  const maxYAxis = maxY < maxZone ? 1.5 * maxZone : maxY;
  return [minY, maxYAxis, ...zoneTicks].sort();
};

export const getYAxisLimits = (minY: number, maxY: number, zones: Zone[]) => {
  const tickPositions = getTickPositions(minY, maxY, zones);
  const minTickPosition = _.min(tickPositions) || minY;
  const maxTickPosition = _.max(tickPositions) || maxY;
  return roundAxisLimits(minTickPosition, maxTickPosition);
};

export const roundAxisLimits = (axisMin: number, axisMax: number) => [
  axisMin,
  _.ceil(axisMax, 2),
];

export const getMaxY = (data: Highcharts.Point[]) => _.max(data.map(d => d.y));

export const baseOptions: Highcharts.Options = {
  title: {
    text: undefined,
  },
  subtitle: {
    text: undefined,
  },
  plotOptions: {
    series: {
      animation: false,
      marker: {
        enabled: false,
        symbol: 'circle',
      },
    },
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    type: 'datetime',
    // @ts-ignore - Bug in Highchart types
    step: 7,
    labels: {
      useHTML: true,
      rotation: 0,
      formatter: function () {
        return dateFormat('%b %e', this.value);
      },
    },
  },
  yAxis: {
    title: {
      text: undefined,
    },
    labels: {
      useHTML: true,
      formatter: function () {
        return this.value === 0
          ? ''
          : this.axis.defaultLabelFormatter.call(this);
      },
    },
  },
};

const annotationZoneLabelBase: Highcharts.AnnotationsLabelOptions = {
  style: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  align: 'right',
  // @ts-ignore - Bug in Highchart types
  verticalAlign: 'center',
  x: 12,
  shape: 'rect',
};

interface Zone {
  className: string;
  color: string;
  labelClassName: string;
  name: string;
  value?: number;
}

const getZoneLabels = (
  endDate: Date,
  minYAxis: number,
  maxYAxis: number,
  value: number,
  zones: Zone[],
  flippedOrder?: boolean, // ie, high is good, low is bad
): Highcharts.AnnotationsLabelOptions[] =>
  zones.map((zone: Zone, i: number) => {
    const fromValue = i === 0 ? minYAxis : zones[i - 1].value || 0;
    const toValue = zone.value || maxYAxis;
    const isActive = fromValue <= value && value < toValue;
    let activeClassName = '';

    if (isActive && flippedOrder) {
      activeClassName = 'ZoneAnnotation--isActive--flippedOrder';
    } else if (isActive) {
      activeClassName = 'ZoneAnnotation--isActive';
    }

    return {
      ...annotationZoneLabelBase,
      style: {
        ...annotationZoneLabelBase.style,
        color: isActive ? palette.secondary.contrastText : zone.color,
      },
      point: {
        xAxis: 0,
        yAxis: 0,
        x: parseDate(endDate),
        y: (fromValue + toValue) / 2,
      },
      text: zone.name,
      className: `${zone.labelClassName} ${activeClassName}`,
      allowOverlap: false,
    };
  });

export const zoneAnnotations = (
  endDate: Date,
  minYAxis: number,
  maxYAxis: number,
  value: number,
  zones: Zone[],
  flippedOrder?: boolean,
) => [
  {
    draggable: '',
    labelOptions: {
      backgroundColor: palette.white,
    },
    labels: getZoneLabels(
      endDate,
      minYAxis,
      maxYAxis,
      value,
      zones,
      flippedOrder || false,
    ),
  },
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

export const getChartRegions = (
  minY: number,
  maxY: number,
  zones: Zones,
): Region[] => [
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
    valueTo: zones[Level.MEDIUM_HIGH].upperLimit,
    name: zones[Level.MEDIUM_HIGH].name,
    color: zones[Level.MEDIUM_HIGH].color,
  },
  {
    valueFrom: zones[Level.MEDIUM_HIGH].upperLimit,
    valueTo: maxY,
    name: zones[Level.HIGH].name,
    color: zones[Level.HIGH].color,
  },
];

const isBetween = (zoneLow: LevelInfo, zoneHigh: LevelInfo, value: number) =>
  zoneLow.upperLimit <= value && value < zoneHigh.upperLimit;

export const getZoneByValue = (value: number, zones: Zones) => {
  if (value < zones[Level.LOW].upperLimit) {
    return zones[Level.LOW];
  }

  if (isBetween(zones[Level.LOW], zones[Level.MEDIUM], value)) {
    return zones[Level.MEDIUM];
  }

  if (isBetween(zones[Level.MEDIUM], zones[Level.MEDIUM_HIGH], value)) {
    return zones[Level.MEDIUM_HIGH];
  }

  return zones[Level.HIGH];
};

export const computeTickPositions = (
  minY: number,
  maxY: number,
  zones: Zones,
) => {
  const maxZones = zones[Level.MEDIUM_HIGH].upperLimit;
  const maxTick = maxY < maxZones ? 1.5 * maxZones : maxY;
  return [
    minY,
    zones[Level.LOW].upperLimit,
    zones[Level.MEDIUM].upperLimit,
    zones[Level.MEDIUM_HIGH].upperLimit,
    maxTick,
  ];
};

export const getAxisLimits = (minY: number, maxY: number, zones: Zones) => {
  const tickPositions = computeTickPositions(minY, maxY, zones);
  const minTickPosition = _.min(tickPositions) || minY;
  const maxTickPosition = _.max(tickPositions) || maxY;
  return roundAxisLimits(minTickPosition, maxTickPosition);
};
