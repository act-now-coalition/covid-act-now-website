import React from 'react';
import moment from 'moment';
import { maxBy } from 'lodash';
import { Projection, Column } from 'common/models/Projection';
import { formatPercent } from 'common/utils';

const numDays = 10;

function findIcuHospitaliztionsPeak(projection: Projection): Column | null {
  const icuHospitalizations = projection.getDataset('icuUtilization');
  if (!icuHospitalizations || icuHospitalizations.length === 0) {
    return null;
  }

  const peak = maxBy(icuHospitalizations, point => point.y);
  console.log({ peak });
  return peak || null;
}

export function isIcuHospitalizationsPeak(projection: Projection): boolean {
  const peak = findIcuHospitaliztionsPeak(projection);
  console.log({ projection, peak });
  return peak ? moment(peak.x).diff(moment(), 'days') < numDays : false;
}

export function getHospitalizationsAlert(projection: Projection) {
  const { locationName } = projection;
  const peak = findIcuHospitaliztionsPeak(projection);

  if (!peak || !peak.y) {
    return null;
  }

  const percentIcuUtilization = formatPercent(peak.y, 1);

  return (
    <p>
      {locationName} is experiencing an unprecedented number of ICU
      hospitalizations. In the past {numDays} days, {locationName} reached a
      peak of <b>{percentIcuUtilization}</b> utilized ICU beds. This poses a
      risk for COVID and non-COVID patients alike.
    </p>
  );
}
