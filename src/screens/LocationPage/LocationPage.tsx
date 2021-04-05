import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { getPageTitle, getPageDescription } from './utils';
import regions, { FipsCode, Region } from 'common/regions';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import { getStateCode } from 'common/regions';
import { MetroArea } from 'common/regions/MetroArea';

interface LocationPageProps {
  fips: FipsCode;
}

function LocationPage({ fips }: LocationPageProps) {
  let { chartId } = useParams<{ chartId: string }>();
  const region = regions.findByFipsCodeStrict(fips);

  let defaultMapOption: string = MAP_FILTERS.STATE;
  const stateCode = getStateCode(region);
  if (stateCode === MAP_FILTERS.DC) {
    defaultMapOption = MAP_FILTERS.NATIONAL;
  } else if (region instanceof MetroArea) {
    defaultMapOption = MAP_FILTERS.MSA;
  }

  const [mapOption, setMapOption] = useState(defaultMapOption);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMapOption(defaultMapOption);
    // Close the map on mobile on any change to a region.
    setMobileMenuOpen(false);
  }, [defaultMapOption, region]);

  return (
    <div>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl={region.canonicalUrl}
        pageTitle={getPageTitle(region)}
        pageDescription={getPageDescription(region)}
      />
      <div>
        <SearchHeader
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <ChartsHolder chartId={chartId} region={region} />
        <MiniMap
          region={region}
          mobileMenuOpen={mobileMenuOpen}
          mapOption={mapOption}
          setMapOption={setMapOption}
        />
      </div>
    </div>
  );
}

export default LocationPage;
