import React from 'react';
import { CcviLevel, getCcviLevel } from './index';
import { formatPercent } from 'common/utils';
import { Region, State, County } from 'common/regions';

export function renderRegionDescription(
  overallScore: number,
  region: Region,
): React.ReactElement {
  if (region instanceof State) {
    return renderStateDescription(overallScore, 1); // update this
  } else if (region instanceof County) {
    return renderCountyOrMetroDescription(overallScore, 'counties');
  } else {
    return renderCountyOrMetroDescription(overallScore, 'metros');
  }
}

function renderStateDescription(
  overallScore: number,
  vulnerablePopulation: number,
): React.ReactElement {
  const level = getCcviLevel(overallScore);

  if (level === CcviLevel.VERY_HIGH) {
    return (
      <>
        is one of the <strong>most vulnerable</strong> states, with{' '}
        {vulnerablePopulation} of the population in a high vulnerability area.
      </>
    );
  } else if (level === CcviLevel.HIGH) {
    return (
      <>
        has <strong>higher vulnerability</strong> than most states, with{' '}
        {vulnerablePopulation} of the population in a high vulnerability area.
      </>
    );
  } else if (level === CcviLevel.MEDIUM) {
    return (
      <>
        has <strong>average vulnerability</strong>. However,{' '}
        {vulnerablePopulation} of the population is in a high vulnerability
        area.
      </>
    );
  } else if (level === CcviLevel.LOW) {
    return (
      <>
        has <strong>lower vulnerability</strong> than most states. However,{' '}
        {vulnerablePopulation} of the population is in a high vulnerability
        area.
      </>
    );
  } else {
    return (
      <>
        is one of the <strong>least vulnerable</strong> states. However,{' '}
        {vulnerablePopulation} of the population is in a high vulnerability
        area.
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
        is <strong>more vulnerable than {scoreAsPercent}</strong> of U.S.
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
        has <strong>lower vulnerability</strong> than most US {regionType}
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
