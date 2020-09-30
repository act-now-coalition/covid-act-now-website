import React, { useRef, useEffect } from 'react';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import Announcements from './Announcements/Announcements';
import { useLocation } from 'react-router-dom';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import HomePageThermometer from 'screens/HomePage/HomePageThermometer';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Content,
  SearchBarThermometerWrapper,
  SectionWrapper,
  BannerContainer,
} from './HomePage.style';
import { SelectorWrapper } from 'components/Header/HomePageHeader.style';
import CompareMain from 'components/Compare/CompareMain';
import { DonationBanner } from 'components/Banner/DonationBanner';
import Explore from 'components/Explore';

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

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle="Covid Act Now - America’s COVID Warning System"
        pageDescription="Real-time modeling and metrics to understand where we stand against COVID. 50 states. 3,000+ counties. Click the map to dive in"
      />
      <BannerContainer>
        <DonationBanner />
      </BannerContainer>
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
            <CompareMain locationsViewable={8} isHomepage />
            <Explore
              title="Cases, Deaths and Hospitalizations"
              fipsList={['31']}
            />
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
