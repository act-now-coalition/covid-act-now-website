import React, { useState, useMemo } from 'react';
import { find } from 'lodash';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { LoadingScreen } from './LocationPage.style';
import { useProjections } from 'common/utils/model';
import { findLocationForFips, findStateByFips } from 'common/locations';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';

function getPageTitle(projections) {
  const location = findLocationForFips(projections.fips);
  const state = findStateByFips(location.state_fips_code);
  const locationName = location.county
    ? `${location.county}, ${state.state}`
    : `${location.state}`;
  return `${locationName}, ${location.state_code} - America’s COVID Warning System`;
}

function getPageDescription(projections) {
  const dateToday = moment().format('MMM DD, YYYY');
  const location = findLocationForFips(projections.fips);
  const state = findStateByFips(location.state_fips_code);
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const locationName = location.county
    ? `${location.county}, ${state.state}/${location.state_code}`
    : `${location.state}`;

  return `${dateToday} COVID THREAT LEVEL: ${levelInfo.detail(locationName)}`;
}

function LocationPage() {
  let { stateId, countyId, chartId } = useParams();
  // TODO(igor): don't mix uppercase and lowercase in here
  stateId = stateId.toUpperCase();

  const [mapOption, setMapOption] = useState(
    stateId === MAP_FILTERS.DC ? MAP_FILTERS.NATIONAL : MAP_FILTERS.STATE,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let countyOption = null;

  if (countyId) {
    countyOption = find(
      US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
      ['county_url_name', countyId],
    );
  }
  const [selectedCounty, setSelectedCounty] = useState(countyOption);
  useMemo(() => {
    setSelectedCounty(countyOption);
  }, [countyOption]);

  const projections = useProjections(stateId, selectedCounty);
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

  return (
    <div>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl={`/us/${stateId.toLowerCase()}`}
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
          stateId={stateId}
          county={countyOption}
          chartId={chartId}
          countyId={countyId}
        />
        <MiniMap
          projections={projections}
          stateId={stateId}
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
