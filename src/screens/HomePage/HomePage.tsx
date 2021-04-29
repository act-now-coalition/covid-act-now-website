import React, { useRef, useEffect, useState } from 'react';
import Fade from '@material-ui/core/Fade';
import { useLocation } from 'react-router-dom';

import Map from 'components/Map/Map';
import NavBar, { NavBarSearch } from 'components/NavBar';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import Announcements from './Announcements';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import CompareMain from 'components/Compare/CompareMain';
import Explore, { ExploreMetric } from 'components/Explore';
import { formatMetatagDate } from 'common/utils';
import { SpringSurgeBanner } from 'components/Banner';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import { getFilterLimit } from 'components/Search';
import { getNationalText } from 'components/NationalText';
import HomepageStructuredData from 'screens/HomePage/HomepageStructuredData';
import regions, { filterGeolocatedRegions } from 'common/regions';
import { useGeolocatedRegions, useShowPastPosition } from 'common/hooks';
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
import { useBreakpoint, useFinalAutocompleteLocations } from 'common/hooks';
import { getLargestMetroFipsForExplore } from 'screens/HomePage/utils';
import { DonateButtonHeart } from 'components/DonateButton';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} Explore our interactive U.S. COVID Map for the latest data on Cases, Vaccinations, Deaths, Positivity rate, and ICU capacity for your State, City, or County.`;
}

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();
  const [showCounties, setShowCounties] = useState(false);

  const isMobile = useBreakpoint(600);

  const { userRegions, isLoading } = useGeolocatedRegions();

  const largestMetroFips = getLargestMetroFipsForExplore();
  const exploreGeoLocations = userRegions
    ? filterGeolocatedRegions(userRegions).map(region => region.fipsCode)
    : largestMetroFips;

  const showRisingHospitalizations =
    location.hash === '#explore-hospitalizations';
  const risingHospitalizationStates = [
    'DE',
    'FL',
    'IL',
    'MD',
    'MI',
    'NH',
    'PA',
    'PR',
  ]; // Updated on 21 April 2021 -- this is an illustrative list but not exhaustive
  const initialFipsListForExplore = showRisingHospitalizations
    ? risingHospitalizationStates.map(
        state => regions.findByStateCodeStrict(state).fipsCode,
      )
    : exploreGeoLocations;
  const initialMetricForExplore = showRisingHospitalizations
    ? ExploreMetric.HOSPITALIZATIONS
    : ExploreMetric.CASES;

  // Location hash is uniquely set from vaccination banner button click
  const compareShowVaccinationsFirst = location.hash === '#compare';
  const compareShowVulnerabilityFirst =
    location.hash === '#compare-vulnerabilities';

  useEffect(() => {
    if (location.pathname.includes('alert_signup')) {
      window.location.href = '#alert_signup';
    }
  }, [location.pathname]);

  const exploreSectionRef = useRef(null);

  const onClickSwitch = (newShowCounties: boolean) => {
    setShowCounties(newShowCounties);
    trackEvent(
      EventCategory.MAP,
      EventAction.SELECT,
      `Select: ${newShowCounties ? 'Counties' : 'States'}`,
    );
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const searchLocations = useFinalAutocompleteLocations();

  const isMobileNavBar = useBreakpoint(800);
  const hasScrolled = useShowPastPosition(450);
  const showDonateButton = !isMobileNavBar || (isMobileNavBar && !hasScrolled);

  const renderNavBarSearch = () => (
    <>{hasScrolled && <NavBarSearch menuOpen={menuOpen} />}</>
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
      <NavBar
        renderSearch={renderNavBarSearch}
        renderSecondaryElement={renderDonateButton}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <HomepageStructuredData />
      <SpringSurgeBanner />
      <HomePageHeader />
      <main>
        <div className="App">
          <Content>
            <ColumnCentered id="search">
              <HomepageSearchAutocomplete
                locations={searchLocations}
                filterLimit={getFilterLimit()}
                menuOpen={menuOpen}
              />
              <HomepageItems isLoading={isLoading} userRegions={userRegions} />
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
            <SectionWrapper>
              <CriteriaExplanation isMobile={isMobile} />
            </SectionWrapper>
            <Announcements />
          </Content>
          <PartnersSection />
          <div ref={shareBlockRef} id="alert_signup">
            <ShareModelBlock />
          </div>
        </div>
      </main>
    </>
  );
}
