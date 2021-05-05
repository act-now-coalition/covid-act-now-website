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
