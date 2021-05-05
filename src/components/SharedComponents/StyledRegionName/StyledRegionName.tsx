/**
 * Region name styled with multiple font weights.
 * Used in Compare table + geolocated region links on the homepage.
 */
import React, { Fragment } from 'react';
import { Region, getFormattedStateCode } from 'common/regions';
import { Suffix, Wrapper } from './StyledRegionName.style';
import { getSplitRegionName } from 'components/NewLocationPage/LocationName/utils';

const StyledRegionName: React.FC<{
  showStateCode: boolean;
  region: Region;
  condensed?: boolean;
  truncateText?: boolean;
}> = ({ showStateCode, region, condensed, truncateText = false }) => {
  const [regionNameMain, regionSuffix] = getSplitRegionName(region, condensed);

  return (
    <Wrapper $truncateText={truncateText}>
      {regionNameMain}
      {regionSuffix && (
        <Suffix>
          {regionSuffix !== 'metro' ? ` ${regionSuffix}` : ` ${regionSuffix},`}
        </Suffix>
      )}
      {!regionSuffix && region.regionType !== 'state' && <Suffix>,</Suffix>}
      {showStateCode && <Fragment>{getFormattedStateCode(region)}</Fragment>}
    </Wrapper>
  );
};

export default StyledRegionName;
