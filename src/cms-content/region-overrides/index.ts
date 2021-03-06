import RegionOverrides from './region-overrides.json';
import { Markdown } from 'cms-content/utils';
import { getMetricDefinition } from 'common/metric';
import { Metric } from 'common/metricEnum';
import regions, { County, MetroArea, Region, State } from 'common/regions';

type Include = 'region' | 'subregions' | 'region-and-subregions';

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
  const metricDefinition = getMetricDefinition(metric);
  for (const override of getOverridesForRegion(region)) {
    if (override.metric === metricDefinition.metricId) {
      return override;
    }
  }
  return undefined;
}

/** Looks for any overrides applied to the specified region and returns them. */
function getOverridesForRegion(region: Region): RegionOverride[] {
  const result: RegionOverride[] = [];
  for (const override of RegionOverrides.overrides as RegionOverride[]) {
    if (overrideAppliesToRegion(override, region)) {
      result.push(override);
    }
  }
  return result;
}

/** Checks if the specified override applies to the specified region. */
function overrideAppliesToRegion(override: RegionOverride, region: Region) {
  const overrideRegion = getRegionFromOverride(override);
  const includeSelf =
    override.include === 'region' ||
    override.include === 'region-and-subregions';
  const includeSubregions =
    override.include === 'subregions' ||
    override.include === 'region-and-subregions';
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
