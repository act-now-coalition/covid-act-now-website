import React, { useRef, useEffect, useState } from 'react';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import Announcements from './Announcements';
import { useLocation } from 'react-router-dom';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import CompareMain from 'components/Compare/CompareMain';
import Explore, { ExploreMetric } from 'components/Explore';
import { formatMetatagDate } from 'common/utils';
import { SpringSurgeBanner } from 'components/Banner';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import { getFilterLimit } from 'components/Search';
import {
  findStateByStateCodeStrict,
  getFinalAutocompleteLocations,
  getGeolocatedRegions,
} from 'common/regions';
import { getNationalText } from 'components/NationalText';
import HomepageStructuredData from 'screens/HomePage/HomepageStructuredData';
import { useGeolocation, useGeolocationInExplore } from 'common/hooks';
import HomePageHeader from 'components/Header/HomePageHeader';
import {
  Content,
  SectionWrapper,
  Section,
  ColumnCentered,
} from './HomePage.style';
import { HomepageSearchAutocomplete } from 'components/Search';
import Toggle from './Toggle/Toggle';
import HorizontalThermometer from 'components/HorizontalThermometer';
import HomepageItems from 'components/RegionItem/HomepageItems';
import { useBreakpoint, useCountyToZipMap } from 'common/hooks';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';
import { DEFAULT_EXPLORE_GEOLOCATION_COUNT } from './utils';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} Explore our interactive U.S. COVID Map for the latest data on Cases, Vaccinations, Deaths, Positivity rate, and ICU capacity for your State, City, or County.`;
}

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();
  const [showCounties, setShowCounties] = useState(false);

  const isMobile = useBreakpoint(600);

  const indicatorsRef = useRef(null);

  const { geolocationData, isLoading: geoIsLoading } = useGeolocation();
  const { result: countyToZipMap, pending: zipIsLoading } = useCountyToZipMap();

  const isLoading = geoIsLoading || zipIsLoading;

  const userRegions =
    geolocationData && countyToZipMap
      ? getGeolocatedRegions(geolocationData, countyToZipMap)
      : null;

  const exploreGeoLocations = useGeolocationInExplore(
    DEFAULT_EXPLORE_GEOLOCATION_COUNT,
    geolocationData,
  );
  const showRisingHospitalizations =
    location.hash === '#explore-hospitalizations';
  const risingHospitalizationStates = [
    'DE',
    'IL',
    'MD',
    'MI',
    'MN',
    'NJ',
    'PA',
    'PR',
  ]; // Updated on 7 April 2021 -- this is an illustrative list but not exhaustive
  const initialFipsListForExplore = showRisingHospitalizations
    ? risingHospitalizationStates.map(
        state => findStateByStateCodeStrict(state).fipsCode,
      )
    : exploreGeoLocations;
  const initialMetricForExplore = showRisingHospitalizations
    ? ExploreMetric.HOSPITALIZATIONS
    : ExploreMetric.CASES;

  // Location hash is uniquely set from vaccination banner button click
  const compareShowVaccinationsFirst = location.hash === '#compare';
  const compareShowVulnerabilityFirst =
    location.hash === '#compare-vulnerabilities';

  const scrollTo = (div: null | HTMLDivElement) =>
    div &&
    window.scrollTo({
      left: 0,
      top: div.offsetTop - 48,
      behavior: 'smooth',
    });

  useEffect(() => {
    if (location.pathname.includes('alert_signup') && shareBlockRef.current) {
      scrollTo(shareBlockRef.current);
    }
  }, [location.pathname, shareBlockRef]);

  const exploreSectionRef = useRef(null);

  const onClickSwitch = (newShowCounties: boolean) => {
    setShowCounties(newShowCounties);
    trackEvent(
      EventCategory.MAP,
      EventAction.SELECT,
      `Select: ${newShowCounties ? 'Counties' : 'States'}`,
    );
  };

  // TODO (chelsi): add ids back in

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle="Realtime U.S. COVID Map & Vaccine Tracker"
        pageDescription={getPageDescription()}
      />
      <HomepageStructuredData />
      <SpringSurgeBanner />
      <HomePageHeader />
      <main>
        <div className="App">
          <Content>
            <ColumnCentered id="search">
              <HomepageSearchAutocomplete
                locations={getFinalAutocompleteLocations(
                  geolocationData,
                  countyToZipMap,
                )}
                filterLimit={getFilterLimit()}
              />
              <Experiment id={ExperimentID.GEOLOCATED_LINKS}>
                <Variant id={VariantID.A}>
                  <HomepageItems
                    isLoading={isLoading}
                    userRegions={userRegions}
                    showMetro
                  />
                </Variant>
                <Variant id={VariantID.B}>
                  <HomepageItems
                    isLoading={isLoading}
                    userRegions={userRegions}
                    showMetro={false}
                  />
                </Variant>
              </Experiment>
              <Toggle
                showCounties={showCounties}
                onClickSwitch={onClickSwitch}
              />
            </ColumnCentered>

            <Map hideLegend hideInstructions showCounties={showCounties} />

            <ColumnCentered $topBottomSpacing={true}>
              <HorizontalThermometer />
            </ColumnCentered>

            <Section>
              <CompareMain
                locationsViewable={8}
                vaccinesFirst={compareShowVaccinationsFirst}
                vulnerabilityFirst={compareShowVulnerabilityFirst}
              />
            </Section>
            <Section ref={exploreSectionRef}>
              <div id="explore-hospitalizations"></div>
              <Explore
                title="Cases, Deaths and Hospitalizations"
                initialFipsList={initialFipsListForExplore}
                defaultMetric={initialMetricForExplore}
                initialChartIndigenousPopulations={false}
                nationalSummaryText={getNationalText()}
              />
            </Section>
            <SectionWrapper ref={indicatorsRef}>
              <CriteriaExplanation isMobile={isMobile} />
            </SectionWrapper>
            <Announcements />
          </Content>
          <PartnersSection />
          <div ref={shareBlockRef}>
            <ShareModelBlock />
          </div>
        </div>
      </main>
    </>
  );
}
