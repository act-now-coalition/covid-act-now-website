import React from 'react';
import { CcviLevel, getCcviLevel } from './index';
import { formatPercent } from 'common/utils';
import { Region, State, County } from 'common/regions';

export function renderRegionDescription(
  overallScore: number,
  region: Region,
  percentPopulationVulnerable?: number,
): React.ReactElement {
  if (region instanceof State) {
    return renderStateDescription(overallScore, percentPopulationVulnerable);
  } else if (region instanceof County) {
    return renderCountyOrMetroDescription(overallScore, 'counties');
  } else {
    return renderCountyOrMetroDescription(overallScore, 'metros');
  }
}

function renderStateDescription(
  overallScore: number,
  percentPopulationVulnerable?: number,
): React.ReactElement {
  const level = getCcviLevel(overallScore);

  if (level === CcviLevel.VERY_HIGH) {
    return (
      <>
        is one of the <strong>most vulnerable</strong> states
        {percentPopulationVulnerable
          ? `, with ${percentPopulationVulnerable}% of the population in a high vulnerability area.`
          : '.'}
      </>
    );
  } else if (level === CcviLevel.HIGH) {
    return (
      <>
        has <strong>higher vulnerability</strong> than most states
        {percentPopulationVulnerable
          ? `, with ${percentPopulationVulnerable}% of the population in a high vulnerability area.`
          : '.'}
      </>
    );
  } else if (level === CcviLevel.MEDIUM) {
    return (
      <>
        has <strong>average vulnerability</strong>.
        {percentPopulationVulnerable &&
          ` However, ${percentPopulationVulnerable}% of the population is in a high vulnerability area.`}
      </>
    );
  } else if (level === CcviLevel.LOW) {
    return (
      <>
        has <strong>lower vulnerability</strong> than most states.
        {percentPopulationVulnerable &&
          ` However, ${percentPopulationVulnerable}% of the population is in a high vulnerability area.`}
      </>
    );
  } else {
    return (
      <>
        is one of the <strong>least vulnerable</strong> states.
        {percentPopulationVulnerable &&
          ` However, ${percentPopulationVulnerable}% of the population is in a high vulnerability area.`}
      </>
    );
  }
}

function renderCountyOrMetroDescription(
  overallScore: number,
  regionType: string,
): React.ReactElement {
  const level = getCcviLevel(overallScore);
  const scoreAsPercent = formatPercent(overallScore);

  if (level === CcviLevel.HIGH || level === CcviLevel.VERY_HIGH) {
    return (
      <>
        is <strong>more vulnerable than {scoreAsPercent}</strong> of U.S.{' '}
        {regionType}.
      </>
    );
  } else if (level === CcviLevel.MEDIUM) {
    return (
      <>
        has <strong>average vulnerability</strong> among US {regionType}.
      </>
    );
  } else if (level === CcviLevel.LOW) {
    return (
      <>
        has <strong>lower vulnerability</strong> than most US {regionType}.
      </>
    );
  } else {
    return (
      <>
        is one of the <strong>least vulnerable</strong> US {regionType}.
      </>
    );
  }
}
