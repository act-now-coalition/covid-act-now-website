import React, { useState } from 'react';
import { STATES } from 'common';
import { formatDecimal, formatPercent } from 'components/Charts/utils';
import { Metric } from 'common/metric';
import { formatDate } from 'common/utils';

export default function makeChartShareQuote(
  stateId,
  county,
  stats = {},
  chartType,
  projections,
) {
  const stateName = STATES[stateId];
  const countyName = county && county.county;
  const displayName = countyName ? `${countyName}, ${stateName}` : stateName;

  if (chartType === Metric.CASE_GROWTH_RATE) {
    return `${displayName}’s infection growth rate is ${formatDecimal(
      stats[0],
    )}, according to @CovidActNow. See the chart: `;
  } else if (chartType === Metric.POSITIVE_TESTS) {
    return `${formatPercent(
      stats[1],
      1,
    )} of people tested for COVID in ${displayName} tested positive, according to @CovidActNow. See the chart: `;
  } else if (chartType === Metric.HOSPITAL_USAGE) {
    return `${displayName}'s ICUs are ${formatPercent(
      stats[2],
    )} full with COVID patients, according to @CovidActNow. See the chart: `;
  } else if (chartType === Metric.CONTACT_TRACING) {
    return `${displayName} is only tracking ${formatPercent(
      stats[3],
      0,
    )} of COVID cases, according to @CovidActNow. See the chart: `;
  } else if (chartType === 'hospitalizationProjections') {
    if (projections && projections.baseline.dateOverwhelmed) {
      return `If all restrictions were completely lifted today, ${displayName}'s hospitals would overload on ${formatDate(
        projections.baseline.dateOverwhelmed,
      )}. See the chart: `;
    }
    return `Assuming current trends and interventions continue, ${displayName}'s hospitals are unlikely to become overloaded in the next 3 months. See the chart: `;
  }
  return `${displayName}'s COVID risk from @CovidActNow, check it out: `;
}
