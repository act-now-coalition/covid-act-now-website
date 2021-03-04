import React from 'react';
import { CcviLevel, getCcviLevel } from './index';
import { formatPercent, formatDecimal } from 'common/utils';
import { Region, State, County } from 'common/regions';

const mostVulnerableFips = ['48', '29460', '37107'];
const leastVulnerableFips = ['50', '33540', '30033'];

export function renderRegionDescription(
  overallScore: number,
  region: Region,
  percentPopulationVulnerable?: number,
): React.ReactElement {
  const isMostVulnerable = mostVulnerableFips.includes(region.fipsCode);
  const isLeastVulnerable = leastVulnerableFips.includes(region.fipsCode);

  if (region instanceof State) {
    return renderStateDescription(
      overallScore,
      isMostVulnerable,
      isLeastVulnerable,
      percentPopulationVulnerable,
    );
  } else if (region instanceof County) {
    return renderCountyOrMetroDescription(
      overallScore,
      isMostVulnerable,
      isLeastVulnerable,
      'counties',
    );
  } else {
    return renderCountyOrMetroDescription(
      overallScore,
      isMostVulnerable,
      isLeastVulnerable,
      'metros',
    );
  }
}

function renderStateDescription(
  overallScore: number,
  isMostVulnerable: boolean,
  isLeastVulnerable: boolean,
  percentPopulationVulnerable?: number,
): React.ReactElement {
  const level = getCcviLevel(overallScore);

  if (isMostVulnerable) {
    return (
      <>
        has the <strong>highest vulnerability</strong> of all US states
        {percentPopulationVulnerable
          ? `, with ${percentPopulationVulnerable}% of the population in a high vulnerability area.`
          : '.'}
      </>
    );
  } else if (isLeastVulnerable) {
    return (
      <>
        is the <strong>least vulnerable</strong> state in the US.
      </>
    );
  } else if (level === CcviLevel.VERY_HIGH) {
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
        {percentPopulationVulnerable
          ? ` However, ${percentPopulationVulnerable}% of the population is in a high vulnerability area.`
          : ''}
      </>
    );
  } else if (level === CcviLevel.LOW) {
    return (
      <>
        has <strong>lower vulnerability</strong> than most states.
        {percentPopulationVulnerable
          ? ` However, ${percentPopulationVulnerable}% of the population is in a high vulnerability area.`
          : ''}
      </>
    );
  } else {
    return (
      <>
        is one of the <strong>least vulnerable</strong> states.
        {percentPopulationVulnerable
          ? ` However, ${percentPopulationVulnerable}% of the population is in a high vulnerability area.`
          : ''}
      </>
    );
  }
}

/* Special cases regions with a score that isn't 1 but would round up to 1 and confusingly render as 100% */
function formatScoreAsPercent(overallScore: number): string {
  if (overallScore > 0.995 && overallScore < 1) {
    const formattedDecimal = formatDecimal(100 * Math.min(1, overallScore), 2); // (ie: .9963 -> 99.63)
    const sliced = formattedDecimal.slice(0, 4); // we show one decimal place (ie: 99.63 -> 99.6 -> 99.6%)
    return `${sliced}%`;
  } else {
    return formatPercent(overallScore);
  }
}

function renderCountyOrMetroDescription(
  overallScore: number,
  isMostVulnerable: boolean,
  isLeastVulnerable: boolean,
  regionType: string,
): React.ReactElement {
  const level = getCcviLevel(overallScore);
  const scoreAsPercent = formatScoreAsPercent(overallScore);

  if (isMostVulnerable) {
    return (
      <>
        has the <strong>highest vulnerability</strong> of all U.S. {regionType}.
      </>
    );
  } else if (isLeastVulnerable) {
    return (
      <>
        is the <strong>least vulnerable</strong>{' '}
        {regionType === 'counties' ? 'county' : 'metro'} in the U.S.
      </>
    );
  } else if (level === CcviLevel.HIGH || level === CcviLevel.VERY_HIGH) {
    return (
      <>
        is <strong>more vulnerable than {scoreAsPercent}</strong> of U.S.{' '}
        {regionType}.
      </>
    );
  } else if (level === CcviLevel.MEDIUM) {
    return (
      <>
        has <strong>average vulnerability</strong> among U.S. {regionType}.
      </>
    );
  } else if (level === CcviLevel.LOW) {
    return (
      <>
        has <strong>lower vulnerability</strong> than most U.S. {regionType}.
      </>
    );
  } else {
    return (
      <>
        is one of the <strong>least vulnerable</strong> U.S. {regionType}.
      </>
    );
  }
}
