import React, { Fragment } from 'react';
import moment from 'moment';
import { maxBy } from 'lodash';
import { Projection, Column } from 'common/models/Projection';

const numDays = 7;

function findHospitaliztionsPeak(projection: Projection): Column | null {
  const hospitalizations = projection.getDataset('smoothedHospitalizations');
  if (!hospitalizations || hospitalizations.length === 0) {
    return null;
  }

  const peak = maxBy(hospitalizations, point => point.y);
  return peak || null;
}

export function isHospitalizationsPeak(projection: Projection): boolean {
  const peak = findHospitaliztionsPeak(projection);
  console.log({ peak });
  return peak ? moment().diff(peak.x, 'days') < numDays : false;
}

export function getHospitalizationsAlert(projection: Projection) {
  const { locationName } = projection;
  const peak = findHospitaliztionsPeak(projection);

  if (!peak || !peak.y) {
    return null;
  }

  return (
    <Fragment>
      {locationName} COVID hospitalizations are at an all-time peak - see the
      chart.
    </Fragment>
  );
}
