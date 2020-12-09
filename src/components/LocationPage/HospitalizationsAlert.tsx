import React from 'react';
import moment from 'moment';
import { maxBy } from 'lodash';
import { Projection, Column } from 'common/models/Projection';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'components/TableOfContents';
import { Copy } from 'components/LocationPage/LocationPageHeader.style';
import { Region } from 'common/regions';

function findHospitaliztionsPeak(projection: Projection): Column | null {
  const hospitalizations = projection.getDataset('smoothedHospitalizations');
  if (!hospitalizations || hospitalizations.length === 0) {
    return null;
  }

  const peak = maxBy(hospitalizations, point => point.y);
  return peak || null;
}

export function isHospitalizationsPeak(projection: Projection): boolean {
  const HOSPITALIZATIONS_PEAK_LOOKBACK_DAYS = 7;
  const peak = findHospitaliztionsPeak(projection);
  return peak
    ? moment().diff(peak.x, 'days') < HOSPITALIZATIONS_PEAK_LOOKBACK_DAYS
    : false;
}

const HospitalizationsAlert: React.FC<{
  region: Region;
  projection: Projection;
}> = ({ region, projection }) => {
  const peak = findHospitaliztionsPeak(projection);

  if (!peak || !peak.y) {
    return null;
  }

  return (
    <Copy>
      {region.fullName} COVID hospitalizations are at an all-time peak -{' '}
      <HashLink
        to="#explore-chart"
        scroll={el => scrollWithOffset(el, -180)}
        smooth
      >
        see the chart
      </HashLink>
      .
    </Copy>
  );
};

export default HospitalizationsAlert;
