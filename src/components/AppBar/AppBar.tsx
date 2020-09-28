import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import Logo from 'assets/images/logo';
import { useEmbed } from 'common/utils/hooks';
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
import DonateButton from './DonateButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { STATES } from 'common';
import { Location } from 'history';

const Panels = ['/', '/about', '/resources', '/blog', '/contact'];

function getPanelIdxFromLocation(location: Location<any>) {
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
  const goTo = (route: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);

    history.push(route);

    window.scrollTo(0, 0);
  };

  const forwardTo = (url: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    setOpen(false);
    window.location.href = url;
  };

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
              label="Resources"
              value={2}
              disableRipple
              onClick={goTo('/resources')}
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
          <DonateButton />
        </StyledDesktopMenu>
        <StyledMobileMenu>
          <DonateButton />
          <Burger open={open} setOpen={setOpen} />
          <MobileMenu open={open} goTo={goTo} forwardTo={forwardTo} />
        </StyledMobileMenu>
      </Wrapper>
    </StyledAppBar>
  );
};

export default _AppBar;
