import React, { useRef, useEffect, useState, useMemo } from 'react';
import Fade from '@material-ui/core/Fade';
import { useLocation } from 'react-router-dom';
import USRiskMap from 'components/USMap/USRiskMap';
import USVaccineMap from 'components/USMap/USVaccineMap';
import { NavBarSearch } from 'components/NavBar';
import { NavAllOtherPages } from 'components/NavBar';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import Announcements from './Announcements';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import CompareMain from 'components/Compare/CompareMain';
import Explore, { ExploreMetric } from 'components/Explore';
import { formatMetatagDate, formatPercent } from 'common/utils';
import { getFilterLimit } from 'components/Search';
import HomepageStructuredData from 'screens/HomePage/HomepageStructuredData';
import { filterGeolocatedRegions } from 'common/regions';
import { useGeolocatedRegions, useShowPastPosition } from 'common/hooks';
import HomePageHeader from 'components/Header/HomePageHeader';
import {
  Content,
  HomePageBlock,
  ColumnCentered,
  VaccinationsThermometerHeading,
} from './HomePage.style';
import SearchAutocomplete from 'components/Search';
import {
  RiskLevelThermometer,
  VaccinationsThermometer,
} from 'components/HorizontalThermometer';
import HomepageItems from 'components/RegionItem/HomepageItems';
import { useBreakpoint, useFinalAutocompleteLocations } from 'common/hooks';
import { largestMetroFipsForExplore, MapView } from 'screens/HomePage/utils';
import { DonateButtonHeart } from 'components/DonateButton';
import SiteSummaryJSON from 'assets/data/site-summary.json';
import { MapBlock } from './MapBlock';
import { TooltipMode } from 'components/USMap/USMapTooltip';
import VaccinationsTable from 'components/VaccinationsTable/VaccinationsTable';
import NationalText from 'components/NationalText';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} Explore our interactive U.S. COVID Map for the latest data on Cases, Vaccinations, Deaths, Positivity rate, and ICU capacity for your State, City, or County.`;
}

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();

  const { userRegions, isLoading } = useGeolocatedRegions();

  const [currentMetric, setCurrentMetric] = useState(ExploreMetric.CASES);

  const largestMetroFips = largestMetroFipsForExplore;
  const exploreGeoLocations = useMemo(
    () =>
      userRegions
        ? filterGeolocatedRegions(userRegions).map(region => region.fipsCode)
        : largestMetroFips,
    [largestMetroFips, userRegions],
  );
  const initialFipsListForExplore = exploreGeoLocations;

  // TODO(Chelsi) - i think we can delete this:
  // Location hash is uniquely set from vaccination banner button click
  const compareShowVulnerabilityFirst =
    location.hash === '#compare-vulnerabilities';

  useEffect(() => {
    if (location.pathname.includes('alert_signup')) {
      window.location.href = '#alert_signup';
    }
  }, [location.pathname]);

  const exploreSectionRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [showCompareModal, setShowCompareModal] = useState(false);
  const [
    compareShowVaccinationsFirst,
    setCompareShowVaccinationsFirst,
  ] = useState<boolean>(false);

  const vaccinationsTableButtonOnClick = () => {
    setCompareShowVaccinationsFirst(true);
    setShowCompareModal(true);
  };

  const searchLocations = useFinalAutocompleteLocations();

  const isMobileNavBar = useBreakpoint(800);
  const isMobileMap = useBreakpoint(600);
  const hasScrolled = useShowPastPosition(450);
  const showDonateButton = !isMobileNavBar || (isMobileNavBar && !hasScrolled);

  const renderNavBarSearch = () => (
    <>
      {hasScrolled && (
        <NavBarSearch menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}
    </>
  );

  const renderDonateButton = () => (
    <>
      {showDonateButton && (
        <Fade in={showDonateButton}>
          <div>
            <DonateButtonHeart />
          </div>
        </Fade>
      )}
    </>
  );

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle="Realtime U.S. COVID Map & Vaccine Tracker"
        pageDescription={getPageDescription()}
      />
      <NavAllOtherPages
        renderSearch={renderNavBarSearch}
        renderSecondaryElement={renderDonateButton}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <HomepageStructuredData />
      <HomePageHeader />
      <main>
        <div className="App">
          <Content>
            <ColumnCentered id="search">
              <SearchAutocomplete
                locations={searchLocations}
                filterLimit={getFilterLimit()}
                menuOpen={menuOpen}
                placeholder="City, county, state, or zip"
                setMenuOpen={setMenuOpen}
              />
              <HomepageItems isLoading={isLoading} userRegions={userRegions} />
            </ColumnCentered>

            <MapBlock
              title="Vaccination progress"
              subtitle={getVaccinationProgressSubtitle()}
              renderMap={locationScope => (
                <USVaccineMap
                  showCounties={locationScope === MapView.COUNTIES}
                  tooltipMode={
                    // TODO(michael): There's some sort of bug / performance issue on iOS that makes
                    // the mobile tooltip on the county view unusable.
                    isMobileMap && locationScope === MapView.STATES
                      ? TooltipMode.ACTIVATE_ON_CLICK
                      : TooltipMode.ACTIVATE_ON_HOVER
                  }
                />
              )}
              renderThermometer={() => (
                <>
                  <VaccinationsThermometerHeading>
                    Population with <b>1+ dose</b>
                  </VaccinationsThermometerHeading>
                  <VaccinationsThermometer />
                </>
              )}
              infoLink="/covid-risk-levels-metrics#percent-vaccinated"
              renderTable={locationScope => (
                <VaccinationsTable
                  mapView={locationScope}
                  seeAllOnClick={vaccinationsTableButtonOnClick}
                />
              )}
            />

            <MapBlock
              title="Risk levels"
              subtitle="Risk is reduced for those who are vaccinated."
              renderMap={locationScope => (
                <USRiskMap showCounties={locationScope === MapView.COUNTIES} />
              )}
              renderThermometer={() => <RiskLevelThermometer />}
              infoLink="/covid-risk-levels-metrics"
            />

            <HomePageBlock>
              <CompareMain
                locationsViewable={8}
                vaccinesFirst={compareShowVaccinationsFirst}
                vulnerabilityFirst={compareShowVulnerabilityFirst}
                showModal={showCompareModal}
                setShowModal={setShowCompareModal}
              />
            </HomePageBlock>
            <HomePageBlock
              ref={exploreSectionRef}
              id="explore-hospitalizations"
            >
              <Explore
                title="Trends"
                initialFipsList={initialFipsListForExplore}
                currentMetric={currentMetric}
                setCurrentMetric={setCurrentMetric}
                nationalSummary={<NationalText />}
              />
            </HomePageBlock>
            <Announcements />
            <PartnersSection />
          </Content>
          <div ref={shareBlockRef} id="alert_signup">
            <ShareModelBlock />
          </div>
        </div>
      </main>
    </>
  );
}

function getVaccinationProgressSubtitle() {
  const { totalVaccinationsInitiated, totalPopulation } = SiteSummaryJSON.usa;
  const percentVaccinated = formatPercent(
    totalVaccinationsInitiated / totalPopulation,
  );
  return (
    <>
      <b>{percentVaccinated}</b> of the entire U.S. population has received{' '}
      <b>1+ dose</b>.
    </>
  );
}
