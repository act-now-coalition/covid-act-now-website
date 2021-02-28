import React, { useState, useEffect } from 'react';
import { useParams } from 'common/utils/router';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { getPageTitle, getPageDescription } from './utils';
import { getStateCode, MetroArea, Region } from 'common/regions';

interface LocationPageProps {
  region: Region;
}

function LocationPage({ region }: LocationPageProps) {
  let { chartId } = useParams<{ chartId: string }>();

  const defaultMapOption = getDefaultMapOption(region);
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

function getDefaultMapOption(region: Region) {
  const stateCode = getStateCode(region);
  if (stateCode === MAP_FILTERS.DC) {
    return MAP_FILTERS.NATIONAL;
  }
  if (region instanceof MetroArea) {
    return MAP_FILTERS.MSA;
  }
  return MAP_FILTERS.STATE;
}

export default LocationPage;
