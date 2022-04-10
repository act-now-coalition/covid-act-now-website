import { Metric } from 'common/metricEnum';
import { Region } from 'common/regions';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { ExploreMetric } from 'components/Explore';
import {
  exploreMetricToFooterContentMap,
  MetricModalContent,
} from 'components/Dialogs';
import { Projections } from 'common/models/Projections';
import { formatValue } from 'common/metric';
import { ValueInfo } from 'components/Charts/Groupings';

export function getOverrideDisclaimer(
  region: Region,
  metric: Metric,
  provenance: Sources | undefined,
): string | undefined {
  return getRegionMetricOverride(region, metric)?.disclaimer;
}

export function getAddedMetricStatusText(
  metric: ExploreMetric,
  valueInfo: ValueInfo,
  region: Region,
  projections: Projections,
) {
  // For county-level hospital data we display copy for the default disaggregated county data as well as
  // HSA level data. We need to plug in custom copy and re-aggregate the HSA data from the estimated county data.
  if (
    projections.isCounty &&
    [
      ExploreMetric.ICU_HOSPITALIZATIONS,
      ExploreMetric.HOSPITALIZATIONS,
    ].includes(metric)
  ) {
    const hsaFormattedValue = formattedHsaHospitalValue(metric, projections);
    return `Over the last week, the ${projections.primary.hsaName} health service area has reported having ${hsaFormattedValue} ${exploreMetricToFooterContentMap[metric].statusTextMeasure}, for an estimated ${valueInfo.formattedValue} coming from ${region.shortName}.`;
  }

  return `Over the last week, ${region.shortName} has averaged ${valueInfo.formattedValue} ${exploreMetricToFooterContentMap[metric].statusTextMeasure}.`;
}

export interface DialogProps {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  modalContent: MetricModalContent;
  modalHeader: string;
}

function formattedHsaHospitalValue(
  metric: ExploreMetric,
  projections: Projections,
) {
  let hsaValue;
  if (metric === ExploreMetric.ICU_HOSPITALIZATIONS) {
    hsaValue = projections.primary.currentHsaIcuInfo.currentUsageCovid;
  } else if (metric === ExploreMetric.HOSPITALIZATIONS) {
    hsaValue = projections.primary.currentHsaIcuInfo.currentUsageCovid;
  } else {
    fail('Unexpected HSA level metric.');
  }

  return formatValue(Metric.ADMISSIONS_PER_100K, hsaValue, 'no data');
}
