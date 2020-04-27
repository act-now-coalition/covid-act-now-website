import {
  baseOptions,
  formatDecimal,
  formatPercent,
  getMaxY,
  getTickPositions,
  last,
  currentValueAnnotation,
  parseDate,
  roundAxisLimits,
  titleCase,
  zoneAnnotations,
} from './utils';
import {
  CASE_GROWTH_RATE,
  HOSPITAL_USAGE,
  POSITIVE_TESTS,
  Level,
} from '../../enums/zones';

const toHighchartZone = (zone, level) => ({
  color: zone.color,
  name: zone.name,
  value: isFinite(zone.upperLimit) ? zone.upperLimit : undefined,
  className: 'ZoneChart__Line',
  labelClassName: `ZoneAnnotation ZoneAnnotation--${titleCase(level)}`,
});

const getHighchartZones = zone => [
  toHighchartZone(zone.LOW, Level.LOW),
  toHighchartZone(zone.MEDIUM, Level.MEDIUM),
  toHighchartZone(zone.HIGH, Level.HIGH),
];

const ZONES_RT = getHighchartZones(CASE_GROWTH_RATE);
const ZONES_POSITIVE_RATE = getHighchartZones(POSITIVE_TESTS);
const ZONES_HOSPITAL_USAGE = getHighchartZones(HOSPITAL_USAGE);

export const optionsRt = (data, endDate) => {
  const { x, y } = last(data);
  const [minYAxis, maxYAxis] = roundAxisLimits(0, getMaxY(data));
  return {
    ...baseOptions,
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(endDate),
    },
    yAxis: {
      ...baseOptions.yAxis,
      tickPositions: getTickPositions(minYAxis, maxYAxis, ZONES_RT),
    },
    series: [
      {
        className: 'ZoneChart__AreaRange',
        type: 'arearange',
        fillColor: '#efefef',
        zIndex: 0,
        enableMouseTracking: false,
        data: data.map(d => [d.x, d.low, d.hi]),
      },
      {
        name: 'Rt',
        type: 'spline',
        zones: ZONES_RT,
        data,
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `Rt ${formatDecimal(this.y)}`;
      },
    },
    annotations: [
      currentValueAnnotation(x, y, formatDecimal(y)),
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, ZONES_RT),
    ],
  };
};

export const optionsPositiveTests = (data, endDate) => {
  const { x, y } = last(data);
  const [minYAxis, maxYAxis] = roundAxisLimits(0, getMaxY(data));
  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, formatPercent(y)),
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, ZONES_POSITIVE_RATE),
    ],
    series: [
      {
        name: 'Positive Tests',
        data,
        zones: ZONES_POSITIVE_RATE,
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `Positive Tests ${formatPercent(this.y)}`;
      },
    },
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(endDate),
    },
    yAxis: {
      ...baseOptions.yAxis,
      labels: {
        formatter: function () {
          return formatPercent(this.value);
        },
      },
      tickPositions: getTickPositions(minYAxis, maxYAxis, ZONES_POSITIVE_RATE),
    },
  };
};

export const optionsHospitalUsage = (data, endDate) => {
  const { x, y } = last(data);
  const [minYAxis, maxYAxis] = roundAxisLimits(0, getMaxY(data));
  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, formatPercent(y)),
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, ZONES_HOSPITAL_USAGE),
    ],
    tooltip: {
      pointFormatter: function () {
        return `Hospital Usage ${formatPercent(this.y)}`;
      },
    },
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(endDate),
    },
    yAxis: {
      ...baseOptions.yAxis,
      labels: {
        formatter: function () {
          return formatPercent(this.value);
        },
      },
      tickPositions: getTickPositions(minYAxis, maxYAxis, ZONES_HOSPITAL_USAGE),
    },
    series: [
      {
        name: 'Hospital Usage',
        data,
        zones: ZONES_HOSPITAL_USAGE,
      },
    ],
  };
};

export { parseDate };
