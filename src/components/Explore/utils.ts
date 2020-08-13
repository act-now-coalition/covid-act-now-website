import { max as _max } from 'lodash';
import { Column } from 'common/models/Projection';
import { Series } from './interfaces';
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
        label: 'smoothed',
        datasetId: 'smoothedDailyCases',
        type: ChartType.LINE,
      },
      {
        label: 'raw',
        datasetId: 'rawDailyCases',
        type: ChartType.BAR,
      },
    ],
  },
  [ExploreMetric.DEATHS]: {
    title: 'Deaths',
    series: [
      {
        label: 'smoothed',
        datasetId: 'smoothedDailyDeaths',
        type: ChartType.LINE,
      },
      {
        label: 'raw',
        datasetId: 'rawDailyDeaths',
        type: ChartType.BAR,
      },
    ],
  },
  [ExploreMetric.HOSPITALIZATIONS]: {
    title: 'Hospitalizations',
    series: [
      {
        label: 'smoothed',
        datasetId: 'smoothedHospitalizations',
        type: ChartType.LINE,
      },
      {
        label: 'raw',
        datasetId: 'rawHospitalizations',
        type: ChartType.BAR,
      },
    ],
  },
  [ExploreMetric.ICU_HOSPITALIZATIONS]: {
    title: 'ICU Hospitalizations',
    series: [
      {
        label: 'smoothed',
        datasetId: 'smoothedICUHospitalizations',
        type: ChartType.LINE,
      },
      {
        label: 'raw',
        datasetId: 'rawICUHospitalizations',
        type: ChartType.BAR,
      },
    ],
  },
};

export function getSeries(metric: ExploreMetric, projection: Projection) {
  const metricDefinition = exploreMetricData[metric];
  return metricDefinition.series.map(item => ({
    data: projection.getDataset(item.datasetId),
    type: item.type,
  }));
}

export function getMetricLabels() {
  return sortedExploreMetrics.map(metric => exploreMetricData[metric].title);
}
