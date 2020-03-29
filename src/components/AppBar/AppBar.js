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
  const panels = ['/', '/about', '/model', '/endorsements', '/contact'];

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

  const shareURL = `https://covidactnow.org${match ? match.url : ''}`;
  const hashtag = 'COVIDActNow';
  const stateShareTitle = `This is the point of no return for intervention to prevent ${locationName}'s hospital system from being overloaded by Coronavirus: `;
  const defaultShareTitle =
    'See a forecast for how long each US state has until COVID-19 overwhelms hospitals and how interventions could flatten the curve:';

  const shareTitle = locationName ? stateShareTitle : defaultShareTitle;

  return (
    <StyledAppBar position="sticky">
      <Wrapper>
        <Left>
          {pathname.includes('state') ? (
            <ArrowBack onClick={goTo('/')} />
          ) : (
            <Logo onClick={goTo('/')} />
          )}
          <MenuTitle>
            <Typography
              variant="button"
              onClick={goTo('/')}
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
              label="About"
              value={1}
              disableRipple
              onClick={goTo('/about')}
            />
            <StyledTab
              label="Model"
              value={2}
              disableRipple
              onClick={goTo('/model')}
            />
            <StyledTab
              label="Endorsements"
              value={3}
              disableRipple
              onClick={goTo('/endorsements')}
            />
            <StyledTab
              label="Contact"
              value={4}
              disableRipple
              onClick={goTo('/contact')}
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
          <MobileMenu open={open} setOpen={setOpen} goTo={goTo} />
        </StyledMobileMenu>
      </Wrapper>
    </StyledAppBar>
  );
};

export default _AppBar;
