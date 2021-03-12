import React from 'react';
import { Region, MetroArea, County } from 'common/regions';
import { Annotations, Sources } from 'api/schema/RegionSummaryWithTimeseries';
import ExternalLink from 'components/ExternalLink';
import { getMetricName } from 'common/metric';
import { Metric } from 'common/metricEnum';

/**
 * Hardcoding sources as fallback (metricToSourceMap) for the time being
 * until we have full API coverage.
 *
 * Todo (chelsi): delete fallback code when API coverage is complete.
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
        'https://healthdata.gov/dataset/COVID-19-Diagnostic-Laboratory-Testing-PCR-Testing/j8mb-icvb',
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
        'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh',
    },
    metro: {
      sourceName: 'HHS Protect',
      url:
        'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/anag-cw7u',
    },
    county: {
      sourceName: 'HHS Protect',
      url:
        'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/anag-cw7u',
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

export function getSourcesForMetric(
  annotations: Annotations,
  metric: Metric,
): Sources | undefined {
  switch (metric) {
    case Metric.CASE_DENSITY:
      return annotations.caseDensity?.sources;
    case Metric.CASE_GROWTH_RATE:
      return annotations.infectionRate?.sources;
    case Metric.POSITIVE_TESTS:
      return annotations.testPositivityRatio?.sources;
    case Metric.HOSPITAL_USAGE:
      return annotations.icuCapacityRatio?.sources;
    case Metric.VACCINATIONS:
      return annotations.vaccinationsInitiated?.sources;
  }
}
