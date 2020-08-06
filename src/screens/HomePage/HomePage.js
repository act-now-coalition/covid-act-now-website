import React, { useRef, useEffect } from 'react';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import Announcements from './Announcements/Announcements';
import { PartnerLogoGrid, PressLogoGrid } from 'components/LogoGrid/LogoGrid';
import { useLocation } from 'react-router-dom';
import HomePageThermometer from 'screens/HomePage/HomePageThermometer';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { getStatesArr } from 'common/utils/compare';
import {
  Content,
  FeaturedHeader,
  PartnerSection,
  PartnerHeader,
  SearchBarThermometerWrapper,
  SectionWrapper,
} from './HomePage.style';
import { SelectorWrapper } from 'components/Header/HomePageHeader.style';
import CompareMain from 'components/Compare/CompareMain';

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const history = useHistory();

  const indicatorsRef = useRef(null);

  const scrollTo = div =>
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

  // @ts-ignore TODO(aj): remove when converting MapSelectors
  const handleSelectChange = option => {
    let route = `/us/${option.state_code.toLowerCase()}`;

    if (option.county_url_name) {
      route = `${route}/county/${option.county_url_name}`;
    }

    history.push(route);

    window.scrollTo(0, 0);
  };

  const locationsForCompare = getStatesArr();

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle={undefined}
        pageDescription="Real-time modeling and metrics to understand where we stand against COVID. 50 states. 3,000+ counties. Click the map to dive in"
      />
      <HomePageHeader
        indicatorsLinkOnClick={() => scrollTo(indicatorsRef.current)}
      />
      <main>
        <div className="App">
          <Content>
            <SearchBarThermometerWrapper>
              <SelectorWrapper>
                <GlobalSelector
                  handleChange={handleSelectChange}
                  extendRight={undefined}
                />
              </SelectorWrapper>
              {!isMobile && <HomePageThermometer />}
            </SearchBarThermometerWrapper>
            <Map hideLegend />
            {isMobile && <HomePageThermometer />}
            <CompareMain
              locationsViewable={10}
              isHomepage
              locations={locationsForCompare}
            />
            <SectionWrapper ref={indicatorsRef}>
              <CriteriaExplanation isMobile={isMobile} />
            </SectionWrapper>
            <Announcements />
          </Content>
          <PartnerSection>
            <Content>
              <PartnerHeader>Our Partners</PartnerHeader>
              <PartnerLogoGrid />
              <FeaturedHeader>Featured In</FeaturedHeader>
              <PressLogoGrid />
            </Content>
          </PartnerSection>
          <div ref={shareBlockRef}>
            <ShareModelBlock />
          </div>
        </div>
      </main>
    </>
  );
}
