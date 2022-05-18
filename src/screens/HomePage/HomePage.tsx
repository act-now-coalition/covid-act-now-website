import React, { useRef, useEffect, useState, useMemo } from 'react';
import Fade from '@material-ui/core/Fade';
import { useLocation } from 'react-router-dom';
import USRiskMap from 'components/USMap/USRiskMap';
import USVaccineMap from 'components/USMap/USVaccineMap';
import { NavBarSearch } from 'components/NavBar';
import { NavAllOtherPages } from 'components/NavBar';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import CompareMain from 'components/Compare/CompareMain';
import Explore, { ExploreMetric } from 'components/Explore';
import { formatMetatagDate, formatPercent } from 'common/utils';
import { getFilterLimit } from 'components/Search';
import HomepageStructuredData from 'screens/HomePage/HomepageStructuredData';
import { filterGeolocatedRegions } from 'common/regions';
import {
  useGeolocatedRegions,
  useShowPastPosition,
  useScrollToRecommendations,
} from 'common/hooks';
import HomePageHeader from 'components/Header/HomePageHeader';
import {
  Content,
  HomePageBlock,
  ColumnCentered,
  VaccinationsThermometerHeading,
  SurveyBannerWrapper,
  AboutLink,
  MapDescriptionTest,
} from './HomePage.style';
import SearchAutocomplete from 'components/Search';
import {
  CommunityLevelThermometer,
  VaccinationsThermometer,
} from 'components/HorizontalThermometer';
import HomepageItems from 'components/RegionItem/HomepageItems';
import { useBreakpoint, useFinalAutocompleteLocations } from 'common/hooks';
import { largestMetroFipsForExplore, MapView } from 'screens/HomePage/utils';
import { DonateButtonHeart } from 'components/DonateButton';
import SiteSummaryJSON from 'assets/data/site-summary.json';
import { MapBlock } from './MapBlock';
import { TooltipMode } from 'components/USMap/USMapTooltip';
import NationalText from 'components/NationalText';
import Recommendations from 'components/Recommend/Recommendations';
import regions, { USA } from 'common/regions';
import { Level } from 'common/level';
import EmailAlertsFooter from 'components/EmailAlertsFooter';
import FeedbackSurveyBanner from 'components/Banner/FeedbackSurveyBanner';
import { TextTooltip, trackOpenTooltip } from 'components/InfoTooltip';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} Covid Act Now has real-time tracking of your community's COVID risk level. Explore how your community is doing.`;
}

export default function HomePage() {
  const recommendationsRef = useRef<HTMLDivElement>(null);
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
  const isMobile = useBreakpoint(600);
  const hasScrolled = useShowPastPosition(450);
  const showDonateButton = !isMobileNavBar || (isMobileNavBar && !hasScrolled);
  const renderNavBarSearch = () => (
    <>
      {hasScrolled && (
        <NavBarSearch menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}
    </>
  );

  useScrollToRecommendations(recommendationsRef);

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
        pageTitle="US COVID Tracker"
        pageDescription={getPageDescription()}
      />
      <NavAllOtherPages
        renderSearch={renderNavBarSearch}
        renderSecondaryElement={renderDonateButton}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <HomepageStructuredData />
      <SurveyBannerWrapper>
        <FeedbackSurveyBanner />
      </SurveyBannerWrapper>
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
              title="COVID Community Risk Level"
              subtitle=""
              renderMap={locationScope => (
                <USRiskMap showCounties={locationScope === MapView.COUNTIES} />
              )}
              renderThermometer={() => <CommunityLevelThermometer />}
              infoLink={
                <AboutLink to="/covid-community-level-metrics">
                  About community risk levels
                </AboutLink>
              }
              mapDescription={getRiskMapDescription()}
            />

            <MapBlock
              title="Vaccination Progress"
              subtitle={getVaccinationProgressSubtitle()}
              renderMap={locationScope => (
                <USVaccineMap
                  showCounties={locationScope === MapView.COUNTIES}
                  tooltipMode={
                    // TODO(michael): There's some sort of bug / performance issue on iOS that makes
                    // the mobile tooltip on the county view unusable.
                    isMobile && locationScope === MapView.STATES
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
              infoLink={
                <AboutLink to="/covid-community-level-metrics#percent-vaccinated">
                  About this data
                </AboutLink>
              }
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
            <HomePageBlock>
              <Recommendations
                alarmLevel={Level.UNKNOWN}
                recommendationsRef={recommendationsRef}
                region={USA.instance}
                isHomepage={true}
              />
            </HomePageBlock>
            <HomePageBlock id="share">
              <EmailAlertsFooter defaultRegions={[]} />
            </HomePageBlock>
            <PartnersSection />
          </Content>
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

function getRiskMapDescription() {
  return (
    <MapDescriptionTest>
      Our new framework reflects the decreased risk of severe illness and death
      from COVID due to vaccines, therapeutics, and past COVID infections.
      <br />
      <br />
      Note: People who need extra caution can still refer to our older{' '}
      <TextTooltip
        title="Daily new cases, infection rate, and positive test rate can be found after selecting a location."
        mainCopy="Transmission metrics"
        aria-label="Description of where to find transmission metrics data"
        trackOpenTooltip={() =>
          trackOpenTooltip('Homepage: transmission metrics')
        }
      />
      {'.'}
    </MapDescriptionTest>
  );
}
