import moment from 'moment';
import {
  baseOptions,
  currentValueAnnotation,
  getMaxY,
  getTickPositions,
  getYAxisLimits,
  lastValidPoint,
  parseDate,
  zoneAnnotations,
} from './utils';
import { CASE_GROWTH_RATE_LEVEL_INFO_MAP } from 'common/metrics/case_growth';
import { POSITIVE_TESTS_LEVEL_INFO_MAP } from 'common/metrics/positive_rate';
import { HOSPITAL_USAGE_LEVEL_INFO_MAP } from 'common/metrics/hospitalizations';
import { CONTACT_TRACING_LEVEL_INFO_MAP } from 'common/metrics/contact_tracing';
import { Level } from '../../common/level';
import { RT_TRUNCATION_DAYS } from '../../common/models/Projection';
import { formatDecimal, formatPercent } from 'common/utils';
const CHART_END_DATE = moment().add(2, 'weeks').toDate();
const toHighchartZone = levelInfo => {
  return {
    color: levelInfo.color,
    name: levelInfo.name,
    value: isFinite(levelInfo.upperLimit) ? levelInfo.upperLimit : undefined,
    className: 'ZoneChart__Line',
    labelClassName: `ZoneAnnotation ZoneAnnotation--${levelInfo.level}`,
  };
};

const getHighchartZones = levelInfoMap => [
  toHighchartZone(levelInfoMap[Level.LOW]),
  toHighchartZone(levelInfoMap[Level.MEDIUM]),
  toHighchartZone(levelInfoMap[Level.HIGH]),
];

const ZONES_RT = getHighchartZones(CASE_GROWTH_RATE_LEVEL_INFO_MAP);
const ZONES_POSITIVE_RATE = getHighchartZones(POSITIVE_TESTS_LEVEL_INFO_MAP);
const ZONES_HOSPITAL_USAGE = getHighchartZones(HOSPITAL_USAGE_LEVEL_INFO_MAP);
const ZONES_CONTACT_TRACING = getHighchartZones(CONTACT_TRACING_LEVEL_INFO_MAP);

export const optionsRt = data => {
  const zones = ZONES_RT;
  const [minY, maxY] = [0, getMaxY(data)];
  const [minYAxis, maxYAxis] = getYAxisLimits(minY, maxY, zones);

  // Split the Rt data in two sets, recent data and previous data so we can
  // dot the line for most recent dates. They overlap to minimize the gap
  // between the series.
  const { x: lastValidDate } = lastValidPoint(data);
  const dateRecent = moment(lastValidDate)
    .subtract(RT_TRUNCATION_DAYS, 'days')
    .toDate();
  const prevData = data.filter(d => d.x <= dateRecent);
  const { x, y } = lastValidPoint(prevData);
  return {
    ...baseOptions,
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(CHART_END_DATE),
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
      ...zoneAnnotations(CHART_END_DATE, minYAxis, maxYAxis, y, ZONES_RT),
    ],
  };
};

export const optionsPositiveTests = data => {
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
      ...zoneAnnotations(CHART_END_DATE, minYAxis, adjustedMaxYAxis, y, zones),
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
      max: parseDate(CHART_END_DATE),
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

export const optionsHospitalUsage = data => {
  const { x, y } = lastValidPoint(data);
  const zones = ZONES_HOSPITAL_USAGE;
  const [minY, maxY] = [0, getMaxY(data)];
  const [minYAxis, maxYAxis] = getYAxisLimits(minY, maxY, zones);
  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, y && formatPercent(y)),
      ...zoneAnnotations(CHART_END_DATE, minYAxis, maxYAxis, y, zones),
    ],
    tooltip: {
      pointFormatter: function () {
        return `ICU headroom used ${formatPercent(this.y)}`;
      },
    },
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(CHART_END_DATE),
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

export const optionsContactTracing = data => {
  const { x, y } = lastValidPoint(data);
  const zones = ZONES_CONTACT_TRACING;
  const [minY, maxY] = [0, getMaxY(data)];
  const [minYAxis, maxYAxis] = getYAxisLimits(minY, maxY, zones);

  // sets the limit on the y-axis to be no more than 100%
  const CAP = 1;
  const adjustedMaxYAxis = Math.min(maxYAxis, CAP);
  data = data.map(({ x, y }) => ({ x, y: y && Math.min(y, CAP) }));

  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, y && formatPercent(y)),
      ...zoneAnnotations(
        CHART_END_DATE,
        minYAxis,
        adjustedMaxYAxis,
        y,
        zones,
        true,
      ),
    ],
    tooltip: {
      pointFormatter: function () {
        return `Contacts traced ${formatPercent(this.y)}`;
      },
    },
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(CHART_END_DATE),
    },
    yAxis: {
      ...baseOptions.yAxis,
      max: 0.5,
      labels: {
        formatter: function () {
          return formatPercent(this.value);
        },
      },
      tickPositions: getTickPositions(minYAxis, adjustedMaxYAxis, zones),
    },
    series: [
      {
        name: 'Contacts traced',
        data,
        zones,
      },
    ],
  };
};

export { parseDate };
