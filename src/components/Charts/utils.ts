import _ from 'lodash';
import Highcharts, { dateFormat } from 'highcharts';
import palette from '../../assets/theme/palette';
import { Zones } from '../../enums/zones';

const isValidPoint = (d: Highcharts.Point): boolean =>
  _.isFinite(d.x) && _.isFinite(d.y);

const last = (list: any[]) => list[list.length - 1];

export const lastValidPoint = (data: Highcharts.Point[]) =>
  last(data.filter(isValidPoint));

export const formatDecimal = (num: number, places = 2): string =>
  num.toFixed(places);

export const formatPercent = (num: number): string =>
  `${formatDecimal(100 * num, 1)} %`;

/** Adds comma's for thousands, millions, etc. */
export const formatInteger = (num: number): string => num.toLocaleString();

export const parseDate = (date: Date): number => new Date(date).valueOf();

export const titleCase = (str: string) => _.startCase(_.toLower(str));

export const getYAxisLimits = (zone: Zones): number[] => [
  zone.LOW.lowerLimit,
  zone.HIGH.upperLimit,
];

export const currentValueAnnotation = (
  x: number,
  y: number,
  text: string,
  zones: Zones,
): Highcharts.AnnotationsOptions => {
  // Adjusts the position of the label if is too close to the x-axis
  const lowHeight = zones.LOW.upperLimit - zones.LOW.lowerLimit;
  const yOffset = y < zones.LOW.lowerLimit + 0.2 * lowHeight ? -5 : -15;
  return {
    draggable: '',
    labelOptions: {
      backgroundColor: palette.white,
    },
    labels: [
      {
        align: 'left',
        // @ts-ignore - Bug in Highchart types
        verticalAlign: 'center',
        // x and y are the offset of the label relative to the point (px)
        x: 10,
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
        className: `ZoneAnnotation ZoneAnnotation--CurrentValue`,
      },
    ],
  };
};

export const getTickPositions = (
  minY: number,
  maxY: number,
  zones: Zone[],
): (number | undefined)[] =>
  zones
    .map(zone => zone.value)
    .filter(val => !_.isUndefined(val))
    .concat([minY, maxY])
    .sort();

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
    gridLineDashStyle: 'Dash',
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
): Highcharts.AnnotationsLabelOptions[] =>
  zones.map((zone: Zone, i: number) => {
    const fromValue = i === 0 ? minYAxis : zones[i - 1].value || 0;
    const toValue = zone.value || maxYAxis;
    const isActive = fromValue <= value && value < toValue;
    const activeClassName = isActive ? 'ZoneAnnotation--isActive' : '';
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
    };
  });

export const zoneAnnotations = (
  endDate: Date,
  minYAxis: number,
  maxYAxis: number,
  value: number,
  zones: Zone[],
) => [
  {
    draggable: '',
    labelOptions: {
      backgroundColor: palette.white,
    },
    labels: getZoneLabels(endDate, minYAxis, maxYAxis, value, zones),
  },
];
