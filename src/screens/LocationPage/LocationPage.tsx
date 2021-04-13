import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { getPageTitle, getPageDescription } from './utils';
import {
  findStateByFipsCode,
  isMetroArea,
  useRegionsDB,
  FipsCode,
  Region,
} from 'common/regions';

interface LocationPageProps {
  fips: FipsCode;
}

const MiniMap = React.lazy(() => import('components/MiniMap'));

function LocationPage({ fips }: LocationPageProps) {
  let { chartId } = useParams<{ chartId: string }>();

  const regions = useRegionsDB();
  const [region, setRegion] = useState<Region | null>(null);
  const [mapOption, setMapOption] = useState(getDefaultMapOption(fips));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [canonicalUrl, setCanonicalUrl] = useState<string>('');

  useEffect(() => {
    if (regions) {
      const region = regions.findByFipsCodeStrict(fips);
      setRegion(region);
      setTitle(getPageTitle(region));
      setDescription(getPageDescription(region));
      setCanonicalUrl(region.canonicalUrl);
    }
    setMapOption(getDefaultMapOption(fips));
    // Close the map on mobile on any change to a region.
    setMobileMenuOpen(false);
  }, [regions, fips]);

  if (!region) {
    return null;
  }

  return (
    <div>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl={canonicalUrl}
        pageTitle={title}
        pageDescription={description}
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
