import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
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
import { STATES } from 'enums';

const Panels = ['/', '/faq', '/endorsements', '/contact', '/blog'];

function getPanelIdxFromLocation(location) {
  let idx = Panels.indexOf(location.pathname);
  return idx === -1 ? false : idx;
}

const _AppBar = () => {
  const history = useHistory();
  const location = useLocation();

  const [panelIdx, setPanelIdx] = useState(getPanelIdxFromLocation(location));
  const [open, setOpen] = useState(false);
  const locationPath = useLocation();
  const { isEmbed } = useEmbed();

  useEffect(() => {
    function handleLocationChange(location) {
      setPanelIdx(getPanelIdxFromLocation(location));
    }
    // https://github.com/ReactTraining/react-router/issues/3385#issuecomment-214758008
    return history.listen(handleLocationChange);
  }, [history]);

  // Don't show in iFrame
  if (isEmbed) return null;

  let match = matchPath(locationPath.pathname, {
    path: '/us/:id',
    exact: true,
    strict: false,
  });

  const matchFromLegacyPath = matchPath(locationPath.pathname, {
    path: '/states/:id',
    exact: true,
    strict: false,
  });

  if (!match) {
    match = matchFromLegacyPath;
  }

  const locationName = match && match.params ? STATES[match.params.id] : '';
  const goTo = route => e => {
    e.preventDefault();
    setOpen(false);

    history.push(route);

    window.scrollTo(0, 0);
  };

  const forwardTo = url => e => {
    e.preventDefault();

    setOpen(false);
    window.open(url, '_blank');
  };

  const shareURL = `https://covidactnow.org${match ? match.url : ''}`;
  const hashtag = 'COVIDActNow';
  const stateShareTitle = `See a projection for how long ${locationName}'s hospital system has until COVID overwhelms hospitals and how interventions flatten the curve and save lives: @COVIDActNow`;
  const defaultShareTitle =
    'See a projection for how long states and counties have until COVID overwhelms hospitals and how interventions flatten the curve and save lives: @COVIDActNow';

  const shareTitle = locationName ? stateShareTitle : defaultShareTitle;

  const trackShare = target => {
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
              label="FAQ"
              value={1}
              disableRipple
              onClick={goTo('/faq')}
            />
            <StyledTab
              label="Endorsements"
              value={2}
              disableRipple
              onClick={goTo('/endorsements')}
            />
            <StyledTab
              label="Blog"
              value={3}
              disableRipple
              onClick={forwardTo('https://blog.covidactnow.org')}
            />
          </StyledTabs>
          <FacebookShareButton
            url={shareURL}
            quote={shareTitle}
            beforeOnClick={() => {
              trackShare('facebook');
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
          <MobileMenu
            open={open}
            setOpen={setOpen}
            goTo={goTo}
            forwardTo={forwardTo}
          />
        </StyledMobileMenu>
      </Wrapper>
    </StyledAppBar>
  );
};

export default _AppBar;
