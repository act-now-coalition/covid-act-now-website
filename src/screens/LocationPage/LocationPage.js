import React, { useState, useMemo } from 'react';
import _ from 'lodash';
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
    countyOption = _.find(
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

  const actionTitle =
    'Real-time modeling and metrics to understand where we stand against COVID.';
  const actionDescription = `Real-time modeling and metrics to understand where we stand against COVID. 50 states. 3,000+ counties. Click the map to dive in.`;

  return (
    <div>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl={`/us/${stateId.toLowerCase()}`}
        pageTitle={actionTitle}
        pageDescription={actionDescription}
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
