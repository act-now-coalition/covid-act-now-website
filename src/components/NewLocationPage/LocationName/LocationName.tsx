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
import { TextTooltip, trackOpenTooltip } from 'components/InfoTooltip';

const UpdatedDate: React.FC = () => {
  const updatedDate = useModelLastUpdatedDate() || new Date();
  const updatedTimeStamp = updatedDate;
  updatedTimeStamp.setUTCHours(17, 0, 0, 0);
  const updatedTimeStr = formatDateTime(updatedTimeStamp, DateFormat.H_A_ZZZZ);
  const content = `We aim to update our data by ${updatedTimeStr} daily. Occasionally, when additional review is required, an update can be delayed by several hours. Note that certain data sources that we use (eg. ICU hospitalizations) are only updated once per week.`;
  return (
    <UpdatedOnText>
      {'Updated on '}
      <TextTooltip
        title={content}
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
          {countySuffix && ` ${countySuffix}`}
          {`, ${region.state.stateCode}`}
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
            {metroSuffix && ` ${metroSuffix}`}
            {`, ${region.stateCodes}`}
          </RegionNameText>
          <UpdatedDate />
        </RegionNameContainer>
      );
    } else {
      return (
        <RegionNameContainer>
          <RegionNameText>
            <strong>{`${metroName}, ${region.stateCodes}`}</strong>
            {metroSuffix && ` ${metroSuffix}`}
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
