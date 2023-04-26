import React from 'react';
import { Projections } from 'common/models/Projections';
import { Projection, Column } from 'common/models/Projection';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUCapacityUsed,
  ChartVaccinations,
  ChartCaseDensity,
  ChartWeeklyNewCasesPer100k,
  ChartAdmissionsPer100k,
  ChartRatioBedsWithCovidPatients,
} from 'components/Charts';
import { Metric } from 'common/metricEnum';
import { SeriesType, Series } from 'components/Explore/interfaces';
import { VACCINATIONS_COLOR_MAP } from 'common/colors';
import { EmptyPanel } from 'components/Charts/Charts.style';
import { getMetricStatusText } from 'common/metric';
import { ScreenshotReady } from 'components/Screenshot';
import { MarkdownContent } from 'components/Markdown';
import { useChartHeightForBreakpoint } from 'common/hooks';
import {
  getRegionMetricDisclaimer,
  getRegionMetricOverride,
} from 'cms-content/region-overrides';
import { getDataset, isEmpty } from 'common/models/ProjectionsPair';

// TODO(michael): Rename to `Chart` once we get rid of existing (highcharts) Chart component.
// TODO(michael): Update ChartsHolder to use this component instead of the individual chart components.

const MetricChart = React.memo(
  ({
    metric,
    height,
    projections,
  }: {
    metric: Metric;
    projections: Projections;
    height?: number;
  }) => {
    const chartHeight = height ? height : useChartHeightForBreakpoint();
    const isBlocked = getRegionMetricOverride(projections.region, metric)
      ?.blocked;
    const timeseries = getDataset(projections.primary, metric);
    const timeseriesEmpty = isEmpty(timeseries);

    if (isBlocked || timeseriesEmpty) {
      // See if the blocked or missing data has a disclaimer.
      const blockedDisclaimer = getRegionMetricDisclaimer(
        projections.region,
        metric,
        /*onlyIncludeBlockedMetrics=*/ true,
      );
      return (
        <EmptyPanel $height={chartHeight}>
          <p>
            {blockedDisclaimer ? (
              <MarkdownContent>{blockedDisclaimer}</MarkdownContent>
            ) : (
              getMetricStatusText(metric, projections)
            )}
          </p>
          <ScreenshotReady />
        </EmptyPanel>
      );
    }
    const projection = projections.primary;
    return (
      <>
        {metric === Metric.CASE_GROWTH_RATE && (
          <ChartRt
            height={chartHeight}
            columnData={projection.getDataset('rtRange')}
          />
        )}
        {metric === Metric.CASE_DENSITY && (
          <ChartCaseDensity
            height={chartHeight}
            columnData={projection.getDataset('caseDensityRange')}
          />
        )}
        {metric === Metric.POSITIVE_TESTS && (
          <ChartPositiveTestRate
            height={chartHeight}
            columnData={projection.getDataset('testPositiveRate')}
          />
        )}
        {metric === Metric.HOSPITAL_USAGE && (
          <ChartICUCapacityUsed
            height={chartHeight}
            columnData={projection.getDataset('icuUtilization')}
          />
        )}
        {metric === Metric.VACCINATIONS && (
          <ChartVaccinations
            height={chartHeight}
            seriesList={getVaccinationSeries(projection)}
          />
        )}
        {metric === Metric.WEEKLY_CASES_PER_100K && (
          <ChartWeeklyNewCasesPer100k
            height={chartHeight}
            columnData={projection.getDataset('weeklyNewCasesPer100k')}
          />
        )}
        {metric === Metric.RATIO_BEDS_WITH_COVID && (
          <ChartRatioBedsWithCovidPatients
            height={chartHeight}
            columnData={projection.getDataset('bedsWithCovidPatientsRatio')}
          />
        )}
        {metric === Metric.ADMISSIONS_PER_100K && (
          <ChartAdmissionsPer100k
            height={chartHeight}
            columnData={projection.getDataset('weeklyCovidAdmissionsPer100k')}
          />
        )}
      </>
    );
  },
);

export default MetricChart;

function getVaccinationSeries(projection: Projection): Series[] {
  return [
    {
      type: SeriesType.LINE,
      data: filterNull(projection.getDataset('vaccinationsInitiated')),
      label: '1+ Dose',
      shortLabel: '1+ Dose',
      tooltipLabel: '1+ Dose',
      params: {
        stroke: VACCINATIONS_COLOR_MAP.INITIATED,
        fill: VACCINATIONS_COLOR_MAP.INITIATED,
      },
    },
    {
      type: SeriesType.LINE,
      data: filterNull(projection.getDataset('vaccinationsCompleted')),
      label: '2+ Doses or J&J',
      shortLabel: '2+ Doses',
      tooltipLabel: '2+ Doses',
      params: {
        stroke: VACCINATIONS_COLOR_MAP.COMPLETED,
        fill: VACCINATIONS_COLOR_MAP.COMPLETED,
      },
    },
    {
      type: SeriesType.LINE,
      data: filterNull(projection.getDataset('vaccinationsAdditionalDose')),
      label: 'Booster Dose',
      shortLabel: 'Booster Dose',
      tooltipLabel: 'Booster Dose',
      params: {
        stroke: VACCINATIONS_COLOR_MAP.ADDITIONAL_DOSE,
        fill: VACCINATIONS_COLOR_MAP.ADDITIONAL_DOSE,
      },
    },
    {
      type: SeriesType.LINE,
      data: filterNull(
        projection.getDataset('vaccinationsBivalentBoostedFall2022'),
      ),
      label: 'Bivalent Dose',
      shortLabel: 'Bivalent Dose',
      tooltipLabel: 'Bivalent Dose',
      params: {
        stroke: VACCINATIONS_COLOR_MAP.BIVALENT_FALL_2022,
        fill: VACCINATIONS_COLOR_MAP.BIVALENT_FALL_2022,
      },
    },
  ].filter(series => series.data.length > 0);
}

function filterNull(points: Column[]) {
  return points.filter(p => p.y !== null);
}
