import some from 'lodash/some';

import RegionOverrides from './region-overrides.json';
import { Markdown } from 'cms-content/utils';
import { Metric } from 'common/metricEnum';
import regions, { Region } from 'common/regions';
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
  region: string; // comma-separated list of state codes and FIPS
  context: string;
  blocked: boolean;
  start_date?: string;
  end_date?: string;
  disclaimer?: Markdown;
}

/**
 * Looks for an override (without start / end dates) applied to the specified
 * region + metric and returns it.
 */
export function getRegionMetricOverride(
  region: Region,
  metric: Metric,
): RegionOverride | undefined {
  for (const override of getOverridesForRegion(region)) {
    if (
      metric === getMetricForOverride(override) &&
      !override.start_date &&
      !override.end_date
    ) {
      return override;
    }
  }
  return undefined;
}

/** Can be called from a test to validate properties for each override. */
export function validateOverrides() {
  for (const override of getOverrides()) {
    getRegionsFromOverride(override);
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
  const overrideRegions = getRegionsFromOverride(override);
  const includeSelf =
    override.include === Include.Region ||
    override.include === Include.RegionAndSubregions;
  const includeSubregions =
    override.include === Include.Subregions ||
    override.include === Include.RegionAndSubregions;
  if (includeSelf && overrideRegions.includes(region)) {
    return true;
  } else if (includeSubregions) {
    return some(
      overrideRegions.map((overrideRegion: Region) =>
        overrideRegion.contains(region),
      ),
    );
  }
  return false;
}

/** Parses the string "region" out of the specified override and returns it as a Region class. */
function getRegionsFromOverride(override: RegionOverride): Region[] {
  const regionStrings = override.region.split(',').map(region => region.trim());
  const overrideRegions = regionStrings.map((r: string) => {
    if (/^[A-Z][A-Z]$/.test(r)) {
      return regions.findByStateCodeStrict(r);
    } else {
      return regions.findByFipsCodeStrict(r);
    }
  });
  return overrideRegions;
}

function getMetricForOverride(override: RegionOverride): Metric {
  const metric = metricIdToMetric[override.metric];
  assert(metric !== undefined, 'Invalid metricId: ' + override.metric);
  return metric;
}
