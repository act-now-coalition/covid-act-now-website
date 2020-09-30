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
import { DonateButtonWithFade, DonateButtonWithoutFade } from './DonateButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Location } from 'history';
// import * as urls from 'common/urls';
// import { trackShare } from 'components/Analytics';
// import { getCountyByUrlName, getStateByUrlName } from 'common/locations';
import { includes } from 'lodash';

const Panels = ['/', '/about', '/resources', '/blog', '/contact'];

interface LocationPageUrlParams {
  id?: string;
  county?: string;
}

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

  // Fade functionality for donate button only applies to homepage paths:
  const pathsToHomepage = ['/', '/alert_signup', '/compare'];
  const buttonWithFade =
    includes(pathsToHomepage, location.pathname) &&
    !location.pathname.includes('us');

  useEffect(() => {
    function handleLocationChange(location: Location<any>) {
      setPanelIdx(getPanelIdxFromLocation(location));
    }
    // https://github.com/ReactTraining/react-router/issues/3385#issuecomment-214758008
    return history.listen(handleLocationChange);
  }, [history]);

  /*
  Fade functionality is only applied to mobile homepage,
  where the donate button doesn't appear on load--it appears
  only once scrollY has passed 175px / banner is scrolled away
  */
  const MobileDonateButtonComponent = buttonWithFade
    ? DonateButtonWithFade
    : DonateButtonWithoutFade;

  // Don't show in iFrame
  if (isEmbed) return null;

  let match = matchPath<LocationPageUrlParams>(locationPath.pathname, {
    path: ['/us/:id', '/us/:id/county/:county'],
    exact: true,
    strict: false,
  });

  if (!match) {
    match = matchPath<LocationPageUrlParams>(locationPath.pathname, {
      path: '/states/:id',
      exact: true,
      strict: false,
    });
  }
  // TODO(pablo): Import locationNameFromUrlParams from common/utils once
  // we restore sharing.
  // const locationName =
  //   match && match?.params?.id
  //     ? locationNameFromUrlParams(match.params.id, match.params.county)
  //     : '';
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
          <DonateButtonWithoutFade />
        </StyledDesktopMenu>
        <StyledMobileMenu>
          <MobileDonateButtonComponent />
          <Burger open={open} setOpen={setOpen} />
          <MobileMenu open={open} goTo={goTo} forwardTo={forwardTo} />
        </StyledMobileMenu>
      </Wrapper>
    </StyledAppBar>
  );
};

export default _AppBar;
