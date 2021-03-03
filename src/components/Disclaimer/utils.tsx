import React from 'react';
import { Region, MetroArea, County } from 'common/regions';
import { Annotations, Sources } from 'api/schema/RegionSummaryWithTimeseries';
import ExternalLink from 'components/ExternalLink';
import { getMetricName } from 'common/metric';
import { Metric } from 'common/metricEnum';

/**
 * Hardcoding the sources for the time being
 * until we start getting it from the backend.
 */

interface SourceInfo {
  sourceName: string;
  url: string;
}

interface Regions {
  state: SourceInfo;
  county: SourceInfo;
  metro: SourceInfo;
}

type RegionSourceMap = {
  [key in Metric]: Regions;
};

const metricToSourceMap: RegionSourceMap = {
  [Metric.CASE_DENSITY]: {
    state: {
      sourceName: 'The New York Times',
      url: 'https://github.com/nytimes/covid-19-data',
    },
    metro: {
      sourceName: 'The New York Times',
      url: 'https://github.com/nytimes/covid-19-data',
    },
    county: {
      sourceName: 'The New York Times',
      url: 'https://github.com/nytimes/covid-19-data',
    },
  },
  [Metric.CASE_GROWTH_RATE]: {
    state: {
      sourceName: 'The New York Times!',
      url: 'https://github.com/nytimes/covid-19-data',
    },
    metro: {
      sourceName: 'The New York Times',
      url: 'https://github.com/nytimes/covid-19-data',
    },
    county: {
      sourceName: 'The New York Times',
      url: 'https://github.com/nytimes/covid-19-data',
    },
  },
  [Metric.POSITIVE_TESTS]: {
    state: {
      sourceName: 'HHS Protect',
      url:
        'https://healthdata.gov/dataset/covid-19-diagnostic-laboratory-testing-pcr-testing-time-series',
    },
    metro: {
      sourceName: 'CDC Covid Tracker',
      url: 'https://covid.cdc.gov/covid-data-tracker/#county-view',
    },
    county: {
      sourceName: 'CDC Covid Tracker',
      url: 'https://covid.cdc.gov/covid-data-tracker/#county-view',
    },
  },
  [Metric.HOSPITAL_USAGE]: {
    state: {
      sourceName: 'HHS Protect',
      url:
        'https://healthdata.gov/dataset/covid-19-reported-patient-impact-and-hospital-capacity-state',
    },
    metro: {
      sourceName: 'HHS Protect',
      url:
        'https://healthdata.gov/dataset/covid-19-reported-patient-impact-and-hospital-capacity-facility',
    },
    county: {
      sourceName: 'HHS Protect',
      url:
        'https://healthdata.gov/dataset/covid-19-reported-patient-impact-and-hospital-capacity-facility',
    },
  },
  [Metric.VACCINATIONS]: {
    state: {
      sourceName: 'CDC Covid Tracker',
      url: 'https://covid.cdc.gov/covid-data-tracker/#vaccinations',
    },
    // these do not render:
    metro: {
      sourceName: 'n/a',
      url: 'n/a',
    },
    county: {
      sourceName: 'n/a',
      url: 'n/a',
    },
  },
};

export function getSourceLinks(metric: Metric, region: Region): SourceInfo {
  const metricSources: Regions = metricToSourceMap[metric];

  const source: SourceInfo =
    region instanceof MetroArea
      ? metricSources.metro
      : region instanceof County
      ? metricSources.county
      : metricSources.state;

  return source;
}

function getDisclaimerMetricName(metric: Metric): string {
  if (metric === Metric.VACCINATIONS) {
    return 'percent vaccinated';
  } else if (metric === Metric.HOSPITAL_USAGE) {
    return getMetricName(metric);
  } else {
    return getMetricName(metric).toLowerCase();
  }
}

export const getDataSourceTooltipContent = (
  metric: Metric,
  region: Region,
  provenanceInfo?: Sources,
) => {
  const sourceFromMap = getSourceLinks(metric, region);

  const source =
    provenanceInfo && provenanceInfo[0].url && provenanceInfo[0].name
      ? {
          url: provenanceInfo[0].url,
          name: provenanceInfo[0].name,
        }
      : {
          url: sourceFromMap.url,
          name: sourceFromMap.sourceName,
        };

  return (
    <>
      Our data for {getDisclaimerMetricName(metric)} in {region.name} comes from{' '}
      <ExternalLink href={source.url}>{source.name}</ExternalLink>.
    </>
  );
};

export function getSourcesForMetric(annotations: any, metric: Metric) {
  switch (metric) {
    case Metric.CASE_DENSITY:
      return annotations.caseDensity.sources;
    case Metric.CASE_GROWTH_RATE:
      return annotations.infectionRate.sources;
    case Metric.POSITIVE_TESTS:
      return annotations.testPositiveRate.sources;
    case Metric.HOSPITAL_USAGE:
      return annotations.icuCapacityRatio.sources;
    case Metric.VACCINATIONS:
      return annotations.caseDensity.sources;
  }
}

export type MetricToProvenance = { [metric in Metric]: Sources | undefined };

export function makeMetricToProvenanceMap(
  annotations: Annotations,
): MetricToProvenance {
  return {
    [Metric.CASE_DENSITY]: annotations.caseDensity?.sources,
    [Metric.CASE_GROWTH_RATE]: annotations.infectionRate?.sources,
    [Metric.POSITIVE_TESTS]: annotations.testPositivityRatio?.sources,
    [Metric.HOSPITAL_USAGE]: annotations.icuCapacityRatio?.sources,
    [Metric.VACCINATIONS]: annotations.caseDensity?.sources,
  };
}
