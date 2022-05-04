import { Region } from 'common/regions';
import { ExploreMetric } from 'components/Explore';
import {
  exploreMetricToFooterContentMap,
  MetricModalContent,
} from 'components/Dialogs';
import { Projections } from 'common/models/Projections';
import { formatDecimal } from 'common/utils';

export function getAddedMetricStatusText(
  metric: ExploreMetric,
  value: string,
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
    const hsaFormattedValue = formattedHsaCovidUsage(metric, projections);
    return `Over the last week, the ${projections.primary.hsaName} Health Service Area has averaged ${hsaFormattedValue} ${exploreMetricToFooterContentMap[metric].statusTextMeasure}, for an estimated ${value} patients from ${region.shortName}.`;
  }

  return `Over the last week, ${region.shortName} has averaged ${value} ${exploreMetricToFooterContentMap[metric].statusTextMeasure}.`;
}

export interface DialogProps {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  modalContent: MetricModalContent;
  modalHeader: string;
}

function formattedHsaCovidUsage(
  metric: ExploreMetric,
  projections: Projections,
) {
  /* Grab and format the corresponding HSA-level hospital metric data. */
  let hsaValue;
  if (metric === ExploreMetric.ICU_HOSPITALIZATIONS) {
    hsaValue = projections.primary.currentHsaIcuInfo.currentUsageCovid;
  } else if (metric === ExploreMetric.HOSPITALIZATIONS) {
    hsaValue = projections.primary.currentHsaHospitalInfo.currentUsageCovid;
  } else {
    fail('Unexpected HSA level metric.');
  }

  return hsaValue ? formatDecimal(hsaValue, 1) : '-';
}
