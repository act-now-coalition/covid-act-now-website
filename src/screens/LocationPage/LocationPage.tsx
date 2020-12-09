import React, { useState } from 'react';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { LoadingScreen } from './LocationPage.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { getPageDescription, getPageTitleRegion } from './utils';
import { Region } from 'common/regions';

interface LocationPageProps {
  region: Region;
  chartId: string;
}

function LocationPage({ region, chartId }: LocationPageProps) {
  const [mapOption, setMapOption] = useState(
    region.fipsCode in ['11', '11001']
      ? MAP_FILTERS.NATIONAL
      : MAP_FILTERS.STATE,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projections = useProjectionsFromRegion(region);
  // Projections haven't loaded yet
  // If a new county has just been selected, we may not have projections
  // for the new county loaded yet
  if (!projections || projections.fips !== region.fipsCode) {
    return <LoadingScreen></LoadingScreen>;
  }

  const pageTitle = getPageTitleRegion(region);
  const pageDescription = getPageDescription(region, projections);
  const canonicalUrl = region.canonicalUrl();

  return (
    <div>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl={canonicalUrl}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      <div>
        <SearchHeader
          setMapOption={setMapOption}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <ChartsHolder
          projections={projections}
          region={region}
          chartId={chartId}
        />
        <MiniMap
          region={region}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          mapOption={mapOption}
          setMapOption={setMapOption}
        />
      </div>
    </div>
  );
}

export default LocationPage;
