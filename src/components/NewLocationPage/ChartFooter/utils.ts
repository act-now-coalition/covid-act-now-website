import { Metric } from 'common/metricEnum';
import { County, Region } from 'common/regions';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';

export function getOverrideDisclaimer(
  region: Region,
  metric: Metric,
  provenance: Sources | undefined,
): string | undefined {
  // Preface with any region override disclaimer text.
  let overrideDisclaimer = getRegionMetricOverride(region, metric)?.disclaimer;

  if (
    !overrideDisclaimer &&
    region instanceof County &&
    metric === Metric.VACCINATIONS &&
    provenance?.[0]?.url?.includes('cdc.gov')
  ) {
    // CDC doesn't have first dose data so we must be estimating it.
    overrideDisclaimer = `Note that data for ${region.name} is sourced from the CDC
      which only provides data on fully-vaccinated people and therefore the "1+
      dose" data above is approximated using the fully-vaccinated data and a
      state-wide average ratio.`;
  }

  return overrideDisclaimer;
}
