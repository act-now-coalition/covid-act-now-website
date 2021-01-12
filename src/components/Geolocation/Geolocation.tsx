import React, { Fragment } from 'react';
import { GeolocationInfo } from 'common/hooks/useGeolocation';
import {
  getStateRegionFromStateCode,
  getCountyRegionFromZipCode,
  getMetroRegionFromZipCode,
} from 'common/regions';
import { MenuItem } from 'components/Search';

const Geolocation: React.FC<{
  geolocation: GeolocationInfo;
}> = ({ geolocation }) => {
  const stateRegion = getStateRegionFromStateCode(geolocation.stateCode);
  const countyRegion = getCountyRegionFromZipCode(geolocation.zipCode);
  const metroRegion = getMetroRegionFromZipCode(geolocation.zipCode);

  return (
    <Fragment>
      {countyRegion && <MenuItem region={countyRegion} />}
      {metroRegion && <MenuItem region={metroRegion} />}
      {stateRegion && !metroRegion && <MenuItem region={stateRegion} />}
    </Fragment>
  );
};

export default Geolocation;
