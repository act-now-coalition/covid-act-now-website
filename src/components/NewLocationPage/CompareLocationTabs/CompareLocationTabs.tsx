import React, { useState } from 'react';
import { ButtonGroup, Button } from './CompareLocationTabs.style';
import {
  HomepageLocationScope,
  homepageLabelMap,
  GeoScopeFilter,
} from 'common/utils/compare';

function getGeoScopeCopy(
  geoScope: GeoScopeFilter | HomepageLocationScope,
  stateId?: string,
) {
  console.log(typeof geoScope);
  switch (geoScope) {
    case GeoScopeFilter.NEARBY:
      return 'Nearby';
    case GeoScopeFilter.STATE:
      return stateId;
    case GeoScopeFilter.COUNTRY:
      return 'USA';
    default:
      return null;
  }
}

const CompareLocationTabs: React.FC<{
  options: Array<HomepageLocationScope | GeoScopeFilter>;
  value: string;
  isCounty: boolean;
  stateId?: string;
}> = ({ options, value, isCounty, stateId }) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const handleSelectedOption = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string,
  ) => {
    setSelectedOption(newSelection);
  };
  return (
    <ButtonGroup
      value={selectedOption}
      exclusive
      onChange={handleSelectedOption}
    >
      {options.map(option =>
        isCounty ? (
          <Button value={getGeoScopeCopy(option, stateId)}>
            {getGeoScopeCopy(option, stateId)}
          </Button>
        ) : (
          <Button value={homepageLabelMap[option].plural}>
            {homepageLabelMap[option].plural}
          </Button>
        ),
      )}
    </ButtonGroup>
  );
};

export default CompareLocationTabs;
