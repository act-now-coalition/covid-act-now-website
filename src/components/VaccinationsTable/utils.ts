import regions, { Region } from 'common/regions';
import orderBy from 'lodash/orderBy';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import { MapView } from 'screens/HomePage/HomePage';
import { LocationSummariesByFIPS } from 'common/location_summaries';
import { Metric } from 'common/metricEnum';

export interface RegionVaccinationInfo {
  regionName: string;
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
  rank: number;
  url: string;
}

function getRegionsSortedByVaccinationsInitiated(
  regionScope: MapView,
): RegionVaccinationInfo[] {
  const regionsToSort =
    regionScope === MapView.COUNTIES ? regions.counties : regions.states;

  const regionsWithVaccinationMetrics = regionsToSort.map((region: Region) => {
    const summaryForFips = LocationSummariesByFIPS[region.fipsCode];
    return {
      regionName: region.name,
      vaccinationsInitiated:
        summaryForFips?.metrics[Metric.VACCINATIONS]?.value ?? null,
      vaccinationsCompleted: summaryForFips?.vc ?? null,
      url: region.canonicalUrl,
    };
  });

  const sortedByVaccinationsInitiated = orderBy(
    regionsWithVaccinationMetrics,
    region => region.vaccinationsInitiated,
    'desc',
  );

  const sortedNoNulls = sortedByVaccinationsInitiated.filter(
    region =>
      Number.isFinite(region.vaccinationsInitiated) &&
      Number.isFinite(region.vaccinationsCompleted),
  );

  const sortedWithRank = sortedNoNulls.map((regionInfo, i: number) => ({
    rank: i + 1,
    regionName: regionInfo.regionName,
    vaccinationsInitiated: regionInfo.vaccinationsInitiated as number,
    vaccinationsCompleted: regionInfo.vaccinationsCompleted as number,
    url: regionInfo.url,
  }));

  return sortedWithRank;
}

export function getHighestRankingRegions(
  amount: number,
  mapView: MapView,
): RegionVaccinationInfo[] {
  const sortedRegions = getRegionsSortedByVaccinationsInitiated(mapView);
  return take(sortedRegions, amount);
}

export function getLowestRankingRegions(
  amount: number,
  mapView: MapView,
): RegionVaccinationInfo[] {
  const sortedRegions = getRegionsSortedByVaccinationsInitiated(mapView);
  return takeRight(sortedRegions, amount);
}
