import {
  baseOptions,
  currentValueAnnotation,
  formatDecimal,
  formatPercent,
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
  ChartType,
  ChartTypeToTitle,
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

export const optionsRt = (data, endDate) => {
  const chartType = ChartType.CASE_GROWTH_RATE;
  const zones = CASE_GROWTH_RATE;
  const highchartsZones = getHighchartZones(zones);
  const chartTitle = ChartTypeToTitle[chartType];
  const { x, y } = lastValidPoint(data);
  const [minYAxis, maxYAxis] = getYAxisLimits(zones);
  return {
    ...baseOptions,
    xAxis: {
      ...baseOptions.xAxis,
      max: parseDate(endDate),
    },
    yAxis: {
      ...baseOptions.yAxis,
      tickPositions: getTickPositions(minYAxis, maxYAxis, highchartsZones),
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
        name: `${chartTitle}`,
        type: 'spline',
        zones: highchartsZones,
        data,
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `${chartTitle} ${formatDecimal(this.y)}`;
      },
    },
    annotations: [
      currentValueAnnotation(x, y, y && formatDecimal(y), zones),
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, highchartsZones),
    ],
  };
};

export const optionsPositiveTests = (data, endDate) => {
  const chartType = ChartType.POSITIVE_TESTS;
  const zones = POSITIVE_TESTS;
  const highchartsZones = getHighchartZones(zones);
  const chartTitle = ChartTypeToTitle[chartType];
  const { x, y } = lastValidPoint(data);
  const [minYAxis, maxYAxis] = getYAxisLimits(zones);
  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, y && formatPercent(y), POSITIVE_TESTS),
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, highchartsZones),
    ],
    series: [
      {
        name: chartTitle,
        data,
        zones: highchartsZones,
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `${chartTitle} ${formatPercent(this.y)}`;
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
      tickPositions: getTickPositions(minYAxis, maxYAxis, highchartsZones),
    },
  };
};

export const optionsHospitalUsage = (data, endDate) => {
  const chartType = ChartType.HOSPITAL_USAGE;
  const zones = HOSPITAL_USAGE;
  const highchartsZones = getHighchartZones(zones);
  const chartTitle = ChartTypeToTitle[chartType];
  const { x, y } = lastValidPoint(data);
  const [minYAxis, maxYAxis] = getYAxisLimits(zones);
  return {
    ...baseOptions,
    annotations: [
      currentValueAnnotation(x, y, y && formatPercent(y), zones),
      ...zoneAnnotations(endDate, minYAxis, maxYAxis, y, highchartsZones),
    ],
    tooltip: {
      pointFormatter: function () {
        return `${chartTitle} ${formatPercent(this.y)}`;
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
      tickPositions: getTickPositions(minYAxis, maxYAxis, highchartsZones),
    },
    series: [
      {
        name: 'Hospital Usage',
        data,
        zones: highchartsZones,
      },
    ],
  };
};

export { parseDate };
