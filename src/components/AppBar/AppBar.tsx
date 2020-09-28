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

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Location } from 'history';
import * as urls from 'common/urls';
import { trackShare } from 'components/Analytics';
import { getCountyByUrlName, getStateByUrlName } from 'common/locations';

const Panels = ['/', '/about', '/resources', '/blog', '/contact'];

interface LocationPageUrlParams {
  id?: string;
  county?: string;
}

function getPanelIdxFromLocation(location: Location<any>) {
  let idx = Panels.indexOf(location.pathname);
  return idx === -1 ? false : idx;
}

function locationNameFromUrlParams(stateId?: string, countyId?: string) {
  if (!stateId) {
    return '';
  }

  const state = getStateByUrlName(stateId);
  const countyOption = countyId && getCountyByUrlName(countyId);
  const isValidLocation = state && !(countyId && !countyOption);

  if (!isValidLocation) {
    return '';
  }

  return state && countyId && countyOption
    ? `${countyOption.county}, ${state?.state}`
    : `${state?.state}`;
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
  const locationName =
    match && match?.params?.id
      ? locationNameFromUrlParams(match.params.id, match.params.county)
      : '';
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

  const shareURL = urls.addSharingId(
    `https://covidactnow.org${match ? match.url : ''}`,
  );
  const hashtag = 'COVIDActNow';
  const locationShareTitle = `I'm keeping track of ${locationName}'s COVID data and risk level with @CovidActNow. What does your community look like?`;
  const defaultShareTitle =
    'I’m keeping track of the latest COVID data and risk levels with @CovidActNow. What does your community look like?';

  const shareTitle = locationName ? locationShareTitle : defaultShareTitle;

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
