import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { formatMetatagDate, formatPercent } from 'common/utils';
import { Region, State, County, MetroArea } from 'common/regions';
import { replace } from 'lodash';
import { LocationSummariesByFIPS } from 'common/location_summaries';
import { Metric } from 'common/metricEnum';

function locationName(region: Region) {
  if (region instanceof State) {
    return `${region.name} (${region.stateCode})`;
  } else if (region instanceof County) {
    return `${region.fullName} (${region.state.stateCode})`;
  } else if (region instanceof MetroArea) {
    return replace(region.name, /-/g, ', ');
  } else {
    return region.fullName;
  }
}

export function getPageTitle(region: Region): string {
  return `${locationName(region)} - COVID Data & Key Metrics`;
}

export function getPageDescription(region: Region): string {
  const date = formatMetatagDate();
  const { level: alarmLevel, metrics } = LocationSummariesByFIPS[
    region.fipsCode
  ];
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const vaccinationRatio = metrics[Metric.VACCINATIONS]?.value;
  const vaccinationText = vaccinationRatio
    ? ` and ${formatPercent(
        vaccinationRatio,
        1,
      )} of the population has received at least one vaccine dose`
    : '';
  return `${date}: ${locationName(
    region,
  )} is at ${levelInfo.name.toLowerCase()} COVID risk level${vaccinationText}.`;
}
