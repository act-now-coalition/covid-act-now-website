import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  useHistory,
  useLocation,
  match as MatchType,
  matchPath,
} from 'react-router-dom';
import Logo from 'assets/images/logo';
import { useEmbed } from 'utils/hooks';
import MobileMenu from './MobileMenu';
import Burger from './Burger';
import {
  Wrapper,
  Left,
  StyledAppBar,
  StyledDesktopMenu,
  StyledTabs,
  StyledTab,
  StyledMobileMenu,
} from './AppBar.style';

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { STATES } from 'enums';
import { Location } from 'history';
import US_STATE_DATASET from '../MapSelectors/datasets/us_states_dataset_01_02_2020.json';

const Panels = ['/', '/about', '/products', '/blog', '/contact'];

function getPanelIdxFromLocation(location: Location<any>) {
  let idx = Panels.indexOf(location.pathname);
  return idx === -1 ? false : idx;
}

function locationNameFromMatch(
  match: MatchType<{ id: keyof typeof STATES; county?: string }> | null,
) {
  if (!match || !match.params) {
    return '';
  }

  const stateId = match.params.id.toUpperCase() as keyof typeof STATES;
  const state = STATES[stateId];
  const countyId = match.params.county;
  if (!countyId) {
    return state;
  }

  const county = _.find(
    // @ts-ignore TODO(aj): Fix this when features/typescript3 merges
    US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
    ['county_url_name', countyId],
  ).county;
  return `${county}, ${state}`;
}

const _AppBar = () => {
  const history = useHistory();
  const location = useLocation();

  const [panelIdx, setPanelIdx] = useState(getPanelIdxFromLocation(location));
  const [open, setOpen] = useState(false);
  const locationPath = useLocation();
  const { isEmbed } = useEmbed();

  useEffect(() => {
    function handleLocationChange(location: Location<any>) {
      setPanelIdx(getPanelIdxFromLocation(location));
    }
    // https://github.com/ReactTraining/react-router/issues/3385#issuecomment-214758008
    return history.listen(handleLocationChange);
  }, [history]);

  // Don't show in iFrame
  if (isEmbed) return null;

  let match = matchPath<{ id: keyof typeof STATES; county?: string }>(
    locationPath.pathname,
    {
      path: ['/us/:id', '/us/:id/county/:county'],
      exact: true,
      strict: false,
    },
  );

  if (!match) {
    match = matchPath<{ id: keyof typeof STATES }>(locationPath.pathname, {
      path: '/states/:id',
      exact: true,
      strict: false,
    });
  }
  const locationName = locationNameFromMatch(match);
  const goTo = (route: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);

    history.push(route);

    window.scrollTo(0, 0);
  };

  const forwardTo = (url: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    setOpen(false);
    window.open(url, '_blank');
  };

  const shareURL = `https://covidactnow.org${match ? match.url : ''}`;
  const hashtag = 'COVIDActNow';
  const locationShareTitle = `See a projection for how long ${locationName}'s hospital system has until COVID overwhelms hospitals and how interventions flatten the curve and save lives: @COVIDActNow`;
  const defaultShareTitle =
    'See a projection for how long states and counties have until COVID overwhelms hospitals and how interventions flatten the curve and save lives: @COVIDActNow';

  const shareTitle = locationName ? locationShareTitle : defaultShareTitle;

  const trackShare = (target: string) => {
    window.gtag('event', 'share', {
      event_label: target,
    });
  };

  // Track GA pageview whenever a route is pushed.
  history.listen(location => {
    window.gtag('config', 'G-HFCDC7K5G1', {
      page_path: location.pathname,
    });
    window.gtag('config', 'UA-160622988-1', {
      page_path: location.pathname,
    });
  });

  return (
    <StyledAppBar position="sticky">
      <Wrapper>
        <Left onClick={goTo('/')}>
          {match ? <ArrowBack /> : ''}
          <Logo />
        </Left>
        <StyledDesktopMenu value={false}>
          <StyledTabs value={panelIdx}>
            <StyledTab
              label="Map"
              value={0}
              disableRipple
              onClick={goTo('/')}
            />
            <StyledTab
              label="About"
              value={1}
              disableRipple
              onClick={goTo('/about')}
            />
            <StyledTab
              label="Our Products"
              value={2}
              disableRipple
              onClick={goTo('/products')}
            />
            <StyledTab
              label="Blog"
              value={3}
              disableRipple
              onClick={forwardTo('https://blog.covidactnow.org')}
            />
            <StyledTab
              label="Contact Us"
              value={4}
              disableRipple
              onClick={goTo('/contact')}
            />
          </StyledTabs>
          <FacebookShareButton
            url={shareURL}
            quote={shareTitle}
            beforeOnClick={() => {
              trackShare('facebook');
              return Promise.resolve();
            }}
            style={{
              alignItems: 'center',
              display: 'flex',
              paddingLeft: 28,
              paddingRight: 14,
            }}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareURL}
            title={shareTitle}
            hashtags={[hashtag]}
            beforeOnClick={() => {
              trackShare('twitter');
              return Promise.resolve();
            }}
            style={{ alignItems: 'center', display: 'flex' }}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </StyledDesktopMenu>
        <StyledMobileMenu>
          <FacebookShareButton
            url={shareURL}
            title={shareTitle}
            style={{ alignItems: 'center', display: 'flex', paddingRight: 8 }}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareURL}
            title={shareTitle}
            hashtags={[hashtag]}
            style={{ alignItems: 'center', display: 'flex' }}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <Burger open={open} setOpen={setOpen} />
          <MobileMenu open={open} goTo={goTo} forwardTo={forwardTo} />
        </StyledMobileMenu>
      </Wrapper>
    </StyledAppBar>
  );
};

export default _AppBar;
