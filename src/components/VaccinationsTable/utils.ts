import regions, { Region } from 'common/regions';
import orderBy from 'lodash/orderBy';
import dropWhile from 'lodash/dropWhile';
import isNull from 'lodash/isNull';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import { LocationSummariesByFIPS } from 'common/location_summaries';
import { MapView } from 'screens/HomePage/HomePage';
import { Metric } from 'common/metricEnum';

function getRegionsSortedByVaccinationsInitiated(regionScope: MapView): any[] {
  const regionsToSort =
    regionScope === MapView.COUNTIES ? regions.counties : regions.states;

  const regionsWithVaccinationMetrics = regionsToSort.map((region: Region) => {
    const summaryForFips = LocationSummariesByFIPS[region.fipsCode];
    return {
      regionName: region.name,
      vaccinationsInitiated:
        summaryForFips?.metrics[Metric.VACCINATIONS]?.value ?? null,
      vaccinationsCompleted: summaryForFips?.vc ?? null,
    };
  });

  const sortedByVaccinationsInitiated = orderBy(
    regionsWithVaccinationMetrics,
    region => region.vaccinationsInitiated,
    'desc',
  );

  const sortedNoNulls = dropWhile(
    sortedByVaccinationsInitiated,
    region =>
      isNull(region.vaccinationsInitiated) ||
      isNull(region.vaccinationsCompleted),
  );

  const sortedWithRank = sortedNoNulls.map((regionInfo, i: number) => ({
    rank: i + 1,
    ...regionInfo,
  }));

  return sortedWithRank;
}

export function getHighestRankingRegions(
  amount: number,
  mapView: MapView,
): any[] {
  const sortedRegions = getRegionsSortedByVaccinationsInitiated(mapView);
  console.log('take(sortedRegions, amount)', take(sortedRegions, amount));
  return take(sortedRegions, amount);
}

export function getLowestRankingRegions(
  amount: number,
  mapView: MapView,
): any[] {
  const sortedRegions = getRegionsSortedByVaccinationsInitiated(mapView);
  return takeRight(sortedRegions, amount);
}
