import React, { useState }               from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { ArrowBack }                     from '@material-ui/icons';
import AppBar                            from '@material-ui/core/AppBar';
import Typography                        from '@material-ui/core/Typography';

import Logo                              from 'assets/images/logo';
import MobileMenu from'./MobileMenu';
import Burger from'./Burger';
import {
  Wrapper,
  Left,
  StyledDesktopMenu,
  StyledTabs,
  StyledTab,
  MobileMenuTitle,
  MenuTitle,
  StyledMobileMenu,
} from './AppBar.style';
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";

const _AppBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const panels = ['/', '/faq', '/about', '/endorsements'];
  const [panelIdx, setPanelIdx] = useState(String(panels.indexOf(pathname)) || '0');
  const [open, setOpen] = useState(false);

  const goTo = route => {
    setOpen(false);
    setPanelIdx(String(panels.indexOf(route)));

    history.push(route)
  };

  const shareURL = "https://covidactnow.org"
  const shareTitle = "See a forecast for how long each US state has until COVID-19 overwhelms hospitals and how interventions could flatten the curve:"

  return (
    <AppBar position="sticky">
      <Wrapper>
        <Left>
          {pathname.includes('state') ? (
            <ArrowBack onClick={() => goTo('/')} />
          ) : (
            <Logo onClick={() => goTo('/')} />
          )}
          <MenuTitle>
            <Typography
              variant="button"
              component={Link}
              onClick={() => goTo('/')}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              COVID ACT NOW
            </Typography>
          </MenuTitle>
        </Left>
        <StyledDesktopMenu>
          <FacebookShareButton
            url={shareURL}
            quote={shareTitle}
            style={{ alignItems: 'center', display: 'flex', paddingRight: 28 }}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareURL}
            title={shareTitle}
            style={{ alignItems: 'center', display: 'flex' }}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <StyledTabs value={panelIdx}>
            <StyledTab label="Map" value="0" disableRipple onClick={() => goTo('/')} />
            <StyledTab label="FAQ" value="1" disableRipple onClick={() => goTo('/faq')} />
            <StyledTab label="About" value="2" disableRipple onClick={() => goTo('/about')} />
            <StyledTab label="Endorsements" value="3" disableRipple onClick={() => goTo('/endorsements')} />
          </StyledTabs>
        </StyledDesktopMenu>
        <StyledMobileMenu>
            <TwitterShareButton
              url={shareURL}
              title={shareTitle}
              style={{ alignItems: 'center', display: 'flex' }}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
           <Burger open={open} setOpen={setOpen} />
           <MobileMenu open={open} setOpen={setOpen} goTo={goTo} />
        </StyledMobileMenu>
      </Wrapper>
    </AppBar>
  );
};

export default _AppBar;
