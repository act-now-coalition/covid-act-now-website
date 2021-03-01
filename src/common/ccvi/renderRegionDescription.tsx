import React from 'react';
import { CcviLevel, getCcviLevel } from './index';
import { formatPercent } from 'common/utils';
import { Region, State, County } from 'common/regions';

export function renderRegionDescription(
  overallScore: number,
  region: Region,
): React.ReactElement | null {
  if (region instanceof State) {
    return renderStateDescription(overallScore);
  } else if (region instanceof County) {
    return renderCountyDescription(overallScore);
  } else {
    return null;
  }
}

function renderStateDescription(overallScore: number): React.ReactElement {
  const level = getCcviLevel(overallScore);
  const scoreAsPercent = formatPercent(overallScore);

  if (level === CcviLevel.VERY_HIGH) {
    return (
      <>
        is one of the most vulnerable states, with{' '}
        <strong>{scoreAsPercent}</strong> of the population in a high
        vulnerability area.{' '}
      </>
    );
  } else if (level === CcviLevel.HIGH) {
    return (
      <>
        has higher than average vulnerability compared to other states, with{' '}
        <strong>{scoreAsPercent}</strong> of the population in a high
        vulnerability area.
      </>
    );
  } else if (level === CcviLevel.MEDIUM) {
    return (
      <>
        has average vulnerability compared to other states. However,{' '}
        <strong>{scoreAsPercent}</strong> of the population is in a high
        vulnerability area.
      </>
    );
  } else if (level === CcviLevel.LOW) {
    return (
      <>
        is one of the less vulnerable states. However,{' '}
        <strong>{scoreAsPercent}</strong> of the population is in a high
        vulnerability area.
      </>
    );
  } else {
    return (
      <>
        is one of the least vulnerable states. However,{' '}
        <strong>{scoreAsPercent}</strong> of the population is in a high
        vulnerability area.
      </>
    );
  }
}

function renderCountyDescription(overallScore: number): React.ReactElement {
  const level = getCcviLevel(overallScore);
  const scoreAsPercent = formatPercent(overallScore);

  if (level === CcviLevel.HIGH || level === CcviLevel.VERY_HIGH) {
    return (
      <>
        is more vulnerable than <strong>{scoreAsPercent}</strong> of U.S.
        counties.
      </>
    );
  } else if (level === CcviLevel.MEDIUM) {
    return <>has average vulnerability compared to other US counties.</>;
  } else if (level === CcviLevel.LOW) {
    return <>is one of the less vulnerable US counties.</>;
  } else {
    return <>is one of the least vulnerable US counties.</>;
  }
}
