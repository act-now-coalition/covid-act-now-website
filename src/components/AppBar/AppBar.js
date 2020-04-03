import React, { useState } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import Logo from 'assets/images/logo';
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

const _AppBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const panels = ['/', '/faq', '/endorsements', '/contact', '/blog'];

  const getDefaultPanelId = () => {
    const defaultPanelIndex = Number(panels.indexOf(pathname));

    if (!defaultPanelIndex) {
      return 0;
    }

    // We are on the state page, don't highlight a tab
    if (defaultPanelIndex === -1) {
      return false;
    }

    return defaultPanelIndex;
  };

  const [panelIdx, setPanelIdx] = useState(getDefaultPanelId());
  const [open, setOpen] = useState(false);

  const locationPath = useLocation();
  const match = matchPath(locationPath.pathname, {
    path: '/state/:id',
    exact: true,
    strict: false,
  });
  const locationName = match && match.params ? STATES[match.params.id] : '';

  const goTo = route => e => {
    e.preventDefault();
    setOpen(false);
    setPanelIdx(panels.indexOf(route));

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
