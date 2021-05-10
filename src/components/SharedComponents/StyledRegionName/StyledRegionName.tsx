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

  /**
   * regionNameMain: Region name seperated from the suffix.
   *
   * regionSuffix: Detected suffix derived from the region name. If the region name contains a multiple-word suffix or does not contain a recognizable suffix, this variable is null.
   *
   * Examples:
   *  'Fairfield County' => regionNameMain: 'Fairfield', regionSuffix: 'County'
   *  'Valdez-Cordova Census Area' => regionNameMain: 'Valdez-Cordova', regionSuffix: null ('Census Area' contains 2 words).
   *
   * More info in splitRegionName() in utils.ts.
   */
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
