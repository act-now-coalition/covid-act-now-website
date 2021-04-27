import React from 'react';
import { Region, State, County, MetroArea } from 'common/regions';

function inMultipleStates(region: MetroArea): boolean {
  return region.stateCodes.includes('-');
}

function splitRegionName(region: County | MetroArea): Array<string | null> {
  let regionNameSplit,
    regionSuffix = null;
  if (region instanceof County) {
    regionNameSplit = region.name.split(' ');
  } else {
    regionNameSplit = region.shortName.split(' ');
  }
  const potentialSuffix = regionNameSplit.pop();
  if (
    potentialSuffix &&
    (potentialSuffix.includes('metro') || potentialSuffix.includes('county'))
  ) {
    regionSuffix = potentialSuffix;
  }
  const regionNameMain = regionNameSplit.join(' ');
  return [regionNameMain, regionSuffix];
}

const StyledRegionName: React.FC<{ region: County | MetroArea }> = ({
  region,
}) => {
  let regionNameMain, regionSuffix, regionNameSplit;
  if (region instanceof County) {
    regionNameSplit = region.name.split(' ');
  } else {
    regionNameSplit = region.shortName.split(' ');
  }
  regionSuffix = regionNameSplit.pop();
  regionNameMain = regionNameSplit.join(' ');
  return (
    <span>
      <strong>{regionNameMain}</strong> {regionSuffix}
    </span>
  );
};

const LocationName: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof State) {
    return <strong>{region.name}</strong>;
  } else if (region instanceof County) {
    return (
      <div>
        <StyledRegionName region={region} />
        {', '}
        {region.state.stateCode}
      </div>
    );
  } else if (region instanceof MetroArea) {
    if (inMultipleStates(region)) {
      return (
        <div>
          <strong>{splitRegionName(region)[0]}</strong>
          {splitRegionName(region)[1] && ` ${splitRegionName(region)[1]}`}
          {', '}
          {region.stateCodes}
        </div>
      );
    } else {
      return (
        <div>
          <strong>{`${splitRegionName(region)[0]}, ${
            region.stateCodes
          } `}</strong>
          {splitRegionName(region)[1] && `${splitRegionName(region)[1]}`}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default LocationName;
