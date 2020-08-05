import React, { Fragment } from 'react';
import { formatUtcDate } from 'common/utils';
import { Projection } from 'common/models/Projection';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';

export const metricFutureProjection: MetricDefinition = {
  renderStatus,
};

export const METRIC_NAME = 'Future hospitalization projections';

export function renderStatus(projections: Projections) {
  const projection: Projection = projections.primary;
  const noInterventionProjection = projections.baseline;
  const { locationName } = projection;
  // TODO(sgoldblatt): figure out how to get people number data from projection
  if (projection.dateOverwhelmed) {
    if (projection.dateOverwhelmed < new Date()) {
      return (
        <Fragment>
          Our projections suggest hospitals in {locationName} are overloaded.
        </Fragment>
      );
    }
    return (
      <Fragment>
        Assuming current trends and interventions continue, {locationName}{' '}
        hospitals are projected to become overloaded on{' '}
        {formatUtcDate(projection.dateOverwhelmed)}. Exercise caution.
      </Fragment>
    );
  } else {
    const noInterventionDate = noInterventionProjection.dateOverwhelmed;
    const restrictionsLiftedText = noInterventionDate
      ? `However, any reopening should happen in a slow and phased fashion. If all restrictions were completely lifted today, hospitals would overload on ${formatUtcDate(
          noInterventionDate,
        )}.`
      : `However, any reopening should happen in a slow and phased fashion.`;

    return (
      <Fragment>
        Assuming current trends and interventions continue, {locationName}{' '}
        hospitals are unlikely to become overloaded in the next 30 days.{' '}
        {restrictionsLiftedText}
      </Fragment>
    );
  }
}
