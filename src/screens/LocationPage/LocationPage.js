import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { LoadingScreen } from './LocationPage.style';
import { useProjections } from 'common/utils/model';
import { getPageTitle, getPageDescription } from './utils';
import {
  getCountyByUrlName,
  getStateByUrlName,
  getCanonicalUrl,
} from 'common/locations';

function LocationPage({ region }) {
  let { stateId, countyId, chartId } = useParams();

  const state = getStateByUrlName(stateId);
  // TODO(igor): don't mix uppercase and lowercase in here
  const stateCode = state.state_code.toUpperCase();
  const countyOption = countyId && getCountyByUrlName(stateCode, countyId);

  const [mapOption, setMapOption] = useState(
    stateCode === MAP_FILTERS.DC ? MAP_FILTERS.NATIONAL : MAP_FILTERS.STATE,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCounty, setSelectedCounty] = useState(countyOption);
  useMemo(() => {
    setSelectedCounty(countyOption);
  }, [countyOption]);

  const projections = useProjections(stateCode, selectedCounty);

  // Projections haven't loaded yet
  // If a new county has just been selected, we may not have projections
  // for the new county loaded yet
  if (
    !projections ||
    projections.county?.full_fips_code !== selectedCounty?.full_fips_code
  ) {
    return <LoadingScreen></LoadingScreen>;
  }

  const pageTitle = getPageTitle(projections);
  const pageDescription = getPageDescription(projections);
  const canonicalUrl = getCanonicalUrl(projections.fips);

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
          chartId={chartId}
          region={region}
        />
        <MiniMap
          projections={projections}
          stateId={stateCode}
          selectedCounty={selectedCounty}
          setSelectedCounty={setSelectedCounty}
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
