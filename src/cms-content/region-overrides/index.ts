import RegionOverrides from './region-overrides.json';
import { Markdown } from 'cms-content/utils';
import { Metric } from 'common/metricEnum';
import regions from 'common/regions/region_db';
import { Region } from 'common/regions';
import { assert } from 'common/utils';

enum Include {
  Region = 'region',
  Subregions = 'subregions',
  RegionAndSubregions = 'region-and-subregions',
}

const metricIdToMetric: { [metricId: string]: Metric } = {
  'metrics.caseDensity': Metric.CASE_DENSITY,
  'metrics.infectionRate': Metric.CASE_GROWTH_RATE,
  'metrics.testPositivityRatio': Metric.POSITIVE_TESTS,
  'metrics.icuCapacityRatio': Metric.HOSPITAL_USAGE,
  'metrics.vaccinationsInitiatedRatio': Metric.VACCINATIONS,
};

interface RegionOverride {
  include: Include;
  metric: string;
  region: string;
  context: string;
  blocked: boolean;
  disclaimer?: Markdown;
}

/** Looks for any override applied to the specified region + metric and returns it. */
export function getRegionMetricOverride(
  region: Region,
  metric: Metric,
): RegionOverride | undefined {
  for (const override of getOverridesForRegion(region)) {
    if (metric === getMetricForOverride(override)) {
      return override;
    }
  }
  return undefined;
}

/** Can be called from a test to validate properties for each override. */
export function validateOverrides() {
  for (const override of getOverrides()) {
    getRegionFromOverride(override);
    getMetricForOverride(override);
  }
}

/** Looks for any overrides applied to the specified region and returns them. */
function getOverridesForRegion(region: Region): RegionOverride[] {
  const result: RegionOverride[] = [];
  for (const override of getOverrides()) {
    if (overrideAppliesToRegion(override, region)) {
      result.push(override);
    }
  }
  return result;
}

function getOverrides(): RegionOverride[] {
  return RegionOverrides.overrides as RegionOverride[];
}

/** Checks if the specified override applies to the specified region. */
function overrideAppliesToRegion(override: RegionOverride, region: Region) {
  const overrideRegion = getRegionFromOverride(override);
  const includeSelf =
    override.include === Include.Region ||
    override.include === Include.RegionAndSubregions;
  const includeSubregions =
    override.include === Include.Subregions ||
    override.include === Include.RegionAndSubregions;
  if (includeSelf && region === overrideRegion) {
    return true;
  } else if (includeSubregions) {
    return overrideRegion.contains(region);
  }
  return false;
}

/** Parses the string "region" out of the specified override and returns it as a Region class. */
function getRegionFromOverride(override: RegionOverride): Region {
  if (/^[A-Z][A-Z]$/.test(override.region)) {
    return regions.findByStateCodeStrict(override.region);
  } else {
    return regions.findByFipsCodeStrict(override.region);
  }
}

function getMetricForOverride(override: RegionOverride): Metric {
  const metric = metricIdToMetric[override.metric];
  assert(metric !== undefined, 'Invalid metricId: ' + override.metric);
  return metric;
}
