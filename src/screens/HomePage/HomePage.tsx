import React, { useRef, useEffect, useState, useMemo } from 'react';
import Fade from '@material-ui/core/Fade';
import { useLocation } from 'react-router-dom';
import USRiskMap from 'components/USMap/USRiskMap';
import { NavBarSearch } from 'components/NavBar';
import { NavAllOtherPages } from 'components/NavBar';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import CompareMain from 'components/Compare/CompareMain';
import Explore, { ExploreMetric } from 'components/Explore';
import { formatMetatagDate } from 'common/utils';
import { getFilterLimit } from 'components/Search';
import HomepageStructuredData from 'screens/HomePage/HomepageStructuredData';
import { filterGeolocatedRegions } from 'common/regions';
import { useGeolocatedRegions, useShowPastPosition } from 'common/hooks';
import HomePageHeader from 'components/Header/HomePageHeader';
import { Content, HomePageBlock, ColumnCentered } from './HomePage.style';
import SearchAutocomplete from 'components/Search';
import { RiskLevelThermometer } from 'components/HorizontalThermometer';
import HomepageItems from 'components/RegionItem/HomepageItems';
import { useBreakpoint, useFinalAutocompleteLocations } from 'common/hooks';
import { largestMetroFipsForExplore, MapView } from 'screens/HomePage/utils';
import { DonateButtonHeart } from 'components/DonateButton';
import { MapBlock } from './MapBlock';
import NationalText from 'components/NationalText';
import regions from 'common/regions';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} Explore our interactive U.S. COVID Map for the latest data on Cases, Vaccinations, Deaths, Positivity rate, and ICU capacity for your State, City, or County.`;
}

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();

  const { userRegions, isLoading } = useGeolocatedRegions();

  const [currentMetric, setCurrentMetric] = useState(
    ExploreMetric.HOSPITALIZATIONS,
  );

  const largestMetroFips = largestMetroFipsForExplore;
  const exploreGeoLocations = useMemo(
    () =>
      userRegions
        ? filterGeolocatedRegions(userRegions).map(region => region.fipsCode)
        : largestMetroFips,
    [largestMetroFips, userRegions],
  );
  // Add USA to default view (Fips code: 0).
  if (!exploreGeoLocations.includes(regions.usa.fipsCode)) {
    exploreGeoLocations.push(regions.usa.fipsCode);
  }
  const initialFipsListForExplore = exploreGeoLocations;

  useEffect(() => {
    if (location.pathname.includes('alert_signup')) {
      window.location.href = '#alert_signup';
    }
  }, [location.pathname]);

  const exploreSectionRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const searchLocations = useFinalAutocompleteLocations();

  const isMobileNavBar = useBreakpoint(800);
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
              title="Risk levels"
              subtitle="Risk is reduced for those who are vaccinated."
              renderMap={locationScope => (
                <USRiskMap showCounties={locationScope === MapView.COUNTIES} />
              )}
              renderThermometer={() => <RiskLevelThermometer />}
              infoLink="/covid-risk-levels-metrics"
            />

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
            <HomePageBlock>
              <CompareMain
                locationsViewable={8}
                showModal={showCompareModal}
                setShowModal={setShowCompareModal}
              />
            </HomePageBlock>
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
