import React, { useRef, useEffect, useState } from 'react';
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
  CountySwitchContainer,
  SearchBarThermometerWrapper,
  SectionWrapper,
  Section,
} from './HomePage.style';
import { SelectorWrapper } from 'components/Header/HomePageHeader.style';
import CompareMain from 'components/Compare/CompareMain';
import Explore from 'components/Explore';
import { SwitchComponent } from 'components/SharedComponents';
import { formatMetatagDate } from 'common/utils';
import { getRandomStateFipsList } from './utils';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} View new US COVID cases, deaths, hospitalizations, and other important metrics. 50 States. 3000+ Counties. Click the map to dive in.`;
}

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();
  const [showCounties, setShowCounties] = useState(true);
  console.log('HomePage', showCounties);

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

  const [initialFipsList] = useState(getRandomStateFipsList());

  const exploreSectionRef = useRef(null);

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle="Realtime US COVID Risk Map by State and County"
        pageDescription={getPageDescription()}
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
            <CountySwitchContainer>
              <SwitchComponent
                leftLabel="States"
                rightLabel="Counties"
                checkedValue={showCounties}
                onChange={() => {
                  console.log('onChange', !showCounties);
                  setShowCounties(!showCounties);
                }}
                gridOnClick={v => {
                  console.log('gridOnClick', v);
                  setShowCounties(v);
                }}
              />
            </CountySwitchContainer>
            <Map hideLegend showCounties={showCounties} />
            {isMobile && <HomePageThermometer />}
            <CompareMain locationsViewable={8} isHomepage />
            <Section ref={exploreSectionRef}>
              <Explore
                title="Cases, Deaths and Hospitalizations"
                initialFipsList={initialFipsList}
                initialChartIndigenousPopulations={true}
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
