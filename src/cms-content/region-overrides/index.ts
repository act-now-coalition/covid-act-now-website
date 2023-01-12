import some from 'lodash/some';

import RegionOverrides from './region-overrides.json';
import { Markdown } from 'cms-content/utils';
import { Metric } from 'common/metricEnum';
import regions, { Region } from 'common/regions';
import find from 'lodash/find';

enum Include {
  Region = 'region',
  Subregions = 'subregions',
  RegionAndSubregions = 'region-and-subregions',
}

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
  const overrides = getOverridesForRegion(region);
  const overrideMetric = getOverrideMetricForMetric(metric);
  return find(
    overrides,
    o => o.metric === overrideMetric && !o.start_date && !o.end_date,
  );
}

/**
 * Looks for an applicable disclaimer for the given region + metric.
 */
export function getRegionMetricDisclaimer(
  region: Region,
  metric: Metric,
  onlyIncludeBlockedMetrics: boolean = false,
): string | undefined {
  // Get region overrides that are still in effect and have disclaimers.
  const overrideMetric = getOverrideMetricForMetric(metric);
  const overrides = getOverridesForRegion(region).filter(
    o =>
      o.metric === overrideMetric &&
      o.disclaimer &&
      !o.end_date &&
      (!onlyIncludeBlockedMetrics || o.blocked),
  );
  // If there are multiple possible disclaimers, prefer ones for blocking metrics, and ones with no start date.
  const override =
    find(overrides, o => o.blocked && !o.start_date) ??
    find(overrides, o => o.blocked) ??
    overrides[0];
  return override?.disclaimer;
}

/** Can be called from a test to validate properties for each override. */
export function validateOverrides() {
  for (const override of getOverrides()) {
    getRegionsFromOverride(override);
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

/**
 * Returns the string used to represent the given metric in the overrides file
 * (e.g. `metrics.caseDensity`)
 */
function getOverrideMetricForMetric(metric: Metric): string {
  switch (metric) {
    case Metric.WEEKLY_CASES_PER_100K:
    case Metric.CASE_DENSITY:
      return 'metrics.caseDensity';
    case Metric.CASE_GROWTH_RATE:
      return 'metrics.infectionRate';
    case Metric.ADMISSIONS_PER_100K:
    case Metric.HOSPITAL_USAGE:
    case Metric.RATIO_BEDS_WITH_COVID:
      return 'metrics.icuCapacityRatio';
    case Metric.POSITIVE_TESTS:
      return 'metrics.testPositivityRatio';
    case Metric.VACCINATIONS:
      // TODO: This metric name is mapped to the overrides CMS, so we will need to
      // update the CMS variable names to and update this if we want to update this metric name.
      return 'metrics.vaccinationsInitiatedRatio';
  }
}
