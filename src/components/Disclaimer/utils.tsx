import React from 'react';
import { Region, MetroArea, County } from 'common/regions';
import ExternalLink from 'components/ExternalLink';
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

export const getDataSourceTooltipContent = (metric: Metric, region: Region) => {
  const source = getSourceLinks(metric, region);

  return (
    <>
      Our data for {region.name} comes from{' '}
      <ExternalLink href={source.url}>{source.sourceName}</ExternalLink>.
    </>
  );
};
