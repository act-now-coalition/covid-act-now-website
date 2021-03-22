import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
//import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { getStateCode, MetroArea, Region } from 'common/regions';
import type { LocationSummary } from 'common/location_summaries';

import { useLocation } from 'common/utils/router';

const MiniMap = dynamic(() => import('components/MiniMap'), {
  ssr: false,
});

interface LocationPageProps {
  region: Region;
  locationSummary: LocationSummary;
  title: string;
  description: string;
}

function LocationPage({
  region,
  locationSummary,
  title,
  description,
}: LocationPageProps) {
  const location = useLocation();
  const chartIdMatch = location.hash.match(/chart-(?<chartId>\d+)/);
  const chartId = chartIdMatch?.groups?.chartId ?? '';

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
        pageTitle={title}
        pageDescription={description}
      />
      <div>
        <SearchHeader
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <ChartsHolder
          chartId={chartId}
          region={region}
          locationSummary={locationSummary}
        />
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
