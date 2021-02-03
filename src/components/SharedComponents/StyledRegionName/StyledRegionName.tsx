/**
 * Region name styled with multiple font weights.
 * Used in Compare table + geolocated region links on the homepage.
 */
import React, { Fragment } from 'react';
import { getRegionNameForRow } from 'common/utils/compare';
import { Region, getFormattedStateCode } from 'common/regions';
import { Suffix, Wrapper } from './StyledRegionName.style';

const StyledRegionName: React.FC<{
  showStateCode: boolean;
  region: Region;
  condensed?: boolean;
  truncateText?: boolean;
}> = ({ showStateCode, region, condensed, truncateText = false }) => {
  const [regionNameMain, regionSuffix] = getRegionNameForRow(region, condensed);

  return (
    <Wrapper $condensed={condensed} $truncateText={truncateText}>
      {regionNameMain} {regionSuffix && <Suffix>{regionSuffix}</Suffix>}
      {showStateCode && <Fragment>{getFormattedStateCode(region)}</Fragment>}
    </Wrapper>
  );
};

export default StyledRegionName;
