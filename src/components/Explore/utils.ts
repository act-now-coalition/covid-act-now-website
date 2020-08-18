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
  const maxValue = _max(series.map(serie => _max(serie.data.map(getValue))));
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

const sortedExploreMetrics = [
  ExploreMetric.CASES,
  ExploreMetric.DEATHS,
  ExploreMetric.HOSPITALIZATIONS,
  ExploreMetric.ICU_HOSPITALIZATIONS,
];

interface SerieDescription {
  label: string;
  datasetId: DatasetId;
  type: ChartType;
}

interface ExploreMetricDescription {
  title: string;
  series: SerieDescription[];
}

export const exploreMetricData: {
  [metric in ExploreMetric]: ExploreMetricDescription;
} = {
  [ExploreMetric.CASES]: {
    title: 'Cases',
    series: [
      {
        label: 'Cases',
        datasetId: 'rawDailyCases',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        datasetId: 'smoothedDailyCases',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.DEATHS]: {
    title: 'Deaths',
    series: [
      {
        label: 'Deaths',
        datasetId: 'rawDailyDeaths',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        datasetId: 'smoothedDailyDeaths',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.HOSPITALIZATIONS]: {
    title: 'Hospitalizations',
    series: [
      {
        label: 'Hospitalizations',
        datasetId: 'rawHospitalizations',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        datasetId: 'smoothedHospitalizations',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.ICU_HOSPITALIZATIONS]: {
    title: 'ICU Hospitalizations',
    series: [
      {
        label: 'ICU Hospitalizations',
        datasetId: 'rawICUHospitalizations',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
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
  }));
}

export function getMetricLabels() {
  return sortedExploreMetrics.map(metric => exploreMetricData[metric].title);
}
