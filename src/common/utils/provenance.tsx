import React from 'react';
import { Region, MetroArea, County } from 'common/regions';
import { Annotations, Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getMetricName } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { anchorStyles } from 'components/Markdown';
import styled from 'styled-components';

const ProvenanceText = styled.p`
  ${anchorStyles};
`;

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
  state: SourceInfo[];
  county: SourceInfo[];
  metro: SourceInfo[];
}

type RegionSourceMap = {
  [key in Metric]: Regions;
};

const metricToSourceMap: RegionSourceMap = {
  [Metric.CASE_DENSITY]: {
    state: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
    ],
    metro: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
    ],
    county: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
    ],
  },
  [Metric.CASE_GROWTH_RATE]: {
    state: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
    ],
    metro: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
    ],
    county: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
    ],
  },
  [Metric.POSITIVE_TESTS]: {
    state: [
      {
        sourceName: 'HHS Protect',
        url:
          'https://healthdata.gov/dataset/COVID-19-Diagnostic-Laboratory-Testing-PCR-Testing/j8mb-icvb',
      },
    ],
    metro: [
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/#county-view',
      },
    ],
    county: [
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/#county-view',
      },
    ],
  },
  [Metric.HOSPITAL_USAGE]: {
    state: [
      {
        sourceName: 'HHS Protect',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh',
      },
    ],
    metro: [
      {
        sourceName: 'HHS Protect',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/anag-cw7u',
      },
    ],
    county: [
      {
        sourceName: 'HHS Protect',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/anag-cw7u',
      },
    ],
  },
  [Metric.VACCINATIONS]: {
    state: [
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/#vaccinations',
      },
    ],
    // these do not render:
    metro: [
      {
        sourceName: 'n/a',
        url: 'n/a',
      },
    ],
    county: [
      {
        sourceName: 'n/a',
        url: 'n/a',
      },
    ],
  },
  [Metric.WEEKLY_CASES_PER_100K]: {
    state: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/#county-view',
      },
    ],
    metro: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/#county-view',
      },
    ],
    county: [
      {
        sourceName: 'The New York Times',
        url: 'https://github.com/nytimes/covid-19-data',
      },
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/#county-view',
      },
    ],
  },
  [Metric.ADMISSIONS_PER_100K]: {
    state: [
      {
        sourceName: 'The Department of Health and Human Services',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh/',
      },
    ],
    metro: [
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/',
      },
      {
        sourceName: 'The Department of Health and Human Services',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh',
      },
    ],
    county: [
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/',
      },
      {
        sourceName: 'The Department of Health and Human Services',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh',
      },
    ],
  },
  [Metric.RATIO_BEDS_WITH_COVID]: {
    state: [
      {
        sourceName: 'The Department of Health and Human Services',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh/',
      },
    ],
    metro: [
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/',
      },
      {
        sourceName: 'The Department of Health and Human Services',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh',
      },
    ],
    county: [
      {
        sourceName: 'CDC COVID Data Tracker',
        url: 'https://covid.cdc.gov/covid-data-tracker/',
      },
      {
        sourceName: 'The Department of Health and Human Services',
        url:
          'https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh',
      },
    ],
  },
};

export function getSourceLinks(metric: Metric, region: Region): SourceInfo[] {
  const metricSources: Regions = metricToSourceMap[metric];

  const source: SourceInfo[] =
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
    const metricName = getMetricName(metric);
    // Note: hacky way to lowercase metric name but make sure COVID is always uppercase
    return metricName.charAt(0).toLowerCase() + metricName.slice(1);
  }
}

// When implementing new footers/modals, change fragment to <p> and ExternalLink to TextButton
export const getDataSourceTooltipContent = (
  metric: Metric,
  region: Region,
  provenanceInfo?: Sources,
): React.ReactElement => {
  const sourceFromMap = getSourceLinks(metric, region);

  const sources =
    provenanceInfo && provenanceInfo[0].url && provenanceInfo[0].name
      ? [
          {
            url: provenanceInfo[0].url,
            sourceName: provenanceInfo[0].name,
          },
        ]
      : sourceFromMap;

  const [firstSource, ...additionalSources] = sources;

  return (
    <ProvenanceText>
      Our data for {getDisclaimerMetricName(metric)} in {region.name} comes from{' '}
      <a href={firstSource.url}>{firstSource.sourceName}</a>
      {additionalSources &&
        additionalSources.map(source => (
          <>
            {' '}
            and <a href={source.url}>{source.sourceName}</a>
          </>
        ))}
      .
    </ProvenanceText>
  );
};

// TODO(8.2) : annotations for new metrics
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
      // TODO(michael): Ideally the backend would be more consistent about where it sticks sources.
      const provenance =
        annotations.vaccinationsInitiated ||
        annotations.vaccinationsInitiatedRatio ||
        annotations.vaccinationsCompleted ||
        annotations.vaccinationsCompletedRatio;
      return provenance?.sources;
  }
}
