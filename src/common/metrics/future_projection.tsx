import { formatUtcDate } from 'common/utils';
import { Projection } from 'common/models/Projection';

export const METRIC_NAME = 'Future hospitalization projections';

export function generateChartDescription(
  projection: Projection,
  noInterventionProjection: Projection,
) {
  // TODO(sgoldblatt): figure out how to get people number data from projection
  if (projection.dateOverwhelmed) {
    if (projection.dateOverwhelmed < new Date()) {
      return `Our projections suggest hospitals in ${projection.locationName} are overloaded.`;
    }
    return `Assuming current trends and interventions continue, ${
      projection.locationName
    } hospitals are projected to become overloaded on ${formatUtcDate(
      projection.dateOverwhelmed,
    )}. Exercise caution.`;
  } else {
    const noInterventionDate = noInterventionProjection.dateOverwhelmed;
    const restrictionsLiftedText = noInterventionDate
      ? `However, any reopening should happen in a slow and phased fashion. If all restrictions were completely lifted today, hospitals would overload on ${formatUtcDate(
          noInterventionDate,
        )}.`
      : `However, any reopening should happen in a slow and phased fashion.`;

    return (
      `Assuming current trends and interventions continue, ${projection.locationName} hospitals are unlikely to become overloaded in the next 30 days. ` +
      `${restrictionsLiftedText}`
    );
  }
}
