import moment from 'moment';
import {
  baseOptions,
  currentValueAnnotation,
  formatDecimal,
  formatPercent,
  getMaxY,
  getTickPositions,
  getYAxisLimits,
  lastValidPoint,
  parseDate,
  titleCase,
  zoneAnnotations,
} from './utils';
import {
  CASE_GROWTH_RATE,
  HOSPITAL_USAGE,
  POSITIVE_TESTS,
  Level,
} from '../../enums/zones';
import { RT_TRUNCATION_DAYS } from '../../models/Projection';

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
  const zones = ZONES_RT;
  const [minY, maxY] = [0, getMaxY(data)];
  const [minYAxis, maxYAxis] = getYAxisLimits(minY, maxY, zones);

  // Split the Rt data in two sets, recent data and previous data so we can
  // dot the line for most recent dates. They overlap to minimize the gap
  // between the series.
  const dateRecent = moment().subtract(RT_TRUNCATION_DAYS, 'days').toDate();
  const prevData = data.filter(d => d.x <= dateRecent);
  const { x, y } = lastValidPoint(prevData);
  return {
    ...baseOptions,
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(endDate),
    },
    yAxis: {
      ...baseOptions.yAxis,
      tickPositions: getTickPositions(minYAxis, maxYAxis, zones),
    },
    series: [
      {
        className: 'ZoneChart__AreaRange',
        type: 'arearange',
        zIndex: 0,
        enableMouseTracking: false,
        data: data.map(d => [d.x, d.low, d.hi]),
      },
      {
        name: 'Rt',
        type: 'spline',
        zones,
        data: data,
        enableMouseTracking: false,
        dashStyle: 'Dot',
      },
      {
        name: 'Rt',
        type: 'spline',
        zones,
        data: prevData,
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `Rt ${formatDecimal(this.y)}`;
      },
    },
    annotations: [
      currentValueAnnotation(x, y, y && formatDecimal(y), -15, -40),
      {
        draggable: '',
        shapes: [
          {
            draggable: '',
            type: 'circle',
            point: {
              xAxis: 0,
              yAxis: 0,
              x,
              y,
            },
            r: 5,
          },
        ],
      },
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, ZONES_RT),
    ],
  };
};

export const optionsPositiveTests = (data, endDate) => {
  const zones = ZONES_POSITIVE_RATE;
  const { x, y } = lastValidPoint(data);
  const [minY, maxY] = [0, getMaxY(data)];
  const [minYAxis, maxYAxis] = getYAxisLimits(minY, maxY, zones);

  // sets the limit on the y-axis to be no more than 40%
  const CAP = 0.4;
  const adjustedMaxYAxis = Math.min(maxYAxis, CAP);
  data = data.map(({ x, y }) => ({ x, y: y && Math.min(y, CAP) }));

  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, y && formatPercent(y, 1)),
      ...zoneAnnotations(endDate, minYAxis, adjustedMaxYAxis, y, zones),
    ],
    series: [
      {
        name: 'Positive Tests',
        data,
        zones,
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `Positive Tests ${
          this.y === CAP ? `> ${formatPercent(CAP)}` : formatPercent(this.y)
        }`;
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
      tickPositions: getTickPositions(minYAxis, adjustedMaxYAxis, zones),
    },
  };
};

export const optionsHospitalUsage = (data, endDate) => {
  const { x, y } = lastValidPoint(data);
  const zones = ZONES_HOSPITAL_USAGE;
  const [minY, maxY] = [0, getMaxY(data)];
  const [minYAxis, maxYAxis] = getYAxisLimits(minY, maxY, zones);
  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, y && formatPercent(y)),
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, zones),
    ],
    tooltip: {
      pointFormatter: function () {
        return `ICU headroom used ${formatPercent(this.y)}`;
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
      tickPositions: getTickPositions(minYAxis, maxYAxis, zones),
    },
    series: [
      {
        name: 'ICU headroom used',
        data,
        zones,
      },
    ],
  };
};

export { parseDate };
