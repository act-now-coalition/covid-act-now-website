import React, { useRef, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import Announcements from './Announcements';
import { useLocation } from 'react-router-dom';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import HomePageThermometer from 'screens/HomePage/HomePageThermometer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Content, SectionWrapper, Section } from './HomePage.style';
import {
  SelectorWrapper,
  StyledGridItem,
} from 'components/Header/HomePageHeader.style';
import CompareMain from 'components/Compare/CompareMain';
import Explore from 'components/Explore';
import { SwitchComponent } from 'components/SharedComponents';
import { formatMetatagDate } from 'common/utils';
import { VaccinationsBanner } from 'components/Banner';
import SearchAutocomplete from 'components/Search';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import { getFilterLimit } from 'components/Search';
import { getFinalAutocompleteLocations } from 'common/regions';
import { getNationalText } from 'components/NationalText';
import HomepageStructuredData from 'screens/HomePage/HomepageStructuredData';
import { useGeolocation, useGeolocationInExplore } from 'common/hooks';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} Explore our interactive U.S. COVID map for the latest cases, deaths, hospitalizations, and other key metrics. 50 States. 390+ Metros. 3200+ Counties.`;
}

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();
  const [showCounties, setShowCounties] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const indicatorsRef = useRef(null);

  const geolocation = useGeolocation();
  const initialFipsForExplore = useGeolocationInExplore(5, geolocation);

  // Location hash is uniquely set from vaccination banner button click
  const compareShowVaccinationsFirst = location.hash === '#compare';

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

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle="Realtime U.S. COVID Map & Risk Levels"
        pageDescription={getPageDescription()}
      />
      <HomepageStructuredData />
      <VaccinationsBanner />
      <HomePageHeader
        indicatorsLinkOnClick={() => scrollTo(indicatorsRef.current)}
      />
      <main>
        <div className="App">
          <Content>
            <Grid container>
              <Grid container item key="controls" xs={12} sm={6}>
                <StyledGridItem
                  container
                  item
                  key="location-search"
                  xs={12}
                  justify="flex-end"
                >
                  <SelectorWrapper id="search">
                    <SearchAutocomplete
                      locations={getFinalAutocompleteLocations(geolocation)}
                      filterLimit={getFilterLimit()}
                    />
                  </SelectorWrapper>
                </StyledGridItem>
                <StyledGridItem
                  item
                  container
                  key="switch-states-counties"
                  xs={12}
                  justify="flex-end"
                >
                  <SwitchComponent
                    leftLabel="States"
                    rightLabel="Counties"
                    checked={showCounties}
                    onChange={onClickSwitch}
                  />
                </StyledGridItem>
              </Grid>
              {!isMobile && (
                <Grid container item key="legend" xs={12} sm={6}>
                  <HomePageThermometer />
                </Grid>
              )}
            </Grid>
            <Map hideLegend showCounties={showCounties} />
            {isMobile && <HomePageThermometer />}
            <CompareMain
              locationsViewable={8}
              vaccinesFirst={compareShowVaccinationsFirst}
            />
            <Section ref={exploreSectionRef}>
              <Explore
                title="Cases, Deaths and Hospitalizations"
                initialFipsList={initialFipsForExplore}
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
