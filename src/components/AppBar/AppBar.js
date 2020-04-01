import React, { useState } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
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
  MenuTitle,
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
  const stateShareTitle = `This is the point of no return for intervention to prevent ${locationName}'s hospital system from being overloaded by Coronavirus: `;
  const defaultShareTitle =
    'See a forecast for how long each US state has until COVID-19 overwhelms hospitals and how interventions could flatten the curve:';

  const shareTitle = locationName ? stateShareTitle : defaultShareTitle;

  return (
    <StyledAppBar position="sticky">
      <Wrapper>
        <Left onClick={goTo('/')}>
          {pathname.includes('state') ? <ArrowBack /> : <Logo />}
          <MenuTitle>
            <Typography
              variant="button"
              style={{
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
              }}
            >
              COVID ACT NOW
            </Typography>
          </MenuTitle>
        </Left>
        <StyledDesktopMenu value={false}>
          <FacebookShareButton
            url={shareURL}
            quote={shareTitle}
            style={{ alignItems: 'center', display: 'flex', paddingRight: 28 }}
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
              label="Contact"
              value={3}
              disableRipple
              onClick={goTo('/contact')}
            />
            <StyledTab
              label="Blog"
              value={4}
              disableRipple
              onClick={forwardTo('https://blog.covidactnow.org')}
            />
          </StyledTabs>
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
