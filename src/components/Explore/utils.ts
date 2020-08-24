import moment from 'moment';
import { max as _max, range as _range } from 'lodash';
import { Series } from './interfaces';
import { Column } from 'common/models/Projection';
import { Projection, DatasetId } from 'common/models/Projection';
import { ChartType } from './interfaces';

export function getMaxBy<T>(
  series: Series[],
  getValue: (d: Column) => T,
  defaultValue: T,
): T {
  const maxValue = _max(series.map(({ data }) => _max(data.map(getValue))));
  return maxValue || defaultValue;
}

export function getTimeAxisTicks(from: Date, to: Date) {
  const dateFrom = moment(from).startOf('month').toDate();
  const numMonths = moment(to).diff(dateFrom, 'months');
  return _range(1, numMonths + 1).map(i =>
    moment(dateFrom).add(i, 'month').toDate(),
  );
}

export enum ExploreMetric {
  CASES,
  DEATHS,
  HOSPITALIZATIONS,
  ICU_HOSPITALIZATIONS,
}

export const EXPLORE_METRICS = [
  ExploreMetric.CASES,
  ExploreMetric.DEATHS,
  ExploreMetric.HOSPITALIZATIONS,
  ExploreMetric.ICU_HOSPITALIZATIONS,
];

export function getMetricByChartId(chartId: string): ExploreMetric | undefined {
  switch (chartId) {
    case 'cases':
      return ExploreMetric.CASES;
    case 'deaths':
      return ExploreMetric.DEATHS;
    case 'hospitalizations':
      return ExploreMetric.HOSPITALIZATIONS;
    case 'icu-hospitalizations':
      return ExploreMetric.ICU_HOSPITALIZATIONS;
  }
}

interface SerieDescription {
  label: string;
  tooltipLabel: string;
  datasetId: DatasetId;
  type: ChartType;
}

interface ExploreMetricDescription {
  title: string;
  chartId: string;
  series: SerieDescription[];
}

export const exploreMetricData: {
  [metric in ExploreMetric]: ExploreMetricDescription;
} = {
  [ExploreMetric.CASES]: {
    title: 'Cases',
    chartId: 'cases',
    series: [
      {
        label: 'Cases',
        tooltipLabel: 'Confirmed cases',
        datasetId: 'rawDailyCases',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'Confirmed cases',
        datasetId: 'smoothedDailyCases',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.DEATHS]: {
    title: 'Deaths',
    chartId: 'deaths',
    series: [
      {
        label: 'Deaths',
        tooltipLabel: 'Deaths',
        datasetId: 'rawDailyDeaths',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'Deaths',
        datasetId: 'smoothedDailyDeaths',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.HOSPITALIZATIONS]: {
    title: 'Hospitalizations',
    chartId: 'hospitalizations',
    series: [
      {
        label: 'Hospitalizations',
        tooltipLabel: 'Hospitalizations',
        datasetId: 'rawHospitalizations',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'Hospitalizations',
        datasetId: 'smoothedHospitalizations',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.ICU_HOSPITALIZATIONS]: {
    title: 'ICU Hospitalizations',
    chartId: 'icu-hospitalizations',
    series: [
      {
        label: 'ICU Hospitalizations',
        tooltipLabel: 'ICU Hospitalizations',
        datasetId: 'rawICUHospitalizations',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'ICU Hospitalizations',
        datasetId: 'smoothedICUHospitalizations',
        type: ChartType.LINE,
      },
    ],
  },
};

export function getSeries(
  metric: ExploreMetric,
  projection: Projection,
): Series[] {
  const metricDefinition = exploreMetricData[metric];
  return metricDefinition.series.map(item => ({
    data: projection.getDataset(item.datasetId),
    type: item.type,
    label: item.label,
    tooltipLabel: item.tooltipLabel,
  }));
}

export function getTitle(metric: ExploreMetric) {
  return exploreMetricData[metric].title;
}

export function getChartIdByMetric(metric: ExploreMetric) {
  return exploreMetricData[metric].chartId;
}

export function getMetricLabels() {
  return EXPLORE_METRICS.map(metric => exploreMetricData[metric].title);
}

export function findPointByDate(data: Column[], date: Date): Column | null {
  const idx = data.findIndex(
    p => new Date(p.x).toDateString() === date.toDateString(),
  );
  return idx >= 0 ? data[idx] : null;
}
