import React from 'react';

import { filterGeolocatedRegions, Region } from 'common/regions';
import { useGeolocatedRegions } from 'common/hooks';
import { ShareContainer } from './ShareBlock.style';
import EmailAlertsFooter from 'components/EmailAlertsFooter';
import { getDefaultRegions } from 'components/EmailAlertsForm/utils';

const ShareBlock = ({ region }: { region?: Region }) => {
  const { userRegions } = useGeolocatedRegions();
  const geolocatedRegions = filterGeolocatedRegions(userRegions);

  const defaultSignupRegions = region
    ? getDefaultRegions(region)
    : geolocatedRegions;

  return (
    <ShareContainer id="share">
      <EmailAlertsFooter defaultRegions={defaultSignupRegions} />
    </ShareContainer>
  );
};
export default ShareBlock;
