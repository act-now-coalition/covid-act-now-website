import React from 'react';
import { Region, State, County, MetroArea } from 'common/regions';
import { isMultiStateMetro, getRegionName } from './utils';
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
    </UpdatedOnText>
  );
};

const LocationName: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof State) {
    return (
      <RegionNameContainer>
        <RegionNameText>
          <strong>{getRegionName(region)}</strong>
        </RegionNameText>
        <UpdatedDate />
      </RegionNameContainer>
    );
  } else if (region instanceof County) {
    const [countyName, countySuffix] = getRegionName(region);
    return (
      <RegionNameContainer>
        <RegionNameText>
          <strong>{countyName}</strong>
          {` ${countySuffix}, ${region.state.stateCode}`}
        </RegionNameText>
        <UpdatedDate />
      </RegionNameContainer>
    );
  } else if (region instanceof MetroArea) {
    const [metroName, metroSuffix] = getRegionName(region);
    if (isMultiStateMetro(region)) {
      return (
        <RegionNameContainer>
          <RegionNameText>
            <strong>{metroName}</strong>
            {` ${metroSuffix}, ${region.stateCodes}`}
          </RegionNameText>
          <UpdatedDate />
        </RegionNameContainer>
      );
    } else {
      return (
        <RegionNameContainer>
          <RegionNameText>
            <strong>{`${metroName}, ${region.stateCodes}`}</strong>
            {` ${metroSuffix}`}
          </RegionNameText>
          <UpdatedDate />
        </RegionNameContainer>
      );
    }
  } else {
    return null;
  }
};

export default LocationName;
