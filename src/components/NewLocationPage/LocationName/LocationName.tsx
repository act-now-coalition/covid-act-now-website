import React from 'react';
import { Region, County, MetroArea } from 'common/regions';
import { isMultiStateMetro, getSplitRegionName } from './utils';
import {
  RegionNameContainer,
  RegionNameText,
  UpdatedOnText,
} from './LocationName.style';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { DateFormat, formatDateTime } from 'common/utils/time-utils';
import {
  TextTooltip,
  trackOpenTooltip,
  getLastUpdatedTooltipCopy,
} from 'components/InfoTooltip';

const UpdatedDate: React.FC = () => {
  const updatedDate = useModelLastUpdatedDate() || new Date();
  return (
    <UpdatedOnText>
      {'Updated on '}
      <TextTooltip
        title={getLastUpdatedTooltipCopy(updatedDate)}
        mainCopy={formatDateTime(updatedDate, DateFormat.MMMM_D)}
        aria-label="Description of when data is updated"
        trackOpenTooltip={() => trackOpenTooltip(`Updated date`)}
      />
      . <strong>NOTE:</strong> Data over the holidays might be delayed or
      unreliable. Please interpret with caution.
    </UpdatedOnText>
  );
};

function renderStyledRegionName(region: Region) {
  if (region instanceof County) {
    const [countyName, countySuffix] = getSplitRegionName(region);
    return (
      <>
        <strong>{countyName}</strong>
        {countySuffix && ` ${countySuffix}`}
        {`, ${region.state.stateCode}`}
      </>
    );
  } else if (region instanceof MetroArea) {
    const [metroName, metroSuffix] = getSplitRegionName(region);
    return (
      <>
        {isMultiStateMetro(region) ? (
          <>
            <strong>{metroName}</strong>
            {metroSuffix && ` ${metroSuffix}`}
            {`, ${region.stateCodes}`}
          </>
        ) : (
          <>
            <strong>{`${metroName}, ${region.stateCodes}`}</strong>
            {metroSuffix && ` ${metroSuffix}`}
          </>
        )}
      </>
    );
  } else {
    return <strong>{getSplitRegionName(region)}</strong>;
  }
}

const LocationName: React.FC<{ region: Region }> = ({ region }) => {
  return (
    <RegionNameContainer>
      <RegionNameText>{renderStyledRegionName(region)}</RegionNameText>
      <UpdatedDate />
    </RegionNameContainer>
  );
};

export default LocationName;
