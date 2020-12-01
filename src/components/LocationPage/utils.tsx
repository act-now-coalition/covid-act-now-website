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
  return peak || null;
}

export function isIcuHospitalizationsPeak(projection: Projection): boolean {
  // TODO: Return true if the current level is 90% or more, even if the actual
  // peak was a while ago.
  const peak = findIcuHospitaliztionsPeak(projection);
  return peak ? moment(peak.x).diff(moment(), 'days') < numDays : false;
}

export function getHospitalizationsAlert(projection: Projection) {
  const { locationName } = projection;
  const peak = findIcuHospitaliztionsPeak(projection);

  if (!peak || !peak.y) {
    return null;
  }

  // TODO: Do we show the peak even if the ICU utilization is in green or
  // yellow levels?
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
